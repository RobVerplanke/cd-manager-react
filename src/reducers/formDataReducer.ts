import { Item, ItemType } from '../lib/types/types';
import { createNewItemObject } from '../utils/helperFunctions';

const newItem: Item = createNewItemObject();

// Reducer function for adding items to the library
export default function formDataReducer(
  state: Item,
  action: {
    type: string;
    payload: { inputValue: string | number; item?: Item };
  }
): Item {
  // Type guard for narrowing the item type
  function isNumber(item: number | string): item is number {
    return typeof (item as number) === 'number';
  }

  switch (action.type) {
    case 'filled_form': // Edit: Replace current item with new item
      return { ...state, ...action.payload.item };
    case 'cleared_form': // Clear: Replace all values with empty values
      return { ...state, ...newItem };
    case 'selected_form':
      return { ...state, type: action.payload.inputValue as ItemType };
    case 'added_title':
      return { ...state, title: action.payload.inputValue as string };
    case 'added_artist':
      return { ...state, artist: action.payload.inputValue as string };
    case 'added_feat-artists':
      let featArtistsArray = new Array();
      {
        !isNumber(action.payload.inputValue) &&
          (featArtistsArray = action.payload.inputValue.split(','));
      }
      return {
        ...state,
        featuringArtists: featArtistsArray,
      };
    case 'added_year':
      return { ...state, year: action.payload.inputValue as number };
    case 'added_rating':
      return { ...state, rating: action.payload.inputValue as number };
    case 'added_tags':
      let tagsArray = new Array();
      {
        !isNumber(action.payload.inputValue) &&
          (tagsArray = action.payload.inputValue.split(','));
      }
      return {
        ...state,
        tags: tagsArray,
      };
    case 'added_extraInfo':
      return { ...state, extraInfo: action.payload.inputValue as string };
    case 'added_album-thumbnail':
      return {
        ...state,
        specificFields: {
          ...state.specificFields,
          album: {
            ...state.specificFields.album,
            cover: {
              ...state.specificFields.album.cover,
              thumbnail: action.payload.inputValue as string,
            },
          },
        },
      };
    case 'added_album-fullSize':
      return {
        ...state,
        specificFields: {
          ...state.specificFields,
          album: {
            ...state.specificFields.album,
            cover: {
              ...state.specificFields.album.cover,
              fullSize: action.payload.inputValue as string,
            },
          },
        },
      };
    case 'added_album-cdCount':
      return {
        ...state,
        specificFields: {
          ...state.specificFields,
          album: {
            ...state.specificFields.album,
            cdCount: action.payload.inputValue as number,
          },
        },
      };
    case 'added_cd-cdCount':
      return {
        ...state,
        specificFields: {
          ...state.specificFields,
          cd: {
            ...state.specificFields.cd,
            cdCount: action.payload.inputValue as number,
          },
        },
      };
    case 'added_cd-thumbnail':
      return {
        ...state,
        specificFields: {
          ...state.specificFields,
          cd: {
            ...state.specificFields.cd,
            cover: {
              ...state.specificFields.cd.cover,
              thumbnail: action.payload.inputValue as string,
            },
          },
        },
      };
    case 'added_cd-fullSize':
      return {
        ...state,
        specificFields: {
          ...state.specificFields,
          cd: {
            ...state.specificFields.cd,
            cover: {
              ...state.specificFields.cd.cover,
              fullSize: action.payload.inputValue as string,
            },
          },
        },
      };
    case 'added_tracksCount':
      return {
        ...state,
        specificFields: {
          ...state.specificFields,
          cd: {
            ...state.specificFields.cd,
            trackCount: action.payload.inputValue as number,
          },
        },
      };
    case 'added_partOfAlbum':
      return {
        ...state,
        specificFields: {
          ...state.specificFields,
          cd: {
            ...state.specificFields.cd,
            partOfAlbum: action.payload.inputValue as string,
          },
        },
      };
    case 'added_cdTitle':
      return {
        ...state,
        specificFields: {
          ...state.specificFields,
          track: {
            ...state.specificFields.track,
            cdTitle: action.payload.inputValue as string,
          },
        },
      };
    case 'added_length':
      return {
        ...state,
        specificFields: {
          ...state.specificFields,
          track: {
            ...state.specificFields.track,
            length: action.payload.inputValue as string,
          },
        },
      };

    default:
      return state;
  }
}
