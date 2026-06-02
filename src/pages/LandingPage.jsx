import HeroSection from "../auth/components/HeroSection";
import AuthForm from "../auth/components/AuthForm";

export default function LandingPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white px-6 md:px-12">
      <div
        className="max-w-7xl mx-auto min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16">
        <div className="flex-1 max-w-2xl">
          <HeroSection />
        </div>

        <div className="flex-1 flex justify-center w-full">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}