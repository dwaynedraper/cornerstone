export interface Faq {
  question: string;
  answer: string;
}

/**
 * No FAQ is approved yet, so the section stays hidden. Suggested questions
 * are stored as drafts in the admin (see supabase/relaunch.sql and
 * docs/suggested-content.md).
 */
export const faqs: Faq[] = [];
