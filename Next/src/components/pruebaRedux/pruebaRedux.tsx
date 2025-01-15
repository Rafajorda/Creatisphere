'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { increment, decrement } from '@/store/slices/counterSlice';

export default function PruebaRedux() {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    );
}
