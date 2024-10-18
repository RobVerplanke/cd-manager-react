import { type Item, type ItemType } from '../lib/types/types';
import {
  createNewItemObject,
  defaultAlbum,
  defaultCd,
  defaultTrack,
  isAlbum,
  isCd,
  isItemType,
  isNumber,
  isTrack,
} from '../utils/helperFunctions';

// Reducer function for adding items to the library
export default function formDataReducer(
  state: Item,
  action: {
    type: string;
    payload: { inputValue: string | number; item?: Item };
  }
): Item {
  const newItem: Item = createNewItemObject(state.type as ItemType);

  switch (action.type) {
    case 'filled_form': // Edit: Replace current item with new item
      return { ...state, ...action.payload.item };
    case 'cleared_form': // Clear: Replace all values with empty values
      return { ...state, ...newItem };
    case 'selected_form': // Return the correct default object based on the selected type
      return isItemType(action.payload.inputValue)
        ? createNewItemObject(action.payload.inputValue)
        : (console.error('Invalid item type selected.'), state);
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
    case 'added_album-year':
      if (isAlbum(state))
        return { ...state, albumYear: action.payload.inputValue as number };
    case 'added_cd-year':
      if (isCd(state))
        return { ...state, cdYear: action.payload.inputValue as number };
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
      // Check if the current state is an Album or Cd, as only these types have the 'cover' property
      if (isAlbum(state)) {
        return {
          ...state,
          cover: {
            ...state.cover,
            albumThumbnail: action.payload.inputValue as string,
          },
        };
      } else {
        return state;
      }
    case 'added_album-fullSize':
      if (isAlbum(state)) {
        return {
          ...state,
          cover: {
            ...state.cover,
            albumFullSize: action.payload.inputValue as string,
          },
        };
      } else {
        return state;
      }
    case 'added_album-cdCount':
      if (isAlbum(state)) {
        return {
          ...state,
          cdsInAlbum: action.payload.inputValue as number,
        };
      } else {
        return state;
      }
    case 'added_cd-cdCount':
      if (isCd(state)) {
        return {
          ...state,
          cdCount: action.payload.inputValue as number,
        };
      } else {
        return state;
      }
    case 'added_cd-thumbnail':
      if (isCd(state)) {
        return {
          ...state,
          cover: {
            ...state.cover,
            cdThumbnail: action.payload.inputValue as string,
          },
        };
      } else {
        return state;
      }
    case 'added_cd-fullSize':
      if (isCd(state)) {
        return {
          ...state,
          cover: {
            ...state.cover,
            cdFullSize: action.payload.inputValue as string,
          },
        };
      } else {
        return state;
      }
    case 'added_cd-trackCount':
      if (isCd(state)) {
        return {
          ...state,
          trackCount: action.payload.inputValue as number,
        };
      } else {
        return state;
      }
    case 'added_partOfAlbum':
      if (isCd(state)) {
        return {
          ...state,
          partOfAlbum: action.payload.inputValue as string,
        };
      } else {
        return state;
      }
    case 'added_cdTitle':
      if (isTrack(state)) {
        return {
          ...state,
          cdTitle: action.payload.inputValue as string,
        };
      } else {
        return state;
      }
    case 'added_trackNumber':
      if (isTrack(state)) {
        return {
          ...state,
          trackNumber: action.payload.inputValue as number,
        };
      } else {
        return state;
      }
    case 'added_length':
      if (isTrack(state)) {
        return {
          ...state,
          length: action.payload.inputValue as string,
        };
      } else {
        return state;
      }

    default:
      return state;
  }
}
