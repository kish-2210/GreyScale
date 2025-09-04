import { useAppStore } from '@/store'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api-client'
import { LOGOUT_ROUTE } from '@/utils/constants'
import { IoArrowBack } from "react-icons/io5"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getColor, colors , shadows ,getShadow } from '@/lib/utils'
import { FaTrash, FaPlus } from "react-icons/fa"
import { Input } from '@/components/ui/input'
import { TiTick } from "react-icons/ti";

const Profile = () => {

  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [image, setImage] = useState(null)
  const [hovered, setHovered] = useState(false)
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedShadow, setSelectedShadow] = useState(0);

  

  const saveChanges = async () => {

  }







  const handleLogout = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_ROUTE,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Logged out successfully!");
        window.location.href = "/auth";
      } else {
        alert("Logout failed!");
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };








  return (
    <div
      className="absolute inset-0 -z-10 h-full w-full items-center flex  justify-center flex-col gap-10"
      style={{
        background: `radial-gradient(125% 125% at 50% 10%, #000 60%, ${getShadow(selectedShadow)} 100%)`
      }}
    >


      <Button onClick={handleLogout} className="absolute top-2 right-2">Logout</Button>


      <div className= {`relative flex flex-col gap-10 w-[80vw] md:w-max  px-15 pb-15 rounded-4xl border-2 border-neutral-800 shadow-[${getShadow(selectedShadow)}] shadow-md`} >
        <div>
          <IoArrowBack className=' absolute left-4 top-3 p-2 text-4xl text-white/90  cursor-pointer hover:bg-[#252525] hover:rounded-full' />
        </div>
        <div className="grid grid-cols-2">
          <div className='flex gap-8 flex-col justify-center'>

          
          <div className="pl-10 h-32 w-32 relative flex items-center justify-center" onMouseEnter={() => { setHovered(true) }} onMouseLeave={() => { setHovered(false) }}>

            <Avatar className="h-32 w-32  rounded-full overflow-hidden">
              {
                image ? (<AvatarImage src={image} alt="profile" className="object-cover w-full h-full bg-black" />)
                  : (<div className={`uppercase h-32 w-32 text-6xl border-[1px] flex items-center justify-center rounded-full  ${getColor(selectedColor)}`}>
                    {firstName ? firstName.split("").shift() : userInfo.email.split("").shift()}
                  </div>)
              }
            </Avatar>
            {
              hovered && (<div className="items-center justify-center absolute bg-black/50 rounded-full cursor-pointer text-white" > {image ? <FaTrash className='text-3xl cursor-pointer' /> : <FaPlus className='text-3xl cursor-pointer' />} </div>)
            }
          </div>

          <div className='w-full flex gap-5'>
              {
                colors.map((color, index) => <div key={index}
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 relative`}
                  onClick={() => {
                    setSelectedColor(index)
                    setSelectedShadow(index)
                  }}
                >
                  {
                    (selectedColor === index) ? <TiTick className="text-white/70 absolute top-2 right-2 " /> : ""

                  }
                </div>
                )
              }
            </div>
            </div>

          <div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center'>
            <div className='w-full'>
              <Input placeholder="Email" type="email" disabled value={userInfo.email} className="rounded-2xl p-6 bg-[#161616] border-white" />
            </div>
            <div className='w-full'>
              <Input placeholder="First Name" type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} className="rounded-2xl p-6 text-white bg-greyI border-1 border-black focus:ring-0 focus:ring-offset-0 focus:ring-white focus:border-white" />
            </div>
            <div className='w-full'>
              <Input placeholder="Last Name" type="text" onChange={(e) => setLastName(e.target.value)} className="rounded-2xl p-6 text-white bg-greyI border-1 border-black focus:ring-0 focus:ring-offset-0 focus:ring-white focus:border-white" />
            </div>
            
          </div>
        </div>
        <div className='w-full'>
          <Button className='h-13 w-full transition-all duration-300 rounded-lg text-xl hover:bg-[#262626]'
           onClick={saveChanges} > Save changes</Button>
        </div>
      </div>
    </div>
  )
}

export default Profile
