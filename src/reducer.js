import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };

    case HANDLE_SEARCH: {
      return { ...state, search: action.payload.search, page: 0 };
    }
    case HANDLE_PAGE: {
      return { ...state, page: action.payload.page };
    }
    case SET_STORIES:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };
    case REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter((hit) => {
          return hit.objectID !== action.payload.objectID;
        }),
      };

    default:
      throw new Error(`No matching action type '${action.type}'`);
  }
};
export default reducer;
