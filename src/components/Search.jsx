import React, { useState, useEffect } from 'react';
import MealList from './MealList';
import { findHits } from '../utils/utils';
import '../index.css';
import Ingredients from './Ingredients';

export default function Search() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [meals, setMeals] = useState({ ingredient: '', list: [] });

  const recipeURL =
    'https://raw.githubusercontent.com/daily-harvest/opportunities/master/web-1/data/products.json';
  const ingredientURL =
    'https://raw.githubusercontent.com/daily-harvest/opportunities/master/web-1/data/ingredients.json';
  useEffect(() => {
    setIngredients([]);
    setSearch('');
    setError(false);
    fetch(recipeURL)
      .then((response) => response.json())
      .then((data) => {
        const filtered = data.filter((d) => {
          return d.ingredientIds.includes(selected.id);
        });
        setMeals({ ingredient: selected.name, list: filtered });
      })
      .catch((err) => setError(err))
      .finally(() => {
        setLoading(false);
      });
  }, [selected]);

  const findID = async () => {
    fetch(ingredientURL)
      .then((res) => res.json())
      .then((data) => {
        setIngredients(findHits(data, search));
        if (ingredients.length === 0) setError('No Matches');
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };
  const handleClick = (obj) => {
    setSelected(obj);
  };
  const handleInput = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setMeals({ ingredient: '', list: [] });
    findID();
  };

  return (
    <div className="Search">
      <form>
        <label>
          Search Our Meal Catalog by ingredient:
          <br />
          <br />
          <input value={search} onChange={handleInput} />
        </label>
        <button onClick={handleSubmit} disabled={!search.length}>
          Search
        </button>
      </form>
      {typeof error === 'object' ? (
        <div className="error">
          There was a problem fetching the data: <br />
          {error.message}
        </div>
      ) : loading ? (
        <div className="loader">Loading results...</div>
      ) : (
        <section className="results">
          {ingredients.length === 0 ? (
            <div>
              <br />
              {error === 'No Matches'
                ? "Sorry, that didn't match anything."
                : 'Start typing an ingredient you like!'}
            </div>
          ) : (
            <Ingredients ingredients={ingredients} action={handleClick} />
          )}
          <MealList meals={meals} />
        </section>
      )}
    </div>
  );
}
