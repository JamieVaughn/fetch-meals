import React from 'react';

const Ingredients = (props) => {
  const { ingredients, search, action } = props;
  return (
    <>
      <h3>Click on an ingredient to see meals for it:</h3>
      {search.length && ingredients.length ? (
        <h4>
          There are {ingredients.length} results
          {search ? ` that matched "${search}".` : '.'}
        </h4>
      ) : (
        ''
      )}
      <div className="flex ingredients-list">
        {ingredients.map((r) => (
          <button className="clickable" key={r.id} onClick={() => action(r)}>
            {r.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default Ingredients;
