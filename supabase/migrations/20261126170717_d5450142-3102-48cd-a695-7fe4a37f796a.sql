CREATE TABLE public.supabase_oauth_states (
  state_hash text PRIMARY KEY,
  user_id uuid NOT NULL,
  project_id text NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  code_verifier_ciphertext text NOT NULL,
  redirect_uri text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.supabase_oauth_states TO service_role;
ALTER TABLE public.supabase_oauth_states ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.supabase_oauth_connections (
  user_id uuid PRIMARY KEY,
  access_token_ciphertext text NOT NULL,
  refresh_token_ciphertext text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.supabase_oauth_connections TO service_role;
ALTER TABLE public.supabase_oauth_connections ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.cloud_projects
  ADD COLUMN IF NOT EXISTS supabase_project_ref text,
  ADD COLUMN IF NOT EXISTS supabase_project_name text,
  ADD COLUMN IF NOT EXISTS supabase_organization_slug text;