import Claude from "@/components/icons/claude";
import DeepSeek from "@/components/icons/deepseek";
import Gemini from "@/components/icons/gemini";
import Grok from "@/components/icons/grok";
import Mistral from "@/components/icons/mistral";
import OpenAI from "@/components/icons/openai";
import { mistral } from "@ai-sdk/mistral";
import { openai } from "@ai-sdk/openai";
import {
  BookOpenText,
  Brain,
  ChalkboardTeacher,
  ChatTeardropText,
  Code,
  GraduationCap,
  Lightbulb,
  MagnifyingGlass,
  Notepad,
  PenNib,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

// University-specific message limits
export const NON_AUTH_DAILY_MESSAGE_LIMIT = 10; // Increased for external users (e.g., prospective students)
export const AUTH_DAILY_MESSAGE_LIMIT = 200; // Higher for authenticated users (students/staff)
export const REMAINING_QUERY_ALERT_THRESHOLD = 5; // Notify users earlier
export const DAILY_FILE_UPLOAD_LIMIT = 15; // Increased for academic use
export const DAILY_SPECIAL_AGENT_LIMIT = 3; // Allow more special agent usage for research

export type Model = {
  id: string;
  name: string;
  provider: string;
  available?: boolean;
  api_sdk?: any;
  features?: {
    id: string;
    enabled: boolean;
  }[];
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// Unchanged: Models not available
export const MODELS_NOT_AVAILABLE = [
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    provider: "deepseek",
    available: false,
    api_sdk: false,
    features: [
      {
        id: "file-upload",
        enabled: false,
      },
    ],
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    provider: "gemini",
    available: false,
    api_sdk: false,
    features: [
      {
        id: "file-upload",
        enabled: true,
      },
    ],
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "claude",
    available: false,
    api_sdk: false,
    features: [
      {
        id: "file-upload",
        enabled: true,
      },
    ],
  },
  {
    id: "claude-3.7-sonnet",
    name: "Claude 3.7 Sonnet",
    provider: "claude",
    available: false,
    api_sdk: false,
    features: [
      {
        id: "file-upload",
        enabled: true,
      },
    ],
  },
  {
    id: "grok-2",
    name: "Grok 2",
    provider: "grok",
    available: false,
    api_sdk: false,
    features: [
      {
        id: "file-upload",
        enabled: true,
      },
    ],
  },
  {
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    provider: "gemini",
    available: false,
    api_sdk: false,
    features: [
      {
        id: "file-upload",
        enabled: true,
      },
    ],
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    provider: "gemini",
    available: false,
    api_sdk: false,
    features: [
      {
        id: "file-upload",
        enabled: true,
      },
    ],
  },
] as Model[];

// Unchanged: Available models
export const MODELS = [
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    provider: "openai",
    features: [
      {
        id: "file-upload",
        enabled: true,
      },
    ],
    api_sdk: openai("gpt-4.1"),
    icon: OpenAI,
    description:
      "OpenAI’s most powerful model. Excellent for academic writing, coding, and complex research tasks.",
  },
  {
    id: "gpt-4.1-mini",
    name: "GPT-4.1 Mini",
    provider: "openai",
    features: [
      {
        id: "file-upload",
        enabled: true,
      },
    ],
    api_sdk: openai("gpt-4.1-mini"),
    icon: OpenAI,
    description:
      "Fast and efficient for student assignments and quick academic queries.",
  },
  {
    id: "gpt-4.1-nano",
    name: "GPT-4.1 Nano",
    provider: "openai",
    features: [
      {
        id: "file-upload",
        enabled: true,
      },
    ],
    api_sdk: openai("gpt-4.1-nano"),
    icon: OpenAI,
    description:
      "Ultra-fast for simple tasks like summarizing lecture notes or answering FAQs.",
  },
  {
    id: "pixtral-large-latest",
    name: "Pixtral Large",
    provider: "mistral",
    features: [
      {
        id: "file-upload",
        enabled: true,
      },
    ],
    api_sdk: mistral("pixtral-large-latest"),
    description:
      "Mistral’s flagship model. Ideal for in-depth research and academic analysis.",
  },
  {
    id: "mistral-large-latest",
    name: "Mistral Large",
    provider: "mistral",
    features: [
      {
        id: "file-upload",
        enabled: false,
      },
    ],
    api_sdk: mistral("mistral-large-latest"),
    description:
      "Lightweight and fast for everyday university tasks like drafting emails.",
  },
] as Model[];

export const MODELS_OPTIONS = [
  ...MODELS.map((model) => ({
    ...model,
    available: true,
  })),
  ...MODELS_NOT_AVAILABLE,
] as Model[];

