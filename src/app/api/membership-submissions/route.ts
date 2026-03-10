import { NextResponse } from "next/server";
import { appendMembershipSubmission, isSupabaseConfigured } from "@/lib/supabase";

type MembershipSubmissionBody = {
  fullName?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  vehicle?: string;
  whyJoin?: string;
};

function requireField(value: string | undefined, label: string) {
  if (!value?.trim()) {
    throw new Error(`${label} is required.`);
  }
  return value.trim();
}

export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 });
    }

    const body = (await request.json()) as MembershipSubmissionBody;
    const submission = await appendMembershipSubmission({
      fullName: requireField(body.fullName, "Full name"),
      email: requireField(body.email, "Email"),
      phone: requireField(body.phone, "Phone"),
      city: requireField(body.city, "City"),
      state: requireField(body.state, "State"),
      vehicle: requireField(body.vehicle, "Vehicle"),
      whyJoin: requireField(body.whyJoin, "Why you want to join"),
    });

    return NextResponse.json({ submission });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to submit membership form." },
      { status: 400 },
    );
  }
}
