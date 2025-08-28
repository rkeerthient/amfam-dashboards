const LearningCenter = () => {
  return (
    <div className="flex flex-col p-4 pb-12 m-4 gap-16 bg-white w-2/3">
      <div className="text-2xl font-bold text-[#003168]">Learning Center</div>
      <div className="flex justify-center gap-8">
        <div className="flex flex-col gap-2 text-center">
          <img
            className="w-60 mx-auto"
            src="https://www.pngplay.com/wp-content/uploads/5/Live-Webinar-Gray-Logo-PNG.png"
            alt="Webinars"
          />
          <div className="font-bold text-sm">Webinars</div>
          {[
            "Register for Yext 101: New Agent Website Set-Up",
            "Register for Yext 201: SEO & Reviews",
            "Register for Yext 201: Google Business Profile & Community Engagement",
            "Register for Yext 301: Analytics & Website Performance",
            "Register for Yext Monthly Special Feature Webinar",
            "Sign Up for White Glove Office Hours",
          ].map((text, idx) => (
            <div
              key={idx}
              className="text-sm hover:cursor-pointer text-blue-700"
            >
              {text}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-center">
          <img
            className="w-32 mx-auto"
            src="https://www.seekpng.com/png/full/242-2425880_one-click-support-customer-service-icon-png.png"
            alt="Advisor Support"
          />
          <div className="font-bold text-sm mt-12">
            One-on-one Call with an Advisor
          </div>
          <div className="text-left">
            As part of the Agency Program, you receive assistance with
            optimizing your website from a Yext advisor.
          </div>
          <div className="text-sm hover:cursor-pointer text-blue-700">
            Schedule a call
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningCenter;
