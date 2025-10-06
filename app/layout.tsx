import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Next.js 15 Tutorial",
  description: "SSR, CSR, SSG, ISR Examples",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <h1>Next.js 15 Rendering Demo</h1>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
