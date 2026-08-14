export interface IndustryItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const industries: IndustryItem[] = [
  {
    id: "healthcare",
    title: "Healthcare",
    description:
      "We engineer secure, HIPAA-compliant digital healthcare platforms, telemedicine mobile apps, patient portals, and automated EHR integration systems.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ecommerce",
    title: "eCommerce",
    description:
      "Crafting scalable omnichannel ecommerce platforms, headless checkout experiences, inventory management systems, and personalized shopping AI.",
    image:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "saas",
    title: "SaaS & Enterprise",
    description:
      "Enhancing enterprise operations through custom multi-tenant SaaS architecture, cloud workflow automation, and scalable API platforms.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "social-media",
    title: "Social Media",
    description:
      "We develop social media platforms that enhance community building with AI-Powered Content Moderation, predictive trend analysis, and real-time messaging.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "on-demand",
    title: "On-Demand & Delivery",
    description:
      "Developing real-time order tracking, multi-vendor dispatch engines, driver route optimization, and instant delivery marketplace platforms.",
    image:
      "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "education",
    title: "Education & Ed-Tech",
    description:
      "Crafting unique learning platforms, AI-driven adaptive assessment engines, virtual classrooms, and enterprise LMS integrations.",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "realestate",
    title: "Real Estate",
    description:
      "Driving business growth with digital transformation solutions for real estate businesses with property management, 3D tours, and transaction portals.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
  },
];
