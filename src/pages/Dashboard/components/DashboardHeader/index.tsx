import SidebarIcon from "@/assets/svgs/Vector.svg?react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { SearchForm } from "./SearchForm";
import HeaderAvatar from "./HeaderAvatar";
import Notification from "./Notification";
import Logo from "@/assets/react.svg?react";
import MessageIcon from "@/assets/svgs/Message square.svg?react";
import FullscreenIcon from "@/assets/svgs/gridicons_fullscreen-exit.svg?react";
import { ModeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router";
import { useFullscreen } from "@/hooks/useFullscreen";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const { toggleFullscreen } = useFullscreen();

  return (
    <header className="bg-sidebar sticky top-0 z-50 flex w-full items-center border-b-2 border-border">
      <div className="flex h-(--header-height) w-full items-center gap-2 pr-4 md:pr-10">
        <div className="w-[16rem] hidden md:block">
          <Logo className="size-8 mx-auto text-primary" />
        </div>
        <div className="flex items-center gap-2 md:ml-5">
          <Button
            className="size-10 text-primary rounded-full"
            variant="ghost"
            onClick={toggleSidebar}
          >
            <SidebarIcon />
          </Button>
          <SearchForm className="w-auto hidden md:block" />
        </div>
        <div className="ml-auto flex items-center gap-24">
          <div className="flex items-center gap-2 md:gap-5">
            <ModeToggle />
            <Button
              variant="secondary"
              className="size-8 bg-primary/10"
              onClick={toggleFullscreen}
            >
              <FullscreenIcon />
            </Button>
            <Button
              variant="secondary"
              className="size-8 bg-primary/10"
              onClick={() => navigate("/dashboard/messages")}
            >
              <MessageIcon />
            </Button>
            <Notification />
            <HeaderAvatar />
          </div>
        </div>
      </div>
    </header>
  );
}
