import { Link, CTA } from "@yext/pages-components";

interface CTAProps {
  color: string;
  cta?: CTA;
  ctaType: "primaryCta" | "secondaryCta";
  otherStyles?: string;
}
const buildCTAStyles = (ctaType: CTAProps["ctaType"]) => {
  return ctaType === "primaryCta"
    ? `group !font-bold text-sm relative md:max-w-[200px] font-medium w-full md:w-fit p-2 uppercase flex items-center justify-center border text-secondary border-secondary rounded-full overflow-hidden`
    : `group !font-bold text-sm relative md:max-w-[200px] font-medium w-full md:w-fit p-2 uppercase flex items-center border-secondary justify-center border text-secondary bg-secondary rounded-full text-primary overflow-hidden`;
};

const Cta = ({ cta, ctaType, otherStyles = "", color }: CTAProps) => {
  return (
    <Link
      style={{ background: color, color: "white" }}
      className={`${buildCTAStyles(ctaType)} ${otherStyles}`}
      cta={{
        link: cta?.link || "#",
        label: cta?.label || "",
        linkType: cta?.linkType,
      }}
    >
      <span
        className={`relative z-10 transition-all duration-300 
      ${ctaType === "primaryCta" ? "text-secondary group-hover:text-primary" : "text-primary group-hover:text-secondary"}`}
      >
        {cta?.label}
      </span>
    </Link>
  );
};

export default Cta;
