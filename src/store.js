import list from './features/rickandmortyapi/list';
import character from './features/rickandmortyapi/character';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    list: list,
    character: character
  },
});