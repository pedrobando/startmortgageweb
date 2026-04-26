import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_pages_blocks_marquee_mode" AS ENUM('auto', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_why_broker_points_icon_key" AS ENUM('scale', 'wallet', 'clock', 'users', 'search', 'shield-check', 'badge-check', 'sparkles', 'handshake', 'chart', 'headphones', 'globe');
  CREATE TYPE "public"."enum_pages_blocks_audience_grid_audiences_icon_key" AS ENUM('home', 'users', 'briefcase', 'heart', 'globe', 'flag', 'wallet', 'sparkles');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_mode" AS ENUM('auto', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_blog_teasers_mode" AS ENUM('auto', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_faq_list_mode" AS ENUM('auto', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_max_width" AS ENUM('narrow', 'default', 'wide', 'full');
  CREATE TYPE "public"."enum_pages_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_mode" AS ENUM('auto', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_why_broker_points_icon_key" AS ENUM('scale', 'wallet', 'clock', 'users', 'search', 'shield-check', 'badge-check', 'sparkles', 'handshake', 'chart', 'headphones', 'globe');
  CREATE TYPE "public"."enum__pages_v_blocks_audience_grid_audiences_icon_key" AS ENUM('home', 'users', 'briefcase', 'heart', 'globe', 'flag', 'wallet', 'sparkles');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_mode" AS ENUM('auto', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_blog_teasers_mode" AS ENUM('auto', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_list_mode" AS ENUM('auto', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_max_width" AS ENUM('narrow', 'default', 'wide', 'full');
  CREATE TYPE "public"."enum__pages_v_version_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_loan_programs_icon_key" AS ENUM('home', 'flag', 'flame', 'tractor', 'building', 'shield-check');
  CREATE TYPE "public"."enum_loan_programs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__loan_programs_v_version_icon_key" AS ENUM('home', 'flag', 'flame', 'tractor', 'building', 'shield-check');
  CREATE TYPE "public"."enum__loan_programs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__loan_programs_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_site_settings_social_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'tiktok', 'youtube');
  CREATE TABLE "pages_blocks_hero_proof_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_proof_points_locales" (
  	"value" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"primary_cta_href" varchar,
  	"secondary_cta_href" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subheadline" varchar,
  	"primary_cta_label" varchar,
  	"secondary_cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_marquee_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_pages_blocks_marquee_mode" DEFAULT 'auto',
  	"speed" numeric DEFAULT 30,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_why_broker_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_key" "enum_pages_blocks_why_broker_points_icon_key"
  );
  
  CREATE TABLE "pages_blocks_why_broker_points_locales" (
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_why_broker" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_why_broker_locales" (
  	"title" varchar,
  	"intro" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_offer_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_offer_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_offer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_href" varchar,
  	"dark_mode" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_offer_locales" (
  	"title" varchar,
  	"body" jsonb,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_versus_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_versus_table_columns_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_versus_table_rows_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_versus_table_rows_values_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_versus_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_versus_table_rows_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_versus_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_versus_table_locales" (
  	"title" varchar,
  	"footnote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps_locales" (
  	"title" varchar,
  	"body" varchar,
  	"duration_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_calculator" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"defaults_price" numeric DEFAULT 350000,
  	"defaults_down_pct" numeric DEFAULT 5,
  	"defaults_rate_pct" numeric DEFAULT 6.5,
  	"defaults_term_years" numeric DEFAULT 30,
  	"defaults_taxes_annual" numeric DEFAULT 4200,
  	"defaults_insurance_annual" numeric DEFAULT 1800,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_calculator_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"disclaimer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_loan_programs_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_loan_programs_list_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_audience_grid_audiences" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_key" "enum_pages_blocks_audience_grid_audiences_icon_key",
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_audience_grid_audiences_locales" (
  	"label" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_audience_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_audience_grid_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_pages_blocks_testimonials_mode" DEFAULT 'auto',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_guarantee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_guarantee_locales" (
  	"title" varchar,
  	"body" jsonb,
  	"seal_label" varchar,
  	"seal_sub" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_founder_credentials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_founder_credentials_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_founder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"nmls" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_founder_locales" (
  	"headline" varchar,
  	"bio" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_bilingual" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_bilingual_locales" (
  	"headline" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_blog_teasers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_pages_blocks_blog_teasers_mode" DEFAULT 'auto',
  	"count" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_blog_teasers_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_pages_blocks_faq_list_mode" DEFAULT 'auto',
  	"category_filter_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_list_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_final_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"primary_cta_href" varchar,
  	"secondary_cta_href" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_final_cta_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"body" varchar,
  	"primary_cta_label" varchar,
  	"secondary_cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"max_width" "enum_pages_blocks_rich_text_max_width" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_form_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_form_embed_locales" (
  	"headline" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"locale" "enum_pages_locale" DEFAULT 'en',
  	"localization_key" varchar,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"loan_programs_id" integer,
  	"reviews_id" integer,
  	"posts_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_proof_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_proof_points_locales" (
  	"value" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"primary_cta_href" varchar,
  	"secondary_cta_href" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subheadline" varchar,
  	"primary_cta_label" varchar,
  	"secondary_cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_marquee_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mode" "enum__pages_v_blocks_marquee_mode" DEFAULT 'auto',
  	"speed" numeric DEFAULT 30,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_broker_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_key" "enum__pages_v_blocks_why_broker_points_icon_key",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_broker_points_locales" (
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_why_broker" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_broker_locales" (
  	"title" varchar,
  	"intro" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_offer_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_offer_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_offer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_href" varchar,
  	"dark_mode" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_offer_locales" (
  	"title" varchar,
  	"body" jsonb,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_versus_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_versus_table_columns_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_versus_table_rows_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_versus_table_rows_values_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_versus_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_versus_table_rows_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_versus_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_versus_table_locales" (
  	"title" varchar,
  	"footnote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_locales" (
  	"title" varchar,
  	"body" varchar,
  	"duration_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_calculator" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"defaults_price" numeric DEFAULT 350000,
  	"defaults_down_pct" numeric DEFAULT 5,
  	"defaults_rate_pct" numeric DEFAULT 6.5,
  	"defaults_term_years" numeric DEFAULT 30,
  	"defaults_taxes_annual" numeric DEFAULT 4200,
  	"defaults_insurance_annual" numeric DEFAULT 1800,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_calculator_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"disclaimer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_loan_programs_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_loan_programs_list_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_audience_grid_audiences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_key" "enum__pages_v_blocks_audience_grid_audiences_icon_key",
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_audience_grid_audiences_locales" (
  	"label" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_audience_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_audience_grid_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mode" "enum__pages_v_blocks_testimonials_mode" DEFAULT 'auto',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_guarantee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_guarantee_locales" (
  	"title" varchar,
  	"body" jsonb,
  	"seal_label" varchar,
  	"seal_sub" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_founder_credentials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_founder_credentials_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_founder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"nmls" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_founder_locales" (
  	"headline" varchar,
  	"bio" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_bilingual" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_bilingual_locales" (
  	"headline" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_blog_teasers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mode" "enum__pages_v_blocks_blog_teasers_mode" DEFAULT 'auto',
  	"count" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_blog_teasers_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mode" "enum__pages_v_blocks_faq_list_mode" DEFAULT 'auto',
  	"category_filter_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_list_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_final_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"primary_cta_href" varchar,
  	"secondary_cta_href" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_final_cta_locales" (
  	"eyebrow" varchar,
  	"headline" varchar,
  	"body" varchar,
  	"primary_cta_label" varchar,
  	"secondary_cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"max_width" "enum__pages_v_blocks_rich_text_max_width" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_form_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form_embed_locales" (
  	"headline" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_locale" "enum__pages_v_version_locale" DEFAULT 'en',
  	"version_localization_key" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"loan_programs_id" integer,
  	"reviews_id" integer,
  	"posts_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_locales" (
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "loan_programs_pros" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "loan_programs_pros_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "loan_programs_cons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "loan_programs_cons_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "loan_programs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"icon_key" "enum_loan_programs_icon_key" DEFAULT 'home',
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_loan_programs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "loan_programs_locales" (
  	"name" varchar,
  	"tagline" varchar,
  	"who_its_for" varchar,
  	"requirements" jsonb,
  	"best_for" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_loan_programs_v_version_pros" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_loan_programs_v_version_pros_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_loan_programs_v_version_cons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_loan_programs_v_version_cons_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_loan_programs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_icon_key" "enum__loan_programs_v_version_icon_key" DEFAULT 'home',
  	"version_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__loan_programs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__loan_programs_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_loan_programs_v_locales" (
  	"version_name" varchar,
  	"version_tagline" varchar,
  	"version_who_its_for" varchar,
  	"version_requirements" jsonb,
  	"version_best_for" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs_locales" (
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"author_name" varchar NOT NULL,
  	"rating" numeric DEFAULT 5,
  	"date" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reviews_locales" (
  	"quote" varchar NOT NULL,
  	"author_context" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "categories_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" jsonb,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_checkbox_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message_locales" (
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar
  );
  
  CREATE TABLE "forms_emails_locales" (
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "forms_locales" (
  	"submit_button_label" varchar,
  	"confirmation_message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"relation_to" varchar,
  	"category_i_d" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"priority" numeric,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"loan_programs_id" integer,
  	"faqs_id" integer,
  	"reviews_id" integer,
  	"categories_id" integer,
  	"media_id" integer,
  	"users_id" integer,
  	"redirects_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"search_id" integer,
  	"payload_folders_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "site_settings_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_platform",
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_accent_color" varchar DEFAULT '#83C340',
  	"brand_logo_icon_black_id" integer,
  	"brand_logo_icon_white_id" integer,
  	"brand_logo_wordmark_black_id" integer,
  	"brand_logo_wordmark_white_id" integer,
  	"toggles_show_marquee" boolean DEFAULT true,
  	"toggles_show_sticky_bar" boolean DEFAULT true,
  	"toggles_dark_offer" boolean DEFAULT false,
  	"business_phone" varchar DEFAULT '(689) 210-3448',
  	"business_phone_e164" varchar DEFAULT '+16892103448',
  	"business_email" varchar DEFAULT 'hello@startmortgage.com',
  	"business_address_street" varchar DEFAULT '112 N Clyde Ave',
  	"business_address_city" varchar DEFAULT 'Kissimmee',
  	"business_address_region" varchar DEFAULT 'FL',
  	"business_address_postal_code" varchar DEFAULT '34741',
  	"business_address_country" varchar DEFAULT 'US',
  	"business_address_lat" numeric DEFAULT 28.2919,
  	"business_address_lng" numeric DEFAULT -81.4076,
  	"business_nmls_broker" varchar DEFAULT '2821608',
  	"business_nmls_parent" varchar DEFAULT '2718409',
  	"business_nmls_founder" varchar DEFAULT '1631454',
  	"business_founder_bio_name" varchar DEFAULT 'Jexayra Rivera',
  	"business_rating_value" numeric DEFAULT 4.9,
  	"business_rating_count" numeric DEFAULT 127,
  	"forms_notification_email" varchar DEFAULT 'hello@startmortgage.com',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"business_founder_bio_job_title" varchar DEFAULT 'Mortgage Broker, Founder',
  	"business_founder_bio_bio" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_hero_proof_points" ADD CONSTRAINT "pages_blocks_hero_proof_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_proof_points_locales" ADD CONSTRAINT "pages_blocks_hero_proof_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_proof_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee_items" ADD CONSTRAINT "pages_blocks_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee_items_locales" ADD CONSTRAINT "pages_blocks_marquee_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_marquee_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee" ADD CONSTRAINT "pages_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_broker_points" ADD CONSTRAINT "pages_blocks_why_broker_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_broker"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_broker_points_locales" ADD CONSTRAINT "pages_blocks_why_broker_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_broker_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_broker" ADD CONSTRAINT "pages_blocks_why_broker_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_broker_locales" ADD CONSTRAINT "pages_blocks_why_broker_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_broker"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_offer_bullets" ADD CONSTRAINT "pages_blocks_offer_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_offer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_offer_bullets_locales" ADD CONSTRAINT "pages_blocks_offer_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_offer_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_offer" ADD CONSTRAINT "pages_blocks_offer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_offer_locales" ADD CONSTRAINT "pages_blocks_offer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_offer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_versus_table_columns" ADD CONSTRAINT "pages_blocks_versus_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_versus_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_versus_table_columns_locales" ADD CONSTRAINT "pages_blocks_versus_table_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_versus_table_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_versus_table_rows_values" ADD CONSTRAINT "pages_blocks_versus_table_rows_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_versus_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_versus_table_rows_values_locales" ADD CONSTRAINT "pages_blocks_versus_table_rows_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_versus_table_rows_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_versus_table_rows" ADD CONSTRAINT "pages_blocks_versus_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_versus_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_versus_table_rows_locales" ADD CONSTRAINT "pages_blocks_versus_table_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_versus_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_versus_table" ADD CONSTRAINT "pages_blocks_versus_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_versus_table_locales" ADD CONSTRAINT "pages_blocks_versus_table_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_versus_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps" ADD CONSTRAINT "pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_locales" ADD CONSTRAINT "pages_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process" ADD CONSTRAINT "pages_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_locales" ADD CONSTRAINT "pages_blocks_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_calculator" ADD CONSTRAINT "pages_blocks_calculator_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_calculator_locales" ADD CONSTRAINT "pages_blocks_calculator_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_calculator"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_loan_programs_list" ADD CONSTRAINT "pages_blocks_loan_programs_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_loan_programs_list_locales" ADD CONSTRAINT "pages_blocks_loan_programs_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_loan_programs_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_audience_grid_audiences" ADD CONSTRAINT "pages_blocks_audience_grid_audiences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_audience_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_audience_grid_audiences_locales" ADD CONSTRAINT "pages_blocks_audience_grid_audiences_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_audience_grid_audiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_audience_grid" ADD CONSTRAINT "pages_blocks_audience_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_audience_grid_locales" ADD CONSTRAINT "pages_blocks_audience_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_audience_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_locales" ADD CONSTRAINT "pages_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_guarantee" ADD CONSTRAINT "pages_blocks_guarantee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_guarantee_locales" ADD CONSTRAINT "pages_blocks_guarantee_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_guarantee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder_credentials" ADD CONSTRAINT "pages_blocks_founder_credentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_founder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder_credentials_locales" ADD CONSTRAINT "pages_blocks_founder_credentials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_founder_credentials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder" ADD CONSTRAINT "pages_blocks_founder_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder" ADD CONSTRAINT "pages_blocks_founder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder_locales" ADD CONSTRAINT "pages_blocks_founder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_founder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_bilingual" ADD CONSTRAINT "pages_blocks_bilingual_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_bilingual_locales" ADD CONSTRAINT "pages_blocks_bilingual_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_bilingual"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_teasers" ADD CONSTRAINT "pages_blocks_blog_teasers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_teasers_locales" ADD CONSTRAINT "pages_blocks_blog_teasers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_blog_teasers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_list" ADD CONSTRAINT "pages_blocks_faq_list_category_filter_id_categories_id_fk" FOREIGN KEY ("category_filter_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_list" ADD CONSTRAINT "pages_blocks_faq_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_list_locales" ADD CONSTRAINT "pages_blocks_faq_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_final_cta" ADD CONSTRAINT "pages_blocks_final_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_final_cta" ADD CONSTRAINT "pages_blocks_final_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_final_cta_locales" ADD CONSTRAINT "pages_blocks_final_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_final_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_locales" ADD CONSTRAINT "pages_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_embed" ADD CONSTRAINT "pages_blocks_form_embed_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_embed" ADD CONSTRAINT "pages_blocks_form_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_embed_locales" ADD CONSTRAINT "pages_blocks_form_embed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_form_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_loan_programs_fk" FOREIGN KEY ("loan_programs_id") REFERENCES "public"."loan_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_proof_points" ADD CONSTRAINT "_pages_v_blocks_hero_proof_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_proof_points_locales" ADD CONSTRAINT "_pages_v_blocks_hero_proof_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_proof_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD CONSTRAINT "_pages_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee_items" ADD CONSTRAINT "_pages_v_blocks_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee_items_locales" ADD CONSTRAINT "_pages_v_blocks_marquee_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_marquee_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee" ADD CONSTRAINT "_pages_v_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_broker_points" ADD CONSTRAINT "_pages_v_blocks_why_broker_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_why_broker"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_broker_points_locales" ADD CONSTRAINT "_pages_v_blocks_why_broker_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_why_broker_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_broker" ADD CONSTRAINT "_pages_v_blocks_why_broker_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_broker_locales" ADD CONSTRAINT "_pages_v_blocks_why_broker_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_why_broker"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_offer_bullets" ADD CONSTRAINT "_pages_v_blocks_offer_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_offer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_offer_bullets_locales" ADD CONSTRAINT "_pages_v_blocks_offer_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_offer_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_offer" ADD CONSTRAINT "_pages_v_blocks_offer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_offer_locales" ADD CONSTRAINT "_pages_v_blocks_offer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_offer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_versus_table_columns" ADD CONSTRAINT "_pages_v_blocks_versus_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_versus_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_versus_table_columns_locales" ADD CONSTRAINT "_pages_v_blocks_versus_table_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_versus_table_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_versus_table_rows_values" ADD CONSTRAINT "_pages_v_blocks_versus_table_rows_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_versus_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_versus_table_rows_values_locales" ADD CONSTRAINT "_pages_v_blocks_versus_table_rows_values_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_versus_table_rows_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_versus_table_rows" ADD CONSTRAINT "_pages_v_blocks_versus_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_versus_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_versus_table_rows_locales" ADD CONSTRAINT "_pages_v_blocks_versus_table_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_versus_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_versus_table" ADD CONSTRAINT "_pages_v_blocks_versus_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_versus_table_locales" ADD CONSTRAINT "_pages_v_blocks_versus_table_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_versus_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_locales" ADD CONSTRAINT "_pages_v_blocks_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process" ADD CONSTRAINT "_pages_v_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_locales" ADD CONSTRAINT "_pages_v_blocks_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_calculator" ADD CONSTRAINT "_pages_v_blocks_calculator_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_calculator_locales" ADD CONSTRAINT "_pages_v_blocks_calculator_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_calculator"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_loan_programs_list" ADD CONSTRAINT "_pages_v_blocks_loan_programs_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_loan_programs_list_locales" ADD CONSTRAINT "_pages_v_blocks_loan_programs_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_loan_programs_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_audience_grid_audiences" ADD CONSTRAINT "_pages_v_blocks_audience_grid_audiences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_audience_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_audience_grid_audiences_locales" ADD CONSTRAINT "_pages_v_blocks_audience_grid_audiences_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_audience_grid_audiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_audience_grid" ADD CONSTRAINT "_pages_v_blocks_audience_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_audience_grid_locales" ADD CONSTRAINT "_pages_v_blocks_audience_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_audience_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_guarantee" ADD CONSTRAINT "_pages_v_blocks_guarantee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_guarantee_locales" ADD CONSTRAINT "_pages_v_blocks_guarantee_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_guarantee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder_credentials" ADD CONSTRAINT "_pages_v_blocks_founder_credentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_founder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder_credentials_locales" ADD CONSTRAINT "_pages_v_blocks_founder_credentials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_founder_credentials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder" ADD CONSTRAINT "_pages_v_blocks_founder_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder" ADD CONSTRAINT "_pages_v_blocks_founder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder_locales" ADD CONSTRAINT "_pages_v_blocks_founder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_founder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bilingual" ADD CONSTRAINT "_pages_v_blocks_bilingual_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bilingual_locales" ADD CONSTRAINT "_pages_v_blocks_bilingual_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_bilingual"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_teasers" ADD CONSTRAINT "_pages_v_blocks_blog_teasers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_teasers_locales" ADD CONSTRAINT "_pages_v_blocks_blog_teasers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_blog_teasers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_list" ADD CONSTRAINT "_pages_v_blocks_faq_list_category_filter_id_categories_id_fk" FOREIGN KEY ("category_filter_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_list" ADD CONSTRAINT "_pages_v_blocks_faq_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_list_locales" ADD CONSTRAINT "_pages_v_blocks_faq_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_final_cta" ADD CONSTRAINT "_pages_v_blocks_final_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_final_cta" ADD CONSTRAINT "_pages_v_blocks_final_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_final_cta_locales" ADD CONSTRAINT "_pages_v_blocks_final_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_final_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_locales" ADD CONSTRAINT "_pages_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_embed" ADD CONSTRAINT "_pages_v_blocks_form_embed_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_embed" ADD CONSTRAINT "_pages_v_blocks_form_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_embed_locales" ADD CONSTRAINT "_pages_v_blocks_form_embed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_form_embed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_loan_programs_fk" FOREIGN KEY ("loan_programs_id") REFERENCES "public"."loan_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "loan_programs_pros" ADD CONSTRAINT "loan_programs_pros_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."loan_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "loan_programs_pros_locales" ADD CONSTRAINT "loan_programs_pros_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."loan_programs_pros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "loan_programs_cons" ADD CONSTRAINT "loan_programs_cons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."loan_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "loan_programs_cons_locales" ADD CONSTRAINT "loan_programs_cons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."loan_programs_cons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "loan_programs_locales" ADD CONSTRAINT "loan_programs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."loan_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_loan_programs_v_version_pros" ADD CONSTRAINT "_loan_programs_v_version_pros_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_loan_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_loan_programs_v_version_pros_locales" ADD CONSTRAINT "_loan_programs_v_version_pros_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_loan_programs_v_version_pros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_loan_programs_v_version_cons" ADD CONSTRAINT "_loan_programs_v_version_cons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_loan_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_loan_programs_v_version_cons_locales" ADD CONSTRAINT "_loan_programs_v_version_cons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_loan_programs_v_version_cons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_loan_programs_v" ADD CONSTRAINT "_loan_programs_v_parent_id_loan_programs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."loan_programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_loan_programs_v_locales" ADD CONSTRAINT "_loan_programs_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_loan_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs" ADD CONSTRAINT "faqs_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faqs_locales" ADD CONSTRAINT "faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews_locales" ADD CONSTRAINT "reviews_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox_locales" ADD CONSTRAINT "forms_blocks_checkbox_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_checkbox"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country_locales" ADD CONSTRAINT "forms_blocks_country_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_country"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email_locales" ADD CONSTRAINT "forms_blocks_email_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_email"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message_locales" ADD CONSTRAINT "forms_blocks_message_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_message"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number_locales" ADD CONSTRAINT "forms_blocks_number_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_number"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options_locales" ADD CONSTRAINT "forms_blocks_select_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_locales" ADD CONSTRAINT "forms_blocks_select_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state_locales" ADD CONSTRAINT "forms_blocks_state_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_state"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text_locales" ADD CONSTRAINT "forms_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea_locales" ADD CONSTRAINT "forms_blocks_textarea_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_textarea"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails_locales" ADD CONSTRAINT "forms_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_emails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_locales" ADD CONSTRAINT "forms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_categories" ADD CONSTRAINT "search_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_locales" ADD CONSTRAINT "search_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_loan_programs_fk" FOREIGN KEY ("loan_programs_id") REFERENCES "public"."loan_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social" ADD CONSTRAINT "site_settings_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_brand_logo_icon_black_id_media_id_fk" FOREIGN KEY ("brand_logo_icon_black_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_brand_logo_icon_white_id_media_id_fk" FOREIGN KEY ("brand_logo_icon_white_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_brand_logo_wordmark_black_id_media_id_fk" FOREIGN KEY ("brand_logo_wordmark_black_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_brand_logo_wordmark_white_id_media_id_fk" FOREIGN KEY ("brand_logo_wordmark_white_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_proof_points_order_idx" ON "pages_blocks_hero_proof_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_proof_points_parent_id_idx" ON "pages_blocks_hero_proof_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_proof_points_locales_locale_parent_id_uniq" ON "pages_blocks_hero_proof_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_marquee_items_order_idx" ON "pages_blocks_marquee_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_items_parent_id_idx" ON "pages_blocks_marquee_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_marquee_items_locales_locale_parent_id_unique" ON "pages_blocks_marquee_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_marquee_order_idx" ON "pages_blocks_marquee" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_parent_id_idx" ON "pages_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_marquee_path_idx" ON "pages_blocks_marquee" USING btree ("_path");
  CREATE INDEX "pages_blocks_why_broker_points_order_idx" ON "pages_blocks_why_broker_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_broker_points_parent_id_idx" ON "pages_blocks_why_broker_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_why_broker_points_locales_locale_parent_id_uniq" ON "pages_blocks_why_broker_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_why_broker_order_idx" ON "pages_blocks_why_broker" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_broker_parent_id_idx" ON "pages_blocks_why_broker" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_broker_path_idx" ON "pages_blocks_why_broker" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_why_broker_locales_locale_parent_id_unique" ON "pages_blocks_why_broker_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_offer_bullets_order_idx" ON "pages_blocks_offer_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_offer_bullets_parent_id_idx" ON "pages_blocks_offer_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_offer_bullets_locales_locale_parent_id_unique" ON "pages_blocks_offer_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_offer_order_idx" ON "pages_blocks_offer" USING btree ("_order");
  CREATE INDEX "pages_blocks_offer_parent_id_idx" ON "pages_blocks_offer" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_offer_path_idx" ON "pages_blocks_offer" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_offer_locales_locale_parent_id_unique" ON "pages_blocks_offer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_versus_table_columns_order_idx" ON "pages_blocks_versus_table_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_versus_table_columns_parent_id_idx" ON "pages_blocks_versus_table_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_versus_table_columns_locales_locale_parent_id_u" ON "pages_blocks_versus_table_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_versus_table_rows_values_order_idx" ON "pages_blocks_versus_table_rows_values" USING btree ("_order");
  CREATE INDEX "pages_blocks_versus_table_rows_values_parent_id_idx" ON "pages_blocks_versus_table_rows_values" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_versus_table_rows_values_locales_locale_parent_" ON "pages_blocks_versus_table_rows_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_versus_table_rows_order_idx" ON "pages_blocks_versus_table_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_versus_table_rows_parent_id_idx" ON "pages_blocks_versus_table_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_versus_table_rows_locales_locale_parent_id_uniq" ON "pages_blocks_versus_table_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_versus_table_order_idx" ON "pages_blocks_versus_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_versus_table_parent_id_idx" ON "pages_blocks_versus_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_versus_table_path_idx" ON "pages_blocks_versus_table" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_versus_table_locales_locale_parent_id_unique" ON "pages_blocks_versus_table_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_steps_order_idx" ON "pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_parent_id_idx" ON "pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_process_steps_locales_locale_parent_id_unique" ON "pages_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_order_idx" ON "pages_blocks_process" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_parent_id_idx" ON "pages_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_path_idx" ON "pages_blocks_process" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_process_locales_locale_parent_id_unique" ON "pages_blocks_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_calculator_order_idx" ON "pages_blocks_calculator" USING btree ("_order");
  CREATE INDEX "pages_blocks_calculator_parent_id_idx" ON "pages_blocks_calculator" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_calculator_path_idx" ON "pages_blocks_calculator" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_calculator_locales_locale_parent_id_unique" ON "pages_blocks_calculator_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_loan_programs_list_order_idx" ON "pages_blocks_loan_programs_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_loan_programs_list_parent_id_idx" ON "pages_blocks_loan_programs_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_loan_programs_list_path_idx" ON "pages_blocks_loan_programs_list" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_loan_programs_list_locales_locale_parent_id_uni" ON "pages_blocks_loan_programs_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_audience_grid_audiences_order_idx" ON "pages_blocks_audience_grid_audiences" USING btree ("_order");
  CREATE INDEX "pages_blocks_audience_grid_audiences_parent_id_idx" ON "pages_blocks_audience_grid_audiences" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_audience_grid_audiences_locales_locale_parent_i" ON "pages_blocks_audience_grid_audiences_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_audience_grid_order_idx" ON "pages_blocks_audience_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_audience_grid_parent_id_idx" ON "pages_blocks_audience_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_audience_grid_path_idx" ON "pages_blocks_audience_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_audience_grid_locales_locale_parent_id_unique" ON "pages_blocks_audience_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_locales_locale_parent_id_unique" ON "pages_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_guarantee_order_idx" ON "pages_blocks_guarantee" USING btree ("_order");
  CREATE INDEX "pages_blocks_guarantee_parent_id_idx" ON "pages_blocks_guarantee" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_guarantee_path_idx" ON "pages_blocks_guarantee" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_guarantee_locales_locale_parent_id_unique" ON "pages_blocks_guarantee_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_founder_credentials_order_idx" ON "pages_blocks_founder_credentials" USING btree ("_order");
  CREATE INDEX "pages_blocks_founder_credentials_parent_id_idx" ON "pages_blocks_founder_credentials" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_founder_credentials_locales_locale_parent_id_un" ON "pages_blocks_founder_credentials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_founder_order_idx" ON "pages_blocks_founder" USING btree ("_order");
  CREATE INDEX "pages_blocks_founder_parent_id_idx" ON "pages_blocks_founder" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_founder_path_idx" ON "pages_blocks_founder" USING btree ("_path");
  CREATE INDEX "pages_blocks_founder_image_idx" ON "pages_blocks_founder" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_founder_locales_locale_parent_id_unique" ON "pages_blocks_founder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_bilingual_order_idx" ON "pages_blocks_bilingual" USING btree ("_order");
  CREATE INDEX "pages_blocks_bilingual_parent_id_idx" ON "pages_blocks_bilingual" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_bilingual_path_idx" ON "pages_blocks_bilingual" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_bilingual_locales_locale_parent_id_unique" ON "pages_blocks_bilingual_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_blog_teasers_order_idx" ON "pages_blocks_blog_teasers" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_teasers_parent_id_idx" ON "pages_blocks_blog_teasers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_teasers_path_idx" ON "pages_blocks_blog_teasers" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_blog_teasers_locales_locale_parent_id_unique" ON "pages_blocks_blog_teasers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_list_order_idx" ON "pages_blocks_faq_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_list_parent_id_idx" ON "pages_blocks_faq_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_list_path_idx" ON "pages_blocks_faq_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_list_category_filter_idx" ON "pages_blocks_faq_list" USING btree ("category_filter_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_list_locales_locale_parent_id_unique" ON "pages_blocks_faq_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_final_cta_order_idx" ON "pages_blocks_final_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_final_cta_parent_id_idx" ON "pages_blocks_final_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_final_cta_path_idx" ON "pages_blocks_final_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_final_cta_image_idx" ON "pages_blocks_final_cta" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_final_cta_locales_locale_parent_id_unique" ON "pages_blocks_final_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_rich_text_locales_locale_parent_id_unique" ON "pages_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_form_embed_order_idx" ON "pages_blocks_form_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_embed_parent_id_idx" ON "pages_blocks_form_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_embed_path_idx" ON "pages_blocks_form_embed" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_embed_form_idx" ON "pages_blocks_form_embed" USING btree ("form_id");
  CREATE UNIQUE INDEX "pages_blocks_form_embed_locales_locale_parent_id_unique" ON "pages_blocks_form_embed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_localization_key_idx" ON "pages" USING btree ("localization_key");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_loan_programs_id_idx" ON "pages_rels" USING btree ("loan_programs_id");
  CREATE INDEX "pages_rels_reviews_id_idx" ON "pages_rels" USING btree ("reviews_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_faqs_id_idx" ON "pages_rels" USING btree ("faqs_id");
  CREATE INDEX "_pages_v_blocks_hero_proof_points_order_idx" ON "_pages_v_blocks_hero_proof_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_proof_points_parent_id_idx" ON "_pages_v_blocks_hero_proof_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_proof_points_locales_locale_parent_id_u" ON "_pages_v_blocks_hero_proof_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_marquee_items_order_idx" ON "_pages_v_blocks_marquee_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_marquee_items_parent_id_idx" ON "_pages_v_blocks_marquee_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_marquee_items_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_marquee_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_marquee_order_idx" ON "_pages_v_blocks_marquee" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_marquee_parent_id_idx" ON "_pages_v_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_marquee_path_idx" ON "_pages_v_blocks_marquee" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_why_broker_points_order_idx" ON "_pages_v_blocks_why_broker_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_broker_points_parent_id_idx" ON "_pages_v_blocks_why_broker_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_why_broker_points_locales_locale_parent_id_u" ON "_pages_v_blocks_why_broker_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_why_broker_order_idx" ON "_pages_v_blocks_why_broker" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_broker_parent_id_idx" ON "_pages_v_blocks_why_broker" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_why_broker_path_idx" ON "_pages_v_blocks_why_broker" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_why_broker_locales_locale_parent_id_unique" ON "_pages_v_blocks_why_broker_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_offer_bullets_order_idx" ON "_pages_v_blocks_offer_bullets" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_offer_bullets_parent_id_idx" ON "_pages_v_blocks_offer_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_offer_bullets_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_offer_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_offer_order_idx" ON "_pages_v_blocks_offer" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_offer_parent_id_idx" ON "_pages_v_blocks_offer" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_offer_path_idx" ON "_pages_v_blocks_offer" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_offer_locales_locale_parent_id_unique" ON "_pages_v_blocks_offer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_versus_table_columns_order_idx" ON "_pages_v_blocks_versus_table_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_versus_table_columns_parent_id_idx" ON "_pages_v_blocks_versus_table_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_versus_table_columns_locales_locale_parent_i" ON "_pages_v_blocks_versus_table_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_versus_table_rows_values_order_idx" ON "_pages_v_blocks_versus_table_rows_values" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_versus_table_rows_values_parent_id_idx" ON "_pages_v_blocks_versus_table_rows_values" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_versus_table_rows_values_locales_locale_pare" ON "_pages_v_blocks_versus_table_rows_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_versus_table_rows_order_idx" ON "_pages_v_blocks_versus_table_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_versus_table_rows_parent_id_idx" ON "_pages_v_blocks_versus_table_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_versus_table_rows_locales_locale_parent_id_u" ON "_pages_v_blocks_versus_table_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_versus_table_order_idx" ON "_pages_v_blocks_versus_table" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_versus_table_parent_id_idx" ON "_pages_v_blocks_versus_table" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_versus_table_path_idx" ON "_pages_v_blocks_versus_table" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_versus_table_locales_locale_parent_id_unique" ON "_pages_v_blocks_versus_table_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_order_idx" ON "_pages_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_parent_id_idx" ON "_pages_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_steps_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_order_idx" ON "_pages_v_blocks_process" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_parent_id_idx" ON "_pages_v_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_path_idx" ON "_pages_v_blocks_process" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_locales_locale_parent_id_unique" ON "_pages_v_blocks_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_calculator_order_idx" ON "_pages_v_blocks_calculator" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_calculator_parent_id_idx" ON "_pages_v_blocks_calculator" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_calculator_path_idx" ON "_pages_v_blocks_calculator" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_calculator_locales_locale_parent_id_unique" ON "_pages_v_blocks_calculator_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_loan_programs_list_order_idx" ON "_pages_v_blocks_loan_programs_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_loan_programs_list_parent_id_idx" ON "_pages_v_blocks_loan_programs_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_loan_programs_list_path_idx" ON "_pages_v_blocks_loan_programs_list" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_loan_programs_list_locales_locale_parent_id_" ON "_pages_v_blocks_loan_programs_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_audience_grid_audiences_order_idx" ON "_pages_v_blocks_audience_grid_audiences" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_audience_grid_audiences_parent_id_idx" ON "_pages_v_blocks_audience_grid_audiences" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_audience_grid_audiences_locales_locale_paren" ON "_pages_v_blocks_audience_grid_audiences_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_audience_grid_order_idx" ON "_pages_v_blocks_audience_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_audience_grid_parent_id_idx" ON "_pages_v_blocks_audience_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_audience_grid_path_idx" ON "_pages_v_blocks_audience_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_audience_grid_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_audience_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_locales_locale_parent_id_unique" ON "_pages_v_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_guarantee_order_idx" ON "_pages_v_blocks_guarantee" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_guarantee_parent_id_idx" ON "_pages_v_blocks_guarantee" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_guarantee_path_idx" ON "_pages_v_blocks_guarantee" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_guarantee_locales_locale_parent_id_unique" ON "_pages_v_blocks_guarantee_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_founder_credentials_order_idx" ON "_pages_v_blocks_founder_credentials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_founder_credentials_parent_id_idx" ON "_pages_v_blocks_founder_credentials" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_founder_credentials_locales_locale_parent_id" ON "_pages_v_blocks_founder_credentials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_founder_order_idx" ON "_pages_v_blocks_founder" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_founder_parent_id_idx" ON "_pages_v_blocks_founder" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_founder_path_idx" ON "_pages_v_blocks_founder" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_founder_image_idx" ON "_pages_v_blocks_founder" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_founder_locales_locale_parent_id_unique" ON "_pages_v_blocks_founder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_bilingual_order_idx" ON "_pages_v_blocks_bilingual" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_bilingual_parent_id_idx" ON "_pages_v_blocks_bilingual" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_bilingual_path_idx" ON "_pages_v_blocks_bilingual" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_bilingual_locales_locale_parent_id_unique" ON "_pages_v_blocks_bilingual_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_teasers_order_idx" ON "_pages_v_blocks_blog_teasers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_blog_teasers_parent_id_idx" ON "_pages_v_blocks_blog_teasers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_teasers_path_idx" ON "_pages_v_blocks_blog_teasers" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_blog_teasers_locales_locale_parent_id_unique" ON "_pages_v_blocks_blog_teasers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_list_order_idx" ON "_pages_v_blocks_faq_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_list_parent_id_idx" ON "_pages_v_blocks_faq_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_list_path_idx" ON "_pages_v_blocks_faq_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_list_category_filter_idx" ON "_pages_v_blocks_faq_list" USING btree ("category_filter_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_list_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_final_cta_order_idx" ON "_pages_v_blocks_final_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_final_cta_parent_id_idx" ON "_pages_v_blocks_final_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_final_cta_path_idx" ON "_pages_v_blocks_final_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_final_cta_image_idx" ON "_pages_v_blocks_final_cta" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_final_cta_locales_locale_parent_id_unique" ON "_pages_v_blocks_final_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_form_embed_order_idx" ON "_pages_v_blocks_form_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_embed_parent_id_idx" ON "_pages_v_blocks_form_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_embed_path_idx" ON "_pages_v_blocks_form_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_embed_form_idx" ON "_pages_v_blocks_form_embed" USING btree ("form_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_form_embed_locales_locale_parent_id_unique" ON "_pages_v_blocks_form_embed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_localization_key_idx" ON "_pages_v" USING btree ("version_localization_key");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_loan_programs_id_idx" ON "_pages_v_rels" USING btree ("loan_programs_id");
  CREATE INDEX "_pages_v_rels_reviews_id_idx" ON "_pages_v_rels" USING btree ("reviews_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_faqs_id_idx" ON "_pages_v_rels" USING btree ("faqs_id");
  CREATE INDEX "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX "loan_programs_pros_order_idx" ON "loan_programs_pros" USING btree ("_order");
  CREATE INDEX "loan_programs_pros_parent_id_idx" ON "loan_programs_pros" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "loan_programs_pros_locales_locale_parent_id_unique" ON "loan_programs_pros_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "loan_programs_cons_order_idx" ON "loan_programs_cons" USING btree ("_order");
  CREATE INDEX "loan_programs_cons_parent_id_idx" ON "loan_programs_cons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "loan_programs_cons_locales_locale_parent_id_unique" ON "loan_programs_cons_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "loan_programs_slug_idx" ON "loan_programs" USING btree ("slug");
  CREATE INDEX "loan_programs_updated_at_idx" ON "loan_programs" USING btree ("updated_at");
  CREATE INDEX "loan_programs_created_at_idx" ON "loan_programs" USING btree ("created_at");
  CREATE INDEX "loan_programs__status_idx" ON "loan_programs" USING btree ("_status");
  CREATE UNIQUE INDEX "loan_programs_locales_locale_parent_id_unique" ON "loan_programs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_loan_programs_v_version_pros_order_idx" ON "_loan_programs_v_version_pros" USING btree ("_order");
  CREATE INDEX "_loan_programs_v_version_pros_parent_id_idx" ON "_loan_programs_v_version_pros" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_loan_programs_v_version_pros_locales_locale_parent_id_uniqu" ON "_loan_programs_v_version_pros_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_loan_programs_v_version_cons_order_idx" ON "_loan_programs_v_version_cons" USING btree ("_order");
  CREATE INDEX "_loan_programs_v_version_cons_parent_id_idx" ON "_loan_programs_v_version_cons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_loan_programs_v_version_cons_locales_locale_parent_id_uniqu" ON "_loan_programs_v_version_cons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_loan_programs_v_parent_idx" ON "_loan_programs_v" USING btree ("parent_id");
  CREATE INDEX "_loan_programs_v_version_version_slug_idx" ON "_loan_programs_v" USING btree ("version_slug");
  CREATE INDEX "_loan_programs_v_version_version_updated_at_idx" ON "_loan_programs_v" USING btree ("version_updated_at");
  CREATE INDEX "_loan_programs_v_version_version_created_at_idx" ON "_loan_programs_v" USING btree ("version_created_at");
  CREATE INDEX "_loan_programs_v_version_version__status_idx" ON "_loan_programs_v" USING btree ("version__status");
  CREATE INDEX "_loan_programs_v_created_at_idx" ON "_loan_programs_v" USING btree ("created_at");
  CREATE INDEX "_loan_programs_v_updated_at_idx" ON "_loan_programs_v" USING btree ("updated_at");
  CREATE INDEX "_loan_programs_v_snapshot_idx" ON "_loan_programs_v" USING btree ("snapshot");
  CREATE INDEX "_loan_programs_v_published_locale_idx" ON "_loan_programs_v" USING btree ("published_locale");
  CREATE INDEX "_loan_programs_v_latest_idx" ON "_loan_programs_v" USING btree ("latest");
  CREATE INDEX "_loan_programs_v_autosave_idx" ON "_loan_programs_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_loan_programs_v_locales_locale_parent_id_unique" ON "_loan_programs_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faqs_category_idx" ON "faqs" USING btree ("category_id");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE UNIQUE INDEX "faqs_locales_locale_parent_id_unique" ON "faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at");
  CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at");
  CREATE UNIQUE INDEX "reviews_locales_locale_parent_id_unique" ON "reviews_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categories_breadcrumbs_order_idx" ON "categories_breadcrumbs" USING btree ("_order");
  CREATE INDEX "categories_breadcrumbs_parent_id_idx" ON "categories_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "categories_breadcrumbs_locale_idx" ON "categories_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "categories_breadcrumbs_doc_idx" ON "categories_breadcrumbs" USING btree ("doc_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_checkbox_locales_locale_parent_id_unique" ON "forms_blocks_checkbox_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_country_locales_locale_parent_id_unique" ON "forms_blocks_country_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_email_locales_locale_parent_id_unique" ON "forms_blocks_email_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_message_locales_locale_parent_id_unique" ON "forms_blocks_message_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_number_locales_locale_parent_id_unique" ON "forms_blocks_number_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_select_options_locales_locale_parent_id_unique" ON "forms_blocks_select_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_select_locales_locale_parent_id_unique" ON "forms_blocks_select_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_state_locales_locale_parent_id_unique" ON "forms_blocks_state_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_text_locales_locale_parent_id_unique" ON "forms_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_textarea_locales_locale_parent_id_unique" ON "forms_blocks_textarea_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_emails_locales_locale_parent_id_unique" ON "forms_emails_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE UNIQUE INDEX "forms_locales_locale_parent_id_unique" ON "forms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "search_categories_order_idx" ON "search_categories" USING btree ("_order");
  CREATE INDEX "search_categories_parent_id_idx" ON "search_categories" USING btree ("_parent_id");
  CREATE INDEX "search_slug_idx" ON "search" USING btree ("slug");
  CREATE INDEX "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");
  CREATE INDEX "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE UNIQUE INDEX "search_locales_locale_parent_id_unique" ON "search_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_loan_programs_id_idx" ON "payload_locked_documents_rels" USING btree ("loan_programs_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");
  CREATE INDEX "site_settings_social_order_idx" ON "site_settings_social" USING btree ("_order");
  CREATE INDEX "site_settings_social_parent_id_idx" ON "site_settings_social" USING btree ("_parent_id");
  CREATE INDEX "site_settings_brand_brand_logo_icon_black_idx" ON "site_settings" USING btree ("brand_logo_icon_black_id");
  CREATE INDEX "site_settings_brand_brand_logo_icon_white_idx" ON "site_settings" USING btree ("brand_logo_icon_white_id");
  CREATE INDEX "site_settings_brand_brand_logo_wordmark_black_idx" ON "site_settings" USING btree ("brand_logo_wordmark_black_id");
  CREATE INDEX "site_settings_brand_brand_logo_wordmark_white_idx" ON "site_settings" USING btree ("brand_logo_wordmark_white_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_proof_points" CASCADE;
  DROP TABLE "pages_blocks_hero_proof_points_locales" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_marquee_items" CASCADE;
  DROP TABLE "pages_blocks_marquee_items_locales" CASCADE;
  DROP TABLE "pages_blocks_marquee" CASCADE;
  DROP TABLE "pages_blocks_why_broker_points" CASCADE;
  DROP TABLE "pages_blocks_why_broker_points_locales" CASCADE;
  DROP TABLE "pages_blocks_why_broker" CASCADE;
  DROP TABLE "pages_blocks_why_broker_locales" CASCADE;
  DROP TABLE "pages_blocks_offer_bullets" CASCADE;
  DROP TABLE "pages_blocks_offer_bullets_locales" CASCADE;
  DROP TABLE "pages_blocks_offer" CASCADE;
  DROP TABLE "pages_blocks_offer_locales" CASCADE;
  DROP TABLE "pages_blocks_versus_table_columns" CASCADE;
  DROP TABLE "pages_blocks_versus_table_columns_locales" CASCADE;
  DROP TABLE "pages_blocks_versus_table_rows_values" CASCADE;
  DROP TABLE "pages_blocks_versus_table_rows_values_locales" CASCADE;
  DROP TABLE "pages_blocks_versus_table_rows" CASCADE;
  DROP TABLE "pages_blocks_versus_table_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_versus_table" CASCADE;
  DROP TABLE "pages_blocks_versus_table_locales" CASCADE;
  DROP TABLE "pages_blocks_process_steps" CASCADE;
  DROP TABLE "pages_blocks_process_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_process" CASCADE;
  DROP TABLE "pages_blocks_process_locales" CASCADE;
  DROP TABLE "pages_blocks_calculator" CASCADE;
  DROP TABLE "pages_blocks_calculator_locales" CASCADE;
  DROP TABLE "pages_blocks_loan_programs_list" CASCADE;
  DROP TABLE "pages_blocks_loan_programs_list_locales" CASCADE;
  DROP TABLE "pages_blocks_audience_grid_audiences" CASCADE;
  DROP TABLE "pages_blocks_audience_grid_audiences_locales" CASCADE;
  DROP TABLE "pages_blocks_audience_grid" CASCADE;
  DROP TABLE "pages_blocks_audience_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_testimonials_locales" CASCADE;
  DROP TABLE "pages_blocks_guarantee" CASCADE;
  DROP TABLE "pages_blocks_guarantee_locales" CASCADE;
  DROP TABLE "pages_blocks_founder_credentials" CASCADE;
  DROP TABLE "pages_blocks_founder_credentials_locales" CASCADE;
  DROP TABLE "pages_blocks_founder" CASCADE;
  DROP TABLE "pages_blocks_founder_locales" CASCADE;
  DROP TABLE "pages_blocks_bilingual" CASCADE;
  DROP TABLE "pages_blocks_bilingual_locales" CASCADE;
  DROP TABLE "pages_blocks_blog_teasers" CASCADE;
  DROP TABLE "pages_blocks_blog_teasers_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_list" CASCADE;
  DROP TABLE "pages_blocks_faq_list_locales" CASCADE;
  DROP TABLE "pages_blocks_final_cta" CASCADE;
  DROP TABLE "pages_blocks_final_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_rich_text_locales" CASCADE;
  DROP TABLE "pages_blocks_form_embed" CASCADE;
  DROP TABLE "pages_blocks_form_embed_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_proof_points" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_proof_points_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_marquee_items" CASCADE;
  DROP TABLE "_pages_v_blocks_marquee_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_marquee" CASCADE;
  DROP TABLE "_pages_v_blocks_why_broker_points" CASCADE;
  DROP TABLE "_pages_v_blocks_why_broker_points_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_why_broker" CASCADE;
  DROP TABLE "_pages_v_blocks_why_broker_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_offer_bullets" CASCADE;
  DROP TABLE "_pages_v_blocks_offer_bullets_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_offer" CASCADE;
  DROP TABLE "_pages_v_blocks_offer_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_versus_table_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_versus_table_columns_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_versus_table_rows_values" CASCADE;
  DROP TABLE "_pages_v_blocks_versus_table_rows_values_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_versus_table_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_versus_table_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_versus_table" CASCADE;
  DROP TABLE "_pages_v_blocks_versus_table_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process" CASCADE;
  DROP TABLE "_pages_v_blocks_process_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_calculator" CASCADE;
  DROP TABLE "_pages_v_blocks_calculator_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_loan_programs_list" CASCADE;
  DROP TABLE "_pages_v_blocks_loan_programs_list_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_audience_grid_audiences" CASCADE;
  DROP TABLE "_pages_v_blocks_audience_grid_audiences_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_audience_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_audience_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_guarantee" CASCADE;
  DROP TABLE "_pages_v_blocks_guarantee_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_founder_credentials" CASCADE;
  DROP TABLE "_pages_v_blocks_founder_credentials_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_founder" CASCADE;
  DROP TABLE "_pages_v_blocks_founder_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_bilingual" CASCADE;
  DROP TABLE "_pages_v_blocks_bilingual_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_teasers" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_teasers_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_list" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_list_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_final_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_final_cta_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_form_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_form_embed_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "loan_programs_pros" CASCADE;
  DROP TABLE "loan_programs_pros_locales" CASCADE;
  DROP TABLE "loan_programs_cons" CASCADE;
  DROP TABLE "loan_programs_cons_locales" CASCADE;
  DROP TABLE "loan_programs" CASCADE;
  DROP TABLE "loan_programs_locales" CASCADE;
  DROP TABLE "_loan_programs_v_version_pros" CASCADE;
  DROP TABLE "_loan_programs_v_version_pros_locales" CASCADE;
  DROP TABLE "_loan_programs_v_version_cons" CASCADE;
  DROP TABLE "_loan_programs_v_version_cons_locales" CASCADE;
  DROP TABLE "_loan_programs_v" CASCADE;
  DROP TABLE "_loan_programs_v_locales" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "faqs_locales" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "reviews_locales" CASCADE;
  DROP TABLE "categories_breadcrumbs" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_checkbox_locales" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_country_locales" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_email_locales" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_message_locales" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_number_locales" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select_options_locales" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_select_locales" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_state_locales" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_text_locales" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_blocks_textarea_locales" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms_emails_locales" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "forms_locales" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "search_categories" CASCADE;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_locales" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "site_settings_social" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_blocks_marquee_mode";
  DROP TYPE "public"."enum_pages_blocks_why_broker_points_icon_key";
  DROP TYPE "public"."enum_pages_blocks_audience_grid_audiences_icon_key";
  DROP TYPE "public"."enum_pages_blocks_testimonials_mode";
  DROP TYPE "public"."enum_pages_blocks_blog_teasers_mode";
  DROP TYPE "public"."enum_pages_blocks_faq_list_mode";
  DROP TYPE "public"."enum_pages_blocks_rich_text_max_width";
  DROP TYPE "public"."enum_pages_locale";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_mode";
  DROP TYPE "public"."enum__pages_v_blocks_why_broker_points_icon_key";
  DROP TYPE "public"."enum__pages_v_blocks_audience_grid_audiences_icon_key";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_mode";
  DROP TYPE "public"."enum__pages_v_blocks_blog_teasers_mode";
  DROP TYPE "public"."enum__pages_v_blocks_faq_list_mode";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_max_width";
  DROP TYPE "public"."enum__pages_v_version_locale";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum_loan_programs_icon_key";
  DROP TYPE "public"."enum_loan_programs_status";
  DROP TYPE "public"."enum__loan_programs_v_version_icon_key";
  DROP TYPE "public"."enum__loan_programs_v_version_status";
  DROP TYPE "public"."enum__loan_programs_v_published_locale";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_footer_nav_items_link_type";
  DROP TYPE "public"."enum_site_settings_social_platform";`)
}
