import { NextRequest, NextResponse } from 'next/server';
// import { ApiResponse } from '../exceptions';
import {prisma} from '@/lib/prisma';
interface IParams {
    id: string;
}

export const PUT = async (req: NextRequest, { params }: { params: IParams } ) => {
    
    try{
        const { id } = params;
        console.log(id);
    

        const notification = await prisma.notification.update({
            where: {
                id: Number(id)
            },
            data: {
                isRead: true
            }
        });
    } catch (error) {   

        console.error('Error al actualizar la notificación:', error);
        return NextResponse.json(
            { success: false, message: 'Error al marcar la notificación como leída' },
            { status: 500 }
        )

    }


return NextResponse.json({ success: true, message: "Notificación marcada como leída" });
}