import { useEffect, useState, useMemo } from "react";
import { getRuntime } from "@yext/pages/util";
import { TemplateProps } from "@yext/pages";
import { useFieldGroupsStore } from "./util/useDashboardStore";
import { isLocal } from "./util/isLocal";
import "../index.css";
import TandC from "./dashboard-components/static-components/T&C";
import { SiteEntity } from "../types/autogen";
import { QueryClient, QueryClientProvider } from "react-query";

export const FONT_MAP: Record<string, string> = {
  WORK_SANS: "Work Sans",
  EB_GARAMOND: "EB Garamond",
  INTER: "Inter",
  LATO: "Lato",
  MERRIWEATHER: "Merriweather",
  NUNITO: "Nunito",
  PLAYFAIR_DISPLAY: "Playfair Display",
  ROBOTO: "Roboto",
  SERIF: "serif",
  SOFIA_SANS: "Sofia Sans",
};

export interface PageLayoutProps {
  children?: React.ReactNode;
  _site?: SiteEntity;
  templateData: TemplateProps;
}

declare global {
  interface Window {
    YEXT_AUTH: { visitor: { externalId: string } };
  }
}

interface ACL {
  roleId: string;
  roleName: string;
}

interface ResponseData {
  acl: ACL[];
}
const queryClient = new QueryClient();

const fetchUserDetails = async (
  userId: string
): Promise<ResponseData | null> => {
  try {
    const response = await fetch(`/api/getUser/${userId}`);
    const data = await response.json();
    return data.response as ResponseData;
  } catch (error) {
    console.error(`Failed to fetch user for ID ${userId}:`, error);
    return null;
  }
};

const PageLayout = ({ children, _site, templateData }: PageLayoutProps) => {
  const { setIsAdmin, setFieldValue, setPortalPreviewValue, isAdmin } =
    useFieldGroupsStore();
  const runtime = getRuntime();
  const [userId, setUserId] = useState("");
  const { newValues, fieldValues, setNewValue } = useFieldGroupsStore();

  if (typeof (globalThis as any).queueMicrotask !== "function") {
    (globalThis as any).queueMicrotask = (cb: () => void) =>
      Promise.resolve()
        .then(cb)
        .catch((err) =>
          setTimeout(() => {
            throw err;
          })
        );
  }

  const filteredObject = useMemo(() => {
    return Object.keys(templateData)
      .filter((key) => !key.includes("__"))
      .reduce((acc: Record<string, any>, key: string) => {
        acc[key] = (templateData as Record<string, any>)[key];
        return acc;
      }, {});
  }, [templateData]);

  const fontKey = newValues["c_fonts"] ?? fieldValues["c_fonts"];

  useEffect(() => {
    if (!newValues["c_fonts"] && fieldValues["c_fonts"]) {
      setNewValue("c_fonts", fieldValues["c_fonts"]);
    }
  }, [newValues["c_fonts"], fieldValues["c_fonts"], setNewValue]);

  useEffect(() => {
    const fontFamily = FONT_MAP[fontKey];
    if (fontFamily) {
      document.body.style.fontFamily = `"${fontFamily}", sans-serif`;
    }
  }, [fontKey]);

  useEffect(() => {
    Object.entries(filteredObject).forEach(([key, value]) => {
      setFieldValue(key, value);
      setPortalPreviewValue(key, value);
    });
  }, [filteredObject, setFieldValue, setPortalPreviewValue]);

  useEffect(() => {
    if (isLocal()) {
      setIsAdmin(true);
    } else if (
      runtime.name === "browser" &&
      window?.YEXT_AUTH?.visitor?.externalId
    ) {
      const externalId = window.YEXT_AUTH.visitor.externalId;
      setUserId(externalId);
      if (externalId === "2676513") setIsAdmin(true);
    }
  }, [runtime.name, setIsAdmin]);

  useEffect(() => {
    const checkUserType = async () => {
      const user = await fetchUserDetails(userId);
      if (user?.acl?.[0]?.roleName === "Content Requester") {
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }
    };

    if (userId) checkUserType();
  }, [userId, setIsAdmin]);

  return (
    <div className="min-h-screen">
      <TandC />
      {/* <Header _site={_site} /> */}
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      {/* <Footer _site={_site} /> */}
    </div>
  );
};

export default PageLayout;
