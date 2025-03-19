import Link from "next/link";
import { DarkMode } from "../dark-mode";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { SunIcon, User } from "lucide-react";
import TiktokConnector from "@/partial/tiktok/tiktok-connector";

const Navbar = () => {
  return (
    <div className="bg-muted">
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-8">
            <Logo />
          </Link>
          <TiktokConnector />
          <div className="flex items-center gap-3">
            <Link href="/auth" className="flex items-center gap-8">
              <User />
            </Link>
            <DarkMode />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
