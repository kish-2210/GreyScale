import { useAppStore } from "@/store";
import moment from "moment";
import { useEffect, useRef } from "react";
import { getColor, colors ,getShadow } from '@/lib/utils'
import { apiClient } from "@/lib/api-client";
import { GET_ALL_MESSAGES_ROUTE } from "@/utils/constants.js";


const MessageContainer = () => {
  const scrollRef = useRef();
  const { selectedChatType, selectedChatData, userInfo, selectedChatMessages , setSelectedChatMessages } =
    useAppStore();

    useEffect(()=>{

      const getMessages = async ()=>{
       try {
        const res = await apiClient.post(GET_ALL_MESSAGES_ROUTE,{ id: selectedChatData._id} , {withCredentials: true});

        if(res.data.messages){
          setSelectedChatMessages(res.data.messages);
        }
       } catch (error) {
           console.log({error})
       }
      }

      if(selectedChatData._id){
        if(selectedChatType === "contact") getMessages();
      }

    },[selectedChatData,selectedChatType,setSelectedChatMessages])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const renderMessages = () => {
    let lastDate = null;

    return (selectedChatMessages || []).map((message) => {
      const messageDate = moment(message.timestamp).format("DD-MM-YYYY");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={message._id || message.timestamp}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  const renderDMMessages = (message) => (
    <div
      className={`${
        message.sender === userInfo.id ? "text-right" : "text-left"
      }`}
    >
      {message.messageType === "text" && (
        <div
  className={`${
    message.sender === userInfo.id
      ? `${getColor(userInfo.color)}`
      : "bg-[#262626] text-white/80 border-white/20"
  } border inline-block p-4 rounded-2xl my-1 max-w-[50%] break-words`}
  
>
          {message.content}
        </div>
      )}
      <div className="text-xs text-gray-600">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] w-full">
      {renderMessages()}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default MessageContainer;
