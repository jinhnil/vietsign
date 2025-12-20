//"use client"
import "./globals.css";
import { AuthProvider } from "../providers/auth-provider";

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
      <body suppressHydrationWarning>
        <AuthProvider>
          <div className="font-sans antialiased selection:bg-primary-100 selection:text-primary-900">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
