import { getShadow } from "@/lib/utils"
import { useAppStore } from "@/store"
import EmojiPicker from "emoji-picker-react"
import { useEffect, useRef, useState } from "react"
import {GrAttachment} from 'react-icons/gr'
import { IoSend } from "react-icons/io5"
import { RiEmojiStickerLine } from "react-icons/ri"

const MessageBar = () => {
 const [message, setMessage] = useState("")
 const emojiRef = useRef();
 const [emojiPicker, setEmojiPicker] = useState(false);
 const { userInfo } = useAppStore()

 useEffect(() => {
    function handleClickOutside(event)
    {
        if(emojiRef.current && !emojiRef.current.contains(event.target)){
            setEmojiPicker(false)
        }

    }
    document.addEventListener("mousedown",handleClickOutside)
    return ()=>{
        document.removeEventListener("mousedown",handleClickOutside)
    }
 }, [emojiRef])

const handleAddEmoji = (emoji) =>{
    setMessage((msg) => msg + emoji.emoji)
}

 const handleSendMessage = async()=>{

 }
return (
  <div className="h-[10vh] bg-[#000000] flex justify-center items-center px-1 sm:px-4 md:px-6 lg:px-8 md:mb-2 gap-[2px] sm:gap-3 md:gap-4 lg:gap-6">

  <div className="flex flex-1 border-2 border-[#191919] rounded-full items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 pr-2 sm:pr-3 md:pr-4 lg:pr-5 min-w-0">
    
    <input 
      type="text" 
      className="
        flex-1 min-w-0 
        py-2 ml-1 pl-1 
        sm:p-3 
        md:py-2 md:px-3 lg:py-3 lg:px-4  
        bg-transparent rounded-md 
        text-base sm:text-lg md:text-base lg:text-lg 
        focus:border-none focus:outline-none 
        placeholder:text-base sm:placeholder:text-lg md:placeholder:text-base lg:placeholder:text-lg
      " 
      placeholder="Message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />

    <button className="text-white cursor-pointer focus:outline-none duration-300 transition-all flex-shrink-0">
      <GrAttachment className="text-lg sm:text-xl md:text-xl lg:text-2xl"/>
    </button>
    
    <div className="relative flex-shrink-0">
      <button
        className="text-white cursor-pointer focus:outline-none duration-300 transition-all"
        onClick={() => setEmojiPicker(true)}  
      >
        <RiEmojiStickerLine className="text-lg sm:text-xl md:text-xl lg:text-2xl"/>
      </button>
      <div className="absolute bottom-12 sm:bottom-14 md:bottom-16 right-0" ref={emojiRef}>
        <EmojiPicker
          theme="dark"
          open={emojiPicker}
          onEmojiClick={handleAddEmoji}
          autoFocusSearch={false}
        />
      </div>
    </div>
  </div>
  

  <button
    className="rounded-md cursor-pointer flex items-center justify-center flex-shrink-0 focus:outline-none duration-300 transition-all"
    style={{ backgroundColor: getShadow(userInfo.color) }}
    onClick={handleSendMessage}
  >
    <IoSend className="text-lg sm:text-xl md:text-xl lg:text-2xl m-2 sm:m-3 md:m-2 lg:m-3"/>
  </button>
</div>
)
}
export default MessageBar
