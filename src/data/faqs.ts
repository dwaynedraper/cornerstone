/**
 * FAQ content. Rendered as an accordion AND emitted as FAQPage structured data
 * (rich results in Google + a signal AI assistants can quote). Written to
 * convert, not just answer.
 */
export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "Do you work with production and volume homebuilders?",
    answer:
      "Yes. A large share of our work is residential land development for production homebuilders — designing and surveying subdivisions and delivering build-ready lots on the schedules builders run on.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We're based in North Texas and do most of our work across the region. We're also licensed in more than 15 states and take on residential and development projects nationwide.",
  },
  {
    question: "Can you take a project from raw land all the way to recorded lots?",
    answer:
      "Yes. We handle the full path — civil engineering, surveying, platting, and coordination with city and county jurisdictions — so a raw tract becomes recorded, build-ready residential lots.",
  },
  {
    question: "Do you handle one-off lots for custom builders, or only large subdivisions?",
    answer:
      "Both. Subdivisions are our focus, but we regularly handle one-off engineering and survey work for individual builders and lots.",
  },
  {
    question: "How do I get started or request a quote?",
    answer:
      "Call us at (817) 940-6027 or send a note through our contact page with a little about your site or project. We'll get back to you to talk scope and timeline.",
  },
];
