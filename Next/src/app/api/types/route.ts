import getTypes from '@/actions/getTypes';
import { NextResponse } from 'next/server';

export const GET = async () => {
    const types = await getTypes();
    return NextResponse.json(types);
}