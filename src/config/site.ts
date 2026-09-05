export const SITE_CONFIG = {
  name: "SHAYDHA TECHNOLOGIES",
  legalName: "SHAYDHA TECHNOLOGIES PRIVATE LIMITED",
  shortName: "SHAYDHA",
  tagline: "Building digital experiences for ambitious businesses.",
  description:
    "SHAYDHA TECHNOLOGIES helps businesses transform ideas into powerful websites, applications, and digital products designed to perform, scale, and grow.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://shaydha.com",

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "shaydhatechnologies@gmail.com",
    phone: process.env.NEXT_PUBLIC_PHONE || "+91 75698 02300",
    phoneClean: "+917569802300",
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917569802300",
    address: "Bengaluru & Hyderabad, India",
    workingHours: "Mon - Sat: 9:00 AM - 7:00 PM IST",
    availability: "Available for new projects",
  },

  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },

  nav: [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],

  whatsapp: {
    defaultMessage: "Hi SHAYDHA TECHNOLOGIES, I would like to discuss a project.",
    getUrl: (customMessage?: string) => {
      const msg = encodeURIComponent(
        customMessage || "Hi SHAYDHA TECHNOLOGIES, I would like to discuss a project."
      );
      const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917569802300";
      return `https://wa.me/${number}?text=${msg}`;
    },
  },

  email: {
    address: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "shaydhatechnologies@gmail.com",
    defaultSubject: "Project Enquiry & Architecture Review — SHAYDHA TECHNOLOGIES",
    defaultBody:
      "Hello SHAYDHA Engineering Team,\n\nI would like to discuss an engineering project with your team.\n\nProject Scope:\n• Project Type:\n• Estimated Timeline:\n• Target Budget:\n• Brief requirements:\n\nPlease review and contact me once verified.\n\nBest regards,\n",
    getGmailUrl: (customSubject?: string, customBody?: string) => {
      const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "shaydhatechnologies@gmail.com";
      const subject = encodeURIComponent(
        customSubject || "Project Enquiry & Architecture Review — SHAYDHA TECHNOLOGIES"
      );
      const body = encodeURIComponent(
        customBody ||
          "Hello SHAYDHA Engineering Team,\n\nI would like to discuss an engineering project with your team.\n\nProject Scope:\n• Project Type:\n• Estimated Timeline:\n• Target Budget:\n• Brief requirements:\n\nPlease review and contact me once verified.\n\nBest regards,\n"
      );
      return `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    },
    getMailto: (customSubject?: string, customBody?: string) => {
      const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "shaydhatechnologies@gmail.com";
      const subject = encodeURIComponent(
        customSubject || "Project Enquiry & Architecture Review — SHAYDHA TECHNOLOGIES"
      );
      const body = encodeURIComponent(
        customBody ||
          "Hello SHAYDHA Engineering Team,\n\nI would like to discuss an engineering project with your team.\n\nProject Scope:\n• Project Type:\n• Estimated Timeline:\n• Target Budget:\n• Brief requirements:\n\nPlease review and contact me once verified.\n\nBest regards,\n"
      );
      return `mailto:${email}?subject=${subject}&body=${body}`;
    },
    getComposeUrl: (customSubject?: string, customBody?: string) => {
      const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "shaydhatechnologies@gmail.com";
      const subject = encodeURIComponent(
        customSubject || "Project Enquiry & Architecture Review — SHAYDHA TECHNOLOGIES"
      );
      const body = encodeURIComponent(
        customBody ||
          "Hello SHAYDHA Engineering Team,\n\nI would like to discuss an engineering project with your team.\n\nProject Scope:\n• Project Type:\n• Estimated Timeline:\n• Target Budget:\n• Brief requirements:\n\nPlease review and contact me once verified.\n\nBest regards,\n"
      );
      return `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    },
  },

  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "") : "",
    getUrl: (endpoint: string) => {
      const base = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "") : "";
      const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
      return `${base}${path}`;
    },
  },
};
