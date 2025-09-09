import { useEffect, useRef, useState } from "react";
import { FcCancel } from "react-icons/fc";
import { FiCheck, FiRefreshCw } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";
import { EnumData } from "../EnumData";
import RTF from "../RTF";
import { useFieldGroupsStore } from "../util/useDashboardStore";

type KV = Record<string, unknown>;

interface Root {
  uid?: string;
  accountId?: string;
  createdDate?: string;
  lastUpdatedDate?: string;
  resolvedDate?: string;
  source?: {
    userId?: string;
    appId?: string;
  };
  entityFieldSuggestion: {
    entity: {
      id: string;
      uid?: string;
      type?: string;
      language?: string;
      folderId?: string;
      labels?: string[];
    };
    existingContent: KV;
    suggestedContent: KV;
  };
  status?: string;
  locked?: boolean;
  comments?: unknown[];
  approver?: { userId?: string };
}

interface ApiResponse {
  response?: {
    suggestions?: Root[];
    nextPageToken?: string;
    count?: number;
  };
  meta?: {
    uuid?: string;
    errors?: unknown[];
  };
}

const normalizeStatus = (raw?: string) => (raw ?? "").trim().toLowerCase();

const useAbortable = () => {
  const controllerRef = useRef<AbortController | null>(null);
  useEffect(() => () => controllerRef.current?.abort(), []);
  return () => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    return controllerRef.current.signal;
  };
};

