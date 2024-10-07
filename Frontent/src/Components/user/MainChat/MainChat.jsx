import { useEffect, useRef, useState } from "react";
import axios from "../../../Axios/axiosAuth";
import ChatMessage from "../ChatMessage/ChatMessage";
import ScrollToBottom from "react-scroll-to-bottom";
import { format } from "timeago.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsisVertical,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const MainChat = ({
  currentChat,
  currentUser,
  receivedMessage,
  setSendMessage,
}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const receiverId = currentChat?.members?.find(
    (memberId) => memberId !== currentUser
  );
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`/get-user/${receiverId}`);
        setUserData(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (receiverId) {
      fetchUserData();
    }
  }, [receiverId]);

  useEffect(() => {
    const fetchCurrentMessage = async () => {
      const { data } = await axios.get(`/api/message/${currentChat._id}`);
      setMessages(data);
    };
    fetchCurrentMessage();
  }, [currentChat]);

  const handleSend = async (event) => {
    event.preventDefault();
    if (newMessage === "") return;
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: currentChat._id,
    };
    setSendMessage({ ...message, receiverId });
    try {
      const { data } = await axios.post("api/message", message);
      setNewMessage("");
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      receivedMessage !== null &&
      receivedMessage?.chatId === currentChat._id
    ) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  return (
    <>
      <div className="flex-1">
        <header className="bg-white p-4 text-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
            <h1 className="text-2xl font-semibold">{userData?.name}</h1>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="mx-4 text-xl text-gray-500"
            />
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="mx-4 text-xl text-gray-500"
            />
          </div>
        </header>
        <ScrollToBottom className="relative h-screen p-4 pb-40 w-full">
          <div className="absolute inset-0 bg-gray-200 bg-[url('https://camo.githubusercontent.com/ebf18cd85f7aa9dc79fb74c58dc94febf3a6441d8d689cd5a400b2707e19ec0e/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67')] bg-cover bg-center opacity-100 pointer-events-none"></div>
          <div className="relative z-10">
            {messages.map((message) => (
              <ChatMessage
                key={message?._id}
                type={
                  message?.senderId === currentUser ? "outgoing" : "incoming"
                }
                message={message?.text}
                time={format(message.createdAt)}
              />
            ))}
          </div>
        </ScrollToBottom>

       <div className="flex  justify-center">
       <footer className="bg-white rounded-full border-gray-300 p-3 fixed bottom-3 w-full xl:w-4/6 ">
          <form onSubmit={handleSend} className="flex items-center">
            <input
              value={newMessage}
              type="text"
              placeholder="Type a message..."
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full p-2 outline-none border-0 rounded-md "
            />
            <button
              type="submit"
              className="bg-transparent border-0 p-0 cursor-pointer mr-10" // Remove button styles
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="text-indigo-500 text-2xl"
              />
            </button>
          </form>
        </footer>
       </div>
      </div>
    </>
  );
};
export default MainChat;
