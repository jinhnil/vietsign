//"use client"
import "./globals.css";
import StoreProvider from "@/src/store/StoreProvider";
import QueryProvider from "../providers/query-provider";

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
    <html lang="en">
      <body suppressHydrationWarning>
        <StoreProvider>
          <QueryProvider>
            <div className="font-sans antialiased selection:bg-primary-100 selection:text-primary-900">
              {children}
            </div>
          </QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
