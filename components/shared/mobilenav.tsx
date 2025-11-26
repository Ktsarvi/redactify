"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm h-16 flex items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/images/REDACTIFY.svg"
            alt="logo"
            width={140}
            height={24}
          />
        </Link>

        <nav className="ml-auto flex items-center gap-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />

            <Sheet>
              <SheetTrigger>
                <Image
                  src="/assets/icons/menu.svg"
                  alt="menu"
                  width={32}
                  height={32}
                  className="cursor-pointer"
                />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0 bg-white">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Header with logo and close button */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <Image
                      src="/assets/images/REDACTIFY.svg"
                      alt="logo"
                      width={120}
                      height={24}
                      className="ml-2"
                    />
                    <SheetClose className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                      <X className="h-5 w-5 text-gray-500" />
                    </SheetClose>
                  </div>

                  {/* Navigation items */}
                  <div className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-2">
                      {navLinks.map((link) => {
                        const isActive = link.route === pathname;

                        return (
                          <li key={link.route}>
                            <Link
                              href={link.route}
                              className={`flex items-center p-3 rounded-lg transition-colors font-medium ${
                                isActive
                                  ? "text-white bg-purple-600"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              <Image
                                src={link.icon}
                                alt={link.label}
                                width={20}
                                height={20}
                                className={`mr-3 ${
                                  isActive
                                    ? "text-primary-600"
                                    : "text-gray-500"
                                }`}
                              />
                              <span
                                className={`${
                                  isActive
                                    ? "font-semibold text-white"
                                    : "font-medium"
                                }`}
                              >
                                {link.label}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </SignedIn>

          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </header>
      <div className="h-16"></div>
    </>
  );
};

export default MobileNav;
