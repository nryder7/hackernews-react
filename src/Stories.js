import React from 'react';

import { useGlobalContext } from './context';

const Stories = () => {
  const { isLoading, hits, handleRemove } = useGlobalContext();
  if (isLoading) {
    return <div className='loading'></div>;
  }
  return (
    <section className='stories'>
      {hits
        .filter((hit) => hit.title !== null)
        .map((hit) => {
          const { author, num_comments, objectID, points, title, url } = hit;
          return (
            <article key={objectID} className='story'>
              <h4 className='title'>{title}</h4>
              <div className='info'>
                <p>by {author}</p>
                <span>
                  {num_comments} comments | {points} points
                </span>
              </div>
              <a
                href={url || 'no url'}
                target='_blank'
                rel='noopener noreferrer'
                className='read-link'
              >
                read
              </a>
              <button
                className='remove-btn'
                onClick={() => {
                  handleRemove(objectID);
                }}
              >
                remove
              </button>
            </article>
          );
        })}
    </section>
  );
};

export default Stories;
