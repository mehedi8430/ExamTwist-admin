import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutIcon from "@/assets/svgs/logout.svg?react";
import ProfileIcon from "@/assets/svgs/Profile.svg?react";
import assets from "@/assets";
import { useNavigate } from "react-router";
import { ReusableAlertDialog } from "@/components/ReusableAlertDialog";

export default function HeaderAvatar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <section>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-8 rounded-full">
            {/* <AvatarImage src='https://avatar.iran.liara.run/public' alt='user avatar' /> */}
            <AvatarImage
              src={assets.image.DefaultPlaceholder}
              alt="user avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[14.125rem] space-y-2">
          <DropdownMenuItem
            className="bg-background hover:bg-primary/10 hover:text-primary group p-2"
            onClick={() => navigate("/dashboard/view-profile")}
          >
            <span className="w-9 h-9 p-1 border group-hover:border-primary/50 rounded-full text-xl flex items-center justify-center">
              <ProfileIcon className="group-hover:text-primary" />
            </span>
            Profile
          </DropdownMenuItem>

          {/* Logout Button */}
          <ReusableAlertDialog
            trigger={
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="bg-background hover:bg-primary/10 group text-red-500"
              >
                <span className="w-9 h-9 p-1 border group-hover:border-red-500/50 rounded-full text-xl flex items-center justify-center">
                  <LogoutIcon className="text-red-500" />
                </span>
                Log Out
              </DropdownMenuItem>
            }
            title="Confirm Logout"
            description="Are you sure you want to logout? Any unsaved changes will be lost."
            cancelText="Stay Logged In"
            actionText="Logout"
            onAction={handleLogout}
            variant="destructive"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
