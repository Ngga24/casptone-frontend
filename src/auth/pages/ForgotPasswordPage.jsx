import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useForgotPassword from "../hooks/useForgotPassword";

export default function ForgotPasswordPage({ onBack }) {
  const [step, setStep] = useState("email"); // trigger email, otp, reset
  const [email, setEmail] = useState("");
  const [code, setOtpCode] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();
  const { sendOtp, verifyOtp, resetPassword, isLoading } = useForgotPassword();

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 text-sm outline-none transition-all duration-200 " +
    "focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

  const buttonClass =
    "w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all shadow-sm shadow-blue-600/10 active:scale-[0.99] disabled:opacity-50";

  const handleBackAction = () => {
    if (step === "otp") {
      setStep("email");
      setErrorMessage("");
    } else if (step === "reset") {
      setStep("otp");
      setErrorMessage("");
    } else {
      if (onBack) onBack();
      else navigate("/");
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return setErrorMessage("Email tidak boleh kosong");
    setErrorMessage("");

    try {
      await sendOtp(email);
      setStep("otp");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!code) return setErrorMessage("Kode OTP wajib diisi");
    setErrorMessage("");

    try {
      const data = await verifyOtp(email, code);
      const token = data?.data?.token || data?.token || "";
      setResetToken(token);
      setStep("reset");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (newPassword !== confirmPassword) {
      setErrorMessage("Konfirmasi password tidak cocok");
      return;
    }

    try {
      await resetPassword(resetToken, newPassword);
      alert("Password berhasil diubah, silakan login kembali");
      
      if (onBack) onBack();
      else navigate("/");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center px-6 font-sans">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/40 relative">

        {step !== "reset" && (
          <button
            type="button"
            onClick={handleBackAction}
            className="absolute top-8 left-8 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
        )}

        <div className="text-center mb-6">
          <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xs font-bold tracking-wider shadow-sm">
            AI
          </div>

          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {step === "email" && "Forgot Password"}
            {step === "otp" && "Verify OTP"}
            {step === "reset" && "Reset Password"}
          </h2>

          <p className="mt-1 text-xs text-slate-400 font-normal">
            {step === "email" && "Masukkan email yang terdaftar pada akun Anda"}
            {step === "otp" && "Masukkan 6 digit kode unik yang dikirim ke email"}
            {step === "reset" && "Buat password baru yang kuat untuk akun Anda"}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-100 p-3 rounded-xl">
            {errorMessage}
          </div>
        )}

        {step === "email" && (
          <form onSubmit={handleSendOtp} className="space-y-3.5">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
            />

            <button type="submit" disabled={isLoading} className={buttonClass}>
              {isLoading ? "Processing..." : "Kirim Kode OTP"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOtp || handleVerifyOtp} className="space-y-4">
            <p className="text-center text-slate-500 text-xs">
              Sent to <span className="text-slate-800 font-medium">{email}</span>
            </p>

            <input
              type="text"
              value={code}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              placeholder="000000"
              className="w-full text-center tracking-[0.6em] text-xl py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-mono font-semibold"
              required
            />

            <button type="submit" disabled={isLoading} className={buttonClass}>
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {step === "reset" && (
          <form onSubmit={handleResetPassword} className="space-y-3.5">
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`${inputClass} pr-11`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`${inputClass} pr-11`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button type="submit" disabled={isLoading} className={buttonClass}>
              {isLoading ? "Processing..." : "Simpan & Reset Password"}
            </button>
          </form>
        )}

        <div className="mt-5 flex flex-col items-center space-y-2.5 text-xs border-t border-slate-100 pt-4 text-center">
          <button
            type="button"
            onClick={() => (onBack ? onBack() : navigate("/"))}
            className="text-slate-400 hover:text-blue-600 font-semibold transition-colors"
          >
            Kembali ke Halaman Login
          </button>
        </div>

      </div>
    </div>
  );
}