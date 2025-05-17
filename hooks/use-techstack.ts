export interface TechStack {
  name: string;
  icon: any;
  category: string;
  proficiency: number;
  description: string;
  yearsExperience: number;
}

export function useTechStack(): TechStack[] {
  return [
    {
      name: "React",
      icon: "code",
      category: "Frontend",
      proficiency: 90,
      description:
        "Building complex user interfaces with React, Redux, and React hooks. Experienced with performance optimization and component architecture.",
      yearsExperience: 4,
    },
    {
      name: "Next.js",
      icon: "layout",
      category: "Frontend",
      proficiency: 85,
      description:
        "Creating server-side rendered and statically generated applications with Next.js. Familiar with App Router and Pages Router.",
      yearsExperience: 3,
    },
    {
      name: "TypeScript",
      icon: "code",
      category: "Language",
      proficiency: 80,
      description:
        "Writing type-safe code with TypeScript. Experienced with advanced types, generics, and integration with various frameworks.",
      yearsExperience: 3,
    },
    {
      name: "Node.js",
      icon: "server",
      category: "Backend",
      proficiency: 75,
      description:
        "Building scalable backend services with Node.js. Experienced with Express, authentication, and API development.",
      yearsExperience: 3,
    },
    {
      name: "Express",
      icon: "server",
      category: "Backend",
      proficiency: 80,
      description:
        "Creating RESTful APIs and web servers with Express. Familiar with middleware, routing, and error handling.",
      yearsExperience: 3,
    },
    {
      name: "MongoDB",
      icon: "database",
      category: "Database",
      proficiency: 70,
      description:
        "Designing and implementing MongoDB databases. Experienced with Mongoose, aggregation pipelines, and indexing.",
      yearsExperience: 2,
    },
    {
      name: "PostgreSQL",
      icon: "database",
      category: "Database",
      proficiency: 65,
      description:
        "Working with relational databases using PostgreSQL. Familiar with complex queries, transactions, and performance optimization.",
      yearsExperience: 2,
    },
    {
      name: "Tailwind CSS",
      icon: "palette",
      category: "Styling",
      proficiency: 95,
      description:
        "Creating responsive and beautiful UIs with Tailwind CSS. Experienced with customization, plugins, and component design.",
      yearsExperience: 3,
    },
    {
      name: "Git",
      icon: "git-branch",
      category: "Tool",
      proficiency: 85,
      description:
        "Version control with Git. Experienced with branching strategies, conflict resolution, and collaborative workflows.",
      yearsExperience: 4,
    },
    {
      name: "Docker",
      icon: "package",
      category: "dev-ops",
      proficiency: 60,
      description:
        "Containerizing applications with Docker. Familiar with Docker Compose, multi-stage builds, and deployment strategies.",
      yearsExperience: 2,
    },
    {
      name: "AWS",
      icon: "globe",
      category: "Cloud",
      proficiency: 55,
      description:
        "Deploying and managing applications on AWS. Familiar with S3, EC2, Lambda, and CloudFormation.",
      yearsExperience: 2,
    },
    // {
    //   name: "Jest",
    //   icon: "test-tube",
    //   category: "Testing",
    //   proficiency: 75,
    //   description:
    //     "Writing unit and integration tests with Jest. Experienced with mocking, snapshot testing, and test-driven development.",
    //   yearsExperience: 3,
    // },
  ];
}
