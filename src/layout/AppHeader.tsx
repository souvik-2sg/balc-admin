"use client";
import UserDropdown from "@/components/header/UserDropdown";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AppHeader: React.FC = () => {
  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex items-center justify-between w-full gap-2 px-3 py-3 lg:px-6 lg:py-4">
        <Link href="/" className="lg:hidden">
          <Image
            width={154}
            height={32}
            className="dark:hidden"
            src="/images/logo/balc_logo.png"
            alt="Logo"
          />
          <Image
            width={154}
            height={32}
            className="hidden dark:block"
            src="/images/logo/logo-dark.svg"
            alt="Logo"
          />
        </Link>

        <div className="ml-auto">
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
