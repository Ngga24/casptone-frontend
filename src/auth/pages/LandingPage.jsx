import HeroSection from "../components/HeroSection";
import AuthForm from "../components/AuthForm";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.05),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">

        <div className="flex-1 w-full max-w-2xl text-center lg:text-left">
          <HeroSection />
        </div>

        <div className="flex-1 w-full flex justify-center">
          <div className="w-full max-w-md relative">

            <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full transform scale-90 -z-10" />

            <div className="relative">
              <AuthForm />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}