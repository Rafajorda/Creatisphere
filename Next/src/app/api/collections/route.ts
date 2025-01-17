import getCollections from '@/actions/getCollections';
import { NextResponse } from 'next/server';

export const GET = async () => {
    const collections = await getCollections();
    return NextResponse.json(collections);
}