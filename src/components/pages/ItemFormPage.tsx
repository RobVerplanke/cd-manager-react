import { FormEvent, useEffect, useReducer, useRef, useState } from 'react';
import { FormErrors, type Item, type ItemType } from '../../lib/types/types';
import formDataReducer from '../../reducers/formDataReducer';
import getItemById from '../../api/getItemById';
import EditItem from '../../api/editItemAPI';
import addNewItem from '../../api/addNewItemAPI';
import {
  createNewItemObject,
  getReleaseYearRange,
} from '../../utils/helperFunctions';
import { RATING_VALUES } from '../../lib/constants';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import CategorySelector from '../CategorySelector';
import { ValidationError } from 'yup';
import {
  validationSchemaAlbum,
  validationSchemaCd,
  validationSchemaTrack,
} from '../../lib/yup/schemas';
import DeleteItem from '../../api/deleteItemAPI';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Depending on the argument value, form elements are rendered dynamicly
function ItemFormPage({ isEditMode }: { isEditMode: boolean }) {
  // Initially set item type to 'album'
  const [item, setItem] = useState<Item>(createNewItemObject('album'));

  // Use reducer to manage form data
  const [state, dispatch] = useReducer(formDataReducer, item);

  // Choosen category (only for add mode)
  const [selectedCategory, setSelectedCategory] = useState<ItemType>('album');

  // Fallback empty template in case the data is not loaded
  const newItem: Item = createNewItemObject(selectedCategory);

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const {
    allAlbums,
    allCds,
    setIsItemMutated,
    setError,
    setConfirmationMessage,
  } = useData();
  const { id } = useParams<{ id: string }>();

  const artistNameRef = useRef<null | HTMLInputElement>(null);

  // Every firts time component renders, set focus on first input field
  useEffect(() => {
    artistNameRef.current?.focus();
  }, []);

  // If in edit mode, fetch the item data by ID
  useEffect(() => {
    if (isEditMode && id) {
      const fetchData = async () => {
        const data = await getItemById(id, setError);
        if (data) {
          setItem(data);
        } else {
          setItem(newItem);
        }
      };
      fetchData();
    }
  }, [id, isEditMode]);

  // Add/remove type specific form elements when user changes the category
  useEffect(() => {
    setSelectedCategory(item.type);
  }, [item.type]);

  // Remove validation messages when user changes the category
  useEffect(() => {
    setFormErrors({});
  }, [selectedCategory]);

  // Prefill the form with item data in edit mode
  useEffect(() => {
    if (isEditMode) {
      dispatch({
        type: 'filled_form',
        payload: { inputValue: '', item: item },
      });
    }
  }, [item, isEditMode]);

  // When category changes in add mode, clear form and set new category
  useEffect(() => {
    if (!isEditMode) {
      dispatch({
        type: 'cleared_form',
        payload: { inputValue: '' },
      });
      dispatch({
        type: 'selected_form',
        payload: { inputValue: selectedCategory },
      });
    }
  }, [selectedCategory, isEditMode]);

  // Handle form field changes
  function handleChange(
    inputType: string,
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    // Store CD's in album value as number
    const { value } = event.target;
    const payloadValue =
      inputType === 'added_album-cdCount' ||
      inputType === 'added_cd-cdCount' ||
      inputType === 'added_rating' ||
      inputType === 'added_cd-trackCount'
        ? Number(value)
        : value;
    dispatch({
      type: inputType,
      payload: { inputValue: payloadValue },
    });
  }

  // Remove item from state, update the state and display confirm message
  function handleDelete() {
    if (item && confirm(`Are you sure you want to delete ${item.title}?`)) {
      DeleteItem(item.type, item, setError);
      setIsItemMutated(true);
      setConfirmationMessage('deleted');
    }
  }

  // Handle form submission for both add and edit
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Reset formErrors to an empty object before validating
    const newError: { [key: string]: string } = {};

    try {
      selectedCategory === 'album' &&
        (await validationSchemaAlbum.validate(state, { abortEarly: false }));
      selectedCategory === 'cd' &&
        (await validationSchemaCd.validate(state, { abortEarly: false }));
      selectedCategory === 'track' &&
        (await validationSchemaTrack.validate(state, { abortEarly: false }));

      // Validate form data
    } catch (err) {
      // Check if err is a Yup ValidationError
      if (err instanceof ValidationError) {
        err.inner.forEach((error) => {
          if (error.path) {
            newError[error.path] = error.message;
          }
        });
      }
      // Set the form errors in state and log them
      setFormErrors(newError);

      return;
    }

    if (isEditMode) {
      EditItem(item.type, state, setError);
      setIsItemMutated(true);
      setConfirmationMessage('edited');
      setFormErrors({});
    } else {
      addNewItem(selectedCategory, state, setError);
      setIsItemMutated(true);
      setConfirmationMessage('added');
      setFormErrors({});
    }
  }

  // Display loading message when data is not available (yet)
  if (!item) return <div>Loading data...</div>;

  // Render category-specific fields
  function renderCategorySpecificFields() {
    const currentType = isEditMode ? item.type : selectedCategory;
    const releaseYearRange = getReleaseYearRange();

    // Render the corresponding form elements
    if (currentType === 'album' && 'cdsInAlbum' in state) {
      return (
        <>
          <label htmlFor="cdCount">Amount of CDs:</label>
          <input
            type="number"
            id="cdCount"
            name="cdCount"
            className="w-20"
            value={state.cdsInAlbum}
            onChange={(e) => handleChange('added_album-cdCount', e)}
          />
          {formErrors.cdsInAlbum && <div>{formErrors.cdsInAlbum}</div>}
          <label htmlFor="albumYear" className="text-gray-700">
            Release year:
          </label>
          <select
            id="albumYear"
            name="albumYear"
            className="border rounded-md h-7 w-20 pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={state.albumYear}
            onChange={(e) => handleChange('added_album-year', e)}
          >
            <option>2000</option>
            {releaseYearRange.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          {formErrors.albumYear && <div>{formErrors.albumYear}</div>}
          <label htmlFor="thumbnail">Thumbnail cover:</label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value={state.cover.albumThumbnail}
            onChange={(e) => handleChange('added_album-thumbnail', e)}
          />
          {formErrors.albumThumbnail && <div>{formErrors.albumThumbnail}</div>}

          <label htmlFor="fullSize">Full Size cover:</label>
          <input
            type="text"
            id="fullSize"
            name="fullSize"
            value={state.cover.albumFullSize}
            onChange={(e) => handleChange('added_album-fullSize', e)}
          />
          {formErrors.albumFullSize && <div>{formErrors.albumFullSize}</div>}
        </>
      );
    } else if (selectedCategory === 'cd' && 'trackCount' in state) {
      return (
        <>
          <label htmlFor="cdCount">Amount of CDs:</label>
          <input
            type="number"
            id="cdCount"
            name="cdCount"
            className="w-20"
            value={state.cdCount}
            onChange={(e) => handleChange('added_cd-cdCount', e)}
          />
          {formErrors.cdCount && <div>{formErrors.cdCount}</div>}
          <label htmlFor="trackCount">Amount of tracks:</label>
          <input
            type="number"
            id="trackCount"
            name="trackCount"
            className="w-20"
            value={state.trackCount}
            onChange={(e) => handleChange('added_cd-trackCount', e)}
          />
          {formErrors.trackCount && <div>{formErrors.trackCount}</div>}
          <label htmlFor="cdYear" className="text-gray-700">
            Release year:
          </label>
          <select
            id="cdYear"
            name="cdYear"
            className="border rounded-md h-7 w-20 pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={state.cdYear}
            onChange={(e) => handleChange('added_cd-year', e)}
          >
            <option>-2000</option>
            {releaseYearRange.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          {formErrors.cdYear && <div>{formErrors.cdYear}</div>}
          <label htmlFor="partOfAlbum">Part of Album:</label>
          {/* Generate an title selection in case the current CD is part of an ablum */}
          <select
            id="partOfAlbum"
            name="partOfAlbum"
            value={state.partOfAlbum}
            onChange={(e) => handleChange('added_partOfAlbum', e)}
          >
            <option>--- None ---</option>
            {allAlbums.map((album) => (
              <option key={album.id}>{album.title}</option>
            ))}
          </select>
          {formErrors.partOfAlbum && <div>{formErrors.partOfAlbum}</div>}
          <label htmlFor="cdThumbnail">Thumbnail cover:</label>
          <input
            type="text"
            id="cdThumbnail"
            name="cdThumbnail"
            value={state.cover.cdThumbnail}
            onChange={(e) => handleChange('added_cd-thumbnail', e)}
          />
          {formErrors.cdThumbnail && <div>{formErrors.cdThumbnail}</div>}

          <label htmlFor="cdFullSize">Full Size cover:</label>
          <input
            type="text"
            id="cdFullSize"
            name="cdFullSize"
            value={state.cover.cdFullSize}
            onChange={(e) => handleChange('added_cd-fullSize', e)}
          />
          {formErrors.cdFullSize && <div>{formErrors.cdFullSize}</div>}
        </>
      );
    } else if (selectedCategory === 'track' && 'trackNumber' in state) {
      return (
        <>
          <label htmlFor="cdTitle">CD Title:</label>
          <select
            id="cdTitle"
            name="cdTitle"
            value={state.cdTitle}
            onChange={(e) => handleChange('added_cdTitle', e)}
          >
            <option>--- None ---</option>
            {allCds.map((cd) => (
              <option key={cd.id}>{cd.title}</option>
            ))}
          </select>
          {formErrors.cdTitle && <div>{formErrors.cdTitle}</div>}

          <label htmlFor="trackNumber">Track number:</label>
          <input
            type="text"
            id="trackNumber"
            name="trackNumber"
            value={state.trackNumber}
            onChange={(e) => handleChange('added_trackNumber', e)}
          />
          {formErrors.trackNumber && <div>{formErrors.trackNumber}</div>}
          <label htmlFor="length">Track Length:</label>
          <input
            type="text"
            id="length"
            name="length"
            value={state.length}
            onChange={(e) => handleChange('added_length', e)}
          />
          {formErrors.length && <div>{formErrors.length}</div>}
        </>
      );
    }
  }

  // Render the common form elements
  return (
    <main className="my-6 pl-6">
      <div className="text-3xl">
        {isEditMode ? <h1>Edit item</h1> : <h1>Add new item</h1>}
      </div>
      {/* Radio buttons to select category */}
      {!isEditMode && (
        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      {/* Common fields for all categories */}

      <form
        className="flex flex-col w-full pl-6 max-w-lg space-y-1 text-sm font-medium"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="artist" className="text-gray-700">
          Artist name:
        </label>
        <input
          ref={artistNameRef}
          type="text"
          id="artist"
          name="artist"
          className="border rounded-md h-7 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={state.artist}
          onChange={(e) => handleChange('added_artist', e)}
        />
        {formErrors.artist && <div>{formErrors.artist}</div>}
        <label htmlFor="feat-artists" className="text-gray-700">
          Featuring artists:
        </label>
        <input
          type="text"
          id="feat-artists"
          name="feat-artists"
          className="border rounded-md h-7 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={state.featuringArtists}
          onChange={(e) => handleChange('added_feat-artists', e)}
        />
        {formErrors.featuringArtists && (
          <div>{formErrors.featuringArtists}</div>
        )}
        <label htmlFor="title" className="text-gray-700">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="border rounded-md h-7 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={state.title}
          onChange={(e) => handleChange('added_title', e)}
        />
        {formErrors.title && <div>{formErrors.title}</div>}

        <label htmlFor="rating" className="text-gray-700">
          Rating:
        </label>
        <select
          id="rating"
          name="rating"
          value={state.rating}
          className="border rounded-md h-7 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleChange('added_rating', e)}
        >
          {RATING_VALUES.map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
        {formErrors.rating && <div>{formErrors.rating}</div>}
        <label htmlFor="tags" className="text-gray-700">
          Tags:
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          className="border rounded-md h-7 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={state.tags}
          onChange={(e) => handleChange('added_tags', e)}
        />
        {formErrors.tags && <div>{formErrors.tags}</div>}

        {/* Category-specific fields */}
        {renderCategorySpecificFields()}

        {/* Extra information field will always be renderd at last */}
        <label htmlFor="extraInfo" className="text-gray-700">
          Extra Info:
        </label>
        <textarea
          id="extraInfo"
          name="extraInfo"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={state.extraInfo}
          onChange={(e) => handleChange('added_extraInfo', e)}
        ></textarea>
        {formErrors.extraInfo && <div>{formErrors.extraInfo}</div>}

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          data-testid="submit-button"
        >
          Submit
        </button>
        {isEditMode && (
          <Link
            to={`/`}
            className="pt-0.5 pl-2 text-gray-600"
            onClick={handleDelete}
            data-testid="delete-link"
          >
            <DeleteForeverIcon fontSize="small" />
          </Link>
        )}
      </form>
    </main>
  );
}
export default ItemFormPage;
