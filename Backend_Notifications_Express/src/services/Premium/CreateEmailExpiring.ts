import { Resend } from 'resend';
import {User as User, Profile } from "@prisma/client";

const resend = new Resend(process.env.RESEND_API_KEY as string);

/**
 * Enviar un correo usando Resend
 * @param to - Correo del destinatario
 * @param subject - Asunto del correo
 * @param html - Contenido HTML del correo
 */

export default async function CreateEmailExpiring(user: User & { profile: Profile }): Promise<boolean> {
    try {
        const html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h1 style="text-align: center;">Premium Subscription Expiring</h1>
                <p>Hi ${user.profile?.username ?? 'Valued Customer'},</p>
                <p>Your Premium subscription will end in 3 days. Renew now to continue enjoying our premium features!</p>
                <p style="text-align: center; margin-top: 20px;">Thank you for choosing us!</p>
            </div>
        `;

        const response = await resend.emails.send({
             from: 'onboarding@resend.dev', 
            // to: user.email, 
            to: process.env.EMAIL ?? 'default@example.com',
            subject: "Premium Subscription Expiring",
            html: html
        });
        
        console.log('Correo enviado:', response);
        return true;
    } catch (error) {
        console.error('Error enviando correo:', error);
        return false;
    }
}