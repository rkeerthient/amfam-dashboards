import { getRuntime } from "@yext/pages/util";

export const isLocal = (): boolean => {
  const runtime = getRuntime();

  return (
    runtime.name === "browser" && window?.location?.hostname === "localhost"
  );
};
