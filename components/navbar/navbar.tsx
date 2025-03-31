"use client";

import Link from "next/link";
import { DarkMode } from "../dark-mode";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { LogOut, SunIcon, User } from "lucide-react";
import TiktokConnector from "@/partial/tiktok/tiktok-connector";
import { useAuthStore } from "@/store/auth-store";

const Navbar = () => {
  const { clear, token } = useAuthStore();
  return (
    <div className="bg-muted">
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-8">
            <Logo />
          </Link>
          <TiktokConnector />
          <div className="flex items-center gap-3">
            {token ? (
              <button onClick={clear}>
                <LogOut className="cursor-pointer" />
              </button>
            ) : (
              <Link href="/auth">
                <User />
              </Link>
            )}
            <DarkMode />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
