import { useEffect, useState } from "react";
import { FcCancel } from "react-icons/fc";
import { FiCheck, FiRefreshCw } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";
import { EnumData } from "../EnumData";
import RTF from "../RTF";
import { useFieldGroupsStore } from "../util/useDashboardStore";

export interface Root {
  uid: string;
  accountId: string;
  createdDate: string;
  lastUpdatedDate: string;
  resolvedDate: string;
  source: Source;
  entityFieldSuggestion: EntityFieldSuggestion;
  status: string;
  locked: boolean;
  comments: any[];
  approver: Approver;
}

export interface Source {
  userId: string;
}

export interface EntityFieldSuggestion {
  entity: Entity;
  existingContent: ExistingContent;
  suggestedContent: SuggestedContent;
}

export interface Entity {
  id: string;
  uid: string;
  type: string;
  language: string;
  folderId: string;
  labels: string[];
}

export interface ExistingContent {
  c_fAQs: CFAq[];
}

export interface CFAq {
  question: string;
  answer: string;
}

export interface SuggestedContent {
  c_fAQs: CFAq2[];
}

export interface CFAq2 {
  question: string;
  answer: string;
}

export interface Approver {
  userId: string;
}

export interface Source {
  userId: string;
}
const Suggestions = () => {
  const { entityId } = useFieldGroupsStore();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestionsData, setSuggestionsData] = useState<Root[]>([]);
  const [pageToken, setPageToken] = useState<string>("");

  useEffect(() => {
    getFieldConfig();
  }, []);

  const getFieldConfig = async (pageToken?: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/getSuggestions/${entityId}${
          pageToken ? `?pageToken=${pageToken}` : ""
        }`
      );
      const mainJson: any = await response.json();

      const suggestions: Root[] = await mainJson.response.suggestions;
      suggestions &&
        setPageToken(
          mainJson.response.nextPageToken.length >= 1
            ? mainJson.response.nextPageToken
            : undefined
        );
      setSuggestionsData((prev) => [...prev, ...suggestions]);
    } catch (error) {
      console.error(
        `Failed to fetch field configuration for ${entityId}:`,
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formattedDate = (createdDate: string) => {
    const dateObject = new Date(Date.parse(createdDate));

    const dateString = dateObject.toLocaleDateString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    const timeString = dateObject.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${dateString} at ${timeString}`;
  };
  return (
    <div className=" h-[800px] overflow-scroll p-4 bg-white">
      {isLoading ? (
        <div className="px-4 py-8 flex justify-center items-center h-full">
          <>
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          </>
        </div>
      ) : (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flow-root">
            <div
              className={`-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ${
                suggestionsData && suggestionsData.length >= 1 && isLoading
                  ? `opacity-60`
                  : `opacity-100`
              }`}
            >
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="min-w-full divide-y divide-gray-300">
                  <div className="flex text-left text-sm font-semibold text-gray-900">
                    <div className="w-2/12 flex justify-start py-3.5  px-4 sm:pl-0">
                      Field
                    </div>
                    <div className="w-3/12 flex justify-start px-3 py-3.5">
                      Existing Content
                    </div>
                    <div className="w-3/12 flex justify-start px-3 py-3.5">
                      Suggested Content
                    </div>
                    <div className="w-2/12 flex justify-start px-3 py-3.5">
                      Created Date Time
                    </div>
                    <div className="w-2/12 flex justify-start px-3 py-3.5">
                      Status
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200 text-gray-500">
                    {suggestionsData.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 justify-between w-full"
                      >
                        <div className="px-4 py-3 text-sm flex justify-start w-2/12 font-medium text-gray-900 whitespace-normal">
                          {Object.entries(
                            JSON.stringify(
                              item.entityFieldSuggestion.existingContent
                            ) !== "{}"
                              ? item.entityFieldSuggestion.existingContent
                              : item.entityFieldSuggestion.suggestedContent
                          ).map(([key, value], index1) => (
                            <div key={index1}>{key}</div>
                          ))}
                        </div>
                        <div className="w-3/12 px-4 py-3 text-sm flex justify-start text-gray-500">
                          {JSON.stringify(
                            item.entityFieldSuggestion.existingContent
                          ) !== "{}" ? (
                            Object.entries(
                              item.entityFieldSuggestion.existingContent
                            ).map(([key, value], index1) => (
                              <div key={index1}>
                                <div className="flex flex-col gap-4">
                                  {getFormattedSuggestionResponse(value)}
                                </div>
                              </div>
                            ))
                          ) : (
                            <span className="italic">New Content</span>
                          )}
                        </div>
                        <div className="w-3/12 px-4 py-3 text-sm flex justify-start text-gray-500">
                          {Object.entries(
                            item.entityFieldSuggestion.suggestedContent
                          ).map(([key, value], index1) => (
                            <div key={index1}>
                              <div className="flex flex-col gap-4">
                                {getFormattedSuggestionResponse(value)}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="px-4  w-2/12 py-3 text-sm flex justify-start">
                          {formattedDate(item.createdDate)}
                        </div>
                        <div className="px-4 py-3  w-2/12 text-sm flex items-baseline font-medium ">
                          <div className="flex gap-2 items-center">
                            {" "}
                            <div>
                              {item.status[0].toUpperCase() +
                                item.status.slice(1).toLocaleLowerCase()}
                            </div>
                            <div>
                              {(() => {
                                switch (
                                  item.status[0].toUpperCase() +
                                  item.status.slice(1).toLowerCase()
                                ) {
                                  case "Pending":
                                    return (
                                      <FiRefreshCw className="h-3 w-3 text-orange-500" />
                                    );
                                  case "Approved":
                                    return (
                                      <FiCheck className="h-4 w-4 text-green-500" />
                                    );
                                  case "Rejected":
                                    return (
                                      <GrFormClose className="h-4 w-4 text-red-500" />
                                    );
                                  case "Cancelled":
                                    return (
                                      <FcCancel className="h-4 w-4 text-gray-800" />
                                    );
                                  default:
                                    return null;
                                }
                              })()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {pageToken && (
                  <div
                    onClick={() => getFieldConfig(pageToken)}
                    className="w-fit mx-auto text-sm hover:cursor-pointer text-center px-6 py-2 border-[#002750] border text-[#002750] bg-white mt-16"
                  >
                    Load more
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function getFormattedSuggestionResponse(data: any): JSX.Element | string {
  if (Array.isArray(data)) {
    if (data.length > 0 && typeof data[0] === "object") {
      return (
        <>
          {data.map((item, index) => (
            <div key={index} className="flex flex-col gap-1">
              {Object.entries(item).map(([key, value], index1) => (
                <div key={index1}>
                  <div className="flex flex-col ">
                    <div className="font-medium">{key}:</div>
                    {<RTF>{String(value)}</RTF>}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </>
      );
    } else {
      return (
        <div className="flex flex-col">
          {data.map((item, index) => {
            return (
              <div key={index}>
                {isNaN(parseFloat(item)) && item.toUpperCase() === item
                  ? EnumData[item]
                  : item}
              </div>
            );
          })}
        </div>
      );
    }
  } else if (typeof data === "string") {
    return (
      <div className="flex flex-col gap-2">
        {data === data.toUpperCase() ? EnumData[data] : data}
      </div>
    );
  } else if (typeof data === "object" && data !== null) {
    return "Rich content";
  }
  return "Unknown";
}

export default Suggestions;
