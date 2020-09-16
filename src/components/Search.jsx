import React, { useState, useEffect } from 'react';
import MealList from './MealList';
import Error from './Error';
import Loading from './Loading';
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
  const [resource, setResource] = useState([]);

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

  useEffect(() => {
    setError(false);
    if (ingredients.length === 0) {
      fetch(ingredientURL)
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log('d', data);
          setResource(data);
          let hits = findHits(data, search);
          setIngredients(hits);
          if (hits.length === 0) setError('No Matches');
        })
        .catch((err) => {
          console.log(err, error);
          setError(err);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const findID = async () => {
    setError(false);
    setIngredients([]);
    if (resource.length && search.length > 0) {
      let hits = findHits(resource, search);
      setIngredients(hits);
      if (hits.length === 0) setError('No Matches');
      setLoading(false);
    } else {
    }
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
      <section className="results">
        {error.message || error === 'No Matches' ? <Error error={error} /> : ''}
        {loading ? <Loading /> : ''}
        {ingredients.length === 0 ? (
          <div>Start typing an ingredient you like!</div>
        ) : (
          ''
        )}
        <Ingredients
          search={search}
          ingredients={ingredients}
          action={handleClick}
        />
        <MealList meals={meals} />
      </section>
    </div>
  );
}
