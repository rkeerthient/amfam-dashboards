import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import { useEffect, useMemo, useState } from "react";
import PageLayout from "../components/PageLayout";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import FieldGroups from "../components/dashboard-components/common/FieldGroups";
import { Dashboard, FieldCompletionProps } from "../types/Dashboard";
import { useFieldGroupsStore } from "../components/util/useDashboardStore";
import { PROFILE_COMPLETENESS_FIELDS, TABS } from "../components/constants";
import LearningCenter from "../components/dashboard-components/static-components/LnD";
import Approvals from "../components/dashboard-components/static-components/Approvals";
import Banner from "../components/dashboard-components/Banner";
import Team from "../components/dashboard-components/Team";
import Suggestions from "../components/dashboard-components/Suggestions";
import { Image } from "@yext/pages-components";
import { QueryClient, QueryClientProvider } from "react-query";
 import SampleChart from "../components/dashboard-components/charts/SampleChart";
import IncompleteFields from "../components/dashboard-components/IncompleteFields";
import ReviewsComponent from "../components/reviewsComponent/ReviewsComponent";

export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-prof-dashboard",
    fields: [
      "id",
      "uid",
      "slug",
      "name",
      "meta",
      "address",
      "mainPhone",
      "hours",
      "headshot",
      "yearsOfExperience",
      "c_jobTitle",
      "hobbies",
      "interests",
      "languages",
      "teamName",
      "description",
      "frequentlyAskedQuestions.question",
      "frequentlyAskedQuestions.answer",
      "products",
      "awards",
      "services",
      "specialities",
      "certifications",
      "associations",
      "brands",
      "c_acceptingClients",
      "nmlsNumber",
      "disclosureLink",
      "c_linkedLocations.meta",
      "c_linkedLocations.name",
      "c_linkedLocations.id",
    ],
    filter: {
      entityTypes: ["financialProfessional"],
    },
    localization: {
      locales: ["en"],
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};

const isHexColor = (value: string) => /^#[0-9A-Fa-f]{6}$/.test(value);
const classNames = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const queryClient = new QueryClient();

const Dashboards: Template<TemplateRenderProps> = ({ document }) => {
  const {
    c_taskGroups,
    richTextDescriptionV2,
    c_dashboardCompletionLabel,
    c_dashboardCompletionDescription,
  } = document._site;

  const {
    entityId,
    fieldValues,
    setFieldValue,
    setStylesheetRef,
    setEntityId,
    backgroundColor,
    setBackgroundColor,
  } = useFieldGroupsStore();
  const [isLoading, setIsLoading] = useState(true);

  const tasks: FieldCompletionProps[] = useMemo(
    () =>
      c_taskGroups?.flatMap((group: any) =>
        group.tasks.map((task: FieldCompletionProps) => ({
          name: task.name,
          field: task.field,
        }))
      ) || [],
    [c_taskGroups]
  );

  useEffect(() => {
    setEntityId(document.id);
    if (isHexColor(document.c_color)) setBackgroundColor(document.c_color);
    tasks.forEach(({ field }) => setFieldValue(field, document[field]));
  }, [
    document.id,
    document.c_color,
    tasks,
    setEntityId,
    setBackgroundColor,
    setFieldValue,
  ]);

  useEffect(() => {
    const href = window.parent.document
      .querySelector("head>link")
      ?.getAttribute("href");
    if (href) setStylesheetRef(href);
    setIsLoading(false);
  }, [setStylesheetRef]);

  const tabs = TABS;
  const [currentTab, setCurrentTab] = useState<string>(tabs[0]);

  const missingFields: any[] = useMemo(
    () =>
      PROFILE_COMPLETENESS_FIELDS.filter(({ key }) => {
        const value = fieldValues[key];
        if (value == null) return true;
        if (typeof value === "string" && value.trim() === "") return true;
        if (Array.isArray(value) && value.length === 0) return true;
        return false;
      }),
    [fieldValues]
  );

  const completionPercentage = useMemo(() => {
    const total = PROFILE_COMPLETENESS_FIELDS.length;
    const filled = total - missingFields.length;
    return total > 0 ? Math.round((filled / total) * 100) : 0;
  }, [missingFields.length]);

  if (!backgroundColor) {
    return (
      <div className="p-10 text-center text-gray-500 animate-pulse">
        Initializing Dashboard...
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="overflow-y-scroll">
      <PageLayout _site={document._site} templateData={document}>
        <section className="flex flex-col">
          <section
            className="flex"
            style={{
              background: backgroundColor,
              color: "white",
            }}
          >
            <div className="p-4 flex items-center justify-center space-x-20 w-full">
              <div className="w-1/4">
                <Image image={document.headshot} className="w-full h-full" />
              </div>
              <Banner
                background={backgroundColor}
                entityId={entityId}
                name={document.name}
                description={richTextDescriptionV2}
              />
              {/* <Approvals /> */}
            </div>
          </section>

          <div className="px-6 w-3/4">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                value={currentTab}
                onChange={(e) => setCurrentTab(e.target.value)}
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-black focus:outline-none focus:ring-[#4492d3]"
              >
                {tabs.map((tab) => (
                  <option key={tab} value={tab}>
                    {tab}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <nav
                className="border-b border-gray-200 flex space-x-8"
                aria-label="Tabs"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCurrentTab(tab)}
                    className={classNames(
                      "border-b-2 py-4 px-1 font-medium hover:cursor-pointer ",
                      currentTab === tab
                        ? "border-b-4 font-bold"
                        : "border-transparent hover:text-gray-700"
                    )}
                    style={{
                      borderColor:
                        currentTab === tab ? "#1f66e0" : "transparent",
                      color: currentTab === tab ? "#003da5" : undefined,
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {currentTab === "About Me" && (
            <div className="px-4 flex gap-4 mt-8">
              <div className="w-3/4">
                <section className="flex flex-col gap-4 mt-8">
                  {c_taskGroups.map((group: Dashboard, idx: number) => (
                    <Disclosure
                      key={idx}
                      as="div"
                      className="w-full px-4"
                      style={{
                        background: backgroundColor,
                        color: "white",
                      }}
                    >
                      <DisclosureButton className="group w-full flex items-center py-2">
                        <ChevronRightIcon className="h-5 w-5 group-data-[open]:rotate-90" />
                        <span className="px-2 font-bold text-sm">
                          {group.name}
                        </span>
                      </DisclosureButton>
                      <DisclosurePanel className="bg-white overflow-visible -mx-4 origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0">
                        <FieldGroups tasks={group.tasks} document={document} />
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </section>
              </div>
              <div className="w-1/4 flex flex-col gap-4 border">
                <div className="p-5 bg-white flex flex-col gap-4">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-gray-900">
                      Your Profile Completeness
                    </h3>
                  </div>

                  <p className="text-gray-900">
                    Fill in <strong>Name</strong>, <strong>Address</strong>,{" "}
                    <strong>Phone</strong>, <strong>Hours</strong>,{" "}
                    <strong>Photo Gallery</strong> details to Complete your
                    profile.
                  </p>
                  <SampleChart
                    color={
                      "radial-gradient(closest-side, rgb(31, 102, 224), rgb(0, 61, 165))"
                    }
                    completionPercentage={completionPercentage}
                  />
                </div>
                {missingFields.length >= 1 && (
                  <IncompleteFields missingFields={missingFields} />
                )}
              </div>
            </div>
          )}
          {currentTab === "Reviews" && (
            <QueryClientProvider client={queryClient}>
              <ReviewsComponent />
            </QueryClientProvider>
          )}
          {currentTab === "Suggestions" && <Suggestions />}
          {currentTab === "Learning & Support" && <LearningCenter />}
          {currentTab === "My Team" && (
            <Team
              displayName={document.team}
              description={document.c_teamDescription}
              teamMembers={document.c_relatedProfessionals}
            />
          )}
        </section>
      </PageLayout>
    </div>
  );
};

export default Dashboards;
