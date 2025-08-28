import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import LexicalMarkdownEditor from "./LexicalRichText/LexicalMarkdownEditor";
import LexicalRichTextEditorNewBlog from "./LexicalRichText/LexicalRichTextEditorNewBlog";
import PhotoFieldForBlog from "./PhotoFieldForBlog";
import { FetchedEntityProps } from "./entityField/EntityField";

interface AddNewEntityProps {
  onClose: () => void;
  onEntityCreated: (entity: FetchedEntityProps) => void;
}
interface NewBlogProps {
  name?: string;
  landingPageUrl?: string;
  c_category?: string;
  datePosted?: string;
  shortDescriptionV2?: object | string;
  bodyV2?: string;
  photoGallery?: { image: { url: string } }[];
}

const LabeledInput = ({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value?: string;
  onChange: (val: string) => void;
  type?: string;
}) => (
  <div className="flex flex-1">
    <div className="flex flex-col w-[180px]">
      <p className="text-xs font-medium">{label}</p>
    </div>
    <input
      type={type || "text"}
      className={`border mb-2.5 w-full border-[#dadce0] h-[30px] rounded-md py-1.5 pl-2.5`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default function AddNewEntity({
  onClose,
  onEntityCreated,
}: AddNewEntityProps) {
  const [open, setOpen] = useState(true);
  const [newBlog, setNewBlog] = useState<NewBlogProps>({});
  const [isLoading, setIsLoading] = useState(false);
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const requestBody = encodeURIComponent(
        JSON.stringify({
          ...newBlog,
          c_relatedBlogs: ["4635269"],
        })
      );

      const res = await fetch(`/api/createEntity?body=${requestBody}`);
      const data = await res.json();

      onEntityCreated({
        id: data.response.meta.id,
        name: data.response.name,
        meta: {
          entityType: {
            id: data.response.meta.entityType,
          },
        },
      });
    } catch (err) {
      console.error("Failed to save", err);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-full overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="w-2/4 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleCancel}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="p-8 text-sm">
                  <div className="text-xl font-bold mb-6">New Blog</div>
                  <div className="flex flex-col">
                    <LabeledInput
                      label="Name"
                      value={newBlog.name}
                      onChange={(val) =>
                        setNewBlog((prev) => ({ ...prev, name: val }))
                      }
                    />
                    <LabeledInput
                      label="Landing Page URL"
                      value={newBlog.landingPageUrl}
                      onChange={(val) =>
                        setNewBlog((prev) => ({ ...prev, landingPageUrl: val }))
                      }
                    />
                    <LabeledInput
                      label="Category"
                      value={newBlog.c_category}
                      onChange={(val) =>
                        setNewBlog((prev) => ({ ...prev, c_category: val }))
                      }
                    />
                    <LabeledInput
                      label="Date Posted"
                      type="date"
                      value={newBlog.datePosted}
                      onChange={(val) =>
                        setNewBlog((prev) => ({
                          ...prev,
                          datePosted: val,
                        }))
                      }
                    />
                    <div className="flex flex-1">
                      <div className="flex flex-col w-[180px]">
                        <p className="text-xs font-medium">Photo</p>
                      </div>
                      <PhotoFieldForBlog
                        value={newBlog.photoGallery?.[0]?.image?.url}
                        onChange={(url) =>
                          setNewBlog((prev) => ({
                            ...prev,
                            photoGallery: url ? [{ image: { url } }] : [],
                          }))
                        }
                      />
                    </div>
                    <div className="flex flex-1">
                      <div className="flex flex-col w-[180px]">
                        <p className="text-xs font-medium">Short Description</p>
                      </div>
                      <LexicalRichTextEditorNewBlog
                        serializedAST={JSON.stringify({
                          root: {
                            children: [
                              {
                                children: [],
                                direction: null,
                                format: "",
                                indent: 0,
                                type: "paragraph",
                                version: 1,
                              },
                            ],
                            direction: null,
                            format: "",
                            indent: 0,
                            type: "root",
                            version: 1,
                          },
                        })}
                        editable={true}
                        setChangedData={(richText) =>
                          setNewBlog((prev) => ({
                            ...prev,
                            shortDescriptionV2: richText,
                          }))
                        }
                      />
                    </div>
                    <div className="flex flex-1 mt-4">
                      <div className="flex flex-col w-[180px]">
                        <p className="text-xs font-medium">Body</p>
                      </div>
                      <LexicalMarkdownEditor
                        serializedAST={""}
                        editable
                        setChangedData={(richText) =>
                          setNewBlog((prev) => ({
                            ...prev,
                            bodyV2: richText,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="flex mt-6 gap-3 justify-end">
                    <div
                      className="h-[30px] rounded-2xl border px-4 py-2 flex items-center justify-center bg-[#5A58F2] text-white cursor-pointer disabled:bg-[#dadce0] disabled:text-[#97999d] disabled:cursor-not-allowed"
                      onClick={handleSave}
                    >
                      Continue
                    </div>
                    <button
                      onClick={handleCancel}
                      className="h-[30px] text-[#5A58F2] px-4 py-2 flex items-center justify-center"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
