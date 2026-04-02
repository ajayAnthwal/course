import { Header, Footer } from "@/components/layout";
import { Chatbot } from "@/features/chat";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Chatbot />
      <WhatsAppButton />
    </>
  );
}
