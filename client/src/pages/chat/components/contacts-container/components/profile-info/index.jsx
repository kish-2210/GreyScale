import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getColor } from '@/lib/utils'
import { useAppStore } from '@/store'
import { HOST } from '@/utils/constants'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from 'sonner'
import { apiClient } from '@/lib/api-client'
import { LOGOUT_ROUTE } from '@/utils/constants'

const ProfileInfo = () => {
  const { userInfo , setUserInfo } = useAppStore()
  const navigate = useNavigate();

  const handleLogout = async() =>{
        try {
          const response = await apiClient.post(LOGOUT_ROUTE,{},{withCredentials:true})
          if(response.status === 200){
             navigate("/auth")
             setUserInfo(null)
          }
        } catch (error) {
           console.log(error)
           toast
        }
  }
  return (
    <>

  <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <div className='absolute bottom-0 h-18 md:m-2 rounded-md  w-[97%] flex items-center justify-center md:justify-between px-3 hover:bg-[#171616] cursor-pointer'>
      <div className='flex gap-3 items-center justify-center'>
        <div>
          <Avatar className="h-12 w-12 sm:h-15 sm:w-15 md:h-13 md:w-13 rounded-md overflow-hidden">
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-full w-full flex items-center justify-center text-xl md:text-2xl rounded-md ${getColor(userInfo.color)}`}
              >
                {userInfo.firstName ? userInfo.firstName[0] : userInfo.email[0]}
              </div>
            )}
          </Avatar>
        </div>
        <div className='hidden md:flex flex-col'>
          <div className='text-xl'>{userInfo.firstName ? userInfo.firstName : "User"}</div>
          <div className='text-sm'>{userInfo.email ? userInfo.email : ""}</div>
        </div>
      </div>
    </div>
  </DropdownMenuTrigger>

  <DropdownMenuContent
    side="top"
    align="start"
    className="w-48 bg-[#0a0a0a] text-white border border-[#333] rounded-lg shadow-lg"
  >
    <DropdownMenuLabel className="text-gray-300">Setting</DropdownMenuLabel>
    <DropdownMenuSeparator className="bg-[#333]" />
    <DropdownMenuItem onClick ={()=>{userInfo.setup=false; navigate("/profile")}} >Edit profile</DropdownMenuItem>
    <DropdownMenuItem onClick = {handleLogout} >Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    </>
  )
}

export default ProfileInfo
