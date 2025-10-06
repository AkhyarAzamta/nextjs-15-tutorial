import { Post } from "@/types";

// ISR with revalidation
async function getISRPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3", {
    next: { revalidate: 30 } // Revalidate every 30 seconds
  });
  
  if (!res.ok) throw new Error("Failed to fetch posts");
  const data = await res.json();
  
  return data.map((item: any) => ({
    id: item.id.toString(),
    title: item.title,
    content: item.body,
    createdAt: new Date().toISOString(),
    author: "API User"
  }));
}

export default async function ISRPage() {
  const posts = await getISRPosts();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="container">
      <h1>🔄 Incremental Static Regeneration (ISR)</h1>
      <p>This page regenerates every 30 seconds while serving stale content.</p>
      <div className="card">
        <strong>Current Time:</strong> {currentTime}
        <br />
        <strong>Revalidation:</strong> Every 30 seconds
      </div>

      <h2>Posts from API (ISR):</h2>
      {posts.map(post => (
        <div key={post.id} className="card">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>Author: {post.author}</small>
        </div>
      ))}
    </div>
  );
}
