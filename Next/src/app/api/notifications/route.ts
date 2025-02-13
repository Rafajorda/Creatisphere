import { getNotifications } from '@/actions/getNotifications';
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '../exceptions';
import {prisma} from '@/lib/prisma';


export const GET = async () => {
    const notifications = await getNotifications();
    return NextResponse.json(notifications);
}

