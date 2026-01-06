//"use client"
import "./globals.css";
import StoreProvider from "@/src/store/StoreProvider";
import QueryProvider from "../providers/query-provider";
import { ThemeProvider } from "../providers/ThemeProvider";

export const metadata = {
  title: "VietSignSchool App",
  description: "App cnv",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StoreProvider>
          <QueryProvider>
            <ThemeProvider>
              <div className="font-sans antialiased selection:bg-primary-100 selection:text-primary-900">
                {children}
              </div>
            </ThemeProvider>
          </QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
