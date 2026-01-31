"use client";

import React, { useEffect, useState } from 'react'

import EditSquareIcon from '@mui/icons-material/EditSquare';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import AppsIcon from '@mui/icons-material/Apps';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';

import { logout, me } from '../../services/authService';
import { toast } from 'sonner';


function Navbar() {

    const [loggedInUserId, setLoggedInUserId] = useState();
    const [userId , setUserId] = useState(null);
    const [username , setUsername] = useState("");
    const router = useRouter();
    console.log("Navbar userId:", userId);
    useEffect(() => {
       const storedUserId = localStorage.getItem("userId");
       setUserId(storedUserId);
      const getUserId = async() => {
       try {
         const userId = await me();
         console.log(userId);
         if (userId?.success) {
          setLoggedInUserId(userId?.user?.user);
          localStorage.setItem("username", userId?.user?.username);
          setUsername(userId?.user?.username);
         } else {
          setLoggedInUserId(null);
         }
          
       } catch (error) {
         console.log(error);
       }
      }
      getUserId();
    }, [])
    console.log("Logged in user ID:", loggedInUserId);
   const logoutUser = ()=>{
    logout().then((response)=>{
      if(response.success){
        toast.success("Logged out successfully");
        router.push('/');
      }
    })  
   }

   const NavItem = ({ icon: Icon, label, onClick }) => (
    <div
      onClick={onClick}
      className="group cursor-pointer z-50 w-16 flex flex-col justify-center items-center
                border border-[var(--color-border)] rounded-2xl p-4
                bg-[var(--color-background)]/80 backdrop-blur-sm shadow-lg
                hover:shadow-2xl hover:border-[var(--color-gray)]/50
                hover:scale-105 hover:translate-x-2
                transition-all duration-300 ease-out"
    >
      <Icon className="text-[var(--color-foreground)] transition-all duration-300 
                      group-hover:text-[var(--color-gray)] group-hover:scale-110" />
      
      <p className="text-xs text-[var(--color-gray)] mt-1 
                   opacity-0 translate-y-[-4px] max-h-0 overflow-hidden 
                   group-hover:opacity-100 group-hover:translate-y-0 group-hover:max-h-6 
                   transition-all duration-300 ease-out">
        {label}
      </p>
    </div>
   );

  return (
    <div>
        {loggedInUserId == userId ? (
          <div className="fixed top-7 right-8 flex flex-col gap-3 transition-all duration-500">
            <NavItem 
              icon={HomeIcon} 
              label="Portfolio" 
              onClick={() => router.push(`/Portfolio/${username}`)} 
            />
            
            <NavItem 
              icon={AppsIcon} 
              label="Jobs" 
              onClick={() => router.push('/jobs')} 
            />
            
            <NavItem 
              icon={FileOpenIcon} 
              label="Track" 
              onClick={() => router.push('/Applications')} 
            />
            
            <NavItem 
              icon={EditSquareIcon} 
              label="Edit" 
              onClick={() => router.push('/profile/edit')} 
            />
            
            <NavItem 
              icon={LogoutIcon} 
              label="Logout" 
              onClick={logoutUser} 
            />
          </div>
        ) : null}
    </div>
  )
}

export default Navbar