import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Image } from "@yext/pages-components";
import { C_teamMembers } from "../../types/autogen";

interface TeamProps {
  displayName: string;
  teamMembers?: C_teamMembers[];
  description: string;
}

const Team = ({ displayName, teamMembers, description }: TeamProps) => {
  return (
    <div className="border m-4 p-4 bg-white space-y-4">
      <div className="text-2xl font-bold text-[#003168]">
        {displayName || `Team name`}
      </div>
      <div className=" font-medium text-[#003168]">
        {description ||
          "A team is defined as a group of people who perform interdependent tasks to work toward accomplishing a common mission or specific objective. Some teams have a limited life: for example, a design team developing a new product, or a continuous proces"}
      </div>
      {teamMembers && (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {teamMembers.map((person, idx) => (
            <li
              key={idx}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
            >
              <div className="flex flex-1 flex-col p-8">
                {person.headshot && (
                  <Image
                    image={person.headshot}
                    className="!mx-auto !size-32 !shrink-0 !rounded-full !max-w-none"
                  ></Image>
                )}

                <h3 className="mt-6 text-sm font-medium text-gray-900">
                  {person.name}
                </h3>
                <dl className="mt-1 flex grow flex-col justify-between">
                  <dt className="sr-only">Title</dt>
                  <dd className="text-sm text-gray-500">
                    {person.c_jobTitle || getRandomTitle()}
                  </dd>
                </dl>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <a
                      href={`mailto:${person.emails?.[0]}`}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <EnvelopeIcon
                        aria-hidden="true"
                        className="size-5 text-gray-400"
                      />
                      Email
                    </a>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <a
                      href={`tel:${person.mainPhone}`}
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <PhoneIcon
                        aria-hidden="true"
                        className="size-5 text-gray-400"
                      />
                      Call
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Team;

const financialTitles = [
  "Senior Portfolio Strategist",
  "Investment Risk Consultant",
  "Private Wealth Associate",
  "Financial Insights Analyst",
  "Corporate Treasury Advisor",
];

const getRandomTitle = () => {
  const randomIndex = Math.floor(Math.random() * financialTitles.length);
  return financialTitles[randomIndex];
};
