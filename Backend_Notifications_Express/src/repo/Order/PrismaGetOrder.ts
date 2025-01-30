import { PrismaClient, Order, OrderLine } from '@prisma/client';

const prisma = new PrismaClient();



type OrderWithLines = Order & { orderLines: OrderLine[] };
export default async function prismaGetOrder(orderId: number): Promise<OrderWithLines | null> {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      orderLines: true,
    },
  });

  return order  as OrderWithLines | null;
}