import { Post } from "@/types";

// This runs at build time
async function getStaticPosts(): Promise<Post[]> {
  console.log("🔨 Generating static posts...");
  
  return [
    {
      id: "static-1",
      title: "Static Post 1",
      content: "This content was generated at build time!",
      createdAt: new Date().toISOString(),
      author: "Static Generator"
    },
    {
      id: "static-2",
      title: "Static Post 2", 
      content: "Another statically generated post.",
      createdAt: new Date().toISOString(),
      author: "Static Generator"
    }
  ];
}

// Generate static params
export async function generateStaticParams() {
  const posts = await getStaticPosts();
  
  return posts.map(post => ({
    id: post.id,
  }));
}

export default async function SSGPage() {
  const posts = await getStaticPosts();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="container">
      <h1>📄 Static Site Generation (SSG)</h1>
      <p>This page was generated at build time and served as static HTML.</p>
      <div className="card">
        <strong>Build Time:</strong> {currentTime}
      </div>

      <h2>Static Posts:</h2>
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
