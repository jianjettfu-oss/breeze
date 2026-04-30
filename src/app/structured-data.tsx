const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Breeze",
  alternateName: "Breeze Hardware",
  url: "https://breezehw.com",
  logo: "https://breezehw.com/breeze-logo.png",
  description:
    "Shenzhen engineering partner for AI hardware. BOM, NRE, DFM, and certification support from concept to production.",
  founder: {
    "@type": "Person",
    name: "Jett Fu",
    sameAs: [
      "https://www.linkedin.com/in/jett-fu-a287818/",
      "https://github.com/jianjettfu-oss",
    ],
  },
  sameAs: [
    "https://github.com/jianjettfu-oss/ai-hardware-toolkit",
  ],
  knowsAbout: [
    "AI hardware manufacturing",
    "BOM cost estimation",
    "Design for manufacturing (DFM)",
    "FCC certification",
    "CE certification",
    "UKCA certification",
    "RCM certification",
    "CCC certification",
    "Shenzhen supply chain",
    "ESP32-S3",
    "Rockchip RV1103",
    "Rockchip RK3562",
    "Rockchip RK3588S",
    "MediaTek Genio",
  ],
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Shenzhen",
    addressCountry: "CN",
  },
  email: "hello@breezehw.com",
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Breeze",
  url: "https://breezehw.com",
  publisher: {
    "@type": "Organization",
    name: "Breeze",
    url: "https://breezehw.com",
  },
};

const DATASET_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "AI Hardware Toolkit",
  description:
    "Open-source data, checklists, and frameworks for AI hardware manufacturing — BOM pricing at 1K volume, NRE worksheets, DFM checklists, certification matrices.",
  url: "https://github.com/jianjettfu-oss/ai-hardware-toolkit",
  sameAs: "https://breezehw.com",
  creator: {
    "@type": "Organization",
    name: "Breeze",
    url: "https://breezehw.com",
  },
  license: "https://opensource.org/licenses/MIT",
  isAccessibleForFree: true,
  keywords: [
    "AI hardware",
    "BOM",
    "DFM",
    "FCC certification",
    "Shenzhen manufacturing",
    "ESP32",
    "Rockchip",
    "MediaTek",
  ],
};

export function SiteStructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(DATASET_JSONLD) }}
      />
    </>
  );
}

export function ToolStructuredData({
  slug,
  name,
  description,
}: {
  slug: string;
  name: string;
  description: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: `https://breezehw.com/tools/${slug}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "Breeze",
      url: "https://breezehw.com",
    },
    isAccessibleForFree: true,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
