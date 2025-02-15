import { PrismaClient, Order, OrderLine } from '@prisma/client';
import { OrderLineItem } from '../../interfaces/OrderLine';

const prisma = new PrismaClient();



type OrderWithLines = Order & { orderLines: OrderLineItem[] };
export default async function prismaGetOrder(orderId: number): Promise<OrderWithLines | null> {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      orderLines: {
        include: {
          productprice: {
            include: {
              product: true,
              type: true,
            },
          }
        }
      },
    },
  });

  return order as OrderWithLines | null;
}