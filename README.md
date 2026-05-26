# DealFlow

A simple CRM dashboard for student freelancers, solo service providers, and small agency owners to track leads, follow-ups, deal stages, notes, and projected revenue.

Features
- Sign up / Log in with Supabase Auth
- Create, read, update, delete leads
- Search and filter leads
- Dashboard with pipeline metrics and recent leads
- Follow-ups view for upcoming tasks

Tech stack
- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS
- Supabase (Auth + Postgres)

Getting started

1. Install dependencies

```bash
npm install
```

2. Configure Supabase
- Create a Supabase project and enable Auth (email).
- Run the SQL in `supabase/schema.sql` to create the `leads` table and policies.
- (Optional) Run `supabase/seed.sql` to add sample data.
- Set environment variables in a `.env.local` file using `.env.example` as reference.

3. Run the app

```bash
npm run dev
```

Deployment
- The app is ready to deploy to Vercel. Add the two `NEXT_PUBLIC_SUPABASE_*` environment variables in the Vercel project settings.

Database notes
- The `leads` table uses row-level security so users only see their own leads.
- A helper RPC `leads_count_by_status` is provided for simple status breakdowns.

Known limitations
- This is a small demo app. Invitation flows, password reset, and advanced security considerations are not implemented.

Future improvements
- Add pagination and sorting controls
- Better date formatting and localization
- Add CSV export/import for leads

Resume bullets
- Built a full-stack CRM web app using Next.js, TypeScript, Supabase, and PostgreSQL to help freelancers manage leads, follow-ups, deal stages, and revenue pipeline data.
- Implemented authenticated user-specific lead management with protected routes, row-level security, searchable/filterable lead views, CRUD workflows, and dashboard metrics.

Screenshots
- (Add screenshots here)
# DealFlow
Full-stack CRM dashboard for freelancers to track leads, follow-ups, deal stages, and revenue pipeline.
