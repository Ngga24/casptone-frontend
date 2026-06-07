import { useState, useEffect } from "react";
import { apiFetch } from "../../utils/api";

// 🔥 Pastikan baseUrl aman dari double slash (//)
const BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "https://dtwin.projectbase.my.id";

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
    try {
      setLoading(true);
      setError(null);

      const res = await apiFetch("/profiles", {
        method: "GET",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Gagal memuat profil");
      }

      const profileData = result.data;

      setProfile({
        full_name: profileData.fullname || "",
        phone: profileData.phone || "",
        birth_date: profileData.birthdate
          ? profileData.birthdate.split("T")[0]
          : "",
        gender: profileData.gender || "",
      });

      // 🔥 UPDATE LOCALSTORAGE NAMA BIAR SIDEBAR BERUBAH
      if (profileData.username || profileData.fullname) {
        localStorage.setItem(
          "username",
          profileData.username || profileData.fullname,
        );
      }

      // 🔥 UPDATE LOCALSTORAGE FOTO BIAR SIDEBAR BERUBAH
      if (profileData.profileimage) {
        const path = profileData.profileimage.replace(/^\//, "");
        const imageUrl = `${BASE_URL}/${path}`;

        setProfileImage(imageUrl);
        localStorage.setItem("profileImage", imageUrl);
      }

      // 🔥 TRIGGER EVENT KE SIDEBAR BIAR LANGSUNG SINKRON REAL-TIME
      window.dispatchEvent(new Event("profileUpdated"));

      setError(null);
    } catch (err) {
      console.error("Fetch Profile Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMsg("");

      const response = await apiFetch("/profiles", {
        method: "PUT",
        body: formData, // FormData tidak boleh di-JSON.stringify
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal update profil");
      }

      setSuccessMsg(result.message || "Profile updated successfully!");

      // Panggil fetchProfile lagi buat nge-refresh state dan localStorage
      await fetchProfile();

      return result;
    } catch (err) {
      console.error("Update Profile Error:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    setProfile,
    profileImage,
    setProfileImage,
    loading,
    error,
    successMsg,
    updateProfile,
    fetchProfile,
  };
}
