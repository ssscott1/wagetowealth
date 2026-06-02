-- Wages to Wealth Database Schema
-- Run this in your Supabase SQL editor

-- Employers table
CREATE TABLE employers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  slug TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_status TEXT DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'past_due', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Employer admins
CREATE TABLE employer_admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employer_id UUID REFERENCES employers(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Employees
CREATE TABLE employees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employer_id UUID REFERENCES employers(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  onboarded_at TIMESTAMPTZ DEFAULT NOW(),
  literacy_score INTEGER DEFAULT 0 CHECK (literacy_score >= 0 AND literacy_score <= 100),
  UNIQUE(user_id)
);

-- Modules (data managed in code, but table for CMS use)
CREATE TABLE modules (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz attempts
CREATE TABLE quiz_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
  module_id INTEGER NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  answers_json JSONB,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Calculator events (analytics only)
CREATE TABLE calculator_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
  calculator_type TEXT NOT NULL,
  inputs_json JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hardship referrals (anonymised)
CREATE TABLE hardship_referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
  referral_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE employer_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE hardship_referrals ENABLE ROW LEVEL SECURITY;

-- EMPLOYERS: employer admins can read their own employer
CREATE POLICY "employer_admins_read_own_employer" ON employers
  FOR SELECT USING (
    id IN (
      SELECT employer_id FROM employer_admins WHERE user_id = auth.uid()
    )
  );

-- EMPLOYER_ADMINS: users can read their own admin record
CREATE POLICY "employer_admin_read_own" ON employer_admins
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "employer_admin_insert_own" ON employer_admins
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- EMPLOYEES: employees can read/update their own record
CREATE POLICY "employee_read_own" ON employees
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "employee_insert_own" ON employees
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "employee_update_own" ON employees
  FOR UPDATE USING (user_id = auth.uid());

-- Employer admins can see their employees (aggregate view — email + onboarded_at only)
CREATE POLICY "employer_admin_read_employees" ON employees
  FOR SELECT USING (
    employer_id IN (
      SELECT employer_id FROM employer_admins WHERE user_id = auth.uid()
    )
  );

-- MODULES: everyone can read published modules
CREATE POLICY "public_read_modules" ON modules
  FOR SELECT USING (is_published = TRUE);

-- QUIZ_ATTEMPTS: employees can read/insert their own
CREATE POLICY "employee_read_own_attempts" ON quiz_attempts
  FOR SELECT USING (
    employee_id IN (SELECT id FROM employees WHERE user_id = auth.uid())
  );

CREATE POLICY "employee_insert_own_attempt" ON quiz_attempts
  FOR INSERT WITH CHECK (
    employee_id IN (SELECT id FROM employees WHERE user_id = auth.uid())
  );

-- CALCULATOR_EVENTS: employees can insert their own
CREATE POLICY "employee_insert_calc_event" ON calculator_events
  FOR INSERT WITH CHECK (
    employee_id IN (SELECT id FROM employees WHERE user_id = auth.uid())
  );

-- HARDSHIP_REFERRALS: employees can insert their own
CREATE POLICY "employee_insert_hardship" ON hardship_referrals
  FOR INSERT WITH CHECK (
    employee_id IN (SELECT id FROM employees WHERE user_id = auth.uid())
  );

-- Employer admins can count hardship referrals for their employees
CREATE POLICY "employer_admin_count_hardship" ON hardship_referrals
  FOR SELECT USING (
    employee_id IN (
      SELECT e.id FROM employees e
      JOIN employer_admins ea ON ea.employer_id = e.employer_id
      WHERE ea.user_id = auth.uid()
    )
  );

-- Seed module data
INSERT INTO modules (id, title, slug, category, is_published, sort_order) VALUES
(1, 'Budgeting & Saving', 'budgeting-saving', 'Foundations', TRUE, 1),
(2, 'Banking Basics', 'banking-basics', 'Foundations', TRUE, 2),
(3, 'Debt & Credit', 'debt-credit', 'Foundations', TRUE, 3),
(4, 'Buying a House', 'buying-a-house', 'Property', TRUE, 4),
(5, 'Getting a Mortgage', 'getting-a-mortgage', 'Property', TRUE, 5),
(6, 'Buying a Car', 'buying-a-car', 'Borrowing', TRUE, 6),
(7, 'Personal Loans', 'personal-loans', 'Borrowing', TRUE, 7),
(8, 'Buying an Investment Property', 'investment-property', 'Investing', TRUE, 8),
(9, 'Buying Shares & ETFs', 'shares-etfs', 'Investing', TRUE, 9),
(10, 'Superannuation', 'superannuation', 'Retirement', TRUE, 10);
