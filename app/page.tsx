import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <h1>Next.js 15 Hybrid Rendering Demo</h1>
      <p>Demonstrating SSR, CSR, SSG, ISR in one application</p>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", margin: "2rem 0" }}>
        <Link href="/ssg" style={{ textDecoration: "none" }}>
          <div className="card">
            <h2>📄 SSG</h2>
            <p>Static Site Generation</p>
          </div>
        </Link>
        
        <Link href="/isr" style={{ textDecoration: "none" }}>
          <div className="card">
            <h2>🔄 ISR</h2>
            <p>Incremental Static Regeneration</p>
          </div>
        </Link>
        
        <Link href="/ssr" style={{ textDecoration: "none" }}>
          <div className="card">
            <h2>⚡ SSR</h2>
            <p>Server-Side Rendering</p>
          </div>
        </Link>
        
        <Link href="/csr" style={{ textDecoration: "none" }}>
          <div className="card">
            <h2>🎯 CSR</h2>
            <p>Client-Side Rendering</p>
          </div>
        </Link>
        
        <Link href="/products/1" style={{ textDecoration: "none" }}>
          <div className="card" style={{ border: "2px solid #007acc" }}>
            <h2>🚀 HYBRID</h2>
            <p>Mixed Rendering Strategies</p>
            <small>Product Page Example</small>
          </div>
        </Link>
      </div>

      <div className="card">
        <h2>🎯 Hybrid Rendering Benefits:</h2>
        <ul>
          <li><strong>SSR/ISR</strong> untuk SEO-friendly content</li>
          <li><strong>CSR</strong> untuk interactive features</li>
          <li><strong>Real-time</strong> untuk live updates</li>
          <li><strong>Optimal performance</strong> dengan selective hydration</li>
        </ul>
        
        <h3>Try the Product Pages:</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {[1, 2, 3].map(id => (
            <Link key={id} href={`/products/${id}`}>
              <div style={{ 
                padding: "0.5rem 1rem", 
                background: "#007acc", 
                color: "white", 
                borderRadius: "4px",
                textDecoration: "none"
              }}>
                Product {id}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
