// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Importa tus reducers aquí
import counterReducer from './slices/counterSlice';
import productReducer from './slices/productSlice';
import collectionReducer from './slices/collectionSlice';

export const store = configureStore({
    reducer: {
        // Agrega tus slices aquí
        counter: counterReducer,
        product: productReducer,
        collection: collectionReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

// Tipos de RootState y AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks para TypeScript
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
