import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { Providers } from "@/redux/Providers";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import PublicLayoutWrapper from "@/components/layout/PublicLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// HARD-CODED SEO METADATA FOR HIGHER RANKING
export const metadata = {
  title: "Wandernest Villas | Luxury Private Pool Villas in Lonavla & Mumbai",
  description: "Book premium luxury villas for rent in Lonavla, Alibaug, and Mumbai with Wandernest Villas. Enjoy private pools, in-house chefs, and 5-star hospitality for your weekend getaways.",
  keywords: "luxury villas Lonavla, private pool villa Mumbai, weekend getaway near Mumbai, Wandernest Villas rent, villas with chef in Khandala, luxury stays Indore",
  verification: {
    google: "YOUR_GSC_VERIFICATION_CODE", // Paste your GSC verification string here
  },
  openGraph: {
    title: "Wandernest Villas | Premium Stays near Mumbai",
    description: "Experience ultimate luxury in our handpicked private pool villas across Maharashtra and Madhya Pradesh.",
    type: "website",
    url: "https://www.wandernestvillas.com",
    siteName: "Wandernest Villas",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* GA4 INTEGRATION */}
        <Script 
          strategy="afterInteractive" 
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} // Replace with your GA4 ID
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        {/* JSON-LD LOCAL BUSINESS SCHEMA FOR GOOGLEBOT & AI AGENTS */}
        <LocalBusinessSchema />
      </head>
      
      <body className="min-h-full flex flex-col bg-brand-light text-foreground" suppressHydrationWarning>
        <Providers>
          <PublicLayoutWrapper>
            {children}
          </PublicLayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}