import { DashboardData } from "@/types";

// SSR - No caching, fresh on every request
async function getDashboardData(): Promise<DashboardData> {
  // Simulate fresh data on every request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    user: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    stats: {
      posts: Math.floor(Math.random() * 100), // Random for demo
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 500)
    },
    recentActivity: [
      {
        id: "1",
        action: "Published new post",
        date: new Date().toISOString()
      },
      {
        id: "2", 
        action: "Updated profile",
        date: new Date(Date.now() - 86400000).toISOString()
      }
    ]
  };
}

export default async function SSRPage() {
  const dashboardData = await getDashboardData();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="container">
      <h1>⚡ Server-Side Rendering (SSR)</h1>
      <p>This page is rendered on the server on every request.</p>
      <div className="card">
        <strong>Render Time:</strong> {currentTime}
      </div>

      <div className="card">
        <h2>Welcome, {dashboardData.user.name}!</h2>
        <p>Email: {dashboardData.user.email}</p>
        
        <h3>Stats:</h3>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <div>📝 Posts: {dashboardData.stats.posts}</div>
          <div>👀 Views: {dashboardData.stats.views}</div>
          <div>❤️ Likes: {dashboardData.stats.likes}</div>
        </div>

        <h3>Recent Activity:</h3>
        <ul style={{ marginLeft: "1rem" }}>
          {dashboardData.recentActivity.map(activity => (
            <li key={activity.id}>
              {activity.action} - {new Date(activity.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
