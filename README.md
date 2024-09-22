# CD Collection Management App

This app allows users to manage their personal CD collection locally. Users can add, edit, and remove albums, CDs, and tracks from their collection, rate each item, and organize their library with tags and categories. The app is designed for offline use, storing data locally on the device.

## Features

### Add, Edit, and Remove Items

Users can add new albums, CDs, and tracks to their collection, edit existing items, or remove items from the library. This includes updating details like artist name, album title, release year, and more.

### Rate Items

Each item in the collection can be rated by the user. Ratings are displayed as a 1 to 5-star system, helping users quickly evaluate their favorite albums, CDs, and tracks.

### Search Functionality

The app includes a search feature, allowing users to search for items by name, title, or release year. This helps users quickly find specific albums, CDs, or tracks in their collection.

### Filter by Various Criteria

Users can filter their collection based on several criteria, such as:

- Artist name
- Tags (e.g., genre, mood)
- Release year
- Rating

This filtering functionality leverages `useMemo` to ensure efficient performance, especially with large collections.

### Overview of Each Category

There are dedicated overview pages for each category, such as albums or artists. Users can sort these overviews alphabetically, by release year, or by track length. This provides a clear and organized view of the collection.

### Add Tags/Categories

Users can assign tags or categories to items in the collection, such as genre, release year, or mood. These tags can be used to filter and sort the collection, allowing for better organization. Hooks like `useMemo` and `useCallback` are used to optimize the performance of filtering and sorting.

### Dark Mode/Theme Switcher

The app includes a theme switcher, allowing users to toggle between light mode and dark mode for a personalized look. This feature is implemented using React context and reducers, ensuring the theme preference is applied consistently across the entire app.

### Offline Storage (localStorage)

The app uses `localStorage` to store the user's collection locally on their device. This ensures that the data persists even without an internet connection, allowing users to manage and view their collection offline.

## Technologies Used

- **React** for the front-end framework.
- **TypeScript** to add type safety and improve development experience.
- **useState, useEffect, useMemo, useCallback** hooks for state management and performance optimization.
- **localStorage** for offline data storage.
- **Context API and Reducers** to manage global states like theme switching.

## Future Enhancements

- **Statistics and Analytics**: Provide users with insights into their collection, such as the most rated artists or total albums.
- **Drag & Drop Functionality**: Allow users to rearrange items in their collection via drag-and-drop interfaces.
- **Fuzzy Search**: Improve the search functionality with fuzzy search for better matching.
