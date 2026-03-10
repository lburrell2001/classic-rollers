import { NextResponse } from "next/server";
import { appendScholarshipSubmission, isSupabaseConfigured, readPublishedSiteContent } from "@/lib/supabase";

type ScholarshipSubmissionBody = {
  scholarshipId?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  school?: string;
  graduationYear?: string;
  essay?: string;
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

    const body = (await request.json()) as ScholarshipSubmissionBody;
    const scholarshipId = requireField(body.scholarshipId, "Scholarship");
    const content = await readPublishedSiteContent();
    const scholarship = content.scholarship.items.find((item) => item.id === scholarshipId);

    if (!scholarship) {
      return NextResponse.json({ error: "Selected scholarship was not found." }, { status: 400 });
    }

    const submission = await appendScholarshipSubmission({
      scholarshipId,
      scholarshipTitle: scholarship.title,
      fullName: requireField(body.fullName, "Full name"),
      email: requireField(body.email, "Email"),
      phone: requireField(body.phone, "Phone"),
      school: requireField(body.school, "School"),
      graduationYear: requireField(body.graduationYear, "Graduation year"),
      essay: requireField(body.essay, "Essay"),
    });

    return NextResponse.json({ submission });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to submit scholarship form." },
      { status: 400 },
    );
  }
}
