import Header from "@/components/modules/Header";
import Footer from "@/components/modules/Footer";
import BookingModal from "@/components/modules/BookingModal/BookingModal";
import OnboardingModal from "@/components/modules/OnboardingModal/OnboardingModal";
import HowItWorksModal from "@/components/modules/HowItWorksModal/HowItWorksModal";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {/* tabIndex={-1} so the skip link in app/layout.tsx actually moves focus
          here, not just the viewport — without it the next Tab returns to the nav. */}
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer />
      <BookingModal />
      <OnboardingModal />
      <HowItWorksModal />
    </>
  );
}
