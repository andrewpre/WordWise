"use client";

import { useEffect, useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { User, Settings } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect } from "next/navigation";

export function Header() {
  const { data: session, status } = useSession();
  const [profileImage, setProfileImage] = useState("/public/placeholder.svg");
  useEffect(() => {
    if (session?.user?.image) {
      setProfileImage(session.user.image);
      console.log(session.user.image);
    } else {
      console.log("placeholder.svg");
      setProfileImage("/public/placeholder.svg"); // Default image
    }
  }, [session]);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="#">
        <span className="sr-only">WebWise</span>
      </Link>
      <nav className="ml-auto flex justify-center items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/"
        >
          Home
        </Link>
        {status === "authenticated" && (
          <>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/join"
            >
              See My Words
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/upload"
            >
              Upload
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/game"
            >
              Play
            </Link>
          </>
        )}
        {status === "unauthenticated" ? (
          <Button
            className="text-sm text-white font-medium bg-black hover:bg-gray-700 transition-colors duration-300 rounded-xl px-3 py-1"
            onClick={() => signIn()}
          >
            Login
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full border border-black"
              >
                <User />
                {/* <Image
                                    src={profileImage}
                                    alt="Profile"
                                    className="rounded-full"
                                    unoptimized
                                    width={32}
                                    height={32}
                                /> */}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link
                  className="flex flex-row justify-center items-center"
                  href="/settings-page"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <h1>Settings</h1>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => signOut({ callbackUrl: "/" })}>
                <span className="text-sm text-white font-medium bg-black hover:bg-gray-700 transition-colors duration-300 rounded-xl px-3 py-1">
                  Logout
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    </header>
  );
}
