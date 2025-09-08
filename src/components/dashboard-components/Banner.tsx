import { LexicalRichText } from "@yext/pages-components";
import { RichTextV2 } from "../../types/autogen";
import { useState } from "react";
import Portal from "./Portal";

const Banner = ({
  name,
  description,
  entityId,
  background,
}: {
  name: string;
  description: RichTextV2;
  entityId: string;
  background?: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="w-3/5 flex flex-col gap-4">
      <div className="text-3xl font-bold">Welcome, {name} !</div>
      <div>
        <div className="text-brand-text-light">
          {<LexicalRichText serializedAST={JSON.stringify(description.json)} />}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="bg-slate-200 px-4 py-2 rounded-md text-gray-800 font-semibold text-xs">
          <a
            target="_blank"
            href="https://sandbox.yext.com/s/3356618/listings/all-listings#s0=0&l0=25&sortCol=default&sortDir=asc"
            type="button"
          >
            Listings Recommendations
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
