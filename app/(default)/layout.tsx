import Header from "@/components/modules/Header";
import Footer from "@/components/modules/Footer";
import BookingModal from "@/components/modules/BookingModal/BookingModal";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <BookingModal />
    </>
  );
}
