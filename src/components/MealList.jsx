import React from 'react';
import MealCard from './MealCard';

const MealList = (props) => {
  const { meals } = props;
  return meals.list.length === 0 ? (
    meals.ingredient && !meals.list.length ? (
      <h4>Sorry, we don't have any meals with {meals.ingredient}.</h4>
    ) : null
  ) : (
    <>
      <h3>Here's some meals with {meals.ingredient}:</h3>
      <div className="flex">
        {meals.list.map((r) => (
          <MealCard meal={r} key={r.id} />
        ))}
      </div>
    </>
  );
};

export default MealList;
