import { useAppStore } from '@/store'
import React from 'react'

const Profile = () => {

  const { userInfo } = useAppStore()
  return (
    <div>
      <div className='bg-black text-white'>
        Email : {userInfo.email}
      </div>
    </div>
  )
}

export default Profile
