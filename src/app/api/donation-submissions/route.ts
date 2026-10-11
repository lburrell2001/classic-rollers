import { NextResponse } from "next/server";
import { appendDonationSubmission, isSupabaseConfigured } from "@/lib/supabase";

type DonationSubmissionBody = {
  fullName?: string;
  email?: string;
  phone?: string;
  giftType?: string;
  amount?: string;
  message?: string;
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

    const body = (await request.json()) as DonationSubmissionBody;
    const submission = await appendDonationSubmission({
      fullName: requireField(body.fullName, "Full name"),
      email: requireField(body.email, "Email"),
      phone: body.phone?.trim() ?? "",
      giftType: requireField(body.giftType, "Type of gift"),
      amount: body.amount?.trim() ?? "",
      message: body.message?.trim() ?? "",
    });

    return NextResponse.json({ submission });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to submit donation form." },
      { status: 400 },
    );
  }
}
