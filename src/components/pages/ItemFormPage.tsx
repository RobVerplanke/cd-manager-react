import { useEffect, useReducer, useState } from 'react';
import { type Item, type ItemType } from '../../lib/types/types';
import formDataReducer from '../../reducers/formDataReducer';
import getItemById from '../../api/getItemById';
import EditItem from '../../api/editItemAPI';
import addNewItem from '../../api/addNewItemAPI';
import { createNewItemObject } from '../../utils/helperFunctions';
import { RATING_VALUES } from '../../lib/constants';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import CategorySelector from '../CategorySelector';

// Depending on the argument value, form elements are rendered dynamicly
function ItemFormPage({ isEditMode }: { isEditMode: boolean }) {
  const { allAlbums, allCds, setIsItemMutated } = useData();
  const { id } = useParams<{ id: string }>();

  // Create an empty template object for a new item
  const newItem: Item = createNewItemObject();

  // State for the current item
  const [item, setItem] = useState<Item>(newItem);

  // Selected category (only for add mode)
  const [selectedCategory, setSelectedCategory] = useState<ItemType>('album');

  // Use reducer to manage form data
  const [state, dispatch] = useReducer(formDataReducer, item);

  // If in edit mode, fetch the item data by ID
  useEffect(() => {
    if (isEditMode && id) {
      const fetchData = async () => {
        const data = await getItemById(id);
        if (data) {
          setItem(data);
        } else {
          console.error('Item not found');
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
    dispatch({
      type: inputType,
      payload: { inputValue: event.target.value },
    });
  }

  // Handle form submission for both add and edit
  function handleSubmit() {
    console.log('handle submit called');

    // event.preventDefault();
    if (isEditMode) {
      EditItem(item.type, state);
      setIsItemMutated(true);
    } else {
      addNewItem(selectedCategory, state);
      setIsItemMutated(true);
    }
    alert(`${state.type} is ${isEditMode ? `edited` : `added!`}`);
  }

  // Render category-specific fields
  function renderCategorySpecificFields() {
    const currentType = isEditMode ? item.type : selectedCategory;

    // Render the corresponding form elements
    if (currentType === 'album') {
      return (
        <>
          <label htmlFor="cdCount">Amount of CDs:</label>
          <input
            type="number"
            id="cdCount"
            name="cdCount"
            className="w-20"
            value={state.specificFields.album.cdCount}
            onChange={(e) => handleChange('added_album-cdCount', e)}
          />
          <label htmlFor="thumbnail">Thumbnail cover:</label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value={state.specificFields.album.cover.thumbnail}
            onChange={(e) => handleChange('added_album-thumbnail', e)}
          />
          <label htmlFor="fullSize">Full Size cover:</label>
          <input
            type="text"
            id="fullSize"
            name="fullSize"
            value={state.specificFields.album.cover.fullSize}
            onChange={(e) => handleChange('added_album-fullSize', e)}
          />
        </>
      );
    } else if (selectedCategory === 'cd') {
      return (
        <>
          <label htmlFor="cdCount">Amount of CDs:</label>
          <input
            type="number"
            id="cdCount"
            name="cdCount"
            className="w-20"
            value={state.specificFields.cd.cdCount}
            onChange={(e) => handleChange('added_cd-cdCount', e)}
          />
          <label htmlFor="trackCount">Amount of tracks:</label>
          <input
            type="number"
            id="trackCount"
            name="trackCount"
            className="w-20"
            value={state.specificFields.cd.trackCount}
            onChange={(e) => handleChange('added_tracksCount', e)}
          />
          <label htmlFor="partOfAlbum">Part of Album:</label>
          {/* Generate an title selection in case the current CD is part of an ablum */}
          <select
            id="partOfAlbum"
            name="partOfAlbum"
            value={state.specificFields.cd.partOfAlbum}
            onChange={(e) => handleChange('added_partOfAlbum', e)}
          >
            <option>--- None ---</option>
            {allAlbums.map((album) => (
              <option key={album.id}>{album.title}</option>
            ))}
          </select>
          <label htmlFor="thumbnail">Thumbnail cover:</label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value={state.specificFields.cd.cover.thumbnail}
            onChange={(e) => handleChange('added_cd-thumbnail', e)}
          />
          <label htmlFor="fullSize">Full Size cover:</label>
          <input
            type="text"
            id="fullSize"
            name="fullSize"
            value={state.specificFields.cd.cover.fullSize}
            onChange={(e) => handleChange('added_album-fullSize', e)}
          />
        </>
      );
    } else if (selectedCategory === 'track') {
      return (
        <>
          <label htmlFor="cdTitle">CD Title:</label>
          <select
            id="cdTitle"
            name="cdTitle"
            value={state.specificFields.track.cdTitle}
            onChange={(e) => handleChange('added_cdTitle', e)}
          >
            <option>--- None ---</option>
            {allCds.map((cd) => (
              <option key={cd.id}>{cd.title}</option>
            ))}
          </select>
          <label htmlFor="length">Track Length:</label>
          <input
            type="text"
            id="length"
            name="length"
            value={state.specificFields.track.length}
            onChange={(e) => handleChange('added_length', e)}
          />
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
        // onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="artist" className="text-gray-700">
          Artist name:
        </label>
        <input
          type="text"
          id="artist"
          name="artist"
          className="border rounded-md h-7 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={state.artist}
          onChange={(e) => handleChange('added_artist', e)}
        />
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

        <label htmlFor="year" className="text-gray-700">
          Release year:
        </label>
        <input
          type="number"
          id="year"
          name="year"
          className="border rounded-md h-7 w-20 pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={state.year}
          onChange={(e) => handleChange('added_year', e)}
        />

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

        {/* Submit button */}
        <Link
          to="/"
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </Link>
      </form>
    </main>
  );
}
export default ItemFormPage;
