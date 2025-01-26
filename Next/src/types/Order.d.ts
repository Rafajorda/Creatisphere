import { Order, OrderLine } from '@prisma/client';

export interface OrderResponse extends Omit<Order, 'updatedAt'> {
  orderLines: Omit<OrderLine, 'updatedAt'>[]; // Incluimos las líneas de productos en el pedido
}