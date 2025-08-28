import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import {
  getTextColor,
  useFieldGroupsStore,
} from "../../util/useDashboardStore";

const TandC = () => {
  const [open, setOpen] = useState(true);
  const { backgroundColor } = useFieldGroupsStore();
  return (
    <Dialog open={open} onClose={() => {}} className="relative z-10">
      <DialogBackdrop transition className="fixed inset-0 bg-gray-400" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-7xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mt-3 sm:mt-5">
                <div className="mt-2">
                  <h2 className="text-3xl font-semibold mb-2">
                    Acknowledge Terms & Conditions
                  </h2>
                  <p className="text-sm text-gray-500 mb-6">
                    Last updated: February 15, 2025
                  </p>

                  <div className="space-y-6 text-gray-800">
                    <div>
                      <h3 className="font-semibold text-base mb-1">
                        Website creation
                      </h3>
                      <p>
                        Eligible Retail Sales producers will automatically have
                        a compliant, personalized website created on their
                        behalf within a few days after they are approved through
                        the SAFE registration process with Parkside Institute in
                        order to originate as a Parkside Financial producer.
                        Employees eligible to have an individual website may
                        request changes to their initially created website and
                        must agree to these Branch Terms and Conditions in order
                        to request changes.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-base mb-1">
                        User Website Ownership Terms
                      </h3>
                      <p className="font-semibold">
                        The Website Ownership Terms includes the applicable
                        process to submit changes and other policies and terms
                        that you must agree to follow. You must read and agree
                        to follow these conditions in order to publish and
                        maintain a Website within the Parkside Home Mortgage
                        Branch. Violation of any of these terms and policies
                        could expose Parkside Financial to unacceptable risk. As
                        such, noncompliance with any of the following terms
                        could result in cancellation of the Website and other
                        sanctions, up to and including termination of
                        employment.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-base mb-1">
                        Third-Party Links
                      </h3>
                      <p>
                        Links to Third Party websites may not be listed on your
                        Branch site.
                      </p>
                    </div>
                    <div>
                      <p>
                        You may not pay, compensate, nor provide or receive
                        anything of value in return for someone visiting your
                        site (i.e. “hits”). “Compensation” is not limited to
                        monetary compensation, and could be anything of value
                        including, but not limited to, gifts, meals, or
                        services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 w-full text-center">
              <button
                style={{
                  background: backgroundColor,
                  color:
                    typeof backgroundColor === "string"
                      ? getTextColor(backgroundColor)
                      : "#000",
                }}
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-fit mx-auto justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                I acknowledge these Terms and Conditions
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default TandC;
