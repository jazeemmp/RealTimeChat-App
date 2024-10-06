import React, { useEffect, useState } from "react";
import axios from "../../../Axios/axiosAuth";

const AllChats = ({ data, currentUser, online, searchUser }) => {
  const [userData, setUserData] = useState(null);
  const receverId = data?.members?.find((memberId) => memberId !== currentUser);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`/get-user/${receverId}`);
        setUserData(data);
      } catch (err) {
        setError("Failed to load user data");
        console.error(err);
      }
    };

    if (receverId) {
      fetchUserData();
    }
  }, [receverId]);
  return (
    <>
      {searchUser ? (
        <>
          <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
              {searchUser?.profileUrl ? (
                <img
                  src={`/images/${searchUser.profileUrl}`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <img
                  src={`https://placehold.co/200x/ad922e/ffffff.svg?text=${searchUser?.name[0]}&font=Lato`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{searchUser?.name}</h2>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
              {userData?.profileUrl ? (
                <img
                  src={`/images/${userData.profileUrl}`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <img
                  src={`https://placehold.co/200x/ad922e/ffffff.svg?text=${userData?.name[0]}&font=Lato`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{userData?.name}</h2>
              <p className={online ? "text-green-500" : "text-gray-600"}>
                {online ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllChats;
