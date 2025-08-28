import { useEffect, useState } from "react";
import Markdown, { MarkdownToJSX } from "markdown-to-jsx";

interface MarkdownProps {
  [key: string]: any;
  children: string;
  options?: MarkdownToJSX.Options;
}

type Variants = "Primary" | "Secondary" | "Tertiary";
type HeadingVariants = "Lead" | "Head" | "Sub" | "Flag" | "Brow";

export const Heading: { [K in HeadingVariants]?: string } = {
  Lead: "text-lead font-bold sm:text-leadMobile",
  Head: "text-head font-bold sm:text-headMobile",
  Sub: "text-sub font-bold sm:text-subMobile",
  Flag: "text-flag font-bold text-brand-text-medium uppercase sm:text-flagMobile",
};

export const Button: { [K in Variants]?: string } = {
  Primary:
    "text-base text-white font-bold bg-brand-primary hover:bg-brand-secondary px-4 py-2 rounded-full inline-block",
  Secondary:
    "text-base text-brand-primary active:text-white font-bold bg-white hover:bg-brand-lighter active:bg-brand-secondary border border-brand-primary px-6 py-2 rounded-full inline-block",
};

export default function RTF({
  children,
  className,
  options,
  ...props
}: MarkdownProps) {
  if (!children) return <></>;

  const [underlined, setUnderlined] = useState(children);
  const [underlineTagCount, setUnderlineTagCount] = useState(0);

  function transformChildren() {
    if (!underlined.includes("++")) return;

    const tag = underlineTagCount % 2 === 0 ? "<ins>" : "</ins>";
    setUnderlined(underlined.replace("++", tag));
    setUnderlineTagCount(underlineTagCount + 1);

    if (!underlined.includes("**")) return;
    const tag1 = underlineTagCount % 2 === 0 ? "<b>" : "</b>";
    setUnderlined(underlined.replace("**", tag1));
    setUnderlineTagCount(underlineTagCount + 1);
  }

  transformChildren();
  useEffect(transformChildren, [underlined]);

  return (
    <Markdown
      className={className + " text-brand-text-light"}
      children={underlined}
      options={
        options || {
          overrides: {
            a: {
              props: {
                className: "underline hover:no-underline text-brand-primary",
              },
            },
            h1: { props: { className: Heading.Lead } },
            h2: { props: { className: Heading.Head } },
            h3: { props: { className: Heading.Sub } },
            h4: { props: { className: Heading.Flag } },
            h5: { props: { className: Heading.Brow } },
            ol: {
              props: {
                className: "list-decimal list-inside",
              },
            },
            ul: {
              props: {
                className: "list-disc list-inside",
              },
            },
          },
        }
      }
      {...props}
    />
  );
}
