import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './features/auth/authSlice';
import blogReducer from './features/blog/blogSlice';
import categoryReducer from './features/category/categorySlice';
import tagReducer from './features/tag/tagSlice';
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/search/searchSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    category: categoryReducer,
    tag: tagReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;