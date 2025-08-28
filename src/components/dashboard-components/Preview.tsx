import {
  C_clientFocuses,
  C_designations,
  C_serviceAreas,
} from "../../types/autogen";
import { PreviewFields } from "../../types/preview";
import Cta from "../CTA";
import Footer from "../Footer";
import Header from "../Header";
import { useFieldGroupsStore } from "../util/useDashboardStore";
import { Address, Image, LexicalRichText } from "@yext/pages-components";
import "font-awesome/css/font-awesome.min.css";
import { PhoneIcon, StarIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Hours from "./hours";
import { FONT_MAP } from "../PageLayout";

const Preview = () => {
  const { portalPreviewValues } = useFieldGroupsStore();
  const [fields, setFields] = useState<PreviewFields>(
    portalPreviewValues as any
  );
  const [templateSelected, setTemplateSelected] = useState<boolean>(true);
  const fontFamily = FONT_MAP[fields.c_fonts];

  useEffect(() => {
    const unsubscribe = useFieldGroupsStore.subscribe((state) => {
      setFields(state.portalPreviewValues as any);
    });
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   setTemplateSelected(fields.c_template === "TEMPLATE_1" ? true : false);
  // }, [fields.c_template]);

  return (
    <section style={{ fontFamily: `${fontFamily}, sans-serif` }}>
      {/* <Header _site={fields._site} /> */}
      <hr />
      {!templateSelected && (
        <section
          className="h-[450px] bg-cover bg-center flex items-center justify-center"
          // style={{
          //   backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${fields.c_heroBannerImage?.url})`,
          // }}
        >
          <div className="flex flex-col items-center gap-2 text-white">
            {fields.headshot && (
              <div>
                <Image
                  image={fields.headshot}
                  className="!aspect-square w-36 !h-36 rounded-full !max-w-none !my-0"
                />
              </div>
            )}
            <div>{fields.name}</div>
            <div>
              <Address
                address={fields.address}
                lines={[
                  ["line1"],
                  ["line2"],
                  ["city", ",", "region", " ", "postalCode"],
                ]}
              />
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4" />{" "}
              {formatUSNumber(fields.mainPhone)}
            </div>
            <div>
              <Cta
                color={fields.c_color}
                ctaType="secondaryCta"
                cta={{ label: "Book appointment", linkType: "URL", link: "" }}
                otherStyles="border-2 font-light px-4"
              />
            </div>
          </div>
        </section>
      )}
      {templateSelected && (
        <section className="centered-container flex flex-col md:h-[500px] md:flex-row md:justify-between gap-4 md:gap-0">
          <article className="flex flex-col w-full md:w-1/2 gap-3 md:gap-4">
            <h1 className="text-2xl md:text-5xl font-light">{fields.name}</h1>
            <p className="text-lg md:text-xl font-medium italic">
              {fields.c_jobTitle || (
                <span className="text-sm text-gray-400">{`Enter your title`}</span>
              )}
            </p>
            <span className="flex items-center gap-2">
              <p className="font-light">{4}</p>
              <span className="gap-0.5 flex items-center">
                {Array.from([1, 2, 3, 4]).map((item) => (
                  <StarIcon
                    style={{ fill: fields.c_color }}
                    key={item}
                    className="h-4 w-4   border-transparent"
                  />
                ))}
                <StarIcon className="h-4 w-4" />
              </span>
              <span className="font-normal">({243} reviews)</span>
            </span>
            <p>{fields.description}</p>
            <nav className="flex flex-col md:flex-row gap-4">
              <Cta
                color={fields.c_color}
                ctaType="secondaryCta"
                cta={{ label: "Book appointment", linkType: "URL", link: "" }}
                otherStyles="border-2 font-light px-4"
              />
            </nav>
          </article>
          {fields.headshot && (
            <Image
              image={fields.headshot}
              className="!aspect-square w-full md:!w-1/3 rounded-lg !max-w-none !my-0"
            />
          )}
        </section>
      )}
      {!templateSelected && (
        <section>
          <section className="centered-container">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-20">
              <article className="flex flex-col gap-4">
                <section className="flex flex-col gap-1">
                  <h3 className="text-xl font-medium">Address</h3>
                  <Address
                    address={fields.address}
                    lines={[
                      ["line1"],
                      ["line2"],
                      ["city", ",", "region", " ", "postalCode"],
                    ]}
                  />{" "}
                </section>
                <section className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="h-4 w-4" />{" "}
                    {formatUSNumber(fields.mainPhone)}
                  </div>
                </section>
              </article>
              <article className="flex flex-col">
                <Hours title={"Hours"} hours={fields.hours} />
              </article>
              <article className="flex flex-col gap-4">
                {fields.c_clientFocuses && (
                  <article className="flex flex-col gap-4">
                    <h3 className="text-xl font-medium">Client Focuses</h3>
                    <ul className="list-disc pl-4 marker:text-secondary space-y-2">
                      {fields.c_clientFocuses.map((item, index: number) => (
                        <li key={index}>
                          {
                            C_clientFocuses[
                              item as keyof typeof C_clientFocuses
                            ]
                          }
                        </li>
                      ))}
                    </ul>
                  </article>
                )}
                {fields.c_serviceAreas && (
                  <article className="flex flex-col gap-4">
                    <h3 className="text-xl font-medium">Service Areas</h3>
                    <p className="space-y-2">
                      {fields.c_serviceAreas.map((item, index) => (
                        <span key={index}>
                          {C_serviceAreas[item as keyof typeof C_serviceAreas]}
                          {index !== fields.c_serviceAreas.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                  </article>
                )}
              </article>
            </section>
          </section>
        </section>
      )}
      <section className="bg-gray-100">
        <section className="centered-container">
          <h2
            style={{ borderColor: fields.c_color }}
            className="text-2xl md:text-4xl font-light text-left pb-4 border-b-4 w-fit"
          >
            Professional Details
          </h2>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <article className="flex flex-col gap-4">
              <section className="flex flex-col gap-1">
                <h3 className="text-xl font-medium">Experience</h3>
                <p>{fields.yearsOfExperience || 10} Years</p>
              </section>
              {fields.c_education && (
                <section className="flex flex-col gap-1">
                  <h3 className="text-xl font-medium">Education Details</h3>
                  <ul className="list-disc pl-4 marker:text-secondary space-y-2">
                    {fields.c_education.map((item: any, index: number) => (
                      <li key={index}>
                        {item.degree} - {item.school}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </article>
            <article className="flex flex-col gap-4">
              {fields.languages && (
                <section className="flex flex-col gap-1">
                  <h3 className="text-xl font-medium">Languages</h3>
                  <p>
                    {fields.languages.map((item, index) => (
                      <span key={index}>
                        {item}
                        {index !== fields.languages.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </section>
              )}
              {fields.c_designations && (
                <section className="flex flex-col gap-1">
                  <h3 className="text-xl font-medium">Designations</h3>
                  <ul className="list-disc pl-4 marker:text-secondary space-y-2">
                    {fields.c_designations.map(
                      (item: C_designations, index: number) => (
                        <li key={index}>
                          {item.name} ({item.abbreviation}) - {item.date}
                        </li>
                      )
                    )}
                  </ul>
                </section>
              )}
            </article>
            {templateSelected && (
              <article className="flex flex-col gap-4">
                {fields.c_clientFocuses && (
                  <article className="flex flex-col gap-4">
                    <h3 className="text-xl font-medium">Client Focuses</h3>
                    <ul className="list-disc pl-4 marker:text-secondary space-y-2">
                      {fields.c_clientFocuses.map((item, index: number) => (
                        <li key={index}>
                          {
                            C_clientFocuses[
                              item as keyof typeof C_clientFocuses
                            ]
                          }
                        </li>
                      ))}
                    </ul>
                  </article>
                )}
                {fields.c_serviceAreas && (
                  <article className="flex flex-col gap-4">
                    <h3 className="text-xl font-medium">Service Areas</h3>
                    <p className="space-y-2">
                      {fields.c_serviceAreas.map((item, index) => (
                        <span key={index}>
                          {C_serviceAreas[item as keyof typeof C_serviceAreas]}
                          {index !== fields.c_serviceAreas.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                  </article>
                )}
              </article>
            )}
          </section>
        </section>
      </section>
      {fields.c_relatedBlogs && (
        <section className="centered-container">
          <h2
            className="text-2xl md:text-4xl font-light border-b-4 w-fit pb-4"
            style={{ borderColor: fields.c_color }}
          >
            Blogs
          </h2>
          <div
            className={`mt-10 ${!templateSelected ? `flex flex-row items-center gap-2` : ` space-y-16`}`}
          >
            {fields.c_relatedBlogs.slice(0, 3).map((post) => (
              <article
                key={post.id}
                className={`flex ${templateSelected ? `max-w-xl` : `w-1/3 border rounded-md p-1 !h-64`} flex-col items-start justify-between`}
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datePosted} className="text-gray-500">
                    {post.datePosted}
                  </time>
                  <a
                    href={post.c_category}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.c_category}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg/6 font-light text-gray-900 group-hover:text-gray-600">
                    <a href={"#"}>
                      <span className="absolute inset-0" />
                      {post.name}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                    <LexicalRichText
                      serializedAST={JSON.stringify(
                        post.shortDescriptionV2.json
                      )}
                    />
                  </p>
                </div>
                <div className="relative mt-4 flex items-center gap-x-4">
                  <img
                    alt=""
                    src={fields.headshot.url}
                    className="size-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm/6">
                    <p className="font-semibold text-gray-900">
                      <a href={"#"}>
                        <span className="absolute inset-0" />
                        {fields.name}
                      </a>
                    </p>
                    <p className="text-gray-600">
                      {fields.c_jobTitle || "Advisor"}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
      {fields.frequentlyAskedQuestions && (
        <section className="bg-gray-100">
          <section aria-labelledby="faqs-title" className="centered-container">
            <header>
              <h2
                id="faqs-title"
                className="text-2xl md:text-4xl font-light border-b-4 pb-4 w-fit"
                style={{ borderColor: fields.c_color }}
              >
                FAQs
              </h2>
            </header>

            <dl className="mt-20 divide-y divide-gray-900/10">
              {fields.frequentlyAskedQuestions.map((faq, id) => {
                return (
                  <div
                    key={id}
                    className="py-8 first:pt-0 last:pb-0 md:grid md:grid-cols-12 md:gap-8"
                  >
                    <dt className="text-base/7 font-semibold text-gray-900 md:col-span-5">
                      {faq.question}
                    </dt>
                    <dd className="mt-4 md:col-span-7 md:mt-0">{faq.answer}</dd>
                  </div>
                );
              })}
            </dl>
          </section>
        </section>
      )}
      {templateSelected && fields.c_relatedProfessionals && (
        <section aria-labelledby="blogs-title" className="centered-container">
          <div className="mx-auto grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <div className="max-w-2xl xl:col-span-2">
              <h2
                className="text-pretty text-4xl font-light tracking-tight text-gray-900 sm:text-5xl w-fit pb-4 border-b-4"
                style={{ borderColor: fields.c_color }}
              >
                {fields.teamName}
              </h2>
              <p className="mt-6 text-lg/8 text-gray-600">
                {fields.c_teamDescription}
              </p>
            </div>
            <ul role="list" className="divide-y divide-gray-200 xl:col-span-3">
              {fields.c_relatedProfessionals.map((person) => (
                <li
                  key={person.name}
                  className="flex flex-col gap-10 py-12 first:pt-0 last:pb-0 sm:flex-row"
                >
                  <img
                    alt=""
                    src={person.headshot.url}
                    className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"
                  />
                  <div className="max-w-xl flex-auto">
                    <h3 className="text-lg/8 font-light tracking-tight text-gray-900">
                      {person.name}
                    </h3>
                    <p className="text-base/7 text-gray-600">
                      {person.c_jobTitle}
                    </p>
                    <p className="mt-6 text-base/7 text-gray-600">
                      {person.description}
                    </p>
                    <ul role="list" className="mt-6 flex gap-x-6">
                      <li>
                        <a
                          href={person.slug}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">X</span>
                          <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                            className="size-5"
                          >
                            <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          href={person.slug}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">LinkedIn</span>
                          <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                            className="size-5"
                          >
                            <path
                              d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                              clipRule="evenodd"
                              fillRule="evenodd"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      {!templateSelected && fields.c_relatedProfessionals && (
        <section aria-labelledby="blogs-title" className="centered-container">
          <div className="mx-auto grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
            <div className="max-w-2xl">
              <h2
                className="text-pretty text-4xl font-light tracking-tight text-gray-900 sm:text-5xl w-fit pb-4 border-b-4"
                style={{ borderColor: fields.c_color }}
              >
                {fields.teamName}
              </h2>
              <p className="mt-6 text-lg/8 text-gray-600">
                {fields.c_teamDescription}
              </p>
            </div>
            <ul
              role="list"
              className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2"
            >
              {fields.c_relatedProfessionals.map((person) => (
                <li key={person.name}>
                  <img
                    alt=""
                    src={person.headshot.url}
                    className="aspect-[3/2] w-full rounded-2xl object-cover"
                  />
                  <h3 className="mt-6 text-lg/8 font-semibold text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-base/7 text-gray-600">
                    {person.c_jobTitle}
                  </p>
                  <p className="mt-4 text-base/7 text-gray-600">
                    {person.description}
                  </p>
                  <ul role="list" className="mt-6 flex gap-x-6">
                    <li>
                      <a
                        href={person.slug}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">X</span>
                        <svg
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          className="size-5"
                        >
                          <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href={person.slug}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <svg
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          className="size-5"
                        >
                          <path
                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      {/* <Footer _site={fields._site} /> */}
    </section>
  );
};

export default Preview;

function formatUSNumber(entry: string) {
  const matchArr = entry
    .replace(/\D+/g, "")
    .replace(/^1/, "")
    .match(/([^\d]*\d[^\d]*){1,10}$/);
  const match = matchArr ? matchArr[0] : "";
  const part1 = match.length > 2 ? `(${match.substring(0, 3)})` : match;
  const part2 = match.length > 3 ? ` ${match.substring(3, 6)}` : "";
  const part3 = match.length > 6 ? `-${match.substring(6, 10)}` : "";
  return `${part1}${part2}${part3}`;
}
