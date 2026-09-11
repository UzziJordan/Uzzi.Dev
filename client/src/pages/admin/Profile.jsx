import { useEffect, useState } from "react";
import ProfileForm from "../../components/admin/ProfileForm";
import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProfile();

      setProfile(data);
    } catch (err) {
      if (err.response?.status === 404) {
        setProfile({
          name: "",
          role: "",
          heroIntro: "",
          portraitCaption: "",
          heroTechnologyLabels: [],
          sectionKicker: "",
          largeStatement: "",
          description: "",
          statistics: [],
          philosophyTitle: "",
          philosophyParagraph: "",
          logo: "",
          profileImage: "",
        });
      } else {
        setError(
          err.response?.data?.message ||
            "Failed to load profile."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await updateProfile(formData);

      setProfile(response.profile);

      setSuccess("Profile saved successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error("Update profile error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to save profile."
      );

      throw err;
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-sm tracking-[0.2em] text-gray-600">
          LOADING PROFILE...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 pb-20">
      {/* HEADER */}
      <div className="mb-12 border-b border-white/10 pb-8">
        <p className="mb-4 text-[11px] tracking-[0.35em] text-gray-500">
          CONTENT MANAGER
        </p>

        <h1 className="text-4xl font-semibold tracking-tight text-white">
          PROFILE
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600">
          Manage the personal information displayed across
          your public portfolio.
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-8 border border-red-500/20 bg-red-500/5 px-5 py-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* SUCCESS */}
      {success && (
        <div className="mb-8 border border-white/10 bg-white/3 px-5 py-4 text-sm text-white">
          {success}
        </div>
      )}

      <ProfileForm
        initialData={profile}
        onSubmit={handleSubmit}
        loading={saving}
      />
    </div>
  );
};

export default Profile;