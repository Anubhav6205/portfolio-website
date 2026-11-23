export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "recognition", label: "Recognition" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
] as const;

export const navSections = sections.filter((s) =>
  ["about", "experience", "work", "writing", "contact"].includes(s.id),
);
