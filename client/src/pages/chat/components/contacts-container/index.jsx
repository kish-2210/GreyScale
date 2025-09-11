import Newdm from "./components/new-dm"
import ProfileInfo from "./components/profile-info"


const ContactsContainer = () => {
  return (
    <div className="w-[20vw] relative  md:w-[45vw] lg:w-[36vw] xl:w-[36vw] border-r-2 border-[#191919]">
      <div className="pt-3 pl-5 text-2xl hidden md:block">
        <span className="Logothree">GREY</span>
        <span className="Logotwo">Scale</span>
      </div>
      <div className="pt-3  text-3xl md:hidden flex  items-center justify-center">
        <div className="border-2 border-[#191919] px-3 py-2 Logobg " >
        <span className="Logothree">G</span>
        <span className="Logotwo">S</span>
        </div>
        
      </div>


      <div className="my-5" >
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <Newdm/>
        </div>
      </div>

      <div className="my-5" >
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
        </div>
      </div>
      <ProfileInfo />
    </div>
  )
}

export default ContactsContainer

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  )
}
