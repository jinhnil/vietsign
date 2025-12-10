//"use client"
import "./globals.css";

export const metadata = {
  title: "VietSign App",
  description: "App cnv",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
