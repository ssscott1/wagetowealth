# Wages to Wealth

A white-label financial literacy platform for Australian employers. ASIC-compliant general information and education only.

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS v4
- **Backend/Auth/DB:** Supabase (PostgreSQL + Auth + RLS)
- **Payments:** Stripe
- **Hosting:** Netlify
- **Charts:** Recharts

## Quick Start

### 1. Clone & Install

```bash
git clone <repo>
cd wagetowealth
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the full contents of `supabase/migrations.sql`
3. Copy your **Project URL** and **anon key** from Settings → API

### 3. Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create three products (Starter, Growth, Enterprise) with monthly pricing
3. Copy the price IDs for each

### 4. Environment Variables

```bash
cp .env.example .env
```

Fill in `.env`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_STRIPE_STARTER_PRICE_ID=price_...
VITE_STRIPE_GROWTH_PRICE_ID=price_...
VITE_STRIPE_ENTERPRISE_PRICE_ID=price_...
VITE_SUPER_ADMIN_EMAILS=your@email.com
```

### 5. Run Locally

```bash
npm run dev
```

### 6. Deploy to Netlify

1. Push to GitHub
2. Connect repo in Netlify dashboard
3. Set build command: `npm run build`, publish directory: `dist`
4. Add all environment variables in Netlify → Site Settings → Environment Variables

## User Roles

| Role | Access | How Created |
|------|--------|-------------|
| **Super Admin** | Full platform, all employers, content management | Email listed in `VITE_SUPER_ADMIN_EMAILS` |
| **Employer Admin** | Their employer's dashboard, employee management, Stripe billing | Registers at `/register/employer` |
| **Employee** | Modules, calculators, quizzes, personal dashboard | Clicks employer invite link `/register/employee?employer=<id>` |

## Folder Structure

```
src/
  components/
    calculators/    # 10 calculator components
    layout/         # Navbar, Footer, Layout
    quiz/           # QuizEngine
    ui/             # AsicWarning, LiteracyGauge
  data/
    modules.js      # All 10 module definitions + quiz questions
  hooks/
    useAuth.jsx     # Auth context + role detection
  lib/
    supabase.js     # Supabase client
    stripe.js       # Stripe client + plan config
  pages/
    admin/          # EmployerAdmin, SuperAdmin
    auth/           # Login, RegisterEmployer, RegisterEmployee
    *.jsx           # All page components
```

## ASIC Compliance Notes

- Every content page shows the General Advice Warning banner
- Every calculator shows a disclaimer
- Footer on every page includes the full ASIC general information disclaimer
- No personal advice is given, no products are recommended, no AFSL required
- Content sourced from moneysmart.gov.au and publicly available educational materials

## Key Features

- **10 Learning Modules** covering budgeting, banking, debt, property, shares, super
- **10 Interactive Calculators** all client-side with sliders and result cards
- **Quiz Engine** with per-question feedback, scoring, and Supabase persistence
- **Financial Literacy Score** (0–100 gauge) updated after each quiz
- **Mortgage Rate Negotiation Guide** with script cards and outcome tracker
- **Financial Hardship Page** with contacts, scripts, and anonymised referral logging
- **Employer Admin Dashboard** with aggregate engagement stats
- **Super Admin Dashboard** with platform-wide analytics
- **White-label ready** (employer name + logo on dashboard)
- **Employee privacy enforced** via Supabase Row Level Security

## Database

See `supabase/migrations.sql` for the full schema with RLS policies.

Tables: `employers`, `employer_admins`, `employees`, `modules`, `quiz_attempts`, `calculator_events`, `hardship_referrals`
