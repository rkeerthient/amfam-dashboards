import { ANALYTICS_DATA } from "../../constants";
import DonutChart from "../charts/DonutChart";
import BarChart from "../charts/BarChart";

const AnalyticsOverview = () => {
  return (
    <div className="flex flex-row gap-4">
      <div className="p-4 bg-white w-1/2 flex flex-col gap-4">
        <div className="text-3xl">Your Website Analytics</div>
        <BarChart />
      </div>

      <div className="p-4 bg-white w-1/2 flex flex-col gap-4">
        <div className="text-3xl capitalize">How users find my website</div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex justify-center items-center text-xs">
            <table className="w-4/5 border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Search Term</th>
                  <th className="border p-2">Impressions</th>
                  <th className="border p-2">Clicks</th>
                  <th className="border p-2">CTR</th>
                  <th className="border p-2">Position</th>
                </tr>
              </thead>
              <tbody>
                {ANALYTICS_DATA.map((row, index) => (
                  <tr key={index} className="border">
                    <td className="border p-2">{row.SearchTerm}</td>
                    <td className="border p-2">{row.Impressions}</td>
                    <td className="border p-2">{row.Clicks}</td>
                    <td className="border p-2">{row.CTR}</td>
                    <td className="border p-2">{row.Position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DonutChart />
        </div>

        <div className="bg-white text-center border-t text-gray-800 m-auto flex justify-center items-center w-full py-8 mx-auto">
          <div className="flex flex-col gap-4 w-full px-4">
            <div className="text-xl font-semibold">
              Email, Contact Me, and Phone Call Clicks
            </div>
            <div>Last 60 Days</div>
            <div className="w-full grid grid-cols-3 justify-between">
              <div className="flex flex-col gap-2 items-center justify-center">
                <div className="text-xl">18</div>
                <div className="text-sm">Total Email Clicks</div>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center">
                <div className="text-xl">4</div>
                <div className="text-sm">Form Fills</div>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center">
                <div className="text-xl">4</div>
                <div className="text-sm">Total Phone Call Clicks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
