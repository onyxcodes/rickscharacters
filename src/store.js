import list from './features/pokeapi/list';
import pokemon from './features/pokeapi/pokemon';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    list: list,
    pokemon: pokemon
  },
});