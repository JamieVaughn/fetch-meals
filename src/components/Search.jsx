import React, { useState, useEffect, useRef } from 'react';
import MealList from './MealList';
import { findHits, useDebounce } from '../utils/utils';
import '../index.css';

export default function Search() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [meals, setMeals] = useState({ ingredient: '', list: [] });

  const recipeURL =
    'https://raw.githubusercontent.com/daily-harvest/opportunities/master/web-1/data/products.json';
  const ingredientURL =
    'https://raw.githubusercontent.com/daily-harvest/opportunities/master/web-1/data/ingredients.json';

  const [search, setSearch] = useState('');
  const [preflight, setPreflight] = useState('');

  const debouncedSave = useDebounce((nextValue) => {
    setLoading(true);
    console.log('debounce', nextValue);
    return setPreflight(nextValue);
  }, 1000);

  const handleChange = (event) => {
    const { value: nextValue } = event.target;
    setSearch(nextValue);
    debouncedSave(nextValue);
  };

  useEffect(() => {
    if (search.length) {
      fetch(ingredientURL)
        .then((r) => r.json())
        .then((data) => {
          console.log('i', findHits(data, preflight));
          setIngredients(findHits(data, preflight));
          if (ingredients.length === 0) setError('No Matches');
        })
        .then(() => {
          fetch(recipeURL)
            .then((r) => r.json())
            .then((data) => {
              console.log('d', data);
              const filtered = data.filter((d) => {
                let test = false;
                console.log('i', ingredients);
                ingredients.forEach((i) => {
                  console.log(i);
                  test = d.ingredientIds.some((mid) => mid === i.id);
                });
                console.log('d', d.ingredientIds);
                return test;
              });
              console.log('m', preflight, filtered);
              setMeals({ ingredient: preflight, list: filtered });
            })
            .catch((err) => setError(err))
            .finally(() => {
              setLoading(false);
            });
        });
    }
  }, [preflight]);

  if (loading) return <div className="loader">Loading results...</div>;

  return (
    <div className="Search">
      <form>
        <label>
          Search Our Meal Catalog by ingredient:
          <br />
          <br />
          <input value={search} onChange={handleChange} />
        </label>
      </form>
      {typeof error === 'object' ? (
        <div className="error">
          There was a problem fetching the data: <br />
          {error.message}
        </div>
      ) : (
        <section className="results">
          {search.length === 0 ? (
            <div>
              <br />
              {error === 'No Matches' && search.length > 0
                ? "Sorry, that didn't match anything."
                : 'Start typing an ingredient you like!'}
            </div>
          ) : (
            ''
          )}
          <MealList meals={meals} />
        </section>
      )}
    </div>
  );
}
