import React from 'react';
import { useGlobalContext } from './context';

const SearchForm = () => {
  const { handleForm, search } = useGlobalContext();
  return (
    <section className='search-form'>
      <h3>search hacker news</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          className='form-input'
          type='text'
          value={search}
          onChange={(e) => {
            handleForm(e);
          }}
        />
      </form>
    </section>
  );
};

export default SearchForm;
