"use client";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import endpointroute from "@/app/utils/endpointroute";
import { toast, ToastContainer } from "react-toastify";

export default function AdminProfile() {
  const { user, handleLogout ,setUser} = useAuth();
const [loadinProfile,setLoadingProfile]=useState(false)
const [loadingPassword,setLoadingPassWord]=useState(false)

  const [tab, setTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    console.log(profileData)
    if (profileData.firstName.trim() && profileData.lastName.trim()) {
      try {
        setLoadingProfile(true)
        const res = await endpointroute.patch("auth/update-profile", profileData,{
          headers: {
      'Content-Type': 'application/json',
    },
        });
        // console.log(res)
        setLoadingProfile(false)
        toast.success("Profile updated successfully!");
        const updatedUser = res.data.user; 
        localStorage.setItem("user", JSON.stringify(updatedUser));
setUser(updatedUser);
setProfileData({...profileData,
  firstName:updatedUser.firstName||'',
  lastName:updatedUser.lastName||''
})
window.location.reload();

      } catch (error) {
        toast.error(error?.response?.data?.message||"Failed to update profile.");
        setLoadingProfile(false)
      }
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passwordData.oldPassword && passwordData.newPassword) {
      try {
        setLoadingPassWord(true)
      let res=  await endpointroute.post("auth/change-password",{
         oldPassword:passwordData.oldPassword,
         newPassword:passwordData.newPassword
      },
      {
           headers: {
      'Content-Type': 'application/json',
    }
      }
     );
     setLoadingPassWord(false)
        toast.success("Password updated successfully!");
        setPasswordData({ oldPassword: "", newPassword: "" });
                await handleLogout();

        // router.push("/auth")
        ChartNoAxesColumnDecreasing.log(res)
      } catch (error) {
        toast.error(error.response.data.message|| "Failed to update password.");
        setLoadingPassWord(false)
      }
    } else {
      toast.error("Please fill in both password fields.");
      setLoadingPassWord(false)
    }
  };
const [showOldPassword, setShowOldPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <div className="max-w-xl mx-auto p-6">
      <ToastContainer />
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setTab("profile")}
          className={`px-4 py-2 rounded-md font-medium ${
            tab === "profile"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-black"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setTab("password")}
          className={`px-4 py-2 rounded-md font-medium ${
            tab === "password"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-black"
          }`}
        >
          Password
        </button>
      </div>

      {tab === "profile" && (
        <form
          onSubmit={handleProfileSave}
          className="space-y-5 bg-white p-6 rounded-xl shadow-md border border-gray-200"
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div> */}

        <button
  type="submit"
  disabled={loadinProfile}
  className={`w-full py-2 rounded-md text-white transition duration-200
    ${loadinProfile ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
  `}
>
  {loadinProfile ? "Saving..." : "Save Changes"}
</button>

        </form>
      )}

      {tab === "password" && (
        <form
          onSubmit={handlePasswordSave}
          className="space-y-5 bg-white p-6 rounded-xl shadow-md border border-gray-200"
        >
         <div className="relative">
  <input
    type={showOldPassword ? "text" : "password"}
    name="oldPassword"
    value={passwordData.oldPassword}
    placeholder="old-password"
    onChange={handlePasswordChange}
    className="w-full px-4 py-2 rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  <button
    type="button"
    onClick={() => setShowOldPassword(!showOldPassword)}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
  >
    {showOldPassword ? "🙈" : "👁️"}
  </button>
</div>


        <div className="relative">
  <input
    type={showNewPassword ? "text" : "password"}
    name="newPassword"
    value={passwordData.newPassword}
    onChange={handlePasswordChange}
    placeholder="new-password"
    className="w-full px-4 py-2 rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  <button
    type="button"
    onClick={() => setShowNewPassword(!showNewPassword)}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
  >
    {showNewPassword ? "🙈" : "👁️"}
  </button>
</div>


         <button
  type="submit"
  disabled={loadingPassword}
  className={`w-full py-2 rounded-md text-white transition duration-200
    ${loadingPassword ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
  `}
>
  {loadingPassword ? "Changing..." : "Change Password"}
</button>
        </form>
      )}
    </div>
  );
}




