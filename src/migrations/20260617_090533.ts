import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_stock_status" AS ENUM('draft', 'active', 'out-of-stock', 'discontinued');
  CREATE TYPE "public"."enum__products_v_version_stock_status" AS ENUM('draft', 'active', 'out-of-stock', 'discontinued');
  ALTER TABLE "products" ADD COLUMN "stock_status" "enum_products_stock_status" DEFAULT 'draft';
  ALTER TABLE "_products_v" ADD COLUMN "version_stock_status" "enum__products_v_version_stock_status" DEFAULT 'draft';
  ALTER TABLE "products" DROP COLUMN "status";
  ALTER TABLE "_products_v" DROP COLUMN "version_status";`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" ADD COLUMN "status" "enum_products_status" DEFAULT 'draft';
  ALTER TABLE "_products_v" ADD COLUMN "version_status" "enum__products_v_version_status" DEFAULT 'draft';
  ALTER TABLE "products" DROP COLUMN "stock_status";
  ALTER TABLE "_products_v" DROP COLUMN "version_stock_status";
  DROP TYPE "public"."enum_products_stock_status";
  DROP TYPE "public"."enum__products_v_version_stock_status";`)
}
