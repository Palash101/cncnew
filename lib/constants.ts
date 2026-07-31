export const SITE_CONFIG = {
  name: "Craft and Code",
  legalName: "CraftandCode Solution Pvt Ltd",
  domain: "www.craftandcode.in",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.craftandcode.in",
  description:
    "Craft and Code is a premier enterprise software development agency. We engineer scalable digital products, cloud platforms, and custom software solutions for global leaders.",
  contact: {
    email: "discuss@craftandcode.in",
    phone: "+91-72249 01787",
    phoneRaw: "+917224901787",
    location: "Gwalior, M.P., India",
  },
  assets: {
    logo: "/craft and code logo.png",
    flag: "/flag.png",
    emailIcon: "/email.png",
    phoneIcon: "/call.png",
    mapIcon: "/map.png",
  },
} as const;
