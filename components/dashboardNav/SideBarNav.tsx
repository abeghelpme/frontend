import Link from "next/link";
import Logo from "@/public/assets/icons/dashboard/Logo.svg";
import Image from "next/image";
import {
  SettingsIcon,
  DashboardIcon,
  AnalyticsChartIcon,
  UpdatesIcon,
  ChatIcon,
} from "@/public/assets/icons/dashboard/icons";
import { usePathname } from "next/navigation";

export default function SideBarNav() {
  const pathname = usePathname();
  const icons = [
    { path: "/dashboard", icon: <DashboardIcon />, name: "Dashboard" },
    {
      path: "/dashboard/campaign-analytics",
      icon: <AnalyticsChartIcon />,
      name: "Campaign Analytics",
    },
    { path: "/dashboard/updates", icon: <UpdatesIcon />, name: "Updates" },
    { path: "/dashboard/settings", icon: <SettingsIcon />, name: "Settings" },
  ];

  return (
    <>
      <aside className="mx-auto flex w-[90%] justify-center py-3">
        <div>
          <div
            className="mb-20
               justify-center space-y-4 lg:mb-10"
          >
            <Link
              href={"/dashboard"}
              className="mt-5   flex flex-col items-center justify-center pb-10"
            >
              <Image
                src={Logo as string}
                width={28}
                height={28}
                alt="abeghelp logo"
              />
            </Link>
            {icons.map((item) => (
              <div
                className="flex flex-col items-center justify-center space-y-3 "
                key={item.name}
              >
                <Link href={item.path}>
                  <span
                    className={`flex flex-col items-center justify-center${
                      pathname.startsWith(item.path) ?? "text-abeg-teal"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span className="mt-1 text-sm">{item.name}</span>
                  </span>
                </Link>
              </div>
            ))}
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 transform">
            <Link href={""}>
              <ChatIcon />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
