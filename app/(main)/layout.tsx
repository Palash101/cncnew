import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import QuoteModal from "@/components/quote-modal";
import { QuoteModalProvider } from "@/context/quote-modal-context";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QuoteModalProvider>
      <Navbar />
      {children}
      <Footer />
      <QuoteModal />
    </QuoteModalProvider>
  );
}
