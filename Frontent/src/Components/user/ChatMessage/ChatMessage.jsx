const ChatMessage = ({ type, message ,time}) => {
  const messageClass =
    type === "incoming"
      ? "flex mb-4 cursor-pointer"
      : "flex justify-end mb-4 cursor-pointer";

  const bubbleClass =
    type === "incoming"
      ? "flex max-w-96 bg-white rounded-lg p-3 gap-1 flex-col"
      : "flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-1 flex-col";

  const timeClass =
    type === "incoming"
      ? "text-gray-400 text-[9px]  self-end "  
      : "text-gray-200 text-[9px] self-end ";   

  return (
    <div className={messageClass}>
      <div className={bubbleClass}>
        <p>{message}</p>
        <span className={timeClass}>{time}</span> 
      </div>
    </div>
  );
};

export default ChatMessage;
