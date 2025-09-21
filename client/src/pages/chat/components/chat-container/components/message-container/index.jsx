import { useAppStore } from "@/store";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { getColor, colors ,getShadow } from '@/lib/utils'
import { apiClient } from "@/lib/api-client";
import { GET_ALL_MESSAGES_ROUTE, HOST } from "@/utils/constants.js";
import { MdFolderZip , MdDownload } from 'react-icons/md'
import { FaRegFileAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const MessageContainer = () => {
  const scrollRef = useRef();
  const { selectedChatType, selectedChatData, userInfo, selectedChatMessages , setSelectedChatMessages } =
    useAppStore();

    const [showImage, setShowImage] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)

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

  const checkIsImage = (filePath)=>{
    const imageRegex =  
    /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;
    return imageRegex.test(filePath);
  }

  const downloadFile = async (fileUrl) => {
    const response = await apiClient.get(`${HOST}/${fileUrl}`,{responseType:"blob"})
    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", fileUrl.split("/").pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
  }

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
  } border inline-block p-2 rounded-2xl my-1 max-w-[50%] break-words`}
  
>
          {message.content}
        </div>
      )}
      { message.messageType === "file" && (
         <div
  className={`${
    message.sender === userInfo.id
      ? `${getColor(userInfo.color)}`
      : "bg-[#262626] text-white/80 border-white/20"
  } border inline-block p-4 rounded-2xl my-1 max-w-[50%] break-words`}
  
>
          {
            checkIsImage(message.fileUrl) ? <div className="cursor-pointer" 
            onClick={()=>{
              setShowImage(true);
              setImageUrl(message.fileUrl);
            }}>
             
             <img src={`${HOST}/${message.fileUrl}`} alt="image" height={300} width={300} />
            </div> 
            
            : <div className="flex items-center justify-center gap-4 cursor-pointer" 
                onClick={()=> downloadFile(message.fileUrl)}  >
                <span className="text-2xl" >
                  <FaRegFileAlt/>
                </span>
                <span>
                  {message.fileUrl.split('/').pop()}
                </span>
                <span className="text-2xl transition-all duration-300 cursor-pointer"
                 >
                 <MdDownload />
                </span>
            </div>
          }
        </div>
      )

      }
      <div className="text-xs text-gray-600">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] w-full">
      {renderMessages()}
      <div ref={scrollRef}>
        {showImage && (
  <div className="fixed inset-0 z-[1000] flex items-center justify-center backdrop-blur-lg">
    <div className="relative max-h-[90vh] max-w-[90vw] flex items-center justify-center">
      <img
        src={`${HOST}/${imageUrl}`}
        alt="image"
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
      />

      <div className="absolute top-3 right-3 flex gap-3">
        <button
          onClick={() => downloadFile(imageUrl)}
          className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition"
        >
          <MdDownload size={22} />
        </button>
        <button
          onClick={() => {
            setShowImage(false);
            setImageUrl(null);
          }}
          className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition"
        >
          <IoCloseSharp size={22} />
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default MessageContainer;
