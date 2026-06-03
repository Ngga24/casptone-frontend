import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useOtp from "../hooks/useOtp";
import { Eye, EyeOff } from "lucide-react";

import ForgotPasswordPage from "../../pages/ForgotPasswordPage";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState("register");

  const [emailVerify, setEmailVerify] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [timer, setTimer] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [mode, setMode] = useState("auth");

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const { login, register, isLoading: isAuthLoading } = useAuth();

  const { verifyOtp, resendOtp, isLoading: isOtpLoading } = useOtp();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrorMessage("");
  };

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (step === "register") {
        if (isLogin) {
          const response = await login({
            identifier: formData.email,
            password: formData.password,
          });

          alert("Login berhasil");
          window.location.reload();
        } else {
          await register({
            fullname: formData.fullname,
            username: formData.username,
            email: formData.email,
            password: formData.password,
          });

          setEmailVerify(formData.email);
          setStep("otp-verify");
          setTimer(300);
        }
      } else {
        const response = await verifyOtp({
          email: emailVerify,
          code: otpCode,
        });

        alert("Verifikasi berhasil");
        window.location.reload();
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp(emailVerify);

      alert("OTP berhasil dikirim ulang");

      setTimer(300); // 5 menit
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  if (mode === "forgot-password") {
    return <ForgotPasswordPage onBack={() => setMode("auth")} />;
  }

  const inputClass = `w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20`;

  return (
    <div className="w-full max-w-md p-8 rounded-3xl bg-slate-800/80 backdrop-blur-xl border border-slate-700 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xl">
          DT
        </div>

        <h2 className="text-3xl font-bold text-white">
          {step === "otp-verify"
            ? "Verify OTP"
            : isLogin
              ? "Welcome Back"
              : "Create Account"}
        </h2>

        <p className="mt-2 text-slate-400">
          {step === "otp-verify"
            ? "Masukkan kode OTP yang telah dikirim"
            : isLogin
              ? "Masuk untuk mengakses dashboard Digital Twin Anda"
              : "Daftar untuk mulai menggunakan platform"}
        </p>

        {step === "register" && (
          <p className="mt-4 text-sm text-slate-400">
            {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}

            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-indigo-400 hover:text-indigo-300 font-medium transition"
            >
              {isLogin ? "Daftar sekarang" : "Login di sini"}
            </button>
          </p>
        )}
      </div>

      {errorMessage && (
        <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === "register" ? (
          <>
            {!isLogin && (
              <>
                <input
                  name="fullname"
                  placeholder="Nama Lengkap"
                  value={formData.fullname}
                  onChange={handleChange}
                  className={inputClass}
                />

                <input
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className={inputClass}
                />
              </>
            )}

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />

            <div className="relative">
              <input
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`${inputClass} pr-12`}
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setMode("forgot-password")}
                className="text-sm text-indigo-400 hover:text-indigo-300"
              >
                Lupa Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isAuthLoading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:opacity-90 transition-all duration-200 shadow-lg shadow-indigo-500/20 disabled:opacity-50"
            >
              {isAuthLoading
                ? "Processing..."
                : isLogin
                  ? "Sign In"
                  : "Create Account"}
            </button>
          </>
        ) : (
          <>
            <p className="text-center text-slate-400 text-sm">
              Masukkan kode OTP yang dikirim ke
              <span className="text-white font-medium"> {emailVerify}</span>
            </p>

            <input
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              maxLength={6}
              placeholder="000000"
              className="w-full py-4 rounded-xl bg-slate-900/60 border border-slate-700 text-center text-3xl font-bold tracking-[0.6em] text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
            />

            <button
              type="submit"
              disabled={isOtpLoading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:opacity-90 transition-all duration-200 shadow-lg shadow-indigo-500/20 disabled:opacity-50"
            >
              {isOtpLoading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="text-center mt-4">
              {timer > 0 ? (
                <p className="text-sm text-slate-400">
                  OTP berlaku {minutes}:{seconds.toString().padStart(2, "0")}
                </p>
              ) : (
                <button
                  type="button"
                  className="text-indigo-400 hover:text-indigo-300"
                  onClick={handleResendOtp}
                  disabled={isOtpLoading}
                >
                  Kirim ulang OTP
                </button>
              )}
            </div>
          </>
        )}
      </form>

      {step === "register" && (
        <>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>

            <div className="relative flex justify-center">
              <span className="bg-slate-800 px-4 text-sm text-slate-400">
                atau lanjutkan dengan
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              (window.location.href = "http://localhost:5000/auth/google-login")
            }
            className="w-full py-3 rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-900 transition-all flex items-center justify-center gap-3 text-white"
          >
            <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </>
      )}
    </div>
  );
}
