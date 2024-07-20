import "@radix-ui/themes/styles.css";
import NavigationBar from "./navigation-bar";
import Footer from "./footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div style={{ minHeight: "calc(100vh)" }}>
        <NavigationBar />
        <div className="container mx-auto mb-20">
          {children}
        </div>
      </div>
      <Footer />
    </NextIntlClientProvider>
  );
}
