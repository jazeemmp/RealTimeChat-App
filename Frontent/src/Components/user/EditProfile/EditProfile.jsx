import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "../../../Axios/axiosAuth";
import Camera from "../../../assets/CameraIcon";
import { EditProfileSchema } from "../../../Formik/validationSchema";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import userAuthRedirect from "../../../Hooks/userAuthredirect";

const EditProfile = () => {
  userAuthRedirect(); //hook to check user logined or not
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/edit-profile");
      setUserData(data.userDetails);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      job: "",
      address: "",
      about: "",
      profile: null,
    },
    validationSchema: EditProfileSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      try {
        await axios.post("/edit-profile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Edit Profile successfull");
        navigate("/");
      } catch (error) {
        console.error("Error updating profile", error);
      }
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userData) {
      formik.setValues({
        name: userData.name || "",
        age: userData.age || "",
        job: userData.job || "",
        address: userData.address || "",
        about: userData.about || "",
      });
    }
  }, [userData]);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("profile", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };
  return (
    <section className="py-10 my-auto">
      <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-lg p-4 rounded-xl h-fit self-center">
          <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl mb-2">
            Profile
          </h1>
          <h2 className="text-grey text-sm mb-4">Edit Profile</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mx-auto flex justify-center w-[141px] h-[141px]">
              <img
                src={
                  imagePreview 
                    ? imagePreview 
                    : userData?.profileUrl 
                    ? `/images/${userData.profileUrl}`
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" 
                }
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />

              <div className="bg-gray-100 rounded-full w-6 h-6 text-center mt-4">
                <input
                  type="file"
                  name="profile"
                  id="profileImage"
                  hidden
                  onChange={handleFileChange}
                />
                <label htmlFor="profileImage">
                  <Camera />
                </label>
              </div>
            </div>
            <h2 className="text-center mt-1 font-semibold">
              Upload Profile and Cover Image
            </h2>

            <div className="w-full mb-4 mt-6">
              <label htmlFor="name" className="mb-2">
                Name
              </label>
              <input
                type="text"
                className="mt-2 p-4 w-full border-2 rounded-lg"
                placeholder="Enter your name"
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </div>
              )}
            </div>

            <div className="w-full mb-4">
              <label htmlFor="age" className="mb-2">
                Age
              </label>
              <input
                type="number"
                className="mt-2 p-4 w-full border-2 rounded-lg"
                placeholder="Enter your age"
                name="age"
                id="age"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.age && formik.errors.age && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.age}
                </div>
              )}
            </div>

            <div className="w-full mb-4">
              <label htmlFor="job" className="mb-2">
                Job
              </label>
              <input
                type="text"
                className="mt-2 p-4 w-full border-2 rounded-lg"
                placeholder="Enter your job title"
                name="job"
                id="job"
                value={formik.values.job}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.job && formik.errors.job && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.job}
                </div>
              )}
            </div>

            <div className="w-full mb-4">
              <label htmlFor="address" className="mb-2">
                Address
              </label>
              <input
                type="text"
                className="mt-2 p-4 w-full border-2 rounded-lg"
                placeholder="Enter your address"
                name="address"
                id="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.address}
                </div>
              )}
            </div>

            <div className="w-full mb-4 lg:mt-6">
              <label htmlFor="about" className="mb-2">
                About You
              </label>
              <textarea
                className="mt-2 p-4 w-full border-2 rounded-lg"
                placeholder="Tell us about you"
                name="about"
                id="about"
                value={formik.values.about}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.about && formik.errors.about && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.about}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full p-4 rounded-lg bg-blue-500 text-white text-lg font-semibold disabled:bg-grey-400 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
