import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function useProfile() {
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    birth_date: "",
    gender: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken"); // Sesuaikan jika beda

      console.log("Token yang terbaca:", token);
      const res = await fetch(`${BASE_URL}/profiles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) throw new Error("Gagal memuat profil");
      
      const data = await res.json();

      const profileData = data.data || data; 
      
      setProfile({
        full_name: profileData.full_name || "",
        phone: profileData.phone || "",
        birth_date: profileData.birth_date || "",
        gender: profileData.gender || "",
      });

      // Jika backend mengirimkan URL gambar
      if (profileData.profile_image_url) {
        setProfileImage(profileData.profile_image_url);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Mengupdate data profile
  const updateProfile = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccessMsg("");
    
    try {
      const token = localStorage.getItem("accessToken");
      
      const res = await fetch(`${BASE_URL}/profiles`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // Jangan set Content-Type ke application/json karena kita pakai FormData (multipart)
        },
        body: formData, 
      });

      if (!res.ok) throw new Error("Gagal memperbarui profil");
      
      setSuccessMsg("Profile updated successfully!");
      fetchProfile(); // Refresh data setelah berhasil update
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, setProfile, profileImage, loading, error, successMsg, updateProfile };
}