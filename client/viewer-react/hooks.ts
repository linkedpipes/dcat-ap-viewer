import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';
import type {TypedUseSelectorHook} from 'react-redux';
import type {RootState, AppDispatch} from './core/store-factory';

// Use throughout your app instead of plain `useDispatch` and `useSelector`.
// We need this as the rect-redux Hooks does not work with thunk.
export const useDispatch: () => AppDispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
