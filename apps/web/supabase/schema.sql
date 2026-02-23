-- Demo Results: stores all demo interactions
create table if not exists demo_results (
  id uuid default gen_random_uuid() primary key,
  demo_type text not null,
  input_data jsonb not null default '{}',
  output_data jsonb not null default '{}',
  ip_hash text not null,
  created_at timestamptz default now()
);

create index idx_demo_results_type on demo_results (demo_type);
create index idx_demo_results_ip on demo_results (ip_hash);
create index idx_demo_results_created on demo_results (created_at);

-- Contacts: stores contact form submissions
create table if not exists contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text,
  message text not null,
  ai_analysis jsonb not null default '{}',
  ai_response text not null default '',
  created_at timestamptz default now()
);

create index idx_contacts_email on contacts (email);
create index idx_contacts_created on contacts (created_at);

-- Demo Analytics: daily usage tracking per demo
create table if not exists demo_analytics (
  id uuid default gen_random_uuid() primary key,
  demo_type text not null,
  usage_count integer not null default 0,
  date date not null default current_date,
  unique(demo_type, date)
);

create index idx_demo_analytics_type on demo_analytics (demo_type);
create index idx_demo_analytics_date on demo_analytics (date);

-- Lead Qualifier Conversations: stores chat sessions
create table if not exists lead_conversations (
  id uuid default gen_random_uuid() primary key,
  session_id text not null,
  messages jsonb not null default '[]',
  qualification_report jsonb,
  ip_hash text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_lead_conversations_session on lead_conversations (session_id);
