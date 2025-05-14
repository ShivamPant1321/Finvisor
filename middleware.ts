import { clerkMiddleware, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Enhanced middleware with error handling
export default function middleware(req: NextRequest) {
  try {
    return clerkMiddleware()(req, NextResponse.next());
  } catch (error) {
    console.error('Clerk middleware error:', error);
    // Return a simple response for auth errors to avoid breaking the app
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
