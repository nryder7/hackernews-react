import React, { useContext, useEffect, useReducer } from 'react';

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';
import reducer from './reducer';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';

const initialState = {
  isLoading: true,
  isError: false,
  search: '',
  hits: [],
  page: 0,
  nbPages: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleForm = (e) => {
    dispatch({ type: HANDLE_SEARCH, payload: { search: e.target.value } });
  };

  const handlePage = (btn) => {
    dispatch({
      type: HANDLE_PAGE,
      payload: {
        change: btn,
      },
    });
  };

  const handleRemove = (id) => {
    dispatch({
      type: REMOVE_STORY,
      payload: {
        objectID: id,
      },
    });
  };

  const fetchStories = async () => {
    dispatch({ type: SET_LOADING });
    try {
      let url = `${API_ENDPOINT}query=${state.search}&page=${state.page}`;
      const resp = await fetch(url);
      const data = await resp.json();

      dispatch({
        type: SET_STORIES,
        payload: { isLoading: false, hits: data.hits, nbPages: data.nbPages },
      });
    } catch (error) {}
  };

  useEffect(() => {
    fetchStories();
  }, [state.search, state.page]);

  return (
    <AppContext.Provider
      value={{ ...state, handleForm, handlePage, handleRemove }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
