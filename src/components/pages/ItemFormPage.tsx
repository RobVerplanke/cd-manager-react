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
import { Link, useParams, useNavigate } from 'react-router-dom';
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
  // Redirect user to corresponding details page after adding or editing an item
  const navigate = useNavigate();

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
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Voorkom standaard formuliergedrag
    const newError: { [key: string]: string } = {}; // Reset formErrors

    try {
      // Validate data for each category
      if (selectedCategory === 'album') {
        await validationSchemaAlbum.validate(state, { abortEarly: false });
      } else if (selectedCategory === 'cd') {
        await validationSchemaCd.validate(state, { abortEarly: false });
      } else if (selectedCategory === 'track') {
        await validationSchemaTrack.validate(state, { abortEarly: false });
      }

      // If validation is succesful, reset the errors
      setFormErrors({});

      // Decide to add or edit an item
      if (isEditMode) {
        EditItem(item.type, state, setError); // Edit item
        setConfirmationMessage('edited');
      } else {
        addNewItem(selectedCategory, state, setError); // Add item
        setConfirmationMessage('added');
      }

      // After succesful validation, redirect to corresponding details page
      setIsItemMutated(true);
      navigate(`/details/${state.id}`); // Redirect to details page
    } catch (errors) {
      if (errors instanceof ValidationError) {
        errors.inner.forEach((error) => {
          if (error.path) {
            newError[error.path] = error.message;
          }
        });
      }

      // Set validation errors
      setFormErrors(newError);
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
          <tr>
            <td className="py-2 px-4 border-b font-normal">
              <label htmlFor="cdCount" className="text-gray-700 pt-2">
                Amount of CDs:<sup style={{ color: 'red' }}>*</sup>
              </label>
            </td>
            <td className="py-2 pl-12 border-b text-left">
              <input
                type="number"
                id="cdCount"
                name="cdCount"
                className="text-xs bg-white border rounded-md h-6 w-10 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
                value={state.cdsInAlbum}
                onChange={(e) => handleChange('added_album-cdCount', e)}
              />
              {formErrors.cdsInAlbum && (
                <div className="text-red-600 text-xs">
                  {formErrors.cdsInAlbum}
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-normal">
              <label htmlFor="albumYear" className="text-gray-700 pt-2">
                Release year:
              </label>
            </td>
            <td className="py-2 pl-12 border-b text-left">
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
                <div className="text-red-600 text-xs">
                  {formErrors.albumYear}
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-normal">
              <label htmlFor="thumbnail" className="text-gray-700 pt-2">
                Thumbnail cover:
              </label>
            </td>
            <td className="py-2 pl-12 border-b text-left">
              <input
                type="text"
                id="thumbnail"
                name="thumbnail"
                className="text-xs bg-white border rounded-md h-7 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
                value={state.cover.albumThumbnail}
                onChange={(e) => handleChange('added_album-thumbnail', e)}
              />
              {formErrors.albumThumbnail && (
                <div className="text-red-600 text-xs">
                  {formErrors.albumThumbnail}
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-normal">
              <label htmlFor="fullSize" className="text-gray-700 pt-2">
                Full Size cover:
              </label>
            </td>
            <td className="py-2 pl-12 border-b text-left">
              <input
                type="text"
                id="fullSize"
                name="fullSize"
                className="text-xs bg-white border rounded-md h-7 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
                value={state.cover.albumFullSize}
                onChange={(e) => handleChange('added_album-fullSize', e)}
              />
              {formErrors.albumFullSize && (
                <div className="text-red-600 text-xs">
                  {formErrors.albumFullSize}
                </div>
              )}
            </td>
          </tr>
        </>
      );
    } else if (selectedCategory === 'cd' && 'trackCount' in state) {
      return (
        <>
          <tr>
            <td className="py-2 px-4 border-b font-normal">
              <label htmlFor="cdCount" className="text-gray-700 pt-2">
                Amount of CDs:<sup style={{ color: 'red' }}>*</sup>
              </label>
            </td>
            <td className="py-2 pl-12 border-b text-left">
              <input
                type="number"
                id="cdCount"
                name="cdCount"
                className="text-xs bg-white border rounded-md h-6 w-10 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
                value={state.cdCount}
                onChange={(e) => handleChange('added_cd-cdCount', e)}
              />
              {formErrors.cdCount && (
                <div className="text-red-600 text-xs">{formErrors.cdCount}</div>
              )}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-normal">
              <label htmlFor="trackCount" className="text-gray-700 pt-2">
                Amount of tracks:<sup style={{ color: 'red' }}>*</sup>
              </label>
            </td>
            <td className="py-2 pl-12 border-b text-left">
              <input
                type="number"
                id="trackCount"
                name="trackCount"
                className="text-xs bg-white border rounded-md h-6 w-10 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
                value={state.trackCount}
                onChange={(e) => handleChange('added_cd-trackCount', e)}
              />
              {formErrors.trackCount && (
                <div className="text-red-600 text-xs">
                  {formErrors.trackCount}
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-normal">
              <label htmlFor="cdYear" className="text-gray-700 pt-2">
                Release year:
              </label>
            </td>
            <td className="py-2 pl-12 border-b text-left">
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
                <div className="text-red-600 text-xs">{formErrors.cdYear}</div>
              )}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-normal">
              <label htmlFor="partOfAlbum" className="text-gray-700 pt-2">
                Part of Album:
              </label>
            </td>
            {/* Generate an title selection in case the current CD is part of an ablum */}
            <td className="py-2 pl-12 border-b text-left">
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
                <div className="text-red-600 text-xs">
                  {formErrors.partOfAlbum}
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-normal">
              <label htmlFor="cdThumbnail" className="text-gray-700 pt-2">
                Thumbnail cover:
              </label>
            </td>
            <td className="py-2 pl-12 border-b text-left">
              <input
                type="text"
                id="cdThumbnail"
                name="cdThumbnail"
                className="text-xs bg-white border rounded-md h-6 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
                value={state.cover.cdThumbnail}
                onChange={(e) => handleChange('added_cd-thumbnail', e)}
              />
              {formErrors.cdThumbnail && (
                <div className="text-red-600 text-xs">
                  {formErrors.cdThumbnail}
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-normal">
              <label htmlFor="cdFullSize" className="text-gray-700 pt-2">
                Full Size cover:
              </label>
            </td>
            <td className="py-2 pl-12 border-b text-left">
              <input
                type="text"
                id="cdFullSize"
                name="cdFullSize"
                className="text-xs bg-white border rounded-md h-6 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
                value={state.cover.cdFullSize}
                onChange={(e) => handleChange('added_cd-fullSize', e)}
              />
              {formErrors.cdFullSize && (
                <div className="text-red-600 text-xs">
                  {formErrors.cdFullSize}
                </div>
              )}
            </td>
          </tr>
        </>
      );
    } else if (selectedCategory === 'track' && 'trackNumber' in state) {
      return (
        <>
          <tr>
            <td className="py-2 px-4 border-b font-normal">
              <label htmlFor="cdTitle" className="text-gray-700 pt-2">
                CD title:<sup style={{ color: 'red' }}>*</sup>
              </label>
            </td>
            <td className="py-2 pl-12 border-b text-left">
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
                <div className="text-red-600 text-xs">{formErrors.cdTitle}</div>
              )}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-normal">
              <label htmlFor="trackNumber" className="text-gray-700 pt-2">
                Track number:<sup style={{ color: 'red' }}>*</sup>
              </label>
            </td>
            <td className="py-2 pl-12 border-b text-left">
              <input
                type="number"
                id="trackNumber"
                name="trackNumber"
                className="text-xs bg-white border rounded-md h-6 w-10 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
                value={state.trackNumber}
                onChange={(e) => handleChange('added_trackNumber', e)}
              />
              {formErrors.trackNumber && (
                <div className="text-red-600 text-xs">
                  {formErrors.trackNumber}
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-normal">
              <label htmlFor="length" className="text-gray-700 pt-2">
                Length:<sup style={{ color: 'red' }}>*</sup>
              </label>
            </td>
            <td className="py-2 pl-12 border-b text-left">
              <input
                type="text"
                id="length"
                name="length"
                className="text-xs bg-white border rounded-md h-6 w-20 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
                value={state.length}
                onChange={(e) => handleChange('added_length', e)}
              />
              {formErrors.length && (
                <div className="text-red-600 text-xs">{formErrors.length}</div>
              )}
            </td>
          </tr>
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

      <form onSubmit={(e) => handleSubmit(e)}>
        <table className="min-w-fit">
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b font-normal">
                <label htmlFor="artist" className="text-gray-700">
                  Artist name:<sup style={{ color: 'red' }}>*</sup>
                </label>
              </td>
              <td className="py-2 pl-12 border-b text-left">
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
                  <div className="text-red-600 text-xs">
                    {formErrors.artist}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b font-normal">
                <label htmlFor="feat-artists" className="text-gray-700 pt-2">
                  Featuring artists:
                </label>
              </td>
              <td className="py-2 pl-12 border-b text-left">
                <input
                  type="text"
                  id="feat-artists"
                  name="feat-artists"
                  className="text-xs border rounded-md h-6 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
                  value={state.featuringArtists}
                  onChange={(e) => handleChange('added_feat-artists', e)}
                />
              </td>
              {formErrors.featuringArtists && (
                <div className="text-red-600 text-xs">
                  {formErrors.featuringArtists}
                </div>
              )}
            </tr>
            <tr>
              <td className="py-2 px-4 border-b font-normal">
                <label htmlFor="title" className="text-gray-700 pt-2">
                  {capitalizeFirstLetter(selectedCategory)} title:
                  <sup style={{ color: 'red' }}>*</sup>
                </label>
              </td>
              <td className="py-2 pl-12 border-b text-left">
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="text-xs border rounded-md h-6 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
                  value={state.title}
                  onChange={(e) => handleChange('added_title', e)}
                />
                {formErrors.title && (
                  <div className="text-red-600 text-xs">{formErrors.title}</div>
                )}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b font-normal">
                <label htmlFor="rating" className="text-gray-700 pt-2">
                  Rating:
                </label>
              </td>
              <td className="py-2 pl-12 border-b text-left">
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
                  <div className="text-red-600 text-xs">
                    {formErrors.rating}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b font-normal">
                <label htmlFor="tags" className="text-gray-700 pt-2">
                  Tags:
                </label>
              </td>
              <td className="py-2 pl-12 border-b text-left">
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  className="text-xs border rounded-md h-6 pl-1 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
                  value={state.tags}
                  onChange={(e) => handleChange('added_tags', e)}
                />
                {formErrors.tags && (
                  <div className="text-red-600 text-xs">{formErrors.tags}</div>
                )}
              </td>
            </tr>
            {/* Category-specific fields */}
            {renderCategorySpecificFields()}

            {/* Extra information field will always be renderd at last */}
            <tr>
              <td className="py-2 px-4 border-b font-normal">
                <label htmlFor="extraInfo" className="text-gray-700 pt-2">
                  Extra Info:
                </label>
              </td>
              <td>
                <textarea
                  id="extraInfo"
                  name="extraInfo"
                  className="text-xs border rounded-md mb-10 pl-2 focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
                  value={state.extraInfo}
                  onChange={(e) => handleChange('added_extraInfo', e)}
                ></textarea>
                {formErrors.extraInfo && (
                  <div className="text-red-600 text-xs">
                    {formErrors.extraInfo}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sm py-4">
                <sup style={{ color: 'red' }}>*</sup> = Required
              </td>
            </tr>
          </tbody>
        </table>
        {/* Submit button */}
        <button
          type="submit"
          aria-label="Submit form"
          className="bg-[#176061] text-white font-semibold py-2 px-4 rounded hover:bg-[#359996] focus:outline-none focus:ring-2 focus:ring-[#48CFCB]"
          data-testid="submit-button"
        >
          Submit
        </button>
      </form>
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
    </main>
  );
}
export default ItemFormPage;
