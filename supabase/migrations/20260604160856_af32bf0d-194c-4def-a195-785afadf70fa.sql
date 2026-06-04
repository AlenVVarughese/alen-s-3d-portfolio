CREATE TABLE public.portfolio_settings (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  edit_pin_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT ALL ON public.portfolio_settings TO service_role;

ALTER TABLE public.portfolio_settings ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.update_portfolio_settings_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_portfolio_settings_updated_at
BEFORE UPDATE ON public.portfolio_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_portfolio_settings_updated_at();