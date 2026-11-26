import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CloudPanel } from "@/components/CloudPanel";
import type { CloudResult } from "@/lib/cloud.functions";

const connectedResult: CloudResult = {
  status: {
    enabled: true,
    backend: "supabase",
    apiKey: "ck_test",
    supabaseUrl: "https://workspace-project.supabase.co",
    supabaseKey: "sb_publishable_workspace",
    tables: [],
    userCount: 0,
    fileCount: 0,
  },
};

describe("One-click Supabase connection", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("connects the workspace Supabase project without asking for a URL or key", async () => {
    vi.stubEnv("VITE_SUPABASE_URL", "https://workspace-project.supabase.co");
    vi.stubEnv("VITE_SUPABASE_PUBLISHABLE_KEY", "sb_publishable_workspace");
    const run = vi.fn().mockResolvedValue(connectedResult);

    render(<CloudPanel projectId="project-1" status={null} run={run} />);
    fireEvent.click(screen.getByRole("button", { name: "Connect to Supabase" }));

    await waitFor(() =>
      expect(run).toHaveBeenCalledWith({
        action: "connectSupabase",
        supabaseUrl: "https://workspace-project.supabase.co",
        supabaseKey: "sb_publishable_workspace",
      }),
    );
    expect(run).toHaveBeenCalledTimes(1);
  });
});
