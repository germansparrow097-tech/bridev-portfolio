"use strict";

const projects = {
  achtari: {
    kind: "MOBILE / COMMUNITY APP",
    title: "AchTari",
    description:
      "A Morocco-first neighborhood community app, previously named Hayna. I worked on its mobile experience using React Native, Expo and Firebase.",
    features: [
      "Neighborhood feed and post interactions",
      "Profile and neighborhood setup",
      "Comments, alerts and reporting",
      "English, French and Arabic content",
    ],
    images: [
      [
        "assets/achtari-language.png",
        "Language selection: Arabic, French and English",
      ],
      [
        "assets/achtari-services.png",
        "Local-services locked preview and invite screen",
      ],
    ],
    tags: ["React Native", "Expo", "TypeScript", "Firebase"],
    disclosure:
      "The card uses AI-assisted studio device mockups based on developer-supplied screenshots; small interface details may differ. The original screenshots below show language selection and the local-services preview. The services screen is marked as a locked preview, not a fully released marketplace. No AchTari source code is included in this portfolio.",
    url: null,
  },
  masari: {
    kind: "MOBILE / IN DEVELOPMENT",
    title: "Masari",
    description:
      "A mobile job-search companion, with onboarding and job-preference flows. These screenshots show the app in development.",
    features: [
      "French onboarding introducing application tracking",
      "Job-category selection and a multi-step preferences flow",
      "Mobile interfaces built with React Native and Expo",
    ],
    tags: ["React Native", "Expo", "TypeScript", "Mobile UI"],
    disclosure:
      "Screenshots show development and onboarding UI, including illustrative application statuses. The app is in development; its source code is not included in this portfolio repository.",
    url: null,
    images: [
      ["assets/masari-onboarding.png", "Application-tracking onboarding"],
      ["assets/masari-preferences.png", "Job-category preferences"],
    ],
  },
  neon: {
    kind: "INTERACTIVE / PUBLIC REPOSITORY",
    title: "Neon Runner",
    description:
      "A neon-lit browser runner. Jump over barriers, find a rhythm, and try to beat your last score.",
    features: [
      "Keyboard and touch-friendly controls",
      "Increasing difficulty, collisions, pause and restart",
      "A personal best saved in the browser",
      "Eight automated gameplay tests and GitHub checks",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Canvas", "Node test runner"],
    disclosure:
      "Started as my interface prototype. The playable version, visual design, documentation and tests were completed with AI assistance. The repository preserves both stages with their actual commit dates.",
    url: "https://github.com/germansparrow097-tech/Neon-runner",
  },
  chat: {
    kind: "FULL STACK / LOCAL PROTOTYPE",
    title: "Real-time Chat",
    description:
      "A chat application exploring connected interfaces with an Express server and Socket.IO real-time events.",
    features: [
      "Registration and login flows using JWT and bcrypt",
      "Private messages, typing indicators and online presence",
      "Image upload handling with Multer",
      "A three-column conversation interface",
    ],
    tags: ["Node.js", "Express", "Socket.IO", "JavaScript", "HTML", "CSS"],
    disclosure:
      "The current version uses temporary in-memory mock data. This is a local prototype, not a deployed production service. Source publication is pending; the card artwork is an illustrative presentation.",
    url: null,
  },
  products: {
    kind: "WEB APPLICATION / LOCAL PROJECT",
    title: "Product Management",
    description:
      "A browser-based CRUD project for creating, finding, updating and deleting product records.",
    features: [
      "Product title, category and pricing inputs",
      "Totals calculated from price, taxes, advertising and discounts",
      "Search by title or category",
      "Product records kept in browser local storage",
    ],
    images: [
      [
        "assets/product-management-real.png",
        "Actual product-management interface with demo data",
      ],
    ],
    tags: ["HTML", "CSS", "JavaScript", "Local storage"],
    disclosure:
      "A local learning project. It does not have a shared database or production authentication. The screenshot shows the actual interface populated with a clearly labelled demo product. Source publication is pending.",
    url: null,
  },
  python: {
    kind: "PYTHON / LEARNING PROJECTS",
    title: "Python Playground",
    description:
      "A collection of small Python experiments, including a Tkinter calculator, Turtle graphics and object-oriented programming exercises.",
    features: [
      "Desktop interface exploration with Tkinter",
      "Drawing and graphics with Turtle",
      "Classes, methods and object-oriented exercises",
      "Practice with program flow and standard-library tools",
    ],
    tags: ["Python", "Tkinter", "Turtle", "OOP"],
    disclosure:
      "These are learning exercises, not production tools. The calculator still needs input-validation and error-handling improvements before release. The code artwork on the project card is illustrative. Source publication is pending.",
    url: null,
  },
};
