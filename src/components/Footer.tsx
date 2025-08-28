import { Image } from "@yext/pages-components";
import { SiteEntity } from "../types/autogen";

const Footer = ({ _site }: any) => {
  return <Image image={_site.c_footer} />;
};

export default Footer;
