"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import { useRouter, redirect } from "next/navigation";
import { useEffect } from "react";

function Login() {
  const router = useRouter();

  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    const role = user?.publicMetadata.role;

    if (role && isSignedIn) {
      router.push(`/${role}`);
    }
  }, [isSignedIn, user, router]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Papulo School
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignIn />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          width={500}
          height={500}
          src="/images/undraw_authentication_fsn5.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default Login;
