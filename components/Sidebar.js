import { useSession } from "next-auth/react";
import {
  ChevronDownIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import {
  CalendarIcon,
  ClockIcon,
  DesktopComputerIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import SidebarRow from "./SidebarRow";
import { useRouter } from "next/router";

function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="mt-7 pl-5 sm:pl-0 max-w-[600px] xl:min-w-[300px] ">
      <div onClick={() => router.push("/profile")}>
        <SidebarRow src={session.user.image} title={session.user.username} />
      </div>
      {/* <SidebarRow src={session.user.image} title={session.user.username} /> */}

      <div onClick={() => router.push("/community")}>
        <SidebarRow Icon={UsersIcon} title="Explore" />
      </div>

      <SidebarRow Icon={UserGroupIcon} title="Groups" />
      <SidebarRow Icon={ShoppingBagIcon} title="Marketplace" />
      <SidebarRow Icon={DesktopComputerIcon} title="Watch" />
      <SidebarRow Icon={CalendarIcon} title="Events" />
      <SidebarRow Icon={ClockIcon} title="Memories" />
      <SidebarRow Icon={ChevronDownIcon} title="See More" />
    </div>
  );
}

export default Sidebar;
