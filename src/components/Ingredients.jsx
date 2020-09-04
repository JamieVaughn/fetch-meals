import React from 'react';

const Ingredients = (props) => {
  return (
    <>
      <h3>Your search matched these ingredient(s).</h3>
      <h4>Click on one to see meals for it:</h4>
      <div className="flex ingredients-list">
        {props.ingredients?.map((r) => (
          <div className="clickable" key={r.id} onClick={() => props.action(r)}>
            {r.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default Ingredients;
