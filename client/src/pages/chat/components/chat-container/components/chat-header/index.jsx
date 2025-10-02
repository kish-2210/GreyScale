import { Avatar , AvatarImage } from '@/components/ui/avatar';
import { getColor } from '@/lib/utils';
import { useAppStore } from '@/store'
import { HOST } from '@/utils/constants';
import { RiCloseFill } from 'react-icons/ri'

const ChatHeader = () => {
  const { closeChat, selectedChatData } = useAppStore();

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between md:px-3 pr-10 pl-3 ">

  <div className="flex items-center gap-2 sm:gap-3 md:gap-5 flex-1 min-w-0">
    <Avatar className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-md overflow-hidden">
      {selectedChatData.image ? (
        <AvatarImage
          src={`${HOST}/${selectedChatData.image}`}
          alt="profile"
          className="object-cover w-full h-full bg-black"
        />
      ) : (
        <div
          className={`uppercase h-full w-full flex items-center justify-center text-sm sm:text-lg md:text-xl rounded-md ${getColor(selectedChatData.color)}`}
        >
          {selectedChatData.firstName
            ? selectedChatData.firstName[0]
            : selectedChatData.email[0]}
        </div>
      )}
    </Avatar>

    <div className="flex flex-col truncate">
      <div className="text-sm sm:text-base md:text-lg font-medium truncate">
        {selectedChatData.firstName ? selectedChatData.firstName + " " : "User"}
        {selectedChatData.lastName ? selectedChatData.lastName : ""}
      </div>
      <div className="text-[10px] sm:text-xs md:text-sm text-neutral-400 truncate">
        {selectedChatData.email ? selectedChatData.email : ""}
      </div>
    </div>
  </div>


  <button
    className="text-neutral-500 hover:text-white focus:outline-none transition-all duration-300 flex-shrink-0 ml-2"
    onClick={closeChat}
  >
    <RiCloseFill className="text-2xl sm:text-3xl" />
  </button>
</div>

  )
}

export default ChatHeader
