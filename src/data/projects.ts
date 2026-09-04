import { ProjectItem } from "@/types";

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "cineyatra",
    slug: "cineyatra",
    title: "CineYatra",
    client: "CineYatra Media Network",
    category: "Web",
    tagline: "High-concurrency movie ticketing and digital cinema management platform.",
    summary:
      "A lightning-fast cinema booking experience engineered to handle massive burst traffic during blockbuster releases with real-time seat reservation locks.",
    coverImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    technologies: ["Next.js", "TypeScript", "Redis Pub/Sub", "Node.js", "PostgreSQL", "Tailwind CSS"],
    timeline: "12 Weeks",
    metrics: [
      { label: "Concurrent Bookings", value: "25,000+" },
      { label: "Checkout Time", value: "< 28s" },
      { label: "Platform Uptime", value: "99.98%" },
      { label: "Conversion Lift", value: "+38%" },
    ],
    overview:
      "CineYatra required a complete technological overhaul of their existing web portal to combat concurrency crashes during major film ticket releases and to deliver a modern, friction-free booking flow for moviegoers across multiple cities.",
    problem:
      "The client's previous ticketing system suffered severe database deadlocks during premiere drops, causing double-booked seats, lost transactions, and immense customer frustration. Furthermore, mobile page load times exceeded 5 seconds on 4G networks.",
    solution:
      "We engineered a modern, decoupled architecture powered by Next.js and high-speed Redis distributed locks. When a user selects seats, temporary distributed locks hold the seats for 8 minutes. We introduced edge-cached cinema schedules, dynamic seat maps with SVG rendering, and instant UPI/card payment verification via webhooks.",
    features: [
      "Interactive real-time SVG seat selection with instant occupancy indicators",
      "Redis distributed seat reservation locks preventing race conditions and double bookings",
      "Dynamic pricing engine based on day, showtime, and auditorium tiering",
      "Instant WhatsApp & SMS digital ticket delivery with QR code scanning",
      "Comprehensive cinema manager dashboard for screen schedules and food-and-beverage orders",
    ],
    architecture: [
      "Next.js App Router for server-rendered dynamic city pages and client-side seat pickers",
      "Redis Cluster for sub-millisecond atomic seat locking and session management",
      "PostgreSQL relational cluster with read replicas for resilient financial auditing",
      "Serverless webhooks verifying payment gateway status within 300ms",
    ],
    results: [
      "Successfully handled 25,000+ simultaneous bookings during nationwide blockbuster drops with zero downtime.",
      "Reduced average checkout completion time from 2.5 minutes down to 28 seconds.",
      "Boosted repeat purchase rates by 42% via digital wallet passes and one-tap re-booking.",
    ],
  },
  {
    id: "businessflow",
    slug: "businessflow",
    title: "BusinessFlow",
    client: "Vanguard Global Enterprises",
    category: "Software",
    tagline: "All-in-one business operations, procurement, and team collaboration suite.",
    summary:
      "A modular enterprise platform that consolidated 6 disjointed legacy tools into a unified, high-speed workspace for distributed corporate teams.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    technologies: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Docker", "AWS"],
    timeline: "16 Weeks",
    metrics: [
      { label: "Operational Overhead", value: "-45%" },
      { label: "Daily Active Users", value: "14,000+" },
      { label: "Report Generation", value: "Instant" },
      { label: "Tools Consolidated", value: "6 into 1" },
    ],
    overview:
      "Vanguard Global Enterprises was struggling with operational friction across four international offices due to fragmented spreadsheets, disconnected payroll software, and slow project tracking.",
    problem:
      "Departments operated in functional silos. Financial approval cycles took days because data was trapped across disconnected platforms, leading to costly communication gaps and security compliance vulnerabilities.",
    solution:
      "SHAYDHA TECHNOLOGIES designed and built BusinessFlow — an enterprise-grade ERP workspace integrating project milestones, automated procurement approval workflows, timesheet management, and real-time executive financial dashboards.",
    features: [
      "Automated multi-tier purchase requisition and approval workflows with audit trails",
      "Granular role-based permissions (RBAC) across departments and regional entities",
      "Interactive Gantt charts, sprint planners, and automated deliverable alerts",
      "Real-time analytics engine generating custom executive reports in one click",
      "Native calendar and enterprise Slack/Teams webhook notifications",
    ],
    architecture: [
      "Modular microservices running in Docker containers orchestrated on AWS ECS",
      "Optimized MongoDB sharded clusters for dynamic enterprise document structures",
      "WebSocket gateway providing real-time notification broadcasts across active sessions",
    ],
    results: [
      "Decreased procurement processing cycle times from 4 business days to under 3 hours.",
      "Saved over $180,000 annually in redundant legacy software licenses.",
      "Adopted by 14,000+ active enterprise employees with 98% user satisfaction ratings.",
    ],
  },
  {
    id: "documind-ai",
    slug: "documind-ai",
    title: "DocuMind AI",
    client: "LexiCognitive Systems",
    category: "AI",
    tagline: "Cognitive document intelligence, multi-modal OCR, and semantic knowledge engine.",
    summary:
      "An enterprise AI platform that ingests unstructured contracts, invoices, and technical blueprints, transforming them into searchable, structured data.",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    technologies: ["Python", "FastAPI", "Next.js", "LangChain", "OpenAI", "Pinecone", "Tesseract OCR"],
    timeline: "10 Weeks",
    metrics: [
      { label: "Extraction Accuracy", value: "99.4%" },
      { label: "Processing Speed", value: "< 1.8s/page" },
      { label: "Manual Review Time", value: "-80%" },
      { label: "Documents Parsed", value: "1.2M+" },
    ],
    overview:
      "LexiCognitive Systems manages millions of complex legal, insurance, and architectural documents. Manual review and indexing were bottlenecking company growth.",
    problem:
      "Traditional OCR engines consistently failed when processing scanned PDFs with non-standard formatting, tables, handwritten annotations, and multi-column legal clauses.",
    solution:
      "We engineered DocuMind AI, pairing advanced neural OCR with vision-language models and a Retrieval-Augmented Generation (RAG) vector search pipeline. Users can query thousands of dense documents in plain English and receive cited, verifiable answers with bounding box highlights.",
    features: [
      "Multi-modal document parser capable of reading complex tables, handwriting, and schematics",
      "Enterprise semantic search and natural language Q&A across multi-gigabyte document archives",
      "Automated extraction of structured JSON key-value pairs with confidence scoring",
      "Strict data isolation and end-to-end encryption compliant with SOC-2 guidelines",
      "Interactive split-screen PDF viewer with real-time vector coordinate highlighting",
    ],
    architecture: [
      "FastAPI asynchronous backend with PyTorch and Tesseract OCR preprocessing workers",
      "Pinecone vector database for high-dimensional semantic embeddings",
      "Next.js frontend with canvas-based document annotation and streaming responses",
    ],
    results: [
      "Reduced contract review times by 80%, saving over 120 man-hours weekly per legal team.",
      "Achieved 99.4% extraction accuracy across scanned, damaged, and skewed physical documents.",
      "Processed over 1.2 million pages in the first 90 days with zero data leakage incidents.",
    ],
  },
  {
    id: "shopnova",
    slug: "shopnova",
    title: "ShopNova",
    client: "Nova Retail Concepts",
    category: "E-Commerce",
    tagline: "Next-generation headless commerce platform with 500ms global response times.",
    summary:
      "A flagship shopping experience built for an international luxury lifestyle brand, featuring instant filtering, 3D product previews, and frictionless checkout.",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    technologies: ["Next.js", "Shopify Storefront API", "Tailwind CSS", "Framer Motion", "Stripe", "Vercel"],
    timeline: "8 Weeks",
    metrics: [
      { label: "Mobile Page Speed", value: "98/100" },
      { label: "Cart Abandonment", value: "-32%" },
      { label: "Average Order Value", value: "+24%" },
      { label: "Global Edge Latency", value: "< 60ms" },
    ],
    overview:
      "Nova Retail Concepts needed a modern storefront that matched their luxury brand aesthetic while delivering instant page transitions and frictionless mobile checkout.",
    problem:
      "Their previous monolithic e-commerce store was weighed down by excessive plugins, resulting in 4-second load times on mobile, cart abandonment spikes, and rigid design limitations.",
    solution:
      "We rebuilt the store using a headless Next.js architecture connected to Shopify's GraphQL Storefront API. We implemented localized currency detection, intelligent predictive search, and smooth micro-interactions that make browsing products feel tactile and effortless.",
    features: [
      "Headless architecture delivering sub-second page transitions across global markets",
      "Interactive 3D product visualizer and high-definition zoom previews",
      "Predictive instant search with zero-latency category and SKU filtering",
      "One-click express checkout via Apple Pay, Google Pay, and localized payment rails",
      "Smart bundle recommendations driven by customer browsing intent",
    ],
    architecture: [
      "Edge-rendered Next.js pages deployed globally on Vercel's multi-region network",
      "Shopify GraphQL Storefront API for resilient inventory and checkout orchestration",
      "Tailwind CSS and Framer Motion for 60fps gesture-based product galleries",
    ],
    results: [
      "Mobile Core Web Vitals score surged to 98/100, dropping bounce rates by 41%.",
      "Cart abandonment plummeted by 32% within the first month of release.",
      "Average Order Value (AOV) climbed 24% due to intelligent product bundling at checkout.",
    ],
  },
  {
    id: "apex-health",
    slug: "apex-health",
    title: "Apex Health",
    client: "Apex Health Systems",
    category: "Mobile",
    tagline: "Telemedicine, doctor scheduling, and unified patient records mobile application.",
    summary:
      "A HIPAA-compliant mobile application connecting patients with healthcare specialists via encrypted video consults, digital prescriptions, and vital tracking.",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    technologies: ["React Native", "WebRTC", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    timeline: "14 Weeks",
    metrics: [
      { label: "Video Call Quality", value: "HD / Zero Lag" },
      { label: "Patient Adoption", value: "85,000+" },
      { label: "Doctor Rating", value: "4.9 / 5.0" },
      { label: "Prescription Sync", value: "Instant" },
    ],
    overview:
      "Apex Health required a patient-first mobile ecosystem allowing instant specialist consultations, prescription tracking, and lab report management.",
    problem:
      "Patients faced long clinic waiting times, fragmented paper health records, and unsecure messaging with doctors, while specialists lacked structured appointment workflows.",
    solution:
      "We built a native cross-platform application with integrated WebRTC video consultations, end-to-end encrypted biometric health records, automated appointment reminders, and digital prescription generation.",
    features: [
      "End-to-end encrypted peer-to-peer HD video and audio telemedicine consultations",
      "Biometric login with Face ID / Fingerprint and automated patient identity verification",
      "Digital prescription generator integrated with licensed pharmacy partner networks",
      "Push notification health reminders for medicine schedules and upcoming visits",
    ],
    results: [
      "Over 85,000 active patient downloads across iOS and Android.",
      "Reduced patient wait times from 45 minutes to under 5 minutes.",
      "Maintained 4.9-star rating on both Google Play and Apple App Store.",
    ],
  },
  {
    id: "quantledger",
    slug: "quantledger",
    title: "QuantLedger",
    client: "QuantLedger Capital",
    category: "Software",
    tagline: "Institutional digital asset analytics and automated algorithmic risk management.",
    summary:
      "A high-frequency algorithmic portfolio monitoring dashboard providing real-time volatility tracking, risk assessment, and order execution alerts.",
    coverImage: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    technologies: ["Next.js", "Go", "WebSocket", "TimescaleDB", "Redis", "Tailwind CSS"],
    timeline: "12 Weeks",
    metrics: [
      { label: "Data Feed Latency", value: "< 15ms" },
      { label: "Assets Tracked", value: "$420M+" },
      { label: "Tick Throughput", value: "50,000/sec" },
      { label: "Risk Mitigations", value: "100% automated" },
    ],
    overview:
      "QuantLedger Capital needed a reliable terminal to visualize multi-exchange order books, measure portfolio risk exposure, and trigger automated hedging directives.",
    problem:
      "Existing third-party SaaS trading dashboards had noticeable feed lag (200-500ms), lacked custom volatility metrics, and couldn't process high-frequency order streams without browser throttling.",
    solution:
      "We developed a lightweight, canvas-accelerated market monitor using Go web-sockets and Next.js, capable of rendering sub-15ms tick updates and managing complex margin triggers with zero frame drops.",
    features: [
      "High-throughput WebSocket order book streaming with canvas chart rendering",
      "Configurable algorithmic stop-loss and hedging triggers with multi-channel alerts",
      "Cross-exchange arbitrage visualizer and deep liquidity heatmaps",
      "Institutional-grade security with hardware security key (FIDO2) enforcement",
    ],
    results: [
      "Delivered steady 60fps chart rendering even during extreme market volatility periods.",
      "Protected over $420M in client assets through automated risk hedge execution.",
    ],
  },
];
