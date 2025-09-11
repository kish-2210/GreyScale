import React, { useState } from 'react'
import Background from "@/assets/Background.png"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants';
import { apiClient } from '@/lib/api-client';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/index';

const Auth = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  
  const validateLogin = ()=>{
    if(!email.length){
      toast.error("Email is required")
      return false;
    }
    if(!password.length)
      {
        toast.error("Password is required")
      return false;
    }
    return true;
  }

  const validateSignup = () =>{
    if(!email.length){
      toast.error("Email is required")
      return false;
    }
    if(!password.length)
      {
        toast.error("Password is required")
      return false;
    }
    if(!confirmPassword.length)
      {
        toast.error("Please confirm your password")
      return false;
    }
    if(confirmPassword !== password)
    {
      toast.error("Password and confirm password should be same")
      return false;

    }
    return true;
  }

  const handleLogin = async () => { 

    if(validateLogin()){
    try {
      const res = await apiClient.post(
        LOGIN_ROUTE,
        { email , password }, { withCredentials: true });
      
      
      if(res.status === 200){
        setUserInfo(res.data.user)
        toast("Login Successful")
        if(res.data.user.profileSetup){ navigate("/chat")}
        else {navigate("/profile")}
      }

    }
    catch (error) 
    {
      toast(error.response.data)
      console.log(`error : ${error}`)
    }
  }
}
  const handleSignup = async () => {
    if(validateSignup()){
      try {
        const res = await apiClient.post(
          SIGNUP_ROUTE,
          { email, password},
          { withCredentials: true}
        )
        if(res.status === 201){
        toast(res.data.message)
        setUserInfo(res.data.user)
        navigate("/profile");
      }
      } catch (error) {
        toast(error.response.data)
        console.log(error)
      }
    }
   }

  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-custom-gradient">
      <div className="relative z-10 h-full w-full flex items-center justify-center">
        <div className='h-[90vh] relative rounded-xl  bg-neutral-950  border border-neutral-800 shadow-lg overflow-hidden bg-[linear-gradient(to_right,rgba(51,51,51,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(51,51,51,0.2)_1px,transparent_1px)] bg-[size:20px_20px]  p-6 w-[75vw] md:w-[90vw] md:p-8 grid md:grid-cols-2'>
          <div className="flex flex-col gap-10 items-center justify-center">
            <div className="flex items-center justify-center flex-col">
              <div className="flex items-center justify-center">
                <h1 className="text-white text-4xl  md:text-5xl font-bold lg:text-6xl">
          
                  <span className='Logothree'>GREY</span>
                  <span className="Logotwo">Scale</span>
                </h1>
              </div>
              
            </div>

            <div className="flex items-center justify-center w-full">
              <Tabs  defaultValue="login" className="w-full md:w-[90%]">
                <TabsList className="bg-transparent w-full flex gap-3">
                  <TabsTrigger
                    className={`w-full font-bold text-gray-400 hover:text-white rounded-xl py-4 text-lg data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg hover:bg-neutral-800 transition-colors duration-300`}
                    value="login"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    className={`w-full font-bold text-gray-400 hover:text-white rounded-xl py-4 text-lg data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg hover:bg-neutral-800 transition-colors duration-300`}
                    value="signup"
                  >
                    Sign up
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="flex flex-col gap-5 mt-10 justify-center items-center">
                  <Input
                    placeholder="Email"
                    type="email"
                    className="rounded-2xl p-6 text-white bg-greyI border-1 border-black focus:ring-0 focus:ring-offset-0 focus:ring-white focus:border-white"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    className="rounded-2xl p-6 text-white bg-greyI border-1 border-black focus:ring-0 focus:ring-offset-0 focus:ring-white focus:border-white"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    className="rounded-xl font-extrabold p-6 text-lg w-full  text-black bg-white hover:bg-Bhover"
                    onClick={handleLogin}
                  >Login</Button>
                </TabsContent >
                <TabsContent value="signup" className="flex flex-col gap-5 mt-10">
                  <Input
                    placeholder="Email"
                    type="email"
                    className="rounded-2xl p-6 text-white bg-greyI border-1 border-black focus:ring-0 focus:ring-offset-0 focus:ring-white focus:border-white"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    className="rounded-2xl p-6 text-white bg-greyI border-1 border-black focus:ring-0 focus:ring-offset-0 focus:ring-white focus:border-white"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <Input
                    placeholder="Confirm password"
                    type="password"
                    className="rounded-2xl p-6 text-white bg-greyI border-1 border-black focus:ring-0 focus:ring-offset-0 focus:ring-white focus:border-white"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <Button
                    className="rounded-xl p-6 text-lg w-full font-extrabold text-black bg-white hover:bg-Bhover"
                    onClick={handleSignup}
                  >Sign up</Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center">
            <img src={Background} alt="background" className='h-[550px]' />
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Auth
