import getSeries from '@/actions/getSeries';
import { NextResponse } from 'next/server';

export const GET = async () => {
    const series = await getSeries();
    return NextResponse.json(series);
}