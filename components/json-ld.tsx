export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Craft and Code",
    "url": "https://www.craftandcode.in",
    "logo": "https://www.craftandcode.in/craft%20and%20code%20logo.png",
    "description":
      "Craft and Code is a premier enterprise software development agency in Bangalore, India. We engineer scalable digital products, cloud platforms, and custom software solutions.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://github.com/craftandcode",
      "https://linkedin.com/company/craftandcode"
    ],
    "knowsAbout": [
      "Enterprise Software Development",
      "Cloud Platform Engineering",
      "Full-Stack Web Engineering",
      "Digital Product Engineering",
      "Odoo ERP Customization",
      "ERPNext Solutions",
      "AI & Machine Learning Integration"
    ],
    "priceRange": "$$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
