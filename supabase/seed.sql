-- Seed some demo leads for local testing
insert into public.leads (user_id, name, company, email, phone, source, status, deal_value, next_follow_up_date, last_contacted_date, notes)
values
  ('00000000-0000-0000-0000-000000000001','Acme Co','Acme','alice@acme.com','+1 555-1111','Referral','New',1200,'2026-06-03','2026-05-20','Interested in branding'),
  ('00000000-0000-0000-0000-000000000001','Beta LLC','Beta','bob@beta.com','+1 555-2222','LinkedIn','Contacted',3000,'2026-05-30','2026-05-15','Asked for proposal');
