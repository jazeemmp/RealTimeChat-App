import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../Axios/adminAxios";
import { toast } from "sonner";

const EditUser = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {users} = useSelector(state => state.admin)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const user = users.find((user)=>user._id === id)
  const handleUpdate = async()=>{
   try {
    const {data} = await axios.put('/edit-user',{name,email,id})
    toast.success(data.message)
    navigate('/admin/dashboard')
   } catch (error) {
     toast.error(error.response.data.message)
   }
  }
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left w-1/4">Name</th>
            <th className="py-3 px-6 text-left w-1/4">Email</th>
            <th className="py-3 px-6 text-left w-1/4">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          <tr>
            <td className="py-3 px-6">
              <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  w-1/2 p-1  outline-none"
              />
            </td>
            <td className="py-3 px-6">
              <input
                type="text"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  w-1/2 p-1  outline-none"
              />
            </td>
            <td className="py-3 px-6 flex space-x-2">
              <button className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600" onClick={handleUpdate}>
                Update
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditUser;
