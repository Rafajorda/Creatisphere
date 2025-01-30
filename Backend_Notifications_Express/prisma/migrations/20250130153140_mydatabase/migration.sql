-- AlterTable
ALTER TABLE "Premium" ADD COLUMN     "notify3day" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notifyexpired" BOOLEAN NOT NULL DEFAULT false;
