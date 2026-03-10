# Classic Rollers Website

Production-ready marketing site for **Unlimited Classic Rollers Car Club** built with Next.js App Router, TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run lint
npm run build
```

## Supabase Setup

Copy [`.env.example`](/Users/laurenburrell/classic-rollers/.env.example) to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_SITE_IMAGES_BUCKET=site-images
ADMIN_PASSWORD=classicrollersamarillotx
```

Run the SQL in [`supabase/migrations/20260310_create_site_content.sql`](/Users/laurenburrell/classic-rollers/supabase/migrations/20260310_create_site_content.sql) against your Supabase project. That creates:

- `public.site_content` for the saved site JSON
- `site-images` storage bucket for uploaded admin images

The admin editor now:

- loads published content from `/api/content`
- saves published content through `/api/admin/content`
- uploads replacement images through `/api/admin/upload`
- uses the mobile preview iframe without storing draft images in `localStorage`

## Assumptions

- `info@classicrollers.org` is used as a temporary `mailto:` destination for the contact form until an official inbox is confirmed.
- `https://classicrollers.org` is used as `metadataBase` for SEO metadata and social cards.
- Scholarship and membership PDFs in `/public/forms/` are placeholder files and should be replaced with official final forms when available.
- Gallery images in `/public/gallery/` are local placeholder graphics intended for v1 launch until real club photos are provided.
