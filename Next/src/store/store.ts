// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Importa tus reducers aquí
import productReducer from './slices/productSlice';
import collectionReducer from './slices/collectionSlice';
import filtersReducer from './slices/filtersSlice';
import seriesReducer from './slices/seriesSlice';
import categoriesReducer from './slices/categoriesSlice';
import priceReducer from './slices/priceSlice';
import typesReducer from './slices/typesSlice';

export const store = configureStore({
    reducer: {
        product: productReducer,
        collection: collectionReducer,
        filters: filtersReducer,
        series: seriesReducer,
        categories: categoriesReducer,
        price: priceReducer,
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
