import { Resend } from 'resend';
import { Order, User as User, Profile, OrderLine } from "@prisma/client";
import { AppError } from '../../utils/AppError';
import PrismaGetUserProfile from '../../repo/User/PrismaGetUserProfile';


// Instancia de Resend con tu API Key
const resend = new Resend(process.env.RESEND_API_KEY as string);

/**
 * Enviar un correo usando Resend
 * @param to - Correo del destinatario
 * @param subject - Asunto del correo
 * @param html - Contenido HTML del correo
 */
export default async function CreateEmailOrder(order: Order & { orderLines: OrderLine[] }): Promise<boolean> {
    try {

    const user = await PrismaGetUserProfile(order.userId);
    if (!user) {
        throw new Error('User not found');
    }

    const orderLinesHtml = order.orderLines.map(line => `
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${line.productPriceId}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${line.quantity}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">$${line.price.toFixed(2)}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">$${(line.quantity * line.price).toFixed(2)}</td>
        </tr>
    `).join('');

    const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h1 style="text-align: center;">Order Confirmation</h1>
            <p>Thank you for your order, ${user.profile?.username ?? 'Valued Customer'}!</p>
            <p>Here are the details of your order:</p>
            
            <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
                <tr style="background-color: #f4f4f4;">
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Product ID</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Quantity</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Price</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Total</th>
                </tr>
                ${orderLinesHtml}
            </table>
            
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
            <p><strong>Status:</strong> ${order.status}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>

            <p style="text-align: center; margin-top: 20px;">Thank you for shopping with us!</p>
        </div>
    `;
        console.log(order);
        const response = await resend.emails.send({
            from: 'onboarding@resend.dev', 
            // to: user.email, 
            to: process.env.EMAIL ?? 'default@example.com',
            subject: "Order Confirmation",
            html: html
        });
        
        console.log('Correo enviado:', response);
        return true;
    } catch (error) {
        console.error('Error enviando correo:', error);
        return false;
    }
}