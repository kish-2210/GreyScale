import { useAppStore } from '@/store'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api-client'
import { ADD_PROFILE_IMAGE_ROUTE, HOST, LOGOUT_ROUTE, REMOVE_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE } from '@/utils/constants'
import { IoArrowBack } from "react-icons/io5"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getColor, colors ,getShadow } from '@/lib/utils'
import { FaTrash, FaPlus } from "react-icons/fa"
import { Input } from '@/components/ui/input'
import { TiTick } from "react-icons/ti";
import { toast } from 'sonner'

const Profile = () => {

  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [image, setImage] = useState(null)
  const [hovered, setHovered] = useState(false)
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedShadow, setSelectedShadow] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
      if(userInfo.profileSetup){
      setFirstName(userInfo.firstName)
      setLastName(userInfo.lastName)
      setSelectedColor(userInfo.color)
      }
      if(userInfo.image){
        setImage(`${HOST}/${userInfo.image}`)
      }
      
    
  }, [userInfo])

  const validateProfile = () =>{
    if(!firstName){
      toast.error("First name is required")
      return false;
    }
    if(!lastName){
      toast.error("Last name is required")
      return false;
    }
    return true;
  }

  const saveChanges = async () => {
      if(validateProfile()){
        try {
           const res = await apiClient.post(UPDATE_PROFILE_ROUTE,{ firstName , lastName , color: selectedColor },{ withCredentials: true });

           if(res.status === 200 && res.data){
            setUserInfo({...res.data});
            toast.success("Profile updated successfully")
            navigate("/chat");
           }
        } catch (error) {
          console.log(error)
        }
      }
  }

  const handleLogout = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_ROUTE,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Logged out successfully!");
        navigate("/auth")
      } else {
        alert("Logout failed!");
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const handleNavigate = ()=>{
    if(userInfo.profileSetup){
      navigate("/chat")
    }
    else{
      toast.error("Please setup profile");
    }
  }

  const handleFileInputClick = () =>{
    fileInputRef.current.click();
  }

  const handleImageChange = async (event) =>{
         const file = event.target.files[0]
         console.log({file});

         if(file){
          const formData = new FormData();
          formData.append("profile-image",file);
          const res = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE,formData,{withCredentials: true})
          if(res.status === 200 && res.data.image){
            setUserInfo({...userInfo, image: res.data.image});
            toast.success("Image updated successfully");
            event.target.value = "";
          }
         }
  }
  
  const handleDeleteImage = async()=>{
   try {
      const res = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE,{
        withCredentials: true
      });
      if(res.status===200){
        setUserInfo({...userInfo, image:null })
        toast.success("Image removed successfully")
        setImage(null);
      }
   } catch (err) {
     console.log(err)
   }
  }

  return (

    <div
  className="absolute inset-0 -z-10 h-full w-full flex items-center justify-center px-4 sm:px-6 md:px-10 py-8"
  style={{
    background: `radial-gradient(125% 125% at 50% 10%, #000 60%, ${getShadow(selectedShadow)} 100%)`
  }}
>
  <Button onClick={handleLogout} className="absolute top-2 right-2">Logout</Button>

  <div
    className={`relative flex flex-col gap-6 sm:gap-8 md:gap-10 
                w-full sm:w-[90%] md:w-[60%] lg:w-[40%] 
                px-4 sm:px-6 md:px-7 py-6 md:py-7
                rounded-4xl border-2 border-neutral-800 shadow-md
                bg-black/40`}

    style={{ boxShadow: `0 8px 20px ${getShadow(selectedShadow)}` }}
  >
    <div onClick={handleNavigate}>
      <IoArrowBack className="absolute left-4 top-3 p-2 text-3xl sm:text-4xl text-white/90 cursor-pointer hover:bg-[#252525] hover:rounded-full" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="flex flex-col gap-6 sm:gap-8 justify-center items-center">
        <div
          className="relative flex items-center justify-center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Avatar className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-full overflow-hidden">
            {image ? (
              <AvatarImage src={image} alt="profile" className="object-cover w-full h-full bg-black" />
            ) : (
              <div
                className={`uppercase h-full w-full flex items-center justify-center text-4xl sm:text-5xl md:text-6xl rounded-full ${getColor(selectedColor)}`}
              >
                {firstName ? firstName[0] : userInfo.email[0]}
              </div>
            )}
          </Avatar>
          {hovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer text-white"
              onClick={image ? handleDeleteImage : handleFileInputClick}>
              {image ? <FaTrash className="text-2xl sm:text-3xl" /> : <FaPlus className="text-2xl sm:text-3xl" />}
            </div>
          )}
          <input type="file" ref={fileInputRef} className='hidden' onChange={handleImageChange} 
          name="profile-image" 
          accept='.png, .jpg, .jpeg, .svg, .webp' />
        </div>
        <div className="flex gap-3 flex-wrap justify-center md:justify-start">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`${color} h-7 w-7 sm:h-8 sm:w-8 rounded-full cursor-pointer transition-all duration-300 relative`}
              onClick={() => {
                setSelectedColor(index);
                setSelectedShadow(index);
              }}
            >
              {selectedColor === index && (
                <TiTick className="text-white/70 absolute top-2 right-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:gap-5 mt-2 text-white w-full">
        <Input
          placeholder="Email"
          type="email"
          disabled
          value={userInfo.email}
          className="rounded-xl p-4 sm:p-5 bg-[#161616] border-white w-full md:h-12"
        />
        <Input
          placeholder="First Name"
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          className="rounded-xl p-4 sm:p-5 text-white bg-greyI border border-black focus:ring-0 focus:border-white w-full md:h-12"
        />
        <Input
          placeholder="Last Name"
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          className="rounded-xl p-4 sm:p-5 text-white bg-greyI border border-black focus:ring-0 focus:border-white w-full md:h-12"
        />
      </div>
    </div>

    <div className="w-full">
      <Button
        className="h-10 w-full transition-all duration-300 rounded-lg text-lg sm:text-xl hover:bg-[#262626]"
        onClick={saveChanges}
      >
        Save changes
      </Button>
    </div>
  </div>
</div>

  )
}

export default Profile
