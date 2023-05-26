import { SEO_TITLE, SEO_DESCRIPTION, SEO_IMAGE } from "@/constants/seo";
import { Helmet } from "react-helmet";

const Meta = () => {
  return (
    <Helmet>
      <title>{SEO_TITLE}</title>
      <meta property="og:title" content={SEO_TITLE} />
      <meta property="og:description" content={SEO_DESCRIPTION} />
      <meta property="og:image" content={SEO_IMAGE} />
      <meta property="og:type" content="website" />
      <meta property="twitter:title" content={SEO_TITLE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={SEO_DESCRIPTION} />
      <meta name="twitter:image" content={SEO_IMAGE} />
    </Helmet>
  );
};

export default Meta;
