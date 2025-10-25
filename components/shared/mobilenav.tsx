"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
        />
      </Link>

      <nav className="flex gap-2">
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
            <SheetContent className="mobile-nav-sheet">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="mobile-nav-header">
                <div className="mobile-nav-logo">
                  <Image
                    src="/assets/images/logo-text.svg"
                    alt="logo"
                    width={120}
                    height={18}
                    className="mobile-nav-logo-text"
                  />
                </div>
              </div>

              <nav className="mobile-nav-content">
                <ul className="mobile-nav-list">
                  {navLinks.map((link) => {
                    const isActive = link.route === pathname;

                    return (
                      <li key={link.route} className="mobile-nav-item">
                        <Link
                          href={link.route}
                          className={`mobile-nav-link ${
                            isActive ? "mobile-nav-link-active" : ""
                          }`}
                        >
                          <Image
                            src={link.icon}
                            alt={link.label}
                            width={24}
                            height={24}
                            className="mobile-nav-icon"
                          />
                          <span className="mobile-nav-label">{link.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
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
  );
};

export default MobileNav;
