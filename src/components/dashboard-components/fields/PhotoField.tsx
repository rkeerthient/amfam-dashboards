import { Fragment, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDropzone } from "react-dropzone";
import { useFieldGroupsStore } from "../../util/useDashboardStore";
import { CompProps } from "../../../types/Dashboard";

interface FileWithPreview extends File {
  preview: string;
}

const PhotoField = ({ fieldName }: CompProps) => {
  const { setNewValue, newValues, fieldValues } = useFieldGroupsStore();

  const currentValue = newValues[fieldName];
  const initialValue = fieldValues[fieldName];

  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentValue === undefined) {
      setNewValue(fieldName, initialValue?.url ?? "");
    }
  }, [fieldName]);

  const {
    getRootProps,
    getInputProps,
    open: openDropzone,
  } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
    noClick: true,
    multiple: false,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      const mapped = acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      setFiles(mapped);
    },
  });

  const handleSave = async () => {
    if (!files.length) return;
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", files[0]);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.YEXT_PUBLIC_IMGBB_KEY}`,
        { method: "POST", body: formData }
      );
      const data = await response.json();

      if (response.ok) {
        setNewValue(fieldName, data.data.display_url);
        setOpen(false);
      } else {
        console.error("Upload error:", data);
      }
    } catch (error: any) {
      console.error("Upload failed:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => setOpen(true);
  const handleDelete = () => setNewValue(fieldName, "");

  return (
    <>
      <div ref={inputRef} className="w-full py-3 max-h-96 overflow-scroll">
        <div className="flex flex-col gap-4">
          {currentValue ? (
            <div>
              <div className="ml-1 relative w-[150px] h-[150px] rounded-sm border flex items-center justify-center hover:cursor-pointer group hover:ring-1 hover:ring-blue-800 bg-gray-100">
                <img
                  src={currentValue}
                  alt="Uploaded"
                  className="!max-h-full !w-auto group-hover:opacity-60"
                  onClick={handleEdit}
                />
                <div className="group-hover:visible invisible absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white flex flex-col items-center">
                  <div
                    className="hover:bg-gray-200 h-7 flex items-center text-xs w-fit border rounded-full px-4 text-black border-gray-300"
                    onClick={handleEdit}
                  >
                    Edit
                  </div>
                  <div
                    className="h-7 flex items-center text-xs w-fit border rounded-full px-4 text-white bg-red-500 hover:bg-red-600 mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete();
                    }}
                  >
                    Delete
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <span
              className="text-xs text-[#5A58F2] hover:underline hover:cursor-pointer"
              onClick={handleEdit}
            >
              Select Photo
            </span>
          )}
        </div>
      </div>

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
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="w-[800px] h-full transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                  <div className="absolute top-0 right-0 p-4">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setOpen(false)}
                    >
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex flex-col gap-4 m-6">
                    <div className="text-xl font-light">Add Photo</div>
                    <div className="bg-[#f7f9ff] flex flex-col items-center p-8 gap-4">
                      <div {...getRootProps()} className="cursor-pointer">
                        <input {...getInputProps()} />
                        <img
                          src="https://www.yextstatic.com/s/merrill/public/images/multi-content-selector/drag-drop-empty-cart.svg"
                          alt="Upload"
                        />
                      </div>
                      <button
                        onClick={openDropzone}
                        className="border-gray-300 hover:bg-[#eef0f6] text-sm px-4 border rounded-full h-8"
                      >
                        Upload Photos
                      </button>
                      <div className="text-xs text-gray-600">
                        File Formats: JPG, PNG, WEBP, GIF (Static Only), Max
                        Size: 5MB
                      </div>
                    </div>

                    {files.length > 0 && (
                      <div className="flex flex-col gap-4 items-center">
                        <div className="text-xl font-light w-full text-start">
                          Preview
                        </div>
                        <div className="grid grid-cols-4 gap-2 w-[95%]">
                          {files.map((file) => (
                            <div
                              key={file.name}
                              className="relative w-[150px] h-[150px] border flex items-center justify-center"
                            >
                              {isLoading && (
                                <div className="absolute h-5 w-5 animate-spin rounded-full border-4 border-current border-r-transparent" />
                              )}
                              <img
                                src={file.preview}
                                alt="Preview"
                                className="w-full h-full object-contain rounded"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end gap-6 items-center">
                      <button
                        onClick={() => {
                          setFiles([]);
                          setOpen(false);
                        }}
                        className="text-xs text-[#5A58F2] hover:underline"
                      >
                        Cancel
                      </button>
                      <button
                        disabled={!files.length || isLoading}
                        onClick={handleSave}
                        className={`h-[30px] flex items-center rounded-full px-4 py-0 text-xs ${
                          files.length && !isLoading
                            ? "bg-blue-700 text-white hover:bg-blue-800"
                            : "bg-[#dadce0] text-[#97999D] cursor-not-allowed"
                        }`}
                      >
                        {isLoading ? "Uploading..." : "Continue"}
                      </button>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PhotoField;
