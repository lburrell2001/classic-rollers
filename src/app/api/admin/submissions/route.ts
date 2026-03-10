import { NextResponse } from "next/server";
import { getAdminPassword, readSubmissionStore } from "@/lib/supabase";

type AdminSubmissionsBody = {
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AdminSubmissionsBody;
    if (body.password !== getAdminPassword()) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const submissions = await readSubmissionStore();
    return NextResponse.json(submissions);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load submissions." },
      { status: 500 },
    );
  }
}