export type Provider = {
  id: string;
  name: string;
  available: boolean;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// Unchanged: Providers not available
export const PROVIDERS_NOT_AVAILABLE = [
  {
    id: "deepseek",
    name: "DeepSeek",
    available: false,
    icon: DeepSeek,
  },
  {
    id: "gemini",
    name: "Gemini",
    icon: Gemini,
    available: false,
  },
  {
    id: "claude",
    name: "Claude",
    available: false,
    icon: Claude,
  },
  {
    id: "grok",
    name: "Grok",
    available: false,
    icon: Grok,
  },
] as Provider[];

// Unchanged: Available providers
export const PROVIDERS = [
  {
    id: "openai",
    name: "OpenAI",
    icon: OpenAI,
  },
  {
    id: "mistral",
    name: "Mistral",
    icon: Mistral,
  },
] as Provider[];

export const PROVIDERS_OPTIONS = [
  ...PROVIDERS.map((provider) => ({
    ...provider,
    available: true,
  })),
  ...PROVIDERS_NOT_AVAILABLE,
] as Provider[];

export const MODEL_DEFAULT = "pixtral-large-latest";

export const APP_NAME = "AIDA";
export const APP_DOMAIN = "https://aida.university.edu"; // University-specific domain
export const APP_DESCRIPTION =
  "AIDA is an AI-powered assistant for university students, staff, and external users, offering academic support, research assistance, and campus resources.";

export const PERSONAS = [
  {
    id: "student-mentor",
    label: "Student Mentor",
    prompt: `You are a supportive peer mentor for university students, offering guidance on academic and campus life. Speak conversationally with a friendly, approachable tone, using phrases like "hey" or "no worries" to feel relatable. Share general advice based on common student experiences without claiming personal stories. Ask engaging follow-up questions to understand their needs. Your tone is warm, encouraging, and student-focused, helping them navigate university challenges.`,
    icon: ChatTeardropText,
  },
  {
    id: "academic-researcher",
    label: "Academic Researcher",
    prompt: `You are an experienced academic researcher with expertise in university-level disciplines. Approach queries with intellectual rigor, citing general trends or methodologies where relevant. Use a conversational yet professional tone, explaining complex ideas clearly for students and staff. Acknowledge uncertainties in research and present balanced perspectives. Ask questions to clarify the user's research goals, and tailor responses to academic contexts like literature reviews or grant proposals.`,
    icon: MagnifyingGlass,
  },
  {
    id: "professor",
    label: "Professor",
    prompt: `You are a seasoned university professor who adapts to diverse learning needs. Explain concepts with clear, relatable examples, building on the user’s existing knowledge. Use an encouraging, non-condescending tone, treating users as capable learners. Ask questions to guide critical thinking rather than giving direct answers. Incorporate humor or real-world academic examples to engage users. Be patient with misconceptions, framing them as part of the learning process.`,
    icon: ChalkboardTeacher,
  },
  {
    id: "software-engineer",
    label: "Software Engineer",
    prompt: `You are a senior developer who supports university students and staff with coding projects. Provide practical, maintainable code solutions with clear explanations. Use a conversational tone with occasional technical shorthand that feels authentic to academic settings. Discuss trade-offs in coding approaches, considering academic constraints like limited resources. Address real-world concerns like performance and debugging. Be straightforward, avoiding overly formal language, and encourage learning through coding.`,
    icon: Code,
  },
  {
    id: "academic-writer",
    label: "Academic Writer",
    prompt: `You are a skilled academic writer with a clear, scholarly voice. Craft responses with structured arguments and precise language, suitable for essays, reports, or proposals. Use a professional yet accessible tone, incorporating university-level vocabulary. Reference academic conventions (e.g., citations, thesis statements) when relevant. Encourage clarity and coherence in writing, offering constructive feedback. Ask questions to understand the user’s writing goals, such as assignment requirements or audience.`,
    icon: PenNib,
  },
  {
    id: "career-advisor",
    label: "Career Advisor",
    prompt: `You are a university career advisor who helps students and alumni prepare for professional opportunities. Offer practical advice on resumes, interviews, and job searches, tailored to academic and post-graduation contexts. Use a motivating, realistic tone, acknowledging job market challenges while encouraging progress. Provide examples of career strategies (e.g., networking, internships) and ask questions to understand the user’s goals. Stay informed on industry trends relevant to university graduates.`,
    icon: GraduationCap,
  },
];

export const SUGGESTIONS = [
  {
    label: "Summary",
    highlight: "Summarize",
    prompt: `Summarize`,
    items: [
      "Summarize a lecture on the Industrial Revolution",
      "Summarize this academic article in 5 sentences",
      "Summarize the key points of a campus policy",
      "Summarize the benefits of undergraduate research",
    ],
    icon: Notepad,
  },
  {
    label: "Code",
    highlight: "Help me",
    prompt: `Help me`,
    items: [
      "Help me write a Python script for data analysis",
      "Help me debug a Java program for a class project",
      "Help me create a SQL query for a university database",
      "Help me build a simple HTML page for a student club",
    ],
    icon: Code,
  },
  {
    label: "Writing",
    highlight: "Write",
    prompt: `Write`,
    items: [
      "Write an essay outline on renewable energy",
      "Write a professional email to a professor",
      "Write a cover letter for a research internship",
      "Write a literature review introduction",
    ],
    icon: PenNib,
  },
  {
    label: "Research",
    highlight: "Research",
    prompt: `Research`,
    items: [
      "Research the impact of AI on education",
      "Research best practices for academic citations",
      "Research funding opportunities for student projects",
      "Research campus sustainability initiatives",
    ],
    icon: BookOpenText,
  },
  {
    label: "Get inspired",
    highlight: "Inspire me",
    prompt: `Inspire me`,
    items: [
      "Inspire me with a quote about lifelong learning",
      "Inspire me with a study tip for exam season",
      "Inspire me with a vision for a student-led project",
      "Inspire me with a description of a campus event",
    ],
    icon: Sparkle,
  },
  {
    label: "Think deeply",
    highlight: "Reflect on",
    prompt: `Reflect on`,
    items: [
      "Reflect on the value of a liberal arts education",
      "Reflect on the role of mentorship in academia",
      "Reflect on balancing academics and well-being",
      "Reflect on the ethics of AI in education",
    ],
    icon: Brain,
  },
  {
    label: "Learn gently",
    highlight: "Explain",
    prompt: `Explain`,
    items: [
      "Explain statistical significance to a beginner",
      "Explain the scientific method in simple terms",
      "Explain how to use the university library database",
      "Explain the difference between undergraduate and graduate studies",
    ],
    icon: Lightbulb,
  },
];

export const SYSTEM_PROMPT_DEFAULT = `You are AIDA, a thoughtful and clear assistant for university students, staff, and external users. Your tone is calm, professional, and approachable, tailored to academic contexts. You provide concise, accurate answers that support learning, research, and campus life. Avoid jargon unless appropriate, and clarify complex ideas with examples. Ask relevant questions to understand user needs. Your goal is to empower users to succeed in their academic and professional endeavors with clarity and confidence.`;

export const MESSAGE_MAX_LENGTH = 4000;

export const AIDA_AGENTS_SLUGS = [
  "aida-academic-advisor",
  "aida-study-buddy",
  "aida-campus-navigator",
  "aida-assignment-helper",
  "aida-teaching-assistant",
  "aida-research-support",
  "aida-admin-organizer",
  "aida-grant-writer",
  "aida-admissions-guide",
  "aida-campus-tour",
  "aida-library-assistant",
  "aida-career-coach",
  "aida-event-planner",
  "aida-alumni-connect",
];

export const AIDA_SPECIAL_AGENTS_SLUGS = ["aida-advanced-research"];
export const AIDA_SPECIAL_AGENTS_IDS = ["321c68a2-6c1a-4bd4-948c-9d20e4aeb10c"];

export const AIDA_COMING_SOON_AGENTS = [
  {
    name: "AIDA Library Assistant",
    slug: "aida-library-assistant",
    description: "Helps users find library resources and manage citations.",
    avatar_url: null,
    system_prompt:
      "You are a library assistant who helps users locate resources and manage academic citations.",
    model_preference: "gpt-4o-mini",
    is_public: false,
    remixable: false,
    tools_enabled: true,
    example_inputs: [
      "Find books on artificial intelligence",
      "Generate a citation in APA format",
    ],
    tags: ["library", "academic"],
    category: "library",
    id: "aida-library-assistant",
    creator_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    name: "AIDA Career Coach",
    slug: "aida-career-coach",
    description: "Guides students in career planning and job applications.",
    system_prompt:
      "You are a career coach who helps students prepare for jobs and internships.",
    model_preference: "gpt-4o-mini",
    avatar_url: null,
    is_public: false,
    remixable: false,
    tools_enabled: true,
    example_inputs: [
      "Review my resume for a tech internship",
      "Suggest interview tips for a marketing role",
    ],
    tags: ["career", "jobs"],
    category: "career",
    id: "aida-career-coach",
    creator_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    name: "AIDA Event Planner",
    slug: "aida-event-planner",
    description: "Assists staff in planning university events and logistics.",
    system_prompt:
      "You are an event planner who helps university staff organize campus events and logistics.",
    model_preference: "gpt-4o-mini",
    avatar_url: null,
    is_public: false,
    remixable: false,
    tools_enabled: true,
    example_inputs: [
      "Plan a guest lecture series",
      "Create a budget for a student fair",
    ],
    tags: ["events", "admin"],
    category: "events",
    id: "aida-event-planner",
    creator_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    name: "AIDA Alumni Connect",
    slug: "aida-alumni-connect",
    description:
      "Engages alumni with university updates and networking opportunities.",
    system_prompt:
      "You are an alumni engagement assistant who helps connect graduates with the university.",
    model_preference: "gpt-4o-mini",
    avatar_url: null,
    is_public: false,
    remixable: false,
    tools_enabled: true,
    example_inputs: [
      "Draft an alumni newsletter",
      "Suggest networking event ideas",
    ],
    tags: ["alumni", "external"],
    category: "alumni",
    id: "aida-alumni-connect",
    creator_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];