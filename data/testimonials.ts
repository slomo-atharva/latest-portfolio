export type TestimonialTone = "blue" | "gold";

export type Testimonial = {
  id: string;
  author: string;
  role: string;
  company: string;
  badge: string;
  date: string;
  quote: string;
  initials: string;
  tone: TestimonialTone;
};

export const praiseCopy = {
  kicker: "Manager praise",
  title: "What people say about working with me.",
  description:
    "Internal Keka shout-outs from leaders I worked with at Gravity One.",
};

export const testimonials: Testimonial[] = [
  {
    id: "vikram-rao",
    author: "Vikram Rao",
    role: "Design Director",
    company: "Gravity One",
    badge: "Above & Beyond",
    date: "10 Feb 2026",
    quote:
      "This shout out goes to Akshay Krishnan for all the good work he's done thus far on the SDZ and SDZ Orchestrate engagements. Very well done!",
    initials: "VR",
    tone: "blue",
  },
  {
    id: "meenal-saxena",
    author: "Meenal Saxena",
    role: "Product Management Director",
    company: "Gravity One",
    badge: "Being Keka",
    date: "08 Oct 2025",
    quote:
      "I really appreciated Akshay's thoughtful approach to design - his attention to detail and ability to translate ideas into intuitive, user-friendly experiences made a clear difference. He consistently ensured that every element was well-considered and aligned with the product vision, bringing both creativity and precision to each deliverable.",
    initials: "MS",
    tone: "gold",
  },
];
