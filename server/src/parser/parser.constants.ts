export interface SubjectDefinition {
  code: string;
  name: string;
  credits: number;
}

export const SEM4_SUBJECTS: SubjectDefinition[] = [
  {
    code: "ML",
    name: "Machine Learning",
    credits: 6,
  },
  {
    code: "CN",
    name: "Computer Networks",
    credits: 4,
  },
  {
    code: "VC",
    name: "Vector Calculus",
    credits: 3,
  },
  {
    code: "SE",
    name: "Software Engineering",
    credits: 3,
  },
  {
    code: "UIUX",
    name: "Introduction to UI/UX",
    credits: 3,
  },
  {
    code: "ENT",
    name: "Entrepreneurship",
    credits: 3,
  },
  {
    code: "SUS",
    name: "Sustainable Energy",
    credits: 2,
  },
];
