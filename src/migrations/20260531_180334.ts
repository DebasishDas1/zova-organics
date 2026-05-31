import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

async function tableHasColumn(db: any, table: string, column: string) {
  const result = await db.run(sql`PRAGMA table_info(${sql.raw(table)})`)
  return result.rows.some((row: any) => row.name === column)
}

async function addColumnIfMissing(db: any, table: string, column: string, definition: string) {
  if (!(await tableHasColumn(db, table, column))) {
    await db.run(
      sql`ALTER TABLE ${sql.raw(table)} ADD COLUMN ${sql.raw(column)} ${sql.raw(definition)}`,
    )
  }
}

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`users_created_at_idx\` ON \`users\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`media_created_at_idx\` ON \`media\` (\`created_at\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`media_filename_idx\` ON \`media\` (\`filename\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`products_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_tags_order_idx\` ON \`products_tags\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_tags_parent_id_idx\` ON \`products_tags\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`products_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_gallery_order_idx\` ON \`products_gallery\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_gallery_parent_id_idx\` ON \`products_gallery\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_gallery_image_idx\` ON \`products_gallery\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`products_specifications_additional_specs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_specifications_additional_specs_order_idx\` ON \`products_specifications_additional_specs\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_specifications_additional_specs_parent_id_idx\` ON \`products_specifications_additional_specs\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`products_pricing_tiers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`min_qty\` numeric,
  	\`max_qty\` numeric,
  	\`price_per_unit\` numeric,
  	\`unit\` text DEFAULT 'unit',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_pricing_tiers_order_idx\` ON \`products_pricing_tiers\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_pricing_tiers_parent_id_idx\` ON \`products_pricing_tiers\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`products_shipping_shipping_modes\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_shipping_shipping_modes_order_idx\` ON \`products_shipping_shipping_modes\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_shipping_shipping_modes_parent_idx\` ON \`products_shipping_shipping_modes\` (\`parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`products_shipping_documents_provided\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_shipping_documents_provided_order_idx\` ON \`products_shipping_documents_provided\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_shipping_documents_provided_parent_idx\` ON \`products_shipping_documents_provided\` (\`parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`products\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`sku\` text,
  	\`status\` text DEFAULT 'draft',
  	\`featured\` integer DEFAULT false,
  	\`category\` text,
  	\`short_description\` text,
  	\`full_description\` text,
  	\`featured_image_id\` integer,
  	\`specifications_material\` text,
  	\`specifications_gsm\` text,
  	\`specifications_dimensions\` text,
  	\`specifications_colours\` text,
  	\`specifications_finish\` text,
  	\`pricing_currency\` text DEFAULT 'USD',
  	\`pricing_incoterm\` text DEFAULT 'FOB',
  	\`pricing_port\` text DEFAULT 'Mumbai, India',
  	\`ordering_moq\` numeric,
  	\`ordering_moq_unit\` text DEFAULT 'units',
  	\`ordering_lead_time_days\` text,
  	\`ordering_sample_available\` integer DEFAULT true,
  	\`ordering_sample_lead_time\` text,
  	\`customisation_custom_logo_available\` integer DEFAULT true,
  	\`customisation_custom_size_available\` integer DEFAULT false,
  	\`customisation_private_label_available\` integer DEFAULT false,
  	\`customisation_custom_dye_available\` integer DEFAULT false,
  	\`customisation_customisation_notes\` text,
  	\`shipping_hs_code\` text,
  	\`shipping_reach_compliant\` integer DEFAULT true,
  	\`seo_meta_title\` text,
  	\`seo_meta_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  if (!(await tableHasColumn(db, 'products', 'sku'))) {
    await db.run(sql`ALTER TABLE \`products\` ADD COLUMN \`sku\` text;`)
  }
  if (!(await tableHasColumn(db, 'products', 'status'))) {
    await db.run(sql`ALTER TABLE \`products\` ADD COLUMN \`status\` text DEFAULT 'draft';`)
  }
  if (!(await tableHasColumn(db, 'products', 'full_description'))) {
    await db.run(sql`ALTER TABLE \`products\` ADD COLUMN \`full_description\` text;`)
  }
  if (!(await tableHasColumn(db, 'products', 'specifications_material'))) {
    await db.run(sql`ALTER TABLE \`products\` ADD COLUMN \`specifications_material\` text;`)
  }
  if (!(await tableHasColumn(db, 'products', 'specifications_gsm'))) {
    await db.run(sql`ALTER TABLE \`products\` ADD COLUMN \`specifications_gsm\` text;`)
  }
  if (!(await tableHasColumn(db, 'products', 'specifications_dimensions'))) {
    await db.run(sql`ALTER TABLE \`products\` ADD COLUMN \`specifications_dimensions\` text;`)
  }
  if (!(await tableHasColumn(db, 'products', 'specifications_colours'))) {
    await db.run(sql`ALTER TABLE \`products\` ADD COLUMN \`specifications_colours\` text;`)
  }
  if (!(await tableHasColumn(db, 'products', 'specifications_finish'))) {
    await db.run(sql`ALTER TABLE \`products\` ADD COLUMN \`specifications_finish\` text;`)
  }
  if (!(await tableHasColumn(db, 'products', 'pricing_currency'))) {
    await db.run(sql`ALTER TABLE \`products\` ADD COLUMN \`pricing_currency\` text DEFAULT 'USD';`)
  }
  if (!(await tableHasColumn(db, 'products', 'pricing_incoterm'))) {
    await db.run(sql`ALTER TABLE \`products\` ADD COLUMN \`pricing_incoterm\` text DEFAULT 'FOB';`)
  }
  if (!(await tableHasColumn(db, 'products', 'pricing_port'))) {
    await db.run(
      sql`ALTER TABLE \`products\` ADD COLUMN \`pricing_port\` text DEFAULT 'Mumbai, India';`,
    )
  }
  if (!(await tableHasColumn(db, 'products', 'ordering_moq'))) {
    await db.run(sql`ALTER TABLE \`products\` ADD COLUMN \`ordering_moq\` numeric;`)
  }
  if (!(await tableHasColumn(db, 'products', 'ordering_moq_unit'))) {
    await db.run(
      sql`ALTER TABLE \`products\` ADD COLUMN \`ordering_moq_unit\` text DEFAULT 'units';`,
    )
  }
  if (!(await tableHasColumn(db, 'products', 'ordering_lead_time_days'))) {
    await db.run(sql`ALTER TABLE \`products\` ADD COLUMN \`ordering_lead_time_days\` text;`)
  }
  if (!(await tableHasColumn(db, 'products', 'ordering_sample_available'))) {
    await db.run(
      sql`ALTER TABLE \`products\` ADD COLUMN \`ordering_sample_available\` integer DEFAULT true;`,
    )
  }
  if (!(await tableHasColumn(db, 'products', 'ordering_sample_lead_time'))) {
    await db.run(sql`ALTER TABLE \`products\` ADD COLUMN \`ordering_sample_lead_time\` text;`)
  }
  if (!(await tableHasColumn(db, 'products', 'customisation_custom_logo_available'))) {
    await db.run(
      sql`ALTER TABLE \`products\` ADD COLUMN \`customisation_custom_logo_available\` integer DEFAULT true;`,
    )
  }
  if (!(await tableHasColumn(db, 'products', 'customisation_custom_size_available'))) {
    await db.run(
      sql`ALTER TABLE \`products\` ADD COLUMN \`customisation_custom_size_available\` integer DEFAULT false;`,
    )
  }
  if (!(await tableHasColumn(db, 'products', 'customisation_private_label_available'))) {
    await db.run(
      sql`ALTER TABLE \`products\` ADD COLUMN \`customisation_private_label_available\` integer DEFAULT false;`,
    )
  }
  if (!(await tableHasColumn(db, 'products', 'customisation_custom_dye_available'))) {
    await db.run(
      sql`ALTER TABLE \`products\` ADD COLUMN \`customisation_custom_dye_available\` integer DEFAULT false;`,
    )
  }
  if (!(await tableHasColumn(db, 'products', 'customisation_customisation_notes'))) {
    await db.run(
      sql`ALTER TABLE \`products\` ADD COLUMN \`customisation_customisation_notes\` text;`,
    )
  }
  if (!(await tableHasColumn(db, 'products', 'shipping_hs_code'))) {
    await db.run(sql`ALTER TABLE \`products\` ADD COLUMN \`shipping_hs_code\` text;`)
  }
  if (!(await tableHasColumn(db, 'products', 'shipping_reach_compliant'))) {
    await db.run(
      sql`ALTER TABLE \`products\` ADD COLUMN \`shipping_reach_compliant\` integer DEFAULT true;`,
    )
  }
  if (!(await tableHasColumn(db, 'products', 'seo_meta_title'))) {
    await db.run(sql`ALTER TABLE \`products\` ADD COLUMN \`seo_meta_title\` text;`)
  }
  if (!(await tableHasColumn(db, 'products', 'seo_meta_description'))) {
    await db.run(sql`ALTER TABLE \`products\` ADD COLUMN \`seo_meta_description\` text;`)
  }
  if (!(await tableHasColumn(db, 'products', '_status'))) {
    await db.run(sql`ALTER TABLE \`products\` ADD COLUMN \`_status\` text DEFAULT 'draft';`)
  }
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`products_slug_idx\` ON \`products\` (\`slug\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`products_sku_idx\` ON \`products\` (\`sku\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_featured_image_idx\` ON \`products\` (\`featured_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_updated_at_idx\` ON \`products\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_created_at_idx\` ON \`products\` (\`created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products__status_idx\` ON \`products\` (\`_status\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`products_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`certifications_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`certifications_id\`) REFERENCES \`certifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_rels_order_idx\` ON \`products_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_rels_parent_idx\` ON \`products_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_rels_path_idx\` ON \`products_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`products_rels_certifications_id_idx\` ON \`products_rels\` (\`certifications_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_products_v_version_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_tags_order_idx\` ON \`_products_v_version_tags\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_tags_parent_id_idx\` ON \`_products_v_version_tags\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_products_v_version_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_gallery_order_idx\` ON \`_products_v_version_gallery\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_gallery_parent_id_idx\` ON \`_products_v_version_gallery\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_gallery_image_idx\` ON \`_products_v_version_gallery\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_products_v_version_specifications_additional_specs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_specifications_additional_specs_order_idx\` ON \`_products_v_version_specifications_additional_specs\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_specifications_additional_specs_parent_id_idx\` ON \`_products_v_version_specifications_additional_specs\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_products_v_version_pricing_tiers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`min_qty\` numeric,
  	\`max_qty\` numeric,
  	\`price_per_unit\` numeric,
  	\`unit\` text DEFAULT 'unit',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_pricing_tiers_order_idx\` ON \`_products_v_version_pricing_tiers\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_pricing_tiers_parent_id_idx\` ON \`_products_v_version_pricing_tiers\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_products_v_version_shipping_shipping_modes\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_shipping_shipping_modes_order_idx\` ON \`_products_v_version_shipping_shipping_modes\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_shipping_shipping_modes_parent_idx\` ON \`_products_v_version_shipping_shipping_modes\` (\`parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_products_v_version_shipping_documents_provided\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_shipping_documents_provided_order_idx\` ON \`_products_v_version_shipping_documents_provided\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_shipping_documents_provided_parent_idx\` ON \`_products_v_version_shipping_documents_provided\` (\`parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_products_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_sku\` text,
  	\`version_status\` text DEFAULT 'draft',
  	\`version_featured\` integer DEFAULT false,
  	\`version_category\` text,
  	\`version_short_description\` text,
  	\`version_full_description\` text,
  	\`version_featured_image_id\` integer,
  	\`version_specifications_material\` text,
  	\`version_specifications_gsm\` text,
  	\`version_specifications_dimensions\` text,
  	\`version_specifications_colours\` text,
  	\`version_specifications_finish\` text,
  	\`version_pricing_currency\` text DEFAULT 'USD',
  	\`version_pricing_incoterm\` text DEFAULT 'FOB',
  	\`version_pricing_port\` text DEFAULT 'Mumbai, India',
  	\`version_ordering_moq\` numeric,
  	\`version_ordering_moq_unit\` text DEFAULT 'units',
  	\`version_ordering_lead_time_days\` text,
  	\`version_ordering_sample_available\` integer DEFAULT true,
  	\`version_ordering_sample_lead_time\` text,
  	\`version_customisation_custom_logo_available\` integer DEFAULT true,
  	\`version_customisation_custom_size_available\` integer DEFAULT false,
  	\`version_customisation_private_label_available\` integer DEFAULT false,
  	\`version_customisation_custom_dye_available\` integer DEFAULT false,
  	\`version_customisation_customisation_notes\` text,
  	\`version_shipping_hs_code\` text,
  	\`version_shipping_reach_compliant\` integer DEFAULT true,
  	\`version_seo_meta_title\` text,
  	\`version_seo_meta_description\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_parent_idx\` ON \`_products_v\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_version_slug_idx\` ON \`_products_v\` (\`version_slug\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_version_sku_idx\` ON \`_products_v\` (\`version_sku\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_version_featured_image_idx\` ON \`_products_v\` (\`version_featured_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_version_updated_at_idx\` ON \`_products_v\` (\`version_updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_version_created_at_idx\` ON \`_products_v\` (\`version_created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_version__status_idx\` ON \`_products_v\` (\`version__status\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_created_at_idx\` ON \`_products_v\` (\`created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_updated_at_idx\` ON \`_products_v\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_latest_idx\` ON \`_products_v\` (\`latest\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_products_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`certifications_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`certifications_id\`) REFERENCES \`certifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_rels_order_idx\` ON \`_products_v_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_rels_parent_idx\` ON \`_products_v_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_rels_path_idx\` ON \`_products_v_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_products_v_rels_certifications_id_idx\` ON \`_products_v_rels\` (\`certifications_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`leads_category\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`leads_category_order_idx\` ON \`leads_category\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`leads_category_parent_idx\` ON \`leads_category\` (\`parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`leads\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`company\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`phone\` text,
  	\`country\` text,
  	\`website\` text,
  	\`inquiry_type\` text DEFAULT 'rfq' NOT NULL,
  	\`estimated_order_qty\` text,
  	\`target_delivery_date\` text,
  	\`message\` text NOT NULL,
  	\`source\` text DEFAULT 'website',
  	\`utm_source\` text,
  	\`status\` text DEFAULT 'new' NOT NULL,
  	\`priority\` text DEFAULT 'medium',
  	\`assigned_to_id\` integer,
  	\`follow_up_date\` text,
  	\`internal_notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`assigned_to_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await addColumnIfMissing(db, 'leads', 'country', 'text')
  await addColumnIfMissing(db, 'leads', 'website', 'text')
  await addColumnIfMissing(db, 'leads', 'inquiry_type', "text DEFAULT 'rfq' NOT NULL")
  await addColumnIfMissing(db, 'leads', 'estimated_order_qty', 'text')
  await addColumnIfMissing(db, 'leads', 'target_delivery_date', 'text')
  await addColumnIfMissing(db, 'leads', 'source', "text DEFAULT 'website'")
  await addColumnIfMissing(db, 'leads', 'utm_source', 'text')
  await addColumnIfMissing(db, 'leads', 'priority', "text DEFAULT 'medium'")
  await addColumnIfMissing(db, 'leads', 'assigned_to_id', 'integer')
  await addColumnIfMissing(db, 'leads', 'follow_up_date', 'text')
  await addColumnIfMissing(db, 'leads', 'internal_notes', 'text')
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`leads_assigned_to_idx\` ON \`leads\` (\`assigned_to_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`leads_updated_at_idx\` ON \`leads\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`leads_created_at_idx\` ON \`leads\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`leads_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`products_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`leads_rels_order_idx\` ON \`leads_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`leads_rels_parent_idx\` ON \`leads_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`leads_rels_path_idx\` ON \`leads_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`leads_rels_products_id_idx\` ON \`leads_rels\` (\`products_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`certifications\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`short_code\` text NOT NULL,
  	\`issuing_body\` text,
  	\`certificate_number\` text,
  	\`valid_from\` text,
  	\`valid_until\` text,
  	\`certificate_file_id\` integer,
  	\`description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`certificate_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`certifications_certificate_file_idx\` ON \`certifications\` (\`certificate_file_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`certifications_updated_at_idx\` ON \`certifications\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`certifications_created_at_idx\` ON \`certifications\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`posts_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_tags_order_idx\` ON \`posts_tags\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_tags_parent_id_idx\` ON \`posts_tags\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`posts_schema_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_schema_faq_items_order_idx\` ON \`posts_schema_faq_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_schema_faq_items_parent_id_idx\` ON \`posts_schema_faq_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`status\` text DEFAULT 'draft',
  	\`published_at\` text,
  	\`author_id\` integer,
  	\`category\` text,
  	\`excerpt\` text,
  	\`featured_image_id\` integer,
  	\`featured_image_alt\` text,
  	\`content\` text,
  	\`seo_meta_title\` text,
  	\`seo_meta_description\` text,
  	\`seo_canonical_url\` text,
  	\`seo_no_index\` integer DEFAULT false,
  	\`seo_focus_keyword\` text,
  	\`seo_og_image_id\` integer,
  	\`schema_article_type\` text DEFAULT 'Article',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`author_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`posts_author_idx\` ON \`posts\` (\`author_id\`);`)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_featured_image_idx\` ON \`posts\` (\`featured_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_seo_seo_og_image_idx\` ON \`posts\` (\`seo_og_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`products_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_rels_products_id_idx\` ON \`posts_rels\` (\`products_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_rels_posts_id_idx\` ON \`posts_rels\` (\`posts_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_posts_v_version_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_tags_order_idx\` ON \`_posts_v_version_tags\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_tags_parent_id_idx\` ON \`_posts_v_version_tags\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_posts_v_version_schema_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_schema_faq_items_order_idx\` ON \`_posts_v_version_schema_faq_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_schema_faq_items_parent_id_idx\` ON \`_posts_v_version_schema_faq_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_status\` text DEFAULT 'draft',
  	\`version_published_at\` text,
  	\`version_author_id\` integer,
  	\`version_category\` text,
  	\`version_excerpt\` text,
  	\`version_featured_image_id\` integer,
  	\`version_featured_image_alt\` text,
  	\`version_content\` text,
  	\`version_seo_meta_title\` text,
  	\`version_seo_meta_description\` text,
  	\`version_seo_canonical_url\` text,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version_seo_focus_keyword\` text,
  	\`version_seo_og_image_id\` integer,
  	\`version_schema_article_type\` text DEFAULT 'Article',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_author_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_version_author_idx\` ON \`_posts_v\` (\`version_author_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_version_featured_image_idx\` ON \`_posts_v\` (\`version_featured_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_seo_version_seo_og_image_idx\` ON \`_posts_v\` (\`version_seo_og_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_autosave_idx\` ON \`_posts_v\` (\`autosave\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_posts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`products_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_rels_order_idx\` ON \`_posts_v_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_rels_parent_idx\` ON \`_posts_v_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_rels_path_idx\` ON \`_posts_v_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_rels_products_id_idx\` ON \`_posts_v_rels\` (\`products_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_rels_posts_id_idx\` ON \`_posts_v_rels\` (\`posts_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`products_id\` integer,
  	\`leads_id\` integer,
  	\`certifications_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`leads_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`certifications_id\`) REFERENCES \`certifications\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await addColumnIfMissing(db, 'payload_locked_documents_rels', 'certifications_id', 'integer')
  await addColumnIfMissing(db, 'payload_locked_documents_rels', 'posts_id', 'integer')
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_products_id_idx\` ON \`payload_locked_documents_rels\` (\`products_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_leads_id_idx\` ON \`payload_locked_documents_rels\` (\`leads_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_certifications_id_idx\` ON \`payload_locked_documents_rels\` (\`certifications_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`products_tags\`;`)
  await db.run(sql`DROP TABLE \`products_gallery\`;`)
  await db.run(sql`DROP TABLE \`products_specifications_additional_specs\`;`)
  await db.run(sql`DROP TABLE \`products_pricing_tiers\`;`)
  await db.run(sql`DROP TABLE \`products_shipping_shipping_modes\`;`)
  await db.run(sql`DROP TABLE \`products_shipping_documents_provided\`;`)
  await db.run(sql`DROP TABLE \`products\`;`)
  await db.run(sql`DROP TABLE \`products_rels\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_tags\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_gallery\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_specifications_additional_specs\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_pricing_tiers\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_shipping_shipping_modes\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_shipping_documents_provided\`;`)
  await db.run(sql`DROP TABLE \`_products_v\`;`)
  await db.run(sql`DROP TABLE \`_products_v_rels\`;`)
  await db.run(sql`DROP TABLE \`leads_category\`;`)
  await db.run(sql`DROP TABLE \`leads\`;`)
  await db.run(sql`DROP TABLE \`leads_rels\`;`)
  await db.run(sql`DROP TABLE \`certifications\`;`)
  await db.run(sql`DROP TABLE \`posts_tags\`;`)
  await db.run(sql`DROP TABLE \`posts_schema_faq_items\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_version_tags\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_version_schema_faq_items\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
}
