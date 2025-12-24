import "./globals.css";
import ThemeProvider from "../components/ThemeProvider";

export const metadata = {
  title: "Ajayvarman | Portfolio",
  description: "Frontend / MERN Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
