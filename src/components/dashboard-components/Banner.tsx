import { LexicalRichText } from "@yext/pages-components";
import { RichTextV2 } from "../../types/autogen";
import { useState } from "react";
import Portal from "./Portal";

const Banner = ({
  name,
  description,
  entityId,
}: {
  name: string;
  description: RichTextV2;
  entityId: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="w-3/5 flex flex-col gap-4">
      <div className="text-3xl font-bold">Welcome, {name} !</div>
      {/* <div>
        <div className="  text-brand-text-light">
          {<LexicalRichText serializedAST={JSON.stringify(description.json)} />}
        </div>
      </div> */}
      <div className="flex gap-4">
        {/* <div className="bg-slate-200 px-4 py-2 rounded-md text-gray-800 font-semibold text-xs ">
          <a
            href={`https://ubs-professionals.pgsdemo.com/professionals/${entityId}`}
            target="_blank"
          >
            View Live page
          </a>
        </div> */}
        <div className="bg-slate-200 px-4 py-2 rounded-md text-gray-800 font-semibold text-xs">
          <button onClick={() => setOpen((o) => !o)}>View Live Preview</button>
          <Portal open={open} setOpen={setOpen}></Portal>
        </div>
      </div>
    </div>
  );
};

export default Banner;

// import { LexicalRichText } from "@yext/pages-components";
// import { RichTextV2 } from "../../types/autogen";
// import { useState } from "react";
// import Portal from "./Portal";

// const Banner = ({
//   name,
//   description,
//   entityId,
// }: {
//   name: string;
//   description: RichTextV2;
//   entityId: string;
// }) => {
//   const [open, setOpen] = useState<boolean>(false);

//   return (
//     <div className="w-4/5 flex flex-col gap-4 !text-white">
//       <div className="text-2xl font-light">
//         Online Activity Dashboard for {name}
//         <div className="flex justify-between mt-12">
//           <p className="text-base border-l-4 border-[#ce3f00] pl-4">
//             This is a summary of recent activity in support of your agency's
//             online presence, along with the discoverability and engagement
//             generated across your website, listings and social networks.
//           </p>
//           <div className="flex flex-col gap-2">
//             <p className="text-base">
//               If you have more than one location, select the location you would
//               like to view
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="flex gap-4">
//         {/* <div className="bg-slate-200 px-4 py-2 rounded-md text-gray-800 font-semibold text-xs ">
//           <a
//             href={`https://ubs-professionals.pgsdemo.com/professionals/${entityId}`}
//             target="_blank"
//           >
//             View Live page
//           </a>
//         </div> */}
//         <div className="bg-slate-200 px-4 py-2 rounded-md text-gray-800 font-semibold text-xs">
//           <button onClick={() => setOpen((o) => !o)}>View Live Preview</button>
//           <Portal open={open} setOpen={setOpen}></Portal>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;
