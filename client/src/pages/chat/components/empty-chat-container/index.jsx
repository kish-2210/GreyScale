import { useAppStore } from "@/store"
import MessageIcon from '@/assets/message.svg';

const EmptyChatContainer = () => {

    const { userInfo } = useAppStore()

  return (
   <div className="flex-1 bg-black flex flex-col justify-center items-center duration-1000 transition-all p-6">
  <img
    src={MessageIcon}
    alt="Message icon"
    className="invert brightness-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
  />
  
  <div className="text-opacity-80 text-white flex flex-col gap-2 items-center mt-5 text-center transition-all duration-300">
    <div className="pt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold">
      Your messages
    </div>
    <span className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-md">
      Send private photos and messages to a friend or group.
    </span>
  </div>
</div>
  )
}

export default EmptyChatContainer
