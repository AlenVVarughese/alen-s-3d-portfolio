import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const PORTFOLIO_ID = "main";

async function hashPin(pin: string) {
  const encoded = new TextEncoder().encode(pin.trim());
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export const getPortfolioSettings = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await (supabaseAdmin as any)
    .from("portfolio_settings")
    .select("data, edit_pin_hash, updated_at")
    .eq("id", PORTFOLIO_ID)
    .maybeSingle();

  if (error) throw new Error("Unable to load shared portfolio updates.");

  return {
    data: data?.data ?? null,
    hasPin: Boolean(data?.edit_pin_hash),
    updatedAt: data?.updated_at ?? null,
  };
});

export const savePortfolioSettings = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        data: z.record(z.any()),
        pin: z.string().min(4).max(64),
      })
      .parse(input),
  )
  .handler(async ({ data: input }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const table = (supabaseAdmin as any).from("portfolio_settings");
    const { data: existing, error: readError } = await table
      .select("edit_pin_hash")
      .eq("id", PORTFOLIO_ID)
      .maybeSingle();

    if (readError) throw new Error("Unable to verify editor access.");

    const incomingHash = await hashPin(input.pin);
    const existingHash = existing?.edit_pin_hash as string | null | undefined;

    if (existingHash && incomingHash !== existingHash) {
      return { ok: false, error: "Incorrect editor PIN." };
    }

    const { error: saveError } = await table.upsert(
      {
        id: PORTFOLIO_ID,
        data: input.data,
        edit_pin_hash: existingHash ?? incomingHash,
      },
      { onConflict: "id" },
    );

    if (saveError) throw new Error("Unable to save shared portfolio updates.");

    return { ok: true, error: null };
  });