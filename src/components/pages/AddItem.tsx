import { useEffect, useReducer, useState } from 'react';
import { type ItemType, type Item } from '../../lib/types/types';
import CategorySelector from '../CategorySelector';
import formDataReducer from '../../reducers/formDataReducer';
import { createNewItemObject } from '../../utils/helperFunctions';
import addNewItem from '../../api/addNewItemAPI';

function AddItemPage() {
  const [selectedCategory, setSelectedCategory] = useState<ItemType>('album');

  // Create a template object for the new item
  const newItem: Item = createNewItemObject();

  // Store data for new item
  const [state, dispatch] = useReducer(formDataReducer, newItem);

  // When user changes item category, clear the form and set 'type'-property value to selected category
  useEffect(() => {
    // Clear form to initial values
    dispatch({
      type: 'cleared_form',
      payload: { inputValue: '' },
    });

    // Set type property
    dispatch({
      type: 'selected_form',
      payload: { inputValue: selectedCategory },
    });
  }, [selectedCategory]);

  // While the user is typing, update the property values of the new object
  function handleChange(
    inputType: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    dispatch({
      type: inputType,
      payload: { inputValue: event.target.value },
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Submitted item:', state);
    addNewItem(selectedCategory, state);
  }

  // Conditionally render category-specific fields based on selected category
  function renderCategorySpecificFields() {
    if (selectedCategory === 'album') {
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
          <input
            type="text"
            id="partOfAlbum"
            name="partOfAlbum"
            value={state.specificFields.cd.partOfAlbum}
            onChange={(e) => handleChange('added_partOfAlbum', e)}
          />
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
          <input
            type="text"
            id="cdTitle"
            name="cdTitle"
            value={state.specificFields.track.cdTitle}
            onChange={(e) => handleChange('added_cdTitle', e)}
          />
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

  return (
    <main className="my-6 pl-6">
      <div className="text-3xl">
        <span>Add new item</span>
      </div>
      {/* Radio buttons to select category */}
      <CategorySelector
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {/* Common fields for all categories */}
      <form
        className="flex flex-col w-full pl-6 max-w-lg space-y-1 text-sm font-medium"
        onSubmit={(e) => handleSubmit(e)}
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
          className="border rounded-md h-7 w-20 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={state.year}
          onChange={(e) => handleChange('added_year', e)}
        />

        <label htmlFor="rating" className="text-gray-700">
          Rating:
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="0"
          max="5"
          className="border rounded-md h-7 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={state.rating}
          onChange={(e) => handleChange('added_rating', e)}
        />

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
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
export default AddItemPage;
