import React from 'react';
import { useGlobalContext } from './context';

const Buttons = () => {
  const { handlePage, page, nbPages, isLoading } = useGlobalContext();
  if (isLoading) {
    return <></>;
  }
  return (
    <div className='btn-container'>
      <button
        id='prev'
        className='prev-btn'
        onClick={(e) => handlePage(e.target.id)}
        disabled={isLoading || page === 0}
      >
        prev
      </button>
      <p>{`${page + 1} of ${nbPages}`}</p>
      <button
        id='next'
        className='next-btn'
        onClick={(e) => handlePage(e.target.id)}
        disabled={isLoading || page === nbPages - 1}
      >
        next
      </button>
    </div>
  );
};

export default Buttons;
