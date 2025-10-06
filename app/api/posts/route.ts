import { NextResponse } from "next/server";
import { Post } from "@/types";

export async function GET() {
  const posts: Post[] = [
    {
      id: "api-1",
      title: "API Post 1",
      content: "This post comes from the API route",
      createdAt: new Date().toISOString(),
      author: "API Route"
    },
    {
      id: "api-2",
      title: "API Post 2",
      content: "Another post from the API",
      createdAt: new Date().toISOString(), 
      author: "API Route"
    }
  ];

  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(posts);
}
