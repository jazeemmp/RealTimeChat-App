import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { userLogout } from "../../../Redux/user/userSlice";
import { getProfile } from "../../../Redux/user/userThunk";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const fetchProfile = async () => {
    try {
      await dispatch(getProfile())
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  },[]);

  return (
    <div className="p-16 flex items-center justify-center min-h-screen">
      <div className="p-8 bg-white mt-10 w-screen rounded-md shadow-xl">
        <div className="flex justify-between items-center">
          <button
            className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            onClick={() => navigate("/edit-profile")}
          >
            Edit profile
          </button>
          <div>
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-md  inset-x-0 top-0 -mt-24 flex items-center overflow-hidden justify-center text-indigo-500">
              {userData?.profileUrl ? (
                <img
                  src={`/images/${userData.profileUrl}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
          <button
            className="text-white py-2 px-4 uppercase rounded bg-red-500 hover:bg-red-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            onClick={() => dispatch(userLogout())}
          >
            Logout
          </button>
        </div>
        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">
            {userData?.name}{" "}
            <span className="font-light text-gray-500">{userData?.age}</span>
          </h1>
          <p className="font-light text-gray-600 mt-3">{userData?.address}</p>
          <p className="mt-8 text-gray-500">{userData?.job}</p>
        </div>
        <div className="mt-12 flex flex-col justify-center">
          <p className="text-gray-600 text-center font-light lg:px-16">
            {userData?.about}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
