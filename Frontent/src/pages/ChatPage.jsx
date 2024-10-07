import AllChats from "../Components/user/AllChats/AllChats";
import MainChat from "../Components/user/MainChat/MainChat";
import axios from "../Axios/axiosAuth";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatApp = () => {
  const { userToken } = useSelector((state) => state.user);
  const currentUser = jwtDecode(userToken).id;

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [sendMessage, setSendMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState();
  const [searchPrompt, setSearchPrompt] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const socket = useRef();

  const getChats = async () => {
    try {
      const { data } = await axios.get("/api/chat");
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChats();
  }, []);
  //soket io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("add-new-user", currentUser);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [currentUser]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      console.log(data, "==recvermsg"); // Should log the data
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== currentUser);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  const handleSearch = async (e) => {
    const value = e.target.value
    setSearchPrompt(value);
    if (searchPrompt === "") return;
    try {
      const { data } = await axios.get("/api/chat/get-users", {
        params: { query: valueue },
      });
      // Filter out the current user from the results
      const filteredUsers = data.filter((user) => user._id !== currentUser);
      // Update the state with the filtered users
      setSearchedUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  const handleUserChat = async (receverId) => {
    setSearchPrompt("");
    try {
      const { data } = await axios.post("/api/chat/create", {
        senderId: currentUser,
        receverId,
      });
      const isExisting = chats.find((chat) => chat._id === data._id);
      if (!isExisting) {
        setChats((prevChats) => [...prevChats, data]);
      }
      setCurrentChat(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log(searchedUsers, "==searched users");

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Show the list of users on larger screens or if it's mobile and no chat is selected */}
      {(!isMobile || (isMobile && !currentChat)) && (
        <div
          className={
            isMobile ? "w-full" : "w-[400px] bg-white border-r border-gray-100"
          }
        >
          <header className="p-4 flex flex-col items-start ">
            <div className="flex justify-between w-full items-center mb-4 cursor-pointer">
              <h1 className="text-2xl font-semibold m-2">Chats</h1>
              <FontAwesomeIcon icon={faBars} className="text-xl" />
            </div>
            <input
              type="text"
              value={searchPrompt}
              onChange={handleSearch}
              className="w-full bg-slate-100 p-3 rounded-full pl-5 outline-none "
              placeholder="Search Users"
            />
          </header>
          <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
            {searchPrompt === "" || !searchedUsers ? (
              chats?.length === 0 ? (
                <div className="text-center py-10">No chats available</div>
              ) : (
                chats?.map((chat) => (
                  <div key={chat._id} onClick={() => setCurrentChat(chat)}>
                    <AllChats
                      data={chat}
                      currentUser={currentUser}
                      online={checkOnlineStatus(chat)}
                    />
                  </div>
                ))
              )
            ) : searchedUsers.length === 0 ? (
              <img  src="http://arttengry.com/static/media/empty.59d15b3c.gif"/>
            ) : (
              searchedUsers.map((user) => (
                <div key={user._id} onClick={() => handleUserChat(user._id)}>
                  <AllChats searchUser={user} currentUser={currentUser} />
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Show the main chat component if a chat is selected */}
      {currentChat && (
        <MainChat
          currentChat={currentChat}
          currentUser={currentUser}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      )}

      {/* Show a message prompting user to select a chat on larger screens when no chat is selected */}
      {!currentChat && !isMobile && (
        <div className="grid flex-1 place-items-center w-screen bg-gray-50">
          <h1 className="bg-gray-100 px-5 p-2 font-bold rounded-full text-gray-600">
            Select a chat to start messaging...
          </h1>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
