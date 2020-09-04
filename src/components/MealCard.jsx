import React from 'react';

const MealCard = (props) => {
  const { meal } = props;

  const finishLoading = (e, url) => {
    e.target.src = url;
  };

  return (
    <div key={meal.id} className="recipe-card">
      <img
        height="200"
        width="200"
        onLoad={(e) => finishLoading(e, meal.image.url)}
        src="food-1.1s-47px.svg"
        alt={meal.name + ' meal pack'}
      />
      <div className="caption">{meal.name + ' ' + meal.collection}</div>
    </div>
  );
};

export default MealCard;
