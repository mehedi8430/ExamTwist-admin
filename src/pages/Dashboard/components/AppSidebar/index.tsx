import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import assets from "@/assets";
import DashboardIcon from "@/assets/svgs/home.svg?react";
// import EyeFourIcon from "@/assets/svgs/eye.svg?react";
import PressReleaseIcon from "@/assets/svgs/press-release.svg?react";
import AddIcon from "@/assets/svgs/fi-rr-add.svg?react";
import { useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import NavMain from "./NavMain";
import CollapsibleNav from "./CollapsibleNav";
import useTheme from "@/theme";
import { UsersIcon } from "lucide-react";

export type TSubItem = {
  title: string;
  url: string;
  icon: React.ReactNode;
  end: boolean;
};

export type TNavMenu = {
  title: string;
  url: string;
  icon: React.ReactNode;
  end: boolean;
  subItems?: TSubItem[];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  const location = useLocation();
  const { theme } = useTheme();

  const items: TNavMenu[] = [
    {
      title: "Dashboard",
      url: "/dashboard/home",
      icon: <DashboardIcon />,
      end: false,
    },
    // users
    {
      title: "Users",
      url: "/dashboard/users",
      icon: <UsersIcon />,
      end: false,
      subItems: [
        {
          title: "All Users",
          url: "/dashboard/users/all",
          icon: <PressReleaseIcon />,
          end: true,
        },
        {
          title: "Add User",
          url: "/dashboard/users/add",
          icon: <AddIcon />,
          end: true,
        },
      ],
    },
    // students
    {
      title: "Students",
      url: "/dashboard/students",
      icon: <UsersIcon />,
      end: false,
      subItems: [
        {
          title: "All Students",
          url: "/dashboard/students/all",
          icon: <PressReleaseIcon />,
          end: true,
        },
        {
          title: "Add Students",
          url: "/dashboard/students/add",
          icon: <AddIcon />,
          end: true,
        },
      ],
    },
    // payments and subscriptions
    {
      title: "Subscriptions Management",
      url: "/dashboard/subscriptions/all",
      icon: <PressReleaseIcon />,
      end: true,
    },
    // Categories
    {
      title: "Categories",
      url: "/dashboard/categories/all",
      icon: <PressReleaseIcon />,
      end: true,
    },
    // Questions
    {
      title: "Questions",
      url: "/dashboard/questions/all",
      icon: <PressReleaseIcon />,
      end: true,
    },
    // Model tests
    {
      title: "Model Tests",
      url: "/dashboard/model-tests/all",
      icon: <PressReleaseIcon />,
      end: true,
    },
    // Packages
    {
      title: "Packages",
      url: "/dashboard/packages/all",
      icon: <PressReleaseIcon />,
      end: true,
    },
    // Quota Subscription
    {
      title: "Quota Subscription",
      url: "/dashboard/quota-subscription",
      icon: <PressReleaseIcon />,
      end: true,
    },
  ];

  // Helper function to check if any sub-item is active
  const isSubItemActive = (subItems: TSubItem[]) => {
    return subItems.some((subItem) => {
      if (subItem.end) {
        return location.pathname === subItem.url;
      }
      return location.pathname.startsWith(subItem.url);
    });
  };

  // Helper function to check if main item is active (excluding parent items with sub-items)
  const isItemActive = (item: TNavMenu) => {
    // For items with sub-items, only check direct URL match, not sub-items
    if (item.subItems) {
      if (item.end) {
        return location.pathname === item.url;
      }
      return (
        location.pathname.startsWith(item.url) &&
        !isSubItemActive(item.subItems)
      );
    }
    // For items without sub-items, check normally
    if (item.end) {
      return location.pathname === item.url;
    }
    return location.pathname.startsWith(item.url);
  };

  if (items.length < 0) {
    return;
  }

  return (
    <Sidebar
      collapsible="icon"
      className="top-(--header-height) h-[calc(100vh-var(--header-height))]! rounded-r-3xl"
      {...props}
    >
      <div className="md:hidden py-5">
        <img src={assets.image.logo} alt="logo" className="w-[12rem] mx-auto" />
      </div>

      <SidebarContent
        className={cn(
          "h-full rounded-r-3xl py-6",
          state === "collapsed" && !isMobile ? "px-2" : "px-4",
          theme === "light" ? "sidebar" : "sidebar-dark border-r-2",
        )}
      >
        <SidebarMenu>
          {items.map((item, i) => {
            const isActive = isItemActive(item);
            const hasSubItems = item.subItems && item.subItems.length > 0;

            if (hasSubItems) {
              return (
                <CollapsibleNav
                  key={i}
                  isActive={isActive}
                  isMobile={isMobile}
                  item={item}
                  state={state}
                />
              );
            }

            return (
              <NavMain key={i} isMobile={isMobile} item={item} state={state} />
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
