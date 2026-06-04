CREATE POLICY "No direct client access to portfolio settings"
ON public.portfolio_settings
FOR ALL
TO public
USING (false)
WITH CHECK (false);