"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { user, isSignedIn } = useUser() || {}; // Ensure destructuring safety

  return (
    <header className="p-5 flex justify-between items-center border shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/FinVisor.png"
            width={140}
            height={45}
            alt="FinVisor"
            priority
          />
        </Link>
      </div>

      {/* Authentication Section */}
      {isSignedIn ? (
        <UserButton />
      ) : (
        <div className="flex gap-x-4 items-center">
          <Link href="/dashboard">
            <Button variant="outline" className="rounded-full">
              Dashboard
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button className="rounded-full">Get Started</Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