const Suggestions = () => {
  const { entityId } = useFieldGroupsStore();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestionsData, setSuggestionsData] = useState<Root[]>([]);
  const [pageToken, setPageToken] = useState<string>("");
  const makeSignal = useAbortable();

  useEffect(() => {
    setSuggestionsData([]);
    setPageToken("");
    void getSuggestions();
  }, [entityId]);

  const getSuggestions = async (cursor?: string) => {
    setIsLoading(true);
    const signal = makeSignal();
    try {
      const url = `/api/getSuggestions/${entityId}${cursor ? `?pageToken=${encodeURIComponent(cursor)}` : ""}`;
      const response = await fetch(url, { signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const mainJson: ApiResponse = await response.json();
      const incoming: Root[] = Array.isArray(mainJson?.response?.suggestions)
        ? mainJson!.response!.suggestions!
        : [];
      const next: string =
        typeof mainJson?.response?.nextPageToken === "string"
          ? mainJson!.response!.nextPageToken!
          : "";
      if (incoming.length) {
        setSuggestionsData((prev) => {
          const seen = new Set<string>();
          const toKey = (x: Root) =>
            x.uid ??
            `${x.createdDate ?? ""}|${x.accountId ?? ""}|${JSON.stringify(x.entityFieldSuggestion?.entity ?? {})}`;
          prev.forEach((x) => seen.add(toKey(x)));
          const fresh = incoming.filter((x) => !seen.has(toKey(x)));
          return [...prev, ...fresh];
        });
      }
      setPageToken(next);
    } catch (error: any) {
      if (error?.name !== "AbortError") {
        console.error(`Failed to fetch suggestions for ${entityId}:`, error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formattedDate = (iso?: string) => {
    if (!iso) return "—";
    const d = new Date(iso);
    try {
      return `${d.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })} at ${d.toLocaleTimeString("en-IN", { hour12: false, hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" })}`;
    } catch {
      return d.toISOString();
    }
  };

  const niceStatus = (raw?: string) => {
    if (!raw) return "—";
    const lower = raw.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const statusIcon = (raw?: string) => {
    switch (normalizeStatus(raw)) {
      case "pending":
        return <FiRefreshCw className="h-3 w-3 text-orange-500" />;
      case "approved":
        return <FiCheck className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <GrFormClose className="h-4 w-4 text-red-500" />;
      case "cancelled":
      case "canceled":
        return <FcCancel className="h-4 w-4 text-gray-800" />;
      default:
        return null;
    }
  };

  const firstNonEmptyKV = (a: KV, b: KV): KV => {
    const aHas = a && Object.keys(a).length > 0;
    return aHas ? a : b;
  };

  return (
    <div className="h-[800px] overflow-scroll p-4 bg-white">
      {isLoading ? (
        <div className="px-4 py-8 flex justify-center items-center h-full">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          />
        </div>
      ) : (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flow-root">
            {suggestionsData.length > 0 ? (
              <div
                className={`-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ${
                  suggestionsData.length > 0 && isLoading
                    ? "opacity-60"
                    : "opacity-100"
                }`}
              >
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="min-w-full divide-y divide-gray-300">
                    <div className="flex text-left text-sm font-semibold text-gray-900">
                      <div className="w-2/12 flex justify-start py-3.5 px-4 sm:pl-0">
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
                      {suggestionsData.map((item) => {
                        const rowKey =
                          item.uid ?? `${item.createdDate}-${item.accountId}`;
                        const existing =
                          item.entityFieldSuggestion.existingContent ?? {};
                        const suggested =
                          item.entityFieldSuggestion.suggestedContent ?? {};
                        const fieldSource = firstNonEmptyKV(
                          existing,
                          suggested
                        );
                        return (
                          <div
                            key={rowKey}
                            className="flex gap-4 justify-between w-full"
                          >
                            <div className="px-4 py-3 text-sm flex justify-start w-2/12 font-medium text-gray-900 whitespace-normal">
                              {Object.keys(fieldSource).length > 0 ? (
                                <div className="flex flex-col gap-1">
                                  {Object.keys(fieldSource).map((k) => (
                                    <div key={k}>{k}</div>
                                  ))}
                                </div>
                              ) : (
                                <div>—</div>
                              )}
                            </div>
                            <div className="w-3/12 px-4 py-3 text-sm flex justify-start text-gray-500">
                              {Object.keys(existing).length > 0 ? (
                                <div className="flex flex-col gap-4">
                                  {Object.entries(existing).map(([_, v], i) => (
                                    <div key={i}>
                                      {getFormattedSuggestionResponse(v)}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <span className="italic">New Content</span>
                              )}
                            </div>
                            <div className="w-3/12 px-4 py-3 text-sm flex justify-start text-gray-500">
                              {Object.keys(suggested).length > 0 ? (
                                <div className="flex flex-col gap-4">
                                  {Object.entries(suggested).map(
                                    ([_, v], i) => (
                                      <div key={i}>
                                        {getFormattedSuggestionResponse(v)}
                                      </div>
                                    )
                                  )}
                                </div>
                              ) : (
                                <span className="italic">—</span>
                              )}
                            </div>
                            <div className="px-4 w-2/12 py-3 text-sm flex justify-start">
                              {formattedDate(item.createdDate)}
                            </div>
                            <div className="px-4 py-3 w-2/12 text-sm flex items-baseline font-medium ">
                              <div className="flex gap-2 items-center">
                                <div>{niceStatus(item.status)}</div>
                                <div>{statusIcon(item.status)}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {pageToken && (
                    <button
                      onClick={() => !isLoading && getSuggestions(pageToken)}
                      disabled={isLoading}
                      className={`w-fit mx-auto text-sm px-6 py-2 border-[#002750] border text-[#002750] bg-white mt-16 ${isLoading ? "opacity-60 cursor-not-allowed" : "hover:cursor-pointer"}`}
                    >
                      {isLoading ? "Loading..." : "Load more"}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-gray-600 text-sm">
                No suggestions found.{" "}
                <button onClick={() => getSuggestions()} className="underline">
                  Retry
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function getFormattedSuggestionResponse(data: unknown): JSX.Element | string {
  if (Array.isArray(data)) {
    if (data.length > 0 && typeof data[0] === "object" && data[0] !== null) {
      return (
        <>
          {data.map((item, index) => (
            <div key={index} className="flex flex-col gap-1">
              {Object.entries(item as KV).map(([key, value], index1) => (
                <div key={index1} className="flex flex-col">
                  <div className="font-medium">{key}:</div>
                  <RTF>{String(value)}</RTF>
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
            const s = String(item);
            const maybeEnum =
              s === s.toUpperCase() ? ((EnumData as any)[s] ?? s) : s;
            return <div key={index}>{maybeEnum}</div>;
          })}
        </div>
      );
    }
  }
  if (typeof data === "string") {
    const maybeEnum =
      data === data.toUpperCase() ? ((EnumData as any)[data] ?? data) : data;
    return <div className="flex flex-col gap-2">{maybeEnum}</div>;
  }
  if (typeof data === "boolean") {
    return <div className="flex flex-col gap-2">{data ? "Yes" : "No"}</div>;
  }
  if (typeof data === "number" || typeof data === "bigint") {
    return <div className="flex flex-col gap-2">{String(data)}</div>;
  }
  if (data && typeof data === "object") {
    const obj = data as KV;
    const entries = Object.entries(obj);
    const simple = entries.every(
      ([_, v]) =>
        v === null ||
        ["string", "number", "bigint", "boolean"].includes(typeof v)
    );
    if (simple) {
      return (
        <div className="flex flex-col gap-1">
          {entries.map(([k, v]) => (
            <div key={k} className="flex flex-col">
              <div className="font-medium">{k}:</div>
              <RTF>{String(v)}</RTF>
            </div>
          ))}
        </div>
      );
    }
    return "Rich content";
  }
  return "Unknown";
}

export default Suggestions;
