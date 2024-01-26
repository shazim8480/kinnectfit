import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { accessTokenFromLS, getItemFromLocalStorage } from "@/lib/utils";
import { useRouter } from "next/router";
import { Spinner } from "@nextui-org/react";
const montserrat = Montserrat({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const accessToken = getItemFromLocalStorage('accessToken');
  useEffect(() => {
    const checkAuthentication = async () => {
      if (!accessToken) {
        await router.push("/sign-in");
      }
      setLoading(false);
    };

    checkAuthentication();
  }, [accessToken]);

  if (loading) {
    return <div className="min-h-[80vh] flex justify-center items-center">
      <Spinner />
    </div>;
  }


  return (
    <div className={`bg-[#f1f5f9] ${montserrat.className}`}>
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
    </div>
  );
};

export default DashboardLayout;
