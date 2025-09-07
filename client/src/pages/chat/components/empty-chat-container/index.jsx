import { animationDefaultOptions, getShadow } from "@/lib/utils"
import { useAppStore } from "@/store"
import MessageIcon from '@/assets/message.svg';

const EmptyChatContainer = () => {

    const { userInfo } = useAppStore()

  return (
    <div className="hidden flex-1 md:bg-[#000000] md:flex flex-col justify-center items-center duration-1000 transition-all ">
   <img src={MessageIcon} alt="Message icon" className="invert brightness-0 w-32 h-32" />
  <div className="text-opacity-80 text-white flex flex-col gap-2 items-center mt-5 lg:text-4xl text-3xl transition-all duration-300 text-center">
     <div className="pt-3 text-3xl"> Your messages</div>
    <span className="text-xl text-neutral-400" >Send private photos and messages to a friend or group.</span>
  </div>
    </div>
  )
}

export default EmptyChatContainer
