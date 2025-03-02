// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Importa tus reducers aquí
import productReducer from './slices/productSlice';
import filtersReducer from './slices/filtersSlice';
import categoriesReducer from './slices/categoriesSlice';
import priceReducer from './slices/priceSlice';
import favoriteReducer from './slices/favoriteSlice';
import currentUserReducer from './slices/currentUserSlice';
import cartReducer from './slices/cartSlice';
import typesReducer from './slices/typesSlice';

export const store = configureStore({
    reducer: {
        product: productReducer,
        filters: filtersReducer,
        categories: categoriesReducer,
        price: priceReducer,
        favorite: favoriteReducer,
        auth: currentUserReducer,
        cart: cartReducer,
        types: typesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

// Tipos de RootState y AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks para TypeScript
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
