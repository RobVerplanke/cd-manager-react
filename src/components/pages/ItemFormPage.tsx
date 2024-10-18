import { FormEvent, useEffect, useReducer, useRef, useState } from 'react';
import { FormErrors, type Item, type ItemType } from '../../lib/types/types';
import formDataReducer from '../../reducers/formDataReducer';
import getItemById from '../../api/getItemById';
import EditItem from '../../api/editItemAPI';
import addNewItem from '../../api/addNewItemAPI';
import {
  capitalizeFirstLetter,
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

  // Collect validation errors
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const {
    allAlbums,
    allCds,
    setIsItemMutated,
    setError,
    setConfirmationMessage,
  } = useData();

  // Retreive item ID from the url
  const { id } = useParams<{ id: string }>();

  // Select fitst input field
  const artistNameRef = useRef<null | HTMLInputElement>(null);

  // Initially set focus on first input field and when the user changes category
  useEffect(() => {
    artistNameRef.current?.focus();
  }, [selectedCategory]);

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
  async function handleSubmit() {
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
    } catch (errors) {
      // Check if errors are Yup ValidationErrors
      if (errors instanceof ValidationError) {
        errors.inner.forEach((error) => {
          if (error.path) {
            newError[error.path] = error.message;
          }
        });
      }

      // Set the validation errors in the state and log them
      setFormErrors(newError);

      return;
    }

    // Decide to edit or add an item
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
          <label htmlFor="cdCount" className="text-gray-700 pt-2">
            <sup style={{ color: 'red' }}>*</sup>Amount of CDs:
          </label>
          <input
            type="number"
            id="cdCount"
            name="cdCount"
            className="text-xs bg-white border rounded-md h-6 w-10 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
            value={state.cdsInAlbum}
            onChange={(e) => handleChange('added_album-cdCount', e)}
          />
          {formErrors.cdsInAlbum && (
            <div className="text-red-600">{formErrors.cdsInAlbum}</div>
          )}
          <label htmlFor="albumYear" className="text-gray-700 pt-2">
            Release year:
          </label>
          <select
            id="albumYear"
            name="albumYear"
            className="text-xs bg-white border rounded-md h-6 w-20 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
            value={state.albumYear}
            onChange={(e) => handleChange('added_album-year', e)}
          >
            {releaseYearRange.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          {formErrors.albumYear && (
            <div className="text-red-600">{formErrors.albumYear}</div>
          )}
          <label htmlFor="thumbnail" className="text-gray-700 pt-2">
            Thumbnail cover:
          </label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            className="text-xs bg-white border rounded-md h-7 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
            value={state.cover.albumThumbnail}
            onChange={(e) => handleChange('added_album-thumbnail', e)}
          />
          {formErrors.albumThumbnail && (
            <div className="text-red-600">{formErrors.albumThumbnail}</div>
          )}

          <label htmlFor="fullSize" className="text-gray-700 pt-2">
            Full Size cover:
          </label>
          <input
            type="text"
            id="fullSize"
            name="fullSize"
            className="text-xs bg-white border rounded-md h-7 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
            value={state.cover.albumFullSize}
            onChange={(e) => handleChange('added_album-fullSize', e)}
          />
          {formErrors.albumFullSize && (
            <div className="text-red-600">{formErrors.albumFullSize}</div>
          )}
        </>
      );
    } else if (selectedCategory === 'cd' && 'trackCount' in state) {
      return (
        <>
          <label htmlFor="cdCount" className="text-gray-700 pt-2">
            <sup style={{ color: 'red' }}>*</sup>Amount of CDs:
          </label>
          <input
            type="number"
            id="cdCount"
            name="cdCount"
            className="text-xs bg-white border rounded-md h-6 w-10 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
            value={state.cdCount}
            onChange={(e) => handleChange('added_cd-cdCount', e)}
          />
          {formErrors.cdCount && (
            <div className="text-red-600">{formErrors.cdCount}</div>
          )}
          <label htmlFor="trackCount" className="text-gray-700 pt-2">
            <sup style={{ color: 'red' }}>*</sup>Amount of tracks:
          </label>
          <input
            type="number"
            id="trackCount"
            name="trackCount"
            className="text-xs bg-white border rounded-md h-6 w-10 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
            value={state.trackCount}
            onChange={(e) => handleChange('added_cd-trackCount', e)}
          />
          {formErrors.trackCount && (
            <div className="text-red-600">{formErrors.trackCount}</div>
          )}
          <label htmlFor="cdYear" className="text-gray-700 pt-2">
            Release year:
          </label>
          <select
            id="cdYear"
            name="cdYear"
            className="text-xs bg-white border rounded-md h-6 w-20 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
            value={state.cdYear}
            onChange={(e) => handleChange('added_cd-year', e)}
          >
            {releaseYearRange.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          {formErrors.cdYear && (
            <div className="text-red-600">{formErrors.cdYear}</div>
          )}
          <label htmlFor="partOfAlbum" className="text-gray-700 pt-2">
            Part of Album:
          </label>
          {/* Generate an title selection in case the current CD is part of an ablum */}
          <select
            id="partOfAlbum"
            name="partOfAlbum"
            value={state.partOfAlbum}
            className="text-xs bg-white border rounded-md h-6 w-60 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
            onChange={(e) => handleChange('added_partOfAlbum', e)}
          >
            <option>None</option>
            {allAlbums.map((album) => (
              <option key={album.id}>{album.title}</option>
            ))}
          </select>
          {formErrors.partOfAlbum && (
            <div className="text-red-600">{formErrors.partOfAlbum}</div>
          )}
          <label htmlFor="cdThumbnail" className="text-gray-700 pt-2">
            Thumbnail cover:
          </label>
          <input
            type="text"
            id="cdThumbnail"
            name="cdThumbnail"
            className="text-xs bg-white border rounded-md h-6 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
            value={state.cover.cdThumbnail}
            onChange={(e) => handleChange('added_cd-thumbnail', e)}
          />
          {formErrors.cdThumbnail && (
            <div className="text-red-600">{formErrors.cdThumbnail}</div>
          )}

          <label htmlFor="cdFullSize" className="text-gray-700 pt-2">
            Full Size cover:
          </label>
          <input
            type="text"
            id="cdFullSize"
            name="cdFullSize"
            className="text-xs bg-white border rounded-md h-6 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
            value={state.cover.cdFullSize}
            onChange={(e) => handleChange('added_cd-fullSize', e)}
          />
          {formErrors.cdFullSize && (
            <div className="text-red-600">{formErrors.cdFullSize}</div>
          )}
        </>
      );
    } else if (selectedCategory === 'track' && 'trackNumber' in state) {
      return (
        <>
          <label htmlFor="cdTitle" className="text-gray-700 pt-2">
            <sup style={{ color: 'red' }}>*</sup>CD title:
          </label>
          <select
            id="cdTitle"
            name="cdTitle"
            className="text-xs bg-white border rounded-md h-6 w-60 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
            value={state.cdTitle}
            onChange={(e) => handleChange('added_cdTitle', e)}
          >
            <option>None</option>
            {allCds.map((cd) => (
              <option key={cd.id}>{cd.title}</option>
            ))}
          </select>
          {formErrors.cdTitle && (
            <div className="text-red-600">{formErrors.cdTitle}</div>
          )}

          <label htmlFor="trackNumber" className="text-gray-700 pt-2">
            <sup style={{ color: 'red' }}>*</sup>Track number:
          </label>
          <input
            type="number"
            id="trackNumber"
            name="trackNumber"
            className="text-xs bg-white border rounded-md h-6 w-10 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
            value={state.trackNumber}
            onChange={(e) => handleChange('added_trackNumber', e)}
          />
          {formErrors.trackNumber && (
            <div className="text-red-600">{formErrors.trackNumber}</div>
          )}
          <label htmlFor="length" className="text-gray-700 pt-2">
            <sup style={{ color: 'red' }}>*</sup>Length:
          </label>
          <input
            type="text"
            id="length"
            name="length"
            className="text-xs bg-white border rounded-md h-6 w-20 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
            value={state.length}
            onChange={(e) => handleChange('added_length', e)}
          />
          {formErrors.length && (
            <div className="text-red-600">{formErrors.length}</div>
          )}
        </>
      );
    }
  }

  // Render the common form elements
  return (
    <main className="my-5 pl-6">
      <div className="text-2xl border-b-2 border-[#176061] pb-4 mb-4">
        {isEditMode ? (
          <p>Edit {selectedCategory}</p>
        ) : (
          <p>Add new {selectedCategory}</p>
        )}
      </div>
      {/* Radio buttons to select category */}
      {!isEditMode && (
        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      {/* Common fields for all categories */}

      <form className="flex flex-col w-full pl-6 max-w-lg space-y-1 text-sm font-medium">
        <label htmlFor="artist" className="text-gray-700 text-sm">
          <sup style={{ color: 'red' }}>*</sup>Artist name:
        </label>
        <input
          ref={artistNameRef}
          type="text"
          id="artist"
          name="artist"
          className="text-xs border rounded-md h-6 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
          value={state.artist}
          onChange={(e) => handleChange('added_artist', e)}
        />
        {formErrors.artist && (
          <div className="text-red-600">{formErrors.artist}</div>
        )}
        <label htmlFor="feat-artists" className="text-gray-700 pt-2">
          Featuring artists:
        </label>
        <input
          type="text"
          id="feat-artists"
          name="feat-artists"
          className="text-xs border rounded-md h-6 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
          value={state.featuringArtists}
          onChange={(e) => handleChange('added_feat-artists', e)}
        />
        {formErrors.featuringArtists && (
          <div>{formErrors.featuringArtists}</div>
        )}
        <label htmlFor="title" className="text-gray-700 pt-2">
          <sup style={{ color: 'red' }}>*</sup>
          {capitalizeFirstLetter(selectedCategory)} title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="text-xs border rounded-md h-6 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
          value={state.title}
          onChange={(e) => handleChange('added_title', e)}
        />
        {formErrors.title && (
          <div className="text-red-600">{formErrors.title}</div>
        )}

        <label htmlFor="rating" className="text-gray-700 pt-2">
          Rating:
        </label>
        <select
          id="rating"
          name="rating"
          value={state.rating}
          className="bg-white text-xs border rounded-md h-5 pl-1 w-10 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
          onChange={(e) => handleChange('added_rating', e)}
        >
          {RATING_VALUES.map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
        {formErrors.rating && (
          <div className="text-red-600">{formErrors.rating}</div>
        )}
        <label htmlFor="tags" className="text-gray-700 pt-2">
          Tags:
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          className="text-xs border rounded-md h-6 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
          value={state.tags}
          onChange={(e) => handleChange('added_tags', e)}
        />
        {formErrors.tags && (
          <div className="text-red-600">{formErrors.tags}</div>
        )}

        {/* Category-specific fields */}
        {renderCategorySpecificFields()}

        {/* Extra information field will always be renderd at last */}
        <label htmlFor="extraInfo" className="text-gray-700 pt-2">
          Extra Info:
        </label>
        <textarea
          id="extraInfo"
          name="extraInfo"
          className="text-xs border rounded-md mb-10 pl-2 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
          value={state.extraInfo}
          onChange={(e) => handleChange('added_extraInfo', e)}
        ></textarea>
        {formErrors.extraInfo && (
          <div className="text-red-600">{formErrors.extraInfo}</div>
        )}
        <div className="text-sm py-4">
          <sup style={{ color: 'red' }}>*</sup> = Required
        </div>
        {/* Submit button */}
        <Link
          to={`/details/${state.id}`}
          aria-label="Submit form"
          className="bg-[#176061] text-white font-semibold py-2 px-4 rounded hover:bg-[#359996] focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
          data-testid="submit-button"
          onClick={handleSubmit}
        >
          Submit
        </Link>
        {isEditMode && (
          <Link
            to={'/'}
            aria-label="Delete current item"
            className="bg-red-600 w-20 text-white font-semibold py-2 px-4 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
            data-testid="delete-link"
            onClick={handleDelete}
          >
            Delete
          </Link>
        )}
      </form>
    </main>
  );
}
export default ItemFormPage;
