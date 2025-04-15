// app/(admin)/dashboard/page.tsx

import CardBarChart from "@/components/card/CardBarChart";
import CardLineChart from "@/components/card/CardLineChart";
import CardPageVisits from "@/components/card/CardPageVisits";
import CardSocialTraffic from "@/components/card/CardSocialTraffic";

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          < CardLineChart />
        </div>
         <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
}
