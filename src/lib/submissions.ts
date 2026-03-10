export type MembershipSubmission = {
  id: string;
  submittedAt: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  vehicle: string;
  whyJoin: string;
};

export type ScholarshipSubmission = {
  id: string;
  submittedAt: string;
  scholarshipId: string;
  scholarshipTitle: string;
  fullName: string;
  email: string;
  phone: string;
  school: string;
  graduationYear: string;
  essay: string;
};

export type SubmissionStore = {
  membership: MembershipSubmission[];
  scholarship: ScholarshipSubmission[];
};

export function cloneDefaultSubmissionStore(): SubmissionStore {
  return {
    membership: [],
    scholarship: [],
  };
}
