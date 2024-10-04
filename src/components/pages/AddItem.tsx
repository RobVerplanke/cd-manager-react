import { useState } from 'react';
import { Album, Cd, Track, ItemType } from '../../lib/types/types';
import CategorySelector from '../CategorySelector';

function AddItemPage() {
  const [selectedCategory, setSelectedCategory] = useState<ItemType>('album');

  // Form state to store item data

  // Conditionally render category-specific fields based on selected category
  function renderCategorySpecificFields() {
    if (selectedCategory === 'album') {
      return (
        <>
          <label htmlFor="cdCount">Amount of CDs:</label>
          <input type="number" id="cdCount" name="cdCount" className="w-20" />
          <label htmlFor="thumbnail">Thumbnail cover:</label>
          <input type="text" id="thumbnail" name="thumbnail" />
          <label htmlFor="fullSize">Full Size cover:</label>
          <input type="text" id="fullSize" name="fullSize" />
        </>
      );
    } else if (selectedCategory === 'cd') {
      return (
        <>
          <label htmlFor="cdCount">Amount of CDs:</label>
          <input type="number" id="cdCount" name="cdCount" className="w-20" />
          <label htmlFor="trackCount">Amount of tracks:</label>
          <input
            type="number"
            id="trackCount"
            name="trackCount"
            className="w-20"
          />
          <label htmlFor="partOfAlbum">Part of Album:</label>
          <input type="text" id="partOfAlbum" name="partOfAlbum" />
          <label htmlFor="thumbnail">Thumbnail cover:</label>
          <input type="text" id="thumbnail" name="thumbnail" />
          <label htmlFor="fullSize">Full Size cover:</label>
          <input type="text" id="fullSize" name="fullSize" />
        </>
      );
    } else if (selectedCategory === 'track') {
      return (
        <>
          <label htmlFor="cdTitle">CD Title:</label>
          <input type="text" id="cdTitle" name="cdTitle" />
          <label htmlFor="length">Track Length:</label>
          <input type="text" id="length" name="length" />
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
      <form className="flex flex-col w-full pl-6 max-w-lg space-y-1 text-sm font-medium">
        <label htmlFor="artist" className="text-gray-700">
          Artist name:
        </label>
        <input
          type="text"
          id="artist"
          name="artist"
          className="border rounded-md h-7 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="title" className="text-gray-700">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="border rounded-md h-7 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="year" className="text-gray-700">
          Release year:
        </label>
        <input
          type="number"
          id="year"
          name="year"
          className="border rounded-md h-7 w-20 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        />

        <label htmlFor="tags" className="text-gray-700">
          Tags:
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          className="border rounded-md h-7 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
