import ProfileInfo from "./components/profile-info"


const ContactsContainer = () => {
  return (
    <div className="w-[20vw] relative  md:w-[40vw] lg:w-[35vw] xl:w-[25vw] border-r-2 border-[#191919]">
      <div className="pt-3 text-2xl">
        <span className="Logothree">GREY</span>
        <span className="Logotwo">Scale</span>
      </div>

      <div className="my-5" >
      <div className="flex items-center justify-between pr-10">
      <Title text = "Direct Messages" />
      </div>
      </div>

      <div className="my-5" >
      <div className="flex items-center justify-between pr-10">
      <Title text = "Channels" />
      </div>
      </div>
      <ProfileInfo/>
    </div>
  )
}

export default ContactsContainer

const Title = ({text}) =>{
    return (
        <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
            {text}
        </h6>
    )
}
