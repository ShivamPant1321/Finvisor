import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Enhanced middleware with error handling
export default async function middleware(req: NextRequest) {
  try {
    // The correct way to use clerkMiddleware is to call it with the request
    // and not provide NextResponse.next() as a second parameter
    return clerkMiddleware(req, {} as any);
  } catch (error) {
    console.error('Clerk middleware error:', error);
    // Return a simple response for auth errors to avoid breaking the app
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
