'use client'

import { useEffect, useRef, useState } from 'react'
import {
  X,
  ChevronRight,
  Clock,
  Calendar,
  Layers,
  Zap,
  Crown,
  BookOpen,
  Brain,
  Code2,
  Server,
  Database,
  Rocket,
  ShieldCheck,
  Workflow,
  Cpu,
  Cloud,
  ScrollText,
  BarChart2,
  Globe,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Star,
  TrendingUp,
  Lock,
} from 'lucide-react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'

// ─── Design Tokens ────────────────────────────────────────────────────────────
const T = {
  // Backgrounds
  bg:         '#060810',
  surface:    '#0D0F1A',
  surfaceAlt: '#111422',
  glass:      'rgba(255,255,255,0.03)',
  glassHover: 'rgba(255,255,255,0.055)',

  // Borders
  border:     'rgba(255,255,255,0.07)',
  borderMid:  'rgba(255,255,255,0.12)',

  // Text
  hi:    '#F0F2FF',
  mid:   '#9BA3C4',
  muted: '#555B79',

  // Accelerator (6m) — Electric Violet
  v1:     '#8B5CF6',
  v1Soft: 'rgba(139,92,246,0.10)',
  v1Glow: 'rgba(139,92,246,0.18)',

  // Elite (12m) — Amber-Gold
  v2:     '#F59E0B',
  v2Soft: 'rgba(245,158,11,0.10)',
  v2Glow: 'rgba(245,158,11,0.18)',

  // Accent
  teal:     '#14B8A6',
  tealSoft: 'rgba(20,184,166,0.10)',

  body: "'Sora', 'DM Sans', 'Inter', sans-serif",
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Assessment = {
  label: string
  title: string
  desc: string
  meta: string
  isCapstone?: boolean
}

type Session = {
  id: string
  topic: string
  bullets: string[]
  hrs: string
}

type Unit = {
  num: string
  name: string
  weeks: string
  sessionsCount: string
  hrs: string
  bloomLevels: string
  objectives: string[]
  sessions: Session[]
  assessment: Assessment
  icon: React.ReactNode
}

// ─── Curriculum Data ──────────────────────────────────────────────────────────
const acceleratorUnits: Unit[] = [
  {
    num: '01',
    name: 'Python Programming Foundations',
    weeks: 'Weeks 1–3',
    sessionsCount: '18 Sessions',
    hrs: '27 hrs',
    bloomLevels: 'Remember · Understand · Apply',
    objectives: [
      'Recall Python syntax rules, data types, and built-in functions',
      'Explain how variables, loops, and functions behave at runtime',
      'Write Python scripts to solve practical data manipulation problems',
    ],
    sessions: [
      { id: 'S1', topic: 'Python Setup & Environment', bullets: ['Installing Python, VS Code, pip', 'Running first script; REPL vs file mode', 'Virtual environments (venv)'], hrs: '1.5 hr' },
      { id: 'S2', topic: 'Variables, Data Types & Operators', bullets: ['int, float, str, bool, None', 'Arithmetic, comparison, logical operators', 'Type casting and type() function'], hrs: '1.5 hr' },
      { id: 'S3', topic: 'Strings & String Methods', bullets: ['Indexing, slicing, f-strings', '.split(), .join(), .strip(), .replace()', 'String formatting for AI prompts'], hrs: '1.5 hr' },
      { id: 'S4', topic: 'Lists, Tuples & Sets', bullets: ['CRUD operations on lists', 'List comprehensions', 'When to use tuples vs sets'], hrs: '1.5 hr' },
      { id: 'S5', topic: 'Dictionaries & JSON', bullets: ['Key-value operations; nested dicts', 'json module: loads() / dumps()', 'Reading/writing JSON files (AI output format)'], hrs: '1.5 hr' },
      { id: 'S6', topic: 'Control Flow — if/elif/else', bullets: ['Conditional logic and nested conditions', 'Short-circuit evaluation'], hrs: '1.5 hr' },
      { id: 'S7', topic: 'Loops — for & while', bullets: ['range(), enumerate(), zip()', 'break, continue, else on loops', 'Iterating over API response lists'], hrs: '1.5 hr' },
      { id: 'S8', topic: 'Functions & Scope', bullets: ['def, return, default arguments, *args, **kwargs', 'Lambda functions; local vs global scope'], hrs: '1.5 hr' },
      { id: 'S9', topic: 'Modules, Packages & pip', bullets: ['import, from…import, aliasing', 'Creating own module; requirements.txt'], hrs: '1.5 hr' },
      { id: 'S10', topic: 'File I/O & Error Handling', bullets: ['open(), read(), write(), with statement', 'try/except/finally; custom exceptions'], hrs: '1.5 hr' },
      { id: 'S11', topic: 'OOP — Part 1', bullets: ['Classes, __init__, self; attributes and methods', 'Building an Agent class skeleton'], hrs: '1.5 hr' },
      { id: 'S12', topic: 'OOP — Part 2', bullets: ['Inheritance, super(); encapsulation, dunder methods', 'Polymorphism for tool plugins'], hrs: '1.5 hr' },
      { id: 'S13', topic: 'Working with APIs using requests', bullets: ['HTTP methods: GET, POST; headers, params, JSON payload', 'Status codes and error handling'], hrs: '1.5 hr' },
      { id: 'S14', topic: 'Web Scraping Basics', bullets: ['requests + BeautifulSoup; CSS selectors, find(), find_all()', 'Ethical scraping & robots.txt'], hrs: '1.5 hr' },
      { id: 'S15', topic: 'Data Manipulation with Pandas', bullets: ['DataFrame, Series basics; filtering, groupby, merge', 'Exporting to CSV/JSON for agents'], hrs: '1.5 hr' },
      { id: 'S16', topic: 'Regular Expressions (Regex)', bullets: ['re.search(), re.findall(), re.sub()', 'Patterns for URL, email, keyword extraction; named groups'], hrs: '1.5 hr' },
      { id: 'S17', topic: 'Async Programming Intro', bullets: ['asyncio, async def, await', 'aiohttp for concurrent API calls; why agents need async'], hrs: '1.5 hr' },
      { id: 'S18', topic: 'Micro Test — Web Scraper Challenge', bullets: ['Build a web scraper that fetches top-10 Google results for a keyword, cleans the data, and saves to JSON'], hrs: '1.5 hr' },
    ],
    assessment: {
      label: 'Unit 1 End Assessment',
      title: 'Practical Coding Assessment — Data Fetcher Tool',
      desc: 'Build a command-line Python tool that: (1) accepts a keyword as input, (2) scrapes first 5 Google results via SerpAPI, (3) extracts titles + URLs, (4) stores results in a JSON file with timestamp. Graded on code quality, error handling, and output correctness.',
      meta: 'Duration: 90 min · Pass Mark: 65% · Weight: 10% of final grade · Bloom\'s: Apply + Analyze',
    },
    icon: <Code2 size={16} />,
  },
  {
    num: '02',
    name: 'NLP Fundamentals',
    weeks: 'Weeks 4–5',
    sessionsCount: '12 Sessions',
    hrs: '18 hrs',
    bloomLevels: 'Remember · Understand · Apply · Analyze',
    objectives: [
      'Define NLP pipeline stages: tokenisation, POS tagging, NER, embeddings',
      'Explain how LLMs process text through tokenisation and attention',
      'Apply spaCy and NLTK to clean and analyse SEO-relevant text',
      'Analyse keyword relevance using TF-IDF and semantic similarity',
    ],
    sessions: [
      { id: 'S19', topic: 'Text Preprocessing', bullets: ['Tokenisation, lowercasing, punctuation removal', 'Stop words removal; stemming vs lemmatisation'], hrs: '1.5 hr' },
      { id: 'S20', topic: 'POS Tagging & Named Entity Recognition', bullets: ['spaCy pipeline; .pos_, .ent_type_', 'Extracting brands, products, locations from web copy', 'Custom entity rules'], hrs: '1.5 hr' },
      { id: 'S21', topic: 'Keyword Extraction — TF-IDF & YAKE', bullets: ['TfidfVectorizer from sklearn; YAKE unsupervised extraction', 'SEO keyword density analysis'], hrs: '1.5 hr' },
      { id: 'S22', topic: 'Text Embeddings & Semantic Similarity', bullets: ['Word2Vec, GloVe concepts; sentence-transformers library', 'Cosine similarity for content gap analysis'], hrs: '1.5 hr' },
      { id: 'S23', topic: 'Sentiment Analysis', bullets: ['VADER, TextBlob; Hugging Face pipeline("sentiment-analysis")', 'Analysing SERP titles for tone'], hrs: '1.5 hr' },
      { id: 'S24', topic: 'Text Classification Basics', bullets: ['Bag of Words, sklearn pipeline; Naive Bayes classifier', 'Classifying search intent: informational / transactional / navigational'], hrs: '1.5 hr' },
      { id: 'S25', topic: 'Summarisation & Topic Modelling', bullets: ['Extractive vs abstractive summarisation', 'LDA topic modelling with gensim; generating content briefs from SERP data'], hrs: '1.5 hr' },
      { id: 'S26', topic: 'Micro Test — NLP Application', bullets: ['Given 20 article titles scraped from a SERP: extract keywords, classify intent, output a ranked keyword report'], hrs: '1.5 hr' },
      { id: 'S27–30', topic: 'Introduction to Large Language Models', bullets: ['Transformer architecture (conceptual)', 'Tokens, context window, temperature, top-p', 'Prompt engineering principles', 'Few-shot, zero-shot, chain-of-thought prompting'], hrs: '6 hr' },
    ],
    assessment: {
      label: 'Unit 2 End Assessment',
      title: 'NLP Pipeline Project — SEO Keyword Analyser',
      desc: 'Complete NLP pipeline: input = competitor page URL → scrape text → clean → extract keywords via TF-IDF → classify intent → generate 10-line summary using Hugging Face model → export structured JSON report.',
      meta: 'Duration: 90 min · Pass Mark: 65% · Weight: 10% · Bloom\'s: Apply + Analyze',
    },
    icon: <Brain size={16} />,
  },
  {
    num: '03',
    name: 'LLM APIs & Prompt Engineering',
    weeks: 'Weeks 6–8',
    sessionsCount: '18 Sessions',
    hrs: '27 hrs',
    bloomLevels: 'Understand · Apply · Analyze · Evaluate',
    objectives: [
      'Understand how LLM APIs (OpenAI, Anthropic, Gemini) work and their pricing model',
      'Apply prompt engineering techniques to get structured output from LLMs',
      'Analyse LLM output quality using evaluation metrics',
      'Evaluate which LLM/prompt strategy is most cost-effective for a given task',
    ],
    sessions: [
      { id: 'S31–32', topic: 'OpenAI API Deep Dive', bullets: ['Authentication, models, parameters', 'Chat Completions API structure; system/user/assistant roles', 'Streaming responses'], hrs: '3 hr' },
      { id: 'S33', topic: 'Anthropic Claude & Gemini APIs', bullets: ['API differences and use cases', 'Choosing models by cost/context window; multi-provider fallback pattern'], hrs: '1.5 hr' },
      { id: 'S34–35', topic: 'Advanced Prompt Engineering', bullets: ['Instruction clarity, role assignment, output constraints', 'Chain-of-thought & step-by-step reasoning', 'Structured JSON output prompting; prompt templates with variables'], hrs: '3 hr' },
      { id: 'S36', topic: 'Micro Test — Prompt Engineering', bullets: ['Write 3 prompts from raw SERP dataset: (1) keyword intent classifier, (2) meta description generator, (3) content outline creator. Evaluated on output quality and token efficiency.'], hrs: '1.5 hr' },
      { id: 'S37–38', topic: 'Structured Output & Function Calling', bullets: ['JSON mode / response_format; OpenAI function calling / tool_use', 'Parsing and validating LLM output with Pydantic'], hrs: '3 hr' },
      { id: 'S39–40', topic: 'LangChain Fundamentals', bullets: ['LLMChain, PromptTemplate, OutputParser', 'Memory: ConversationBufferMemory; building a multi-step SEO chain'], hrs: '3 hr' },
      { id: 'S41–42', topic: 'LlamaIndex & RAG Basics', bullets: ['Document loading, chunking, embedding', 'VectorStoreIndex, query engine; RAG for SEO knowledge base'], hrs: '3 hr' },
      { id: 'S43–44', topic: 'LLM Evaluation & Cost Optimisation', bullets: ['BLEU, ROUGE, BERTScore; LLM-as-judge evaluation', 'Token counting, batching, caching strategies'], hrs: '3 hr' },
      { id: 'S45–48', topic: 'Vector Databases & Semantic Search', bullets: ['Embeddings recap; FAISS, Pinecone, ChromaDB', 'Indexing competitor content; similarity search for content gap detection', 'Hybrid search: sparse + dense'], hrs: '6 hr' },
    ],
    assessment: {
      label: 'Unit 3 End Assessment',
      title: 'RAG-Powered SEO Research Tool',
      desc: 'Build a RAG system that: (1) ingests 10 competitor blog posts into ChromaDB, (2) answers natural language SEO questions against this knowledge base, (3) generates a content gap report with ranked keyword opportunities.',
      meta: 'Duration: 2 hr take-home · Pass Mark: 65% · Weight: 10% · Bloom\'s: Apply + Evaluate',
    },
    icon: <Database size={16} />,
  },
  {
    num: '04',
    name: 'AI Agent Architecture & Design Patterns',
    weeks: 'Weeks 9–12',
    sessionsCount: '24 Sessions',
    hrs: '36 hrs',
    bloomLevels: 'Understand · Apply · Analyze · Evaluate · Create',
    objectives: [
      'Explain the Perception → Reasoning → Action → Memory loop of autonomous agents',
      'Build tool-calling agents using LangChain/LangGraph and OpenAI function calling',
      'Analyse multi-agent collaboration patterns: sequential, parallel, hierarchical',
      'Evaluate agent reliability using tracing and observability tools',
      'Create a minimal autonomous SEO agent from scratch',
    ],
    sessions: [
      { id: 'S49–50', topic: 'What is an AI Agent?', bullets: ['Agent vs chatbot vs automation', 'PEAS model: Performance, Environment, Actuators, Sensors', 'Taxonomy: reactive, deliberative, hybrid agents'], hrs: '3 hr' },
      { id: 'S51–52', topic: 'ReAct & Planning Patterns', bullets: ['Reason + Act (ReAct) framework; Plan-and-Execute agents', 'Tree-of-Thoughts for complex tasks'], hrs: '3 hr' },
      { id: 'S53–55', topic: 'Tool Use & Function Calling', bullets: ['Designing tools: search, scrape, write, publish', 'Tool schemas with Pydantic; tool chaining and error recovery', 'Building custom SEO tools'], hrs: '4.5 hr' },
      { id: 'S56', topic: 'Micro Test — Tool Builder', bullets: ['Build 3 agent tools: (1) Google SERP fetcher, (2) content word count checker, (3) meta tag extractor. Wire them to an LLM that decides which to call.'], hrs: '1.5 hr' },
      { id: 'S57–59', topic: 'Agent Memory Systems', bullets: ['Short-term: in-context memory; long-term: vector memory, entity memory', 'Episodic memory with Redis/SQLite; memory compression strategies'], hrs: '4.5 hr' },
      { id: 'S60–62', topic: 'LangGraph — Stateful Agent Workflows', bullets: ['State graphs, nodes, edges, conditions', 'Cycles and loops for autonomous retrying; checkpointing and persistence', 'Building a multi-step SEO workflow graph'], hrs: '4.5 hr' },
      { id: 'S63–65', topic: 'Multi-Agent Systems', bullets: ['Sequential agents (pipeline); parallel agents (map-reduce)', 'Supervisor/worker pattern; CrewAI framework intro'], hrs: '4.5 hr' },
      { id: 'S66–68', topic: 'Agent Observability & Debugging', bullets: ['LangSmith tracing; logging agent steps to file', 'Handling hallucinations and tool failures; retry strategies and fallback chains'], hrs: '4.5 hr' },
      { id: 'S69–72', topic: 'Mini-Project — Autonomous SEO Research Agent v1', bullets: ['Agent with 4 tools: SERP search, scrape, NLP analyse, report write', 'ReAct loop implementation; memory in vector DB', 'Output: structured JSON + markdown report'], hrs: '6 hr' },
    ],
    assessment: {
      label: 'Unit 4 End Assessment',
      title: 'Build an Autonomous SEO Research Agent',
      desc: 'Extend the mini-project: agent must autonomously research a given keyword, analyse top-10 SERP results, identify content gaps, and produce a ranked keyword brief with recommended headings. Must use: LangGraph stateful graph, minimum 4 tools, vector memory.',
      meta: 'Duration: 48 hr take-home · Pass Mark: 65% · Weight: 15% · Bloom\'s: Create + Evaluate',
    },
    icon: <Workflow size={16} />,
  },
  {
    num: '05',
    name: 'SEO Domain Knowledge & Agent Feature Engineering',
    weeks: 'Weeks 13–17',
    sessionsCount: '30 Sessions',
    hrs: '45 hrs',
    bloomLevels: 'Apply · Analyze · Evaluate · Create',
    objectives: [
      'Apply on-page, off-page, and technical SEO principles programmatically',
      'Analyse SERP data, keyword metrics, and competitor profiles using APIs',
      'Evaluate content quality against ranking signals',
      'Create automated pipelines for content generation, optimisation, and publishing',
    ],
    sessions: [
      { id: 'S73–74', topic: 'SEO Fundamentals for Developers', bullets: ['How search engines crawl, index, rank', 'Core ranking signals: E-E-A-T, backlinks, Core Web Vitals', 'Search intent taxonomy programmatically'], hrs: '3 hr' },
      { id: 'S75–76', topic: 'SEO APIs Integration', bullets: ['SerpAPI, DataForSEO, Google Search Console API', 'Ahrefs/SEMrush API (keyword difficulty, volume)', 'Rate limiting and caching strategy'], hrs: '3 hr' },
      { id: 'S77–79', topic: 'Keyword Research Automation', bullets: ['Seed keyword expansion algorithms', 'Clustering keywords by intent using embeddings; long-tail discovery pipeline', 'Micro Test: Build a keyword clustering script'], hrs: '4.5 hr' },
      { id: 'S80–82', topic: 'Content Generation & Optimisation', bullets: ['AI content briefs: structure, headings, word count targets', 'GPT-4/Claude for SEO-optimised article drafting', 'Entity insertion, semantic enrichment, content scoring'], hrs: '4.5 hr' },
      { id: 'S83–84', topic: 'Technical SEO Automation', bullets: ['Sitemap generation, robots.txt analysis', 'Broken link detection with Playwright', 'Schema markup JSON-LD generation via LLM'], hrs: '3 hr' },
      { id: 'S85–86', topic: 'SERP Monitoring & Rank Tracking', bullets: ['Scheduled scraping with APScheduler', 'Delta detection: rank changes over time; alert system via email/Slack'], hrs: '3 hr' },
      { id: 'S87', topic: 'Micro Test — SEO Pipeline', bullets: ['Given a target URL and 5 competitor URLs: score the target URL\'s content and output 5 actionable optimisation suggestions'], hrs: '1.5 hr' },
      { id: 'S88–92', topic: 'CMS Integration & Publishing Automation', bullets: ['WordPress REST API: create/update posts; Webflow CMS API', 'Notion as a content database; automated image alt-text generation', 'Publish pipeline: draft → review → publish'], hrs: '7.5 hr' },
      { id: 'S93–96', topic: 'Integrations: Slack, Email & Reporting', bullets: ['Slack Bolt for agent notifications; email reports with smtplib/SendGrid', 'Automated PDF report generation; dashboard basics with Streamlit'], hrs: '6 hr' },
      { id: 'S97–102', topic: 'Full SEO Agent Integration Sprint', bullets: ['Combining all modules into a unified agent', 'Task queue with Celery; configuration management (dotenv, YAML)', 'Code review and refactoring sessions'], hrs: '9 hr' },
    ],
    assessment: {
      label: 'Unit 5 End Assessment',
      title: 'End-to-End SEO Agent Prototype',
      desc: 'Working SEO agent prototype that: accepts a niche and target keyword, autonomously researches SERP, generates an AI content brief, produces a 600-word optimised article draft, scores the draft, and sends a Slack summary. All steps autonomous.',
      meta: 'Duration: 72 hr take-home · Pass Mark: 70% · Weight: 20% · Bloom\'s: Create + Evaluate',
    },
    icon: <Globe size={16} />,
  },
  {
    num: '06',
    name: 'Agent Productionisation & Capstone Project',
    weeks: 'Weeks 18–24',
    sessionsCount: '42 Sessions',
    hrs: '63 hrs',
    bloomLevels: 'Analyze · Evaluate · Create',
    objectives: [
      'Analyse failure modes in production agent systems',
      'Evaluate deployment strategies: serverless vs containerised',
      'Create a production-ready autonomous SEO agent with CI/CD and monitoring',
    ],
    sessions: [
      { id: 'S103–106', topic: 'Containerisation with Docker', bullets: ['Dockerfile, docker-compose, .env management', 'Containerising the SEO agent; multi-container setups: agent + Redis + ChromaDB'], hrs: '6 hr' },
      { id: 'S107–110', topic: 'FastAPI Backend for Agent', bullets: ['REST endpoints for agent invocation; WebSocket for streaming agent output', 'Authentication: API keys; background tasks'], hrs: '6 hr' },
      { id: 'S111–114', topic: 'Basic Cloud Deployment', bullets: ['Deploying to Railway / Render / AWS EC2', 'Environment variables and secrets management; basic CI with GitHub Actions'], hrs: '6 hr' },
      { id: 'S115–116', topic: 'Agent Safety & Guardrails', bullets: ['Input validation and output sanitisation', 'Rate limiting, cost circuit-breakers; human-in-the-loop checkpoints'], hrs: '3 hr' },
      { id: 'S117–120', topic: 'Streamlit Dashboard for SEO Agent', bullets: ['Building a management UI; real-time agent log display', 'Keyword tracking visualisations; one-click agent triggers'], hrs: '6 hr' },
      { id: 'S121–144', topic: 'Capstone Project — Full Build Sprint', bullets: ['Weeks 20–24: 24 sessions dedicated to final project', 'Mentored build sprints with daily check-ins', 'Code reviews at Week 21 and Week 23', 'Final demo and presentation in Week 24'], hrs: '36 hr' },
    ],
    assessment: {
      label: '🏆 Accelerator Capstone',
      title: 'Fully Autonomous SEO Agent System',
      desc: 'A working autonomous AI agent managing an SEO campaign end-to-end. Includes: Keyword Research, Competitor Analysis, Content Generation, Content Scoring, Auto-Publishing to WordPress/Webflow, Weekly Rank Tracking with Slack alerts, Streamlit Dashboard, Dockerised cloud deployment, full documentation, and a 15-minute live demo.',
      meta: 'Weight: 35% of final grade · Bloom\'s: Create (Level 6)',
      isCapstone: true,
    },
    icon: <Rocket size={16} />,
  },
]

const eliteUnits: Unit[] = [
  {
    num: '07',
    name: 'Machine Learning Engineering for Agent Features',
    weeks: 'Weeks 27–30',
    sessionsCount: '24 Sessions',
    hrs: '36 hrs',
    bloomLevels: 'Apply · Analyze · Evaluate · Create',
    objectives: [
      'Apply classical ML models (classification, regression) to SEO signals',
      'Analyse model performance using cross-validation and feature importance',
      'Fine-tune a small LLM for domain-specific SEO tasks using LoRA',
      'Create a ranking prediction model for keyword priority scoring',
    ],
    sessions: [
      { id: 'S157–160', topic: 'ML Fundamentals — Supervised Learning', bullets: ['Linear regression, logistic regression, decision trees', 'sklearn pipelines, cross-validation, GridSearchCV', 'Building a keyword difficulty predictor'], hrs: '6 hr' },
      { id: 'S161–163', topic: 'Feature Engineering for SEO', bullets: ['SERP feature extraction: DA, PA, word count, backlinks', 'Encoding categorical features; feature selection with SHAP'], hrs: '4.5 hr' },
      { id: 'S164–166', topic: 'LLM Fine-Tuning with LoRA/QLoRA', bullets: ['HuggingFace PEFT library; preparing SEO instruction dataset', 'Training on Colab/runpod; GGUF quantisation'], hrs: '4.5 hr' },
      { id: 'S167–168', topic: 'Micro Test — ML Pipeline', bullets: ['Build and evaluate a keyword ranking probability model. Output: ranked list of 50 keywords by estimated ranking difficulty with SHAP explanation.'], hrs: '3 hr' },
      { id: 'S169–171', topic: 'Model Deployment with FastAPI + HuggingFace', bullets: ['Serving ML models as REST endpoints; model versioning', 'Integrating custom ML model into the SEO agent as a tool'], hrs: '4.5 hr' },
      { id: 'S172–180', topic: 'Reinforcement Learning for Agents (Intro)', bullets: ['Markov Decision Processes (conceptual); reward shaping for agent behaviour', 'RLHF basics and Constitutional AI', 'Bandit algorithms for A/B content testing', 'Implementing a simple Q-learning agent'], hrs: '13.5 hr' },
    ],
    assessment: {
      label: 'Unit 7 End Assessment',
      title: 'ML-Enhanced SEO Agent Tool',
      desc: 'Add an ML-powered keyword prioritisation tool to the existing SEO agent. The tool must: (1) score 100 keywords by predicted ranking difficulty, (2) cluster by intent, (3) return top-20 priority keywords with SHAP feature explanations.',
      meta: 'Duration: 72 hr take-home · Weight: 8% · Bloom\'s: Create + Evaluate',
    },
    icon: <Brain size={16} />,
  },
  {
    num: '08',
    name: 'System Design for AI Agent Systems',
    weeks: 'Weeks 31–35',
    sessionsCount: '30 Sessions',
    hrs: '45 hrs',
    bloomLevels: 'Analyze · Evaluate · Create',
    objectives: [
      'Analyse system design trade-offs: scalability, reliability, cost',
      'Evaluate architectural patterns: event-driven, microservices, serverless',
      'Design a production multi-agent system architecture diagram with justifications',
    ],
    sessions: [
      { id: 'S181–184', topic: 'Scalable System Design Principles', bullets: ['CAP theorem, eventual consistency', 'Horizontal vs vertical scaling; load balancing for agent APIs', 'Database selection: SQL vs NoSQL vs vector DB'], hrs: '6 hr' },
      { id: 'S185–188', topic: 'Message Queues & Event-Driven Architecture', bullets: ['RabbitMQ / Redis Streams / Kafka basics', 'Async agent task dispatch; dead-letter queues and retry strategies', 'Building event-driven SEO agent pipeline'], hrs: '6 hr' },
      { id: 'S189–192', topic: 'Microservices for Multi-Agent Systems', bullets: ['Service decomposition: keyword, content, publish services', 'Inter-service communication: REST vs gRPC; API Gateway pattern', 'Docker Compose multi-service setup'], hrs: '6 hr' },
      { id: 'S193–194', topic: 'Micro Test — System Design Interview', bullets: ['30-min whiteboard: "Design a scalable SEO agent system handling 1,000 concurrent keyword research jobs." Evaluated on components chosen, trade-offs stated, bottlenecks identified.'], hrs: '3 hr' },
      { id: 'S195–198', topic: 'Caching, Rate Limiting & Cost Control', bullets: ['Redis caching for LLM responses; semantic caching with embeddings', 'Token budget management across agents; cost dashboards'], hrs: '6 hr' },
      { id: 'S199–202', topic: 'Security for AI Agent Systems', bullets: ['Prompt injection attacks and defences; secrets management: Vault, AWS Secrets Manager', 'Data privacy: PII detection; OAuth2 for CMS integrations'], hrs: '6 hr' },
      { id: 'S203–210', topic: 'System Design Case Studies & Group Project', bullets: ['Netflix, Airbnb, Twitter system design analysis', 'Group design challenge: full AI agent platform for an enterprise', 'Architecture document deliverable'], hrs: '12 hr' },
    ],
    assessment: {
      label: 'Unit 8 End Assessment',
      title: 'System Design Document — Enterprise SEO Platform',
      desc: 'Full system design document (8+ pages) for an enterprise-grade autonomous SEO platform capable of handling 100 simultaneous campaigns. Must include: architecture diagram, component descriptions, database schema, API contracts, scaling strategy, cost estimate.',
      meta: 'Duration: 1-week deliverable · Weight: 8% · Bloom\'s: Create + Evaluate',
    },
    icon: <Server size={16} />,
  },
  {
    num: '09',
    name: 'Cloud Deployment, MLOps & DevOps',
    weeks: 'Weeks 36–40',
    sessionsCount: '30 Sessions',
    hrs: '45 hrs',
    bloomLevels: 'Apply · Analyze · Create',
    objectives: [
      'Deploy multi-container AI agent systems on AWS/GCP using Kubernetes',
      'Implement CI/CD pipelines with automated testing for agent systems',
      'Analyse system performance using observability tools: Prometheus, Grafana',
      'Create an infrastructure-as-code setup with Terraform',
    ],
    sessions: [
      { id: 'S211–214', topic: 'AWS/GCP Core Services', bullets: ['EC2, S3, RDS, Lambda, ECS; VPC, Security Groups, IAM roles', 'Managed services for AI: Bedrock, Vertex AI'], hrs: '6 hr' },
      { id: 'S215–218', topic: 'Kubernetes for AI Agents', bullets: ['Pods, Services, Deployments, ConfigMaps', 'Horizontal Pod Autoscaling; Helm charts for agent deployment', 'GPU node pools for inference'], hrs: '6 hr' },
      { id: 'S219–221', topic: 'CI/CD Pipelines', bullets: ['GitHub Actions: test → build → push → deploy', 'Docker image optimisation; automated agent testing in CI'], hrs: '4.5 hr' },
      { id: 'S222–224', topic: 'Observability Stack', bullets: ['Prometheus metrics; Grafana dashboards; Loki for log aggregation', 'LangSmith + custom tracing integration'], hrs: '4.5 hr' },
      { id: 'S225–226', topic: 'Micro Test — Deploy to Cloud', bullets: ['Deploy the SEO agent on AWS ECS with load balancer, environment secrets from AWS Secrets Manager, and a Grafana dashboard showing request latency and LLM token usage.'], hrs: '3 hr' },
      { id: 'S227–230', topic: 'MLOps Fundamentals', bullets: ['Experiment tracking with MLflow / Weights & Biases', 'Model registry and versioning; data versioning with DVC', 'Drift detection and model retraining triggers'], hrs: '6 hr' },
      { id: 'S231–234', topic: 'Infrastructure as Code (Terraform)', bullets: ['Terraform basics: providers, resources, state', 'Provisioning AI agent infrastructure on AWS; Terraform modules for reusable setups'], hrs: '6 hr' },
      { id: 'S235–240', topic: 'Production Readiness Sprint', bullets: ['Health checks, graceful shutdown; chaos engineering basics', 'Runbook creation for agent failures; cost optimisation review'], hrs: '9 hr' },
    ],
    assessment: {
      label: 'Unit 9 End Assessment',
      title: 'Production Cloud Deployment',
      desc: 'Deploy the full SEO agent system: Kubernetes cluster on AWS/GCP, CI/CD pipeline, monitoring with Grafana, secrets managed via cloud vault, Terraform-provisioned infrastructure. Submit: deployment URL, architecture diagram, Terraform code repo, Grafana screenshot.',
      meta: 'Duration: 1 week · Weight: 8% · Bloom\'s: Apply + Create',
    },
    icon: <Cloud size={16} />,
  },
  {
    num: '10',
    name: 'AI Research Skills & Staying Current',
    weeks: 'Weeks 41–44',
    sessionsCount: '24 Sessions',
    hrs: '36 hrs',
    bloomLevels: 'Understand · Analyze · Evaluate · Create',
    objectives: [
      'Read and summarise AI research papers at NeurIPS/ICML/ICLR level',
      'Evaluate new agent frameworks and decide whether to adopt them',
      'Implement a technique from a recent research paper in a working prototype',
    ],
    sessions: [
      { id: 'S241–244', topic: 'How to Read AI Research Papers', bullets: ['Paper structure: abstract, methods, results, limitations', 'Skimming vs deep reading strategy; Arxiv, Papers With Code, Semantic Scholar', 'Critical reading: identifying assumptions and gaps'], hrs: '6 hr' },
      { id: 'S245–248', topic: 'Key Agent Papers Deep Dive', bullets: ['ReAct (Yao et al., 2023); Toolformer (Schick et al., 2023)', 'AutoGPT architecture analysis; AgentBench evaluation framework'], hrs: '6 hr' },
      { id: 'S249–252', topic: 'Emerging Agent Frameworks', bullets: ['AutoGen, CrewAI, MetaGPT comparison', 'OpenAI Swarm / Assistants API', 'Evaluating frameworks: adopting vs building custom'], hrs: '6 hr' },
      { id: 'S253–255', topic: 'Benchmarking & Evaluation Research', bullets: ['GAIA, WebArena, SWE-bench benchmarks', 'Designing custom evaluation suites; statistical significance in ML evaluations'], hrs: '4.5 hr' },
      { id: 'S256–258', topic: 'Research Paper Implementation Lab', bullets: ['Each student selects a recent agent paper', 'Implements core technique in Python; presents findings to cohort'], hrs: '4.5 hr' },
      { id: 'S259–264', topic: 'Technical Writing & Documentation', bullets: ['Writing technical blog posts and READMEs', 'API documentation with OpenAPI/Swagger; Architecture Decision Records (ADR)', 'Contributing to open-source AI projects'], hrs: '9 hr' },
    ],
    assessment: {
      label: 'Unit 10 End Assessment',
      title: 'Paper-to-Code Implementation + Blog Post',
      desc: 'Implement a concept from a paper published in the last 6 months that improves an aspect of the SEO agent (e.g. better planning, memory compression, self-reflection). Deliverables: working code integrated into agent + 800-word technical blog post.',
      meta: 'Duration: 2 weeks · Weight: 8% · Bloom\'s: Evaluate + Create',
    },
    icon: <ScrollText size={16} />,
  },
  {
    num: '11',
    name: 'Product Development & Business of AI Agents',
    weeks: 'Weeks 45–48',
    sessionsCount: '24 Sessions',
    hrs: '36 hrs',
    bloomLevels: 'Apply · Analyze · Evaluate · Create',
    objectives: [
      'Apply product thinking and MVP scoping to AI-first products',
      'Evaluate monetisation models: subscription vs usage-based pricing for AI SaaS',
      'Navigate AI Act compliance, copyright, GDPR and responsible deployment',
      'Build and pitch a micro-SaaS product powered by the SEO agent',
    ],
    sessions: [
      { id: 'S265–268', topic: 'Product Thinking for AI Tools', bullets: ['User research, jobs-to-be-done; MVP scoping for AI products', 'Product-market fit signals'], hrs: '6 hr' },
      { id: 'S269–272', topic: 'Monetisation & SaaS Architecture', bullets: ['Subscription vs usage-based pricing for AI', 'Multi-tenant agent architecture; Stripe integration for agent SaaS'], hrs: '6 hr' },
      { id: 'S273–276', topic: 'AI Ethics, Compliance & Legal', bullets: ['AI Act compliance basics; copyright in AI-generated content', 'GDPR for agent data handling; responsible AI deployment'], hrs: '6 hr' },
      { id: 'S277–288', topic: 'Startup Sprint — Build, Launch, Pitch', bullets: ['8 sessions: extend SEO agent into a micro-SaaS MVP', 'Landing page, onboarding flow, pricing page', 'Pitch deck preparation (10 slides) + mock investor pitch'], hrs: '18 hr' },
    ],
    assessment: {
      label: 'Unit 11 Assessment',
      title: 'AI SaaS MVP Pitch',
      desc: 'Launch a micro-SaaS built on your SEO agent: landing page live, onboarding flow, pricing page, 10-slide pitch deck, and a 10-minute live investor pitch to the cohort panel.',
      meta: 'Duration: 2 weeks · Bloom\'s: Create + Evaluate',
    },
    icon: <TrendingUp size={16} />,
  },
  {
    num: '12',
    name: 'Enterprise Capstone: Multi-Agent AI Platform',
    weeks: 'Weeks 49–52',
    sessionsCount: '24 Sessions',
    hrs: '36 hrs',
    bloomLevels: 'Create (Level 6 — all Bloom\'s)',
    objectives: [
      'Architect and build an enterprise-grade multi-agent SaaS platform end-to-end',
      'Integrate ML components, cloud infrastructure, CI/CD and observability into one system',
      'Demonstrate the system in a 20-minute live panel demo with Q&A',
    ],
    sessions: [
      { id: 'Sprint 1', topic: 'Architecture & Planning Week', bullets: ['System design doc finalisation', 'Tech stack decisions and ADRs', 'Sprint planning with mentor'], hrs: '9 hr' },
      { id: 'Sprint 2', topic: 'Core Build Sprint', bullets: ['Multi-agent orchestration: Supervisor + Keyword + Content + Tech SEO + Publisher + Monitor agents', 'ML components: keyword difficulty model, content quality scorer, rank prediction'], hrs: '9 hr' },
      { id: 'Sprint 3', topic: 'Infrastructure & Productionisation', bullets: ['Kubernetes on AWS/GCP, Terraform IaC, auto-scaling', 'CI/CD with GitHub Actions, Prometheus + Grafana + LangSmith tracing'], hrs: '9 hr' },
      { id: 'Sprint 4', topic: 'Polish, Docs & Demo', bullets: ['React dashboard with real-time agent status and campaign reports', 'Multi-tenancy: isolated environments per client, usage-based billing', 'Full documentation: system design doc, API docs, ADRs, runbook', '10-slide pitch deck + 20-minute live panel demo'], hrs: '9 hr' },
    ],
    assessment: {
      label: '🏆 Elite Capstone',
      title: 'Enterprise Multi-Agent SEO Platform',
      desc: 'A production-ready, multi-tenant SaaS platform powered by a collaborative multi-agent system. Multi-Agent System (Supervisor coordinating 5 specialised agents), ML Components, Kubernetes on AWS/GCP, Terraform IaC, full CI/CD, Prometheus + Grafana + LangSmith observability, React dashboard, multi-tenancy with usage-based billing, implemented research paper technique, complete documentation, and 20-minute live panel demo.',
      meta: 'Weight: 30% of final grade · Bloom\'s: Create (Level 6)',
      isCapstone: true,
    },
    icon: <Crown size={16} />,
  },
]

// ─── Expandable Unit Row ──────────────────────────────────────────────────────
function UnitRow({ unit, accent, accentSoft, index }: { unit: Unit; accent: string; accentSoft: string; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderRadius: 16,
        border: `1px solid ${T.border}`,
        overflow: 'hidden',
        background: T.glass,
        marginBottom: 10,
      }}
    >
      {/* Header row */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '16px 20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.18s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = T.glassHover)}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        {/* Unit badge */}
        <div style={{
          width: 44,
          height: 44,
          flexShrink: 0,
          borderRadius: 12,
          background: accentSoft,
          border: `1px solid ${accent}33`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: accent,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.04em',
        }}>
          U{unit.num}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 14.5, fontWeight: 600, color: T.hi, lineHeight: 1.3 }}>{unit.name}</span>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 4, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11.5, color: T.muted }}>{unit.weeks}</span>
            <span style={{ fontSize: 11.5, color: T.muted }}>·</span>
            <span style={{ fontSize: 11.5, color: T.muted }}>{unit.sessionsCount}</span>
            <span style={{ fontSize: 11.5, color: T.muted }}>·</span>
            <span style={{ fontSize: 11.5, color: accent, fontWeight: 600 }}>{unit.hrs}</span>
          </div>
        </div>

        <div style={{ color: accent, flexShrink: 0 }}>{unit.icon}</div>

        <motion.div
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.22 }}
          style={{ color: T.muted, flexShrink: 0 }}
        >
          <ChevronRight size={15} />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              borderTop: `1px solid ${T.border}`,
              padding: '20px 20px 20px',
            }}>
              {/* Bloom levels */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 10px',
                borderRadius: 8,
                background: accentSoft,
                border: `1px solid ${accent}22`,
                marginBottom: 14,
              }}>
                <BookOpen size={11} color={accent} />
                <span style={{ fontSize: 11, color: accent, fontWeight: 600, letterSpacing: '0.04em' }}>Bloom's: {unit.bloomLevels}</span>
              </div>

              {/* Learning Objectives */}
              <div style={{
                background: `${accent}06`,
                border: `1px solid ${accent}18`,
                borderRadius: 12,
                padding: '14px 16px',
                marginBottom: 18,
              }}>
                <p style={{ fontSize: 11, color: T.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10, margin: '0 0 10px' }}>Learning Objectives</p>
                {unit.objectives.map((obj, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: i < unit.objectives.length - 1 ? 7 : 0 }}>
                    <CheckCircle2 size={13} color={accent} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: T.mid, lineHeight: 1.6 }}>{obj}</span>
                  </div>
                ))}
              </div>

              {/* Sessions table */}
              <p style={{ fontSize: 11, color: T.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 10px' }}>Sessions</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 18 }}>
                {unit.sessions.map((s, i) => (
                  <div key={s.id} style={{
                    display: 'flex',
                    gap: 12,
                    padding: '10px 12px',
                    borderRadius: 10,
                    background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{
                      fontSize: 10,
                      color: T.muted,
                      fontWeight: 600,
                      minWidth: 48,
                      marginTop: 2,
                      letterSpacing: '0.03em',
                      flexShrink: 0,
                    }}>{s.id}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: T.hi, margin: '0 0 4px', lineHeight: 1.3 }}>{s.topic}</p>
                      <ul style={{ margin: 0, padding: '0 0 0 14px' }}>
                        {s.bullets.map((b, bi) => (
                          <li key={bi} style={{ fontSize: 12, color: T.mid, lineHeight: 1.6, marginBottom: 1 }}>{b}</li>
                        ))}
                      </ul>
                    </div>
                    <span style={{ fontSize: 11, color: T.muted, whiteSpace: 'nowrap', flexShrink: 0, marginTop: 2 }}>{s.hrs}</span>
                  </div>
                ))}
              </div>

              {/* Assessment box */}
              <div style={{
                borderRadius: 12,
                border: unit.assessment.isCapstone
                  ? `1.5px solid ${accent}55`
                  : `1px solid ${accent}30`,
                background: unit.assessment.isCapstone
                  ? `${accent}12`
                  : `${accent}08`,
                padding: '16px 18px',
              }}>
                <p style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: accent,
                  margin: '0 0 6px',
                }}>{unit.assessment.label}</p>
                <p style={{ fontSize: 14.5, fontWeight: 700, color: T.hi, margin: '0 0 8px' }}>{unit.assessment.title}</p>
                <p style={{ fontSize: 13, color: T.mid, lineHeight: 1.7, margin: '0 0 10px' }}>{unit.assessment.desc}</p>
                <p style={{ fontSize: 11.5, color: T.muted, margin: 0 }}>{unit.assessment.meta}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Bridge Banner (between courses) ─────────────────────────────────────────
function EliteBridge({ onScrollToElite }: { onScrollToElite: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderRadius: 20,
        background: `linear-gradient(135deg, ${T.v2Glow} 0%, rgba(139,92,246,0.12) 100%)`,
        border: `1px solid ${T.v2}33`,
        padding: '28px 28px',
        margin: '32px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative glows */}
      <div style={{
        position: 'absolute',
        top: -40,
        right: -40,
        width: 160,
        height: 160,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${T.v2Glow} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${T.v1Glow} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16, position: 'relative' }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: T.v2Soft,
          border: `1px solid ${T.v2}44`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <TrendingUp size={20} color={T.v2} />
        </div>
        <div>
          <p style={{ fontSize: 12, color: T.v2, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' }}>Continue to Elite Programme</p>
          <p style={{ fontSize: 18, fontWeight: 700, color: T.hi, lineHeight: 1.3, margin: 0 }}>You've built an agent. Now architect an enterprise.</p>
        </div>
      </div>

      <p style={{ fontSize: 13.5, color: T.mid, lineHeight: 1.8, margin: '0 0 20px', position: 'relative' }}>
        The Accelerator Programme makes you capable of building and deploying production AI agents. The Elite Programme transforms you into an engineering-level AI professional — capable of designing enterprise architectures, managing production AI systems at scale, implementing MLOps workflows, fine-tuning models, and launching AI SaaS platforms.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20, position: 'relative' }}>
        {[
          { icon: <Brain size={12} />, label: 'LoRA Fine-Tuning' },
          { icon: <Cloud size={12} />, label: 'Kubernetes + Terraform' },
          { icon: <Server size={12} />, label: 'System Design' },
          { icon: <ScrollText size={12} />, label: 'AI Research Papers' },
          { icon: <Rocket size={12} />, label: 'AI SaaS Engineering' },
          { icon: <Workflow size={12} />, label: 'Enterprise Agents' },
        ].map(p => (
          <span key={p.label} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            borderRadius: 999,
            background: 'rgba(245,158,11,0.10)',
            border: '1px solid rgba(245,158,11,0.22)',
            color: '#FCD34D',
            fontSize: 12,
            fontWeight: 500,
          }}>
            {p.icon}
            {p.label}
          </span>
        ))}
      </div>

      <button
        onClick={onScrollToElite}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '11px 20px',
          borderRadius: 12,
          border: `1px solid ${T.v2}55`,
          background: T.v2Soft,
          color: T.v2,
          fontFamily: T.body,
          fontSize: 13.5,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s',
          position: 'relative',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = T.v2Glow; e.currentTarget.style.borderColor = `${T.v2}88` }}
        onMouseLeave={e => { e.currentTarget.style.background = T.v2Soft; e.currentTarget.style.borderColor = `${T.v2}55` }}
      >
        <Star size={14} />
        Explore Elite Programme
        <ArrowRight size={14} />
      </button>
    </motion.div>
  )
}

