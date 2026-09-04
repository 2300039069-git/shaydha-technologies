import { ServiceItem } from "@/types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "web-development",
    title: "Web Development",
    shortDescription:
      "Modern, responsive, and high-performance websites and web applications built with cutting-edge architectures.",
    fullDescription:
      "We engineer custom, scalable, high-speed web platforms tailored to your business needs. From corporate showcases and interactive portals to complex SaaS dashboards, our engineering stack ensures near-instant load times, flawless security, and effortless scaling.",
    iconName: "Globe",
    features: [
      "Custom Full-Stack Next.js & React Applications",
      "Headless CMS & Dynamic Content Architecture",
      "Core Web Vitals Optimization & High-Speed Performance",
      "Progressive Web Apps (PWA) & Offline Capabilities",
      "Robust REST & GraphQL API Integrations",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    deliverables: [
      "Production-ready codebase with full documentation",
      "Automated CI/CD deployment pipelines",
      "SEO & Core Web Vitals audit pass",
      "Admin CMS portal for continuous content updates",
    ],
  },
  {
    id: "mobile-development",
    title: "Mobile App Development",
    shortDescription:
      "Beautiful, fluid, and scalable mobile experiences engineered natively for Android and iOS devices.",
    fullDescription:
      "From consumer utility apps to enterprise field management platforms, we craft native and cross-platform mobile apps with frictionless user journeys, offline sync, real-time push notifications, and hardware sensor integration.",
    iconName: "Smartphone",
    features: [
      "Cross-Platform Native Development with React Native & Flutter",
      "Optimized 60fps Native UI Interactions & Micro-animations",
      "Biometric Authentication & Secure Storage",
      "Real-time Push Notifications & Deep Linking",
      "Full App Store & Google Play Store Launch Management",
    ],
    technologies: ["React Native", "Flutter", "iOS Swift", "Kotlin", "Firebase", "Node.js"],
    deliverables: [
      "Production iOS (.ipa) & Android (.aab) builds",
      "Full store asset preparation and compliance submission",
      "Crashlytics and performance telemetry monitoring",
      "Over-The-Air (OTA) update integration",
    ],
  },
  {
    id: "custom-software",
    title: "Custom Software",
    shortDescription:
      "Business-specific software and internal operational tools designed around your exact workflow.",
    fullDescription:
      "Off-the-shelf software often forces you to compromise on your core processes. We build tailor-made enterprise software, ERP engines, automated customer portals, and internal workflows that eliminate inefficiencies and scale with your volume.",
    iconName: "Cpu",
    features: [
      "Custom Workflow Automation & ERP/CRM Architectures",
      "Multi-tenant Cloud SaaS Infrastructures",
      "Legacy System Migration & Modernization",
      "Granular Role-Based Access Control (RBAC)",
      "High-Throughput Background Job Queues",
    ],
    technologies: ["Python", "Node.js", "Go", "PostgreSQL", "Docker", "AWS", "Redis"],
    deliverables: [
      "Custom business platform mapped to your SOPs",
      "Comprehensive API documentation and OpenAPI schemas",
      "Automated automated database backup configurations",
      "Team onboarding walkthroughs and administration guides",
    ],
  },
  {
    id: "ai-solutions",
    title: "AI Solutions",
    shortDescription:
      "AI-powered applications, document intelligence, cognitive automation, and LLM integrations.",
    fullDescription:
      "Transform raw enterprise data into strategic competitive advantage. We build domain-specific AI agents, Retrieval-Augmented Generation (RAG) knowledge systems, intelligent document processing pipelines, and predictive analytics models.",
    iconName: "Sparkles",
    features: [
      "Enterprise RAG & Private Knowledge Vector Databases",
      "Intelligent Document OCR & Data Extraction Pipelines",
      "Custom Fine-tuned LLM Assistants & Voice Agents",
      "Predictive Analytics & Automated Recommendation Engines",
      "Cost-optimized AI Infrastructure & Model Guardrails",
    ],
    technologies: ["Python", "FastAPI", "OpenAI", "Anthropic Claude", "LangChain", "Pinecone", "Tesseract"],
    deliverables: [
      "Trained and evaluated AI pipeline with verifiable accuracy metrics",
      "Semantic vector search and contextual retrieval system",
      "Safety guardrail enforcement and audit logging",
      "Latency-optimized API endpoints with stream responses",
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    shortDescription:
      "User interfaces that harmoniously combine visual elegance, effortless usability, and conversion.",
    fullDescription:
      "We design digital products that users love to interact with. Starting from research and wireframes to interactive design systems and micro-interactions, we ensure every click feels natural and every flow leads toward your business goals.",
    iconName: "Palette",
    features: [
      "Design Systems & Component Libraries in Figma",
      "Interactive High-Fidelity Prototypes & Usability Testing",
      "Information Architecture & User Flow Mapping",
      "Brand Identity & Visual Asset Creation",
      "Design-to-Code Engineering Handoff Specs",
    ],
    technologies: ["Figma", "Framer", "Protopie", "Adobe Creative Suite"],
    deliverables: [
      "Comprehensive multi-state Figma component system",
      "Responsive typography, color tokens, and spatial scale",
      "Interactive click-through prototype for user testing",
      "Developer handoff asset bundle with SVG icons",
    ],
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    shortDescription:
      "Scalable online stores, custom commerce engines, and seamless payment gateways.",
    fullDescription:
      "Empower your commerce brand with blistering speed and frictionless checkouts. We develop custom storefronts, headless Shopify/Medusa integrations, multi-currency payment flows, and automated inventory sync that maximize conversion rates.",
    iconName: "ShoppingBag",
    features: [
      "Headless E-Commerce with Next.js & Shopify / MedusaJS",
      "Zero-Friction Checkout & Multi-Gateway Integration (Razorpay, Stripe)",
      "Automated Inventory, Shipping, and Invoice Pipelines",
      "Customer Account Portals, Subscriptions, and Loyalty Systems",
      "Ultra-Fast Mobile First Conversion Architecture",
    ],
    technologies: ["Next.js", "Shopify Storefront API", "Medusa", "Stripe", "Razorpay", "Tailwind CSS"],
    deliverables: [
      "Lightning-fast e-commerce storefront with <1s page loads",
      "Secured PCI-compliant payment gateway checkout flow",
      "Automated order fulfillment and tracking notifications",
      "Conversion tracking and Google Analytics 4 telemetry setup",
    ],
  },
];
