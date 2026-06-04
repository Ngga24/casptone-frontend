import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useForgotPassword from "../hooks/useForgotPassword";

export default function ForgotPasswordPage({ onBack }) {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [code, setOtpCode] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const {
    sendOtp,
    verifyOtp,
    resetPassword,
    isLoading,
  } = useForgotPassword();

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20";

  const buttonClass =
    "w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:opacity-90 transition-all duration-200 shadow-lg shadow-indigo-500/20 disabled:opacity-50";

  const handleSendOtp = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    try {
      await sendOtp(email);

      alert("OTP berhasil dikirim");

      setStep("otp");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    try {
      const data = await verifyOtp(
        email,
        code
      );

      console.log("OTP Response:", data);

      // menyesuaikan response BE
      setResetToken(
        data?.data?.token ||
        data?.token ||
        ""
      );

      setStep("reset");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (newPassword !== confirmPassword) {
      setErrorMessage(
        "Konfirmasi password tidak sama"
      );
      return;
    }

    try {
      await resetPassword(
        resetToken,
        newPassword
      );

      alert(
        "Password berhasil diubah"
      );

      navigate("/");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md p-8 rounded-3xl bg-slate-800/80 backdrop-blur-xl border border-slate-700 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xl">
            DT
          </div>

          <h2 className="text-3xl font-bold text-white">
            {step === "email" &&
              "Forgot Password"}

            {step === "otp" &&
              "Verify OTP"}

            {step === "reset" &&
              "Reset Password"}
          </h2>

          <p className="mt-2 text-slate-400">
            {step === "email" &&
              "Masukkan email yang terdaftar"}

            {step === "otp" &&
              "Masukkan kode OTP yang telah dikirim"}

            {step === "reset" &&
              "Masukkan password baru"}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        {step === "email" && (
          <form
            onSubmit={handleSendOtp}
            className="space-y-4"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
              className={inputClass}
            />

            <button
              type="submit"
              disabled={isLoading}
              className={buttonClass}
            >
              {isLoading
                ? "Mengirim OTP..."
                : "Kirim OTP"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form
            onSubmit={handleVerifyOtp}
            className="space-y-4"
          >
            <p className="text-center text-slate-400 text-sm">
              OTP dikirim ke
              <span className="text-white font-medium">
                {" "}
                {email}
              </span>
            </p>

            <input
              type="text"
              value={code}
              onChange={(e) =>
                setOtpCode(e.target.value)
              }
              maxLength={6}
              placeholder="000000"
              className="w-full py-4 rounded-xl bg-slate-900/60 border border-slate-700 text-center text-3xl font-bold tracking-[0.6em] text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
            />

            <button
              type="submit"
              disabled={isLoading}
              className={buttonClass}
            >
              {isLoading
                ? "Verifying..."
                : "Verify OTP"}
            </button>
          </form>
        )}

        {step === "reset" && (
          <form
            onSubmit={handleResetPassword}
            className="space-y-4"
          >
            <div className="relative">
              <input
                type={
                  showPass
                    ? "text"
                    : "password"
                }
                placeholder="Password Baru"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                className={`${inputClass} pr-12`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPass(!showPass)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPass ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            <div className="relative">
              <input
                type={
                  showConfirmPass
                    ? "text"
                    : "password"
                }
                placeholder="Konfirmasi Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className={`${inputClass} pr-12`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPass(
                    !showConfirmPass
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showConfirmPass ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={buttonClass}
            >
              {isLoading
                ? "Menyimpan..."
                : "Simpan Password"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-sm text-indigo-400 hover:text-indigo-300"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    </div>
  );
}