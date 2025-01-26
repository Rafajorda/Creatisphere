import { Notification } from '@prisma/client';

export interface NotificationResponse {
  notifications: Omit<Notification, 'updatedAt'>[]; // Eliminamos el timestamp redundante
}