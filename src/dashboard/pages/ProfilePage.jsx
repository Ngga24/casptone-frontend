import React, { useState, useRef } from "react";
import DashboardLayout from "../components/DashboardLayout";
import useProfile from "../hooks/useProfile";
import { User, Mail, Phone, Calendar, Upload, Loader2, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const { profile, setProfile, profileImage, loading, error, successMsg, updateProfile } = useProfile();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("full_name", profile.full_name);
    formData.append("phone", profile.phone);
    formData.append("birth_date", profile.birth_date);
    formData.append("gender", profile.gender);
    
    if (selectedFile) {
      formData.append("profile_image", selectedFile);
    }

    await updateProfile(formData);
  };

  return (
    <DashboardLayout title="My Profile">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Account Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-light">
            Manage your personal information and profile picture.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm flex items-center gap-2">
            <CheckCircle2 size={18} />
            {successMsg}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            
            <div className="flex items-center gap-6 mb-10 pb-8 border-b border-slate-100">
              <div className="relative h-24 w-24 rounded-full overflow-hidden bg-slate-100 border-4 border-white shadow-md flex-shrink-0">
                {(previewUrl || profileImage) ? (
                  <img 
                    src={previewUrl || profileImage} 
                    alt="Profile" 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-indigo-50 text-indigo-500">
                    <User size={40} />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">Profile Picture</h3>
                <p className="text-xs text-slate-400 mb-3">PNG, JPG up to 2MB</p>
                <input 
                  type="file" 
                  accept="image/png, image/jpeg" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <button 
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-100 transition"
                >
                  <Upload size={14} />
                  Change Photo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Full Name</label>
                <input 
                  type="text" 
                  name="full_name"
                  value={profile.full_name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition text-sm text-slate-800"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone size={16} />
                  </div>
                  <input 
                    type="tel" 
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    placeholder="081234567890"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition text-sm text-slate-800"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Birth Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Calendar size={16} />
                  </div>
                  <input 
                    type="date" 
                    name="birth_date"
                    value={profile.birth_date}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition text-sm text-slate-800"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Gender</label>
                <select 
                  name="gender"
                  value={profile.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition text-sm text-slate-800 appearance-none"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

            </div>

            <div className="mt-10 flex justify-end">
              <button 
                type="submit" 
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed shadow-sm shadow-indigo-600/20"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}