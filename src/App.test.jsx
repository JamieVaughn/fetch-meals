import * as React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { findHits } from './utils/utils';
import Ingredients from './components/Ingredients';
import MealList from './components/MealList';

describe('Unit Test Suite', () => {
  test('findHits function is finding matches between a query string and an array of objects with each with a name field', () => {
    expect(findHits([{ name: 'Coconut Milk' }], 'Coconut')).toStrictEqual([
      { name: 'Coconut Milk' },
    ]);
    expect(findHits([{ name: 'Ginger' }], 'coconut')).toStrictEqual([]);
    expect(
      findHits(
        [{ name: 'Coconut Milk' }, { name: 'Organic Ginger' }],
        'ginger',
      ),
    ).toStrictEqual([{ name: 'Organic Ginger' }]);
  });
});

describe('Component Test Suite', () => {
  test('Title and Subtitle is in the document', () => {
    const { getByText } = render(<App />);
    const TitleElement = getByText(/Daily Harvest/i);
    const SubtitleElement = getByText(/Meal Catalog Search/i);
    expect(TitleElement).toBeInTheDocument();
    expect(SubtitleElement).toBeInTheDocument();
  });

  test('renders App component', () => {
    render(<App />);
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('renders Ingredient List', () => {
    let arr = [
      { id: 1, name: 'Coconut' },
      { id: 2, name: 'Coconut Milk' },
    ];
    let action = (obj) => console.log(obj);
    render(<Ingredients ingredients={arr} action={action} />);
    expect(screen.getByText('Coconut Milk')).toBeInTheDocument();
    expect(screen.getByText('Coconut')).toBeInTheDocument();
  });
  test('renders Meal List', () => {
    let meals = {
      ingredient: 'Cherry',
      list: [
        {
          id: 1,
          name: 'Acai + Cherry',
          collection: 'Smoothie',
          ingredientIds: [],
          image: '',
        },
        {
          id: 2,
          name: 'Carrot + Cherry',
          collection: 'Smoothie',
          ingredientIds: [],
          image: '',
        },
        {
          id: 3,
          name: 'Mango + Cherry',
          collection: 'Smoothie',
          ingredientIds: [],
          image: '',
        },
        {
          id: 4,
          name: 'Cherry + Peach',
          collection: 'Smoothie',
          ingredientIds: [],
          image: '',
        },
        {
          id: 6,
          name: 'Cherry + Cacao',
          collection: 'Smoothie',
          ingredientIds: [],
          image: '',
        },
      ],
    };
    render(<MealList meals={meals} />);
    expect(screen.getByText('Acai + Cherry Smoothie')).toBeInTheDocument();
    expect(screen.getByText('Cherry + Peach Smoothie')).toBeInTheDocument();
    expect(screen.getByText('Carrot + Cherry Smoothie')).toBeInTheDocument();
    expect(screen.getByText('Mango + Cherry Smoothie')).toBeInTheDocument();
    expect(screen.getByText('Cherry + Cacao Smoothie')).toBeInTheDocument();
  });
});
