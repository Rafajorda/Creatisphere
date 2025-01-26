import { Returns, ReturnsLine } from '@prisma/client';

export interface ReturnResponse extends Omit<Returns, 'updatedAt'> {
  returnsLine: Omit<ReturnsLine, 'updatedAt'>[]; // Incluimos los productos relacionados en la devolución
}