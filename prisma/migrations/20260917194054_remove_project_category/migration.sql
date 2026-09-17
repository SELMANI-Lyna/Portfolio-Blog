-- AlterTable: Remove category column from Project
ALTER TABLE "Project" DROP COLUMN "category";

-- DropEnum
DROP TYPE "ProjectCategory";