// ─── Track Section Header ─────────────────────────────────────────────────────
function TrackHeader({
  type,
  title,
  subtitle,
  badge,
  accent,
  accentSoft,
  stats,
  icon,
  recommended,
}: {
  type: string
  title: string
  subtitle: string
  badge: string
  accent: string
  accentSoft: string
  stats: { val: string; lbl: string; icon: React.ReactNode }[]
  icon: React.ReactNode
  recommended?: boolean
}) {
  return (
    <div style={{
      borderRadius: 20,
      background: recommended
        ? `linear-gradient(135deg, ${accentSoft} 0%, rgba(139,92,246,0.06) 100%)`
        : T.glass,
      border: `1px solid ${recommended ? accent + '44' : T.border}`,
      padding: '24px 24px 20px',
      marginBottom: 4,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {recommended && (
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          background: `linear-gradient(135deg, ${accent}, ${accent}BB)`,
          color: '#fff',
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '5px 14px',
          borderBottomLeftRadius: 10,
        }}>
          ★ Most Popular
        </div>
      )}

      {/* Glow */}
      <div style={{
        position: 'absolute',
        top: -60,
        right: -60,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16, position: 'relative' }}>
        <div>
          <p className='italic' style={{ fontSize: 11, color: accent, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', margin: '0 0 4px' }}>{type}</p>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: T.hi, margin: '0 0 4px', lineHeight: 1.2, letterSpacing: '0.02em' }}>{title}</h2>
          <p style={{ fontSize: 13, color: T.mid, margin: 0, lineHeight: 1.5 }}>{subtitle}</p>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', position: 'relative' }}>
        {stats.map(s => (
          <div key={s.lbl} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '7px 12px',
            borderRadius: 10,
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${T.border}`,
          }}>
            <span style={{ color: accent }}>{s.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: T.hi }}>{s.val}</span>
            <span style={{ fontSize: 11, color: T.muted }}>{s.lbl}</span>
          </div>
        ))}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          padding: '7px 12px',
          borderRadius: 10,
          background: accentSoft,
          border: `1px solid ${accent}33`,
        }}>
          <Sparkles size={13} color={accent} />
          <span style={{ fontSize: 13, fontWeight: 700, color: accent }}>{badge}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────
type Props = {
  open: boolean
  setOpen: (v: boolean) => void
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
export default function CurriculumModal({ open, setOpen }: Props) {
  const eliteRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToElite = () => {
    eliteRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleEnroll = () => {
    setOpen(false)
    setTimeout(() => {
      const pricing = document.getElementById('pricing')
      if (pricing) pricing.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [open])

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 20px',
          borderRadius: 12,
          background: 'rgba(255,255,255,0.03)',
          border: `0.5px solid ${T.border}`,
          color: T.mid,
          fontFamily: T.body,
          fontSize: 14,
          cursor: 'pointer',
          transition: '0.25s ease',
        }}
      >
        <Layers size={15} />
        View Curriculum
      </button>

      {/* Overlay */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(0,0,0,0.78)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              overflowY: 'auto',
              padding: '24px 16px 40px',
              WebkitOverflowScrolling: 'touch',
            }}
            ref={scrollRef}
          >
            <div style={{ minHeight: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 16 }}
                transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                onClick={e => e.stopPropagation()}
                style={{
                  width: '100%',
                  maxWidth: 780,
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 24,
                  overflow: 'hidden',
                  boxShadow: '0 32px 100px rgba(0,0,0,0.55)',
                  fontFamily: T.body,
                  position: 'relative',
                }}
              >
                {/* BG Texture */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundImage: `radial-gradient(ellipse at 80% 0%, ${T.v1}14 0%, transparent 55%),
                    radial-gradient(ellipse at 20% 100%, ${T.v2}10 0%, transparent 50%)`,
                  pointerEvents: 'none',
                }} />

                {/* ─── Top Header ─── */}
                <div style={{
                  padding: '28px 28px 22px',
                  borderBottom: `1px solid ${T.border}`,
                  position: 'relative',
                }}>
                  {/* Close */}
                  <button
                    onClick={() => setOpen(false)}
                    style={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      border: `1px solid ${T.border}`,
                      background: 'rgba(255,255,255,0.04)',
                      color: T.mid,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = T.glassHover)}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                  >
                    <X size={15} />
                  </button>

                  {/* Badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    padding: '5px 12px',
                    borderRadius: 999,
                    background: T.v1Soft,
                    border: `1px solid ${T.v1}33`,
                    marginBottom: 14,
                  }}>
                    <Cpu size={12} color={T.v1} />
                    <span style={{ fontSize: 11, color: '#B998FF', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Complete Curriculum · 4 Tracks</span>
                  </div>

                  <h1 style={{
                    fontSize: 'clamp(22px, 5vw, 34px)',
                    lineHeight: 1.1,
                    color: T.hi,
                    margin: '0 0 10px',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    paddingRight: 48,
                  }}>
                    Autonomous AI Agent Development
                  </h1>

                  <p style={{ fontSize: 14, color: T.mid, margin: '0 0 18px', lineHeight: 1.7, maxWidth: 560 }}>
                    From Python fundamentals to production enterprise systems — a fully immersive, code-first curriculum designed on Bloom's Taxonomy.
                  </p>

                  {/* Global stats */}
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {[
                      { icon: <Clock size={13} />, val: '1.5 hr/session', lbl: '' },
                      { icon: <Calendar size={13} />, val: '6 Days/Week', lbl: '' },
                      { icon: <BookOpen size={13} />, val: "Bloom's All 6 Levels", lbl: '' },
                      { icon: <Zap size={13} />, val: 'SEO Agent Capstone', lbl: '' },
                    ].map(s => (
                      <div key={s.val} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '5px 10px',
                        borderRadius: 8,
                        background: T.glass,
                        border: `1px solid ${T.border}`,
                        color: T.mid,
                        fontSize: 12,
                      }}>
                        <span style={{ color: T.v1 }}>{s.icon}</span>
                        {s.val}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ─── Scrollable Content ─── */}
                <div style={{ padding: '24px 28px 28px', overflowY: 'auto', maxHeight: 'calc(100vh - 260px)' }}>

                  {/* ══ ACCELERATOR TRACK ══ */}
                  <TrackHeader
                    type="Accelerator Programme"
                    title="Build Your First Production AI Agent"
                    subtitle="For students with little to no programming background. Python → NLP → LLM APIs → Agent Architecture → SEO Engineering → Production Deployment."
                    badge="234 hrs · 26 Weeks"
                    accent={T.v1}
                    accentSoft={T.v1Soft}
                    icon={<Zap size={20} />}
                    stats={[
                      { icon: <Clock size={13} />, val: '156', lbl: 'Sessions' },
                      { icon: <Layers size={13} />, val: '6', lbl: 'Units' },
                      { icon: <Calendar size={13} />, val: '26', lbl: 'Weeks' },
                    ]}
                  />

                  {/* Grading bar */}
                  <div style={{
                    display: 'flex',
                    gap: 8,
                    flexWrap: 'wrap',
                    padding: '10px 16px',
                    borderRadius: 10,
                    background: T.glass,
                    border: `1px solid ${T.border}`,
                    margin: '10px 0 16px',
                  }}>
                    <span style={{ fontSize: 11.5, color: T.muted }}>Grading:</span>
                    {[['Unit Tests', '45%'], ['Capstone', '35%'], ['Participation', '20%']].map(([k, v]) => (
                      <span key={k} style={{ fontSize: 11.5, color: T.mid }}>
                        <span style={{ color: T.v1, fontWeight: 600 }}>{v}</span> {k}
                      </span>
                    ))}
                  </div>

                  {acceleratorUnits.map((u, i) => (
                    <UnitRow key={u.num} unit={u} accent={T.v1} accentSoft={T.v1Soft} index={i} />
                  ))}

                  {/* ══ TRANSITION BRIDGE ══ */}
                  <EliteBridge onScrollToElite={scrollToElite} />

                  {/* ══ ELITE TRACK ══ */}
                  <div ref={eliteRef} />
                  <TrackHeader
                    type="Elite Programme"
                    title="Engineer Enterprise AI Systems"
                    subtitle="Months 7–12: Advanced specialisation. Identical start to Accelerator — then continues into ML Engineering, System Design, Cloud Architecture, MLOps, Research Skills, Product & Business, and Enterprise Capstone."
                    badge="+234 hrs · 26 More Weeks"
                    accent={T.v2}
                    accentSoft={T.v2Soft}
                    icon={<Crown size={20} />}
                    recommended
                    stats={[
                      { icon: <Clock size={13} />, val: '312', lbl: 'Total Sessions' },
                      { icon: <Layers size={13} />, val: '12', lbl: 'Units' },
                      { icon: <Calendar size={13} />, val: '52', lbl: 'Weeks' },
                    ]}
                  />

                  {/* Elite note */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 16px',
                    borderRadius: 10,
                    background: `${T.v2}0A`,
                    border: `1px solid ${T.v2}22`,
                    margin: '10px 0 16px',
                  }}>
                    <Lock size={13} color={T.v2} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: T.mid, lineHeight: 1.6 }}>
                      <span style={{ color: T.v2, fontWeight: 600 }}>Units 1–6</span> are identical to the Accelerator Programme. Elite students complete all of those first, then continue from Unit 7 below.
                    </span>
                  </div>

                  {/* Elite grading */}
                  <div style={{
                    display: 'flex',
                    gap: 8,
                    flexWrap: 'wrap',
                    padding: '10px 16px',
                    borderRadius: 10,
                    background: T.glass,
                    border: `1px solid ${T.border}`,
                    marginBottom: 16,
                  }}>
                    <span style={{ fontSize: 11.5, color: T.muted }}>Grading:</span>
                    {[['Tests', '40%'], ['Capstone', '30%'], ['Projects', '20%'], ['Research', '10%']].map(([k, v]) => (
                      <span key={k} style={{ fontSize: 11.5, color: T.mid }}>
                        <span style={{ color: T.v2, fontWeight: 600 }}>{v}</span> {k}
                      </span>
                    ))}
                  </div>

                  {eliteUnits.map((u, i) => (
                    <UnitRow key={u.num} unit={u} accent={T.v2} accentSoft={T.v2Soft} index={i} />
                  ))}

                </div>

                {/* ─── Footer ─── */}
                <div style={{
                  padding: '18px 28px 22px',
                  borderTop: `1px solid ${T.border}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 16,
                  flexWrap: 'wrap',
                  position: 'relative',
                  background: T.surfaceAlt,
                }}>
                  <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.7 }}>
                    Live practical sessions · Industry-grade capstone projects<br />
                    Production deployment workflows · Enterprise AI architecture
                  </div>
                  <button
                    onClick={handleEnroll}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '13px 24px',
                      borderRadius: 12,
                      border: 'none',
                      cursor: 'pointer',
                      background: `linear-gradient(135deg, ${T.v1} 0%, #A855F7 100%)`,
                      color: '#fff',
                      fontFamily: T.body,
                      fontSize: 14,
                      fontWeight: 700,
                      boxShadow: `0 8px 28px ${T.v1}44`,
                      transition: 'all 0.2s',
                      letterSpacing: '-0.01em',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 12px 36px ${T.v1}55` }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 28px ${T.v1}44` }}
                  >
                    Enrol Now
                    <ChevronRight size={16} />
                  </button>
                </div>

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}