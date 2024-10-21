# CD Collection Management App

This app allows users to manage their personal CD collection locally. Users can add, edit, and remove albums, CDs, and tracks from their collection, rate each item, and organize their library with tags and categories. The app is designed for offline use, storing data locally on the device.

## Features

### Add, Edit, and Remove Items

Users can add new albums, CDs, and tracks to their collection, edit existing items, or remove items from the library. This includes updating details like artist name, album title, release year, and more.

### Rate Items

Each item in the collection can be rated by the user. Ratings are displayed as a 1 to 5-star system, helping users quickly evaluate their favorite albums, CDs, and tracks.

### Search Functionality

The app includes a search feature, allowing users to search for items by name, title, or tag. This helps users quickly find specific albums, CDs, or tracks in their collection.

### Overview of Each Category

There are dedicated overview pages for each category, such as albums or CDs. Users can sort their collection based on several criteria, such as:

- Artist name
- Containing amount of CDs (for albums and CDs)
- Length (for tracks)
- Rating

### Add Tags/Categories

Users can assign tags to items in the collection, such as genre or mood. These tags can be used to search for simlar items.

## Technologies Used

- **React** for the front-end framework.
- **TypeScript** to add type safety and improve development experience.
- **useState, useEffect, useMemo, useCallback** hooks for state management and performance optimization.
- **Context API and Reducers** to manage global states.

## Installation

Follow these steps to run the project locally:

1. Clone the repository:

   ```sh
   git clone https://github.com/RobVerplanke/cd-manager-react.git
   ```

2. Navigate to the project directory:

   ```sh
   cd cd-manager-react
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

5. Open the application in your browser at `http://localhost:<portnr>`.
