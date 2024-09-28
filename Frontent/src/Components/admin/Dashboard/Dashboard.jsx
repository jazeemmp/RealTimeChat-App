import React, { useEffect, useState } from "react";
import axios from "../../../Axios/adminAxios";
import { toast } from "sonner";
import adminAuthRedirect from "../../../Hooks/adminAuthredirect";
import { adminLogout} from "../../../Redux/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../../Redux/admin/adminThuk";

const Dashboard = () => {
  adminAuthRedirect();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const  {users} = useSelector((state) => state.admin);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const getAllusers = async () => {
    try {
      const result = await dispatch(fetchUsers()).unwrap();
      setFilteredUsers(result.users);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/admin/login");
      }
      console.error("Error fetching users:", error);
      toast.error(error);
    }
  };
  const handleBlockUser = async (id) => {
    try {
      const { data } = await axios.put(`/block-user/${id}`);
      getAllusers()
      toast.success(data.message);
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error("Failed to block user.");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const {data} = await axios.delete(`/delete-user/${id}`);
      getAllusers()
      toast.success(data.message);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };

  const getSearchData = (search) => {
    if (typeof search !== "string") {
      return;
    }
    if (search === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  useEffect(() => {
    getAllusers()
  }, []);
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <button
          className="bg-red-500 text-white p-2 rounded-md"
          onClick={() => {
            dispatch(adminLogout());
            navigate("/admin/login");
          }}
        >
          Logout
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left w-1/4">Name</th>
            <th className="py-3 px-6 text-left w-1/4">Email</th>
            <th className="py-3 px-6 text-left w-1/4">Actions</th>
            <th className="py-3 px-6 text-left w-1/4">
              <input
                type="text"
                placeholder="Enter name or email"
                className="p-1 rounded-sm outline-none"
                onInput={getSearchData}
                onChange={(e) => getSearchData(e.target.value)}
              />
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredUsers?.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-3 px-6 text-center">
                Not found
              </td>
            </tr>
          ) : (
            filteredUsers?.map((user) => (
              <tr
                key={user._id}
                className={`border-b border-gray-200 ${
                  user.isBlocked ? "bg-red-200" : "hover:bg-gray-100"
                }`}
              >
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6 flex space-x-2">
                  <button
                    onClick={() => handleBlockUser(user._id)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                  >
                    {user.isBlocked ? "UnBlock" : "Block"}
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/admin/edit-user/${user._id}`)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
