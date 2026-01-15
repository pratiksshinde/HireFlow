"use client";

import React, { useEffect, useState } from 'react'

import EditSquareIcon from '@mui/icons-material/EditSquare';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import AppsIcon from '@mui/icons-material/Apps';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/navigation';

function Navbar({userId}) {
    const [loggedInUserId, setLoggedInUserId] = useState()
    const [username , setUsername] = useState("");
  const router = useRouter();
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        setUsername(localStorage.getItem("username"));
        setLoggedInUserId(userId);
    }, [])
    
   

  return (
    <div>
        {loggedInUserId == userId ? (
            <div className="fixed top-7 right-24 flex flex-col gap-4">

            {/* Home */}
              <div
              onClick={() => router.push(`/Portfolio/${username}`)}
              className="group cursor-pointer z-50 w-fit flex flex-col justify-center items-center
                        border border-[var(--color-border)] rounded-2xl p-4
                        bg-[var(--color-background)]/80 backdrop-blur-sm shadow-2xl "
            >
              <HomeIcon className="text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-gray)]/80" />
              {/* <h3 className="mt-1 text-sm
                        opacity-0 translate-y-1 scale-95
                        transition-all duration-200 ease-out
                        group-hover:opacity-100
                        group-hover:translate-y-0
                        group-hover:scale-100">
                Track
              </h3> */}
            </div>

            {/* Jobs */}
            <div
              onClick={() => router.push('/jobs')}
              className="group cursor-pointer z-50 w-fit flex flex-col justify-center items-center
                        border border-[var(--color-border)] rounded-2xl p-4
                        bg-[var(--color-background)]/80 backdrop-blur-sm shadow-2xl "
            >
              <AppsIcon className="text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-gray)]/80" />
              {/* <h3 className="mt-1 text-sm
                        opacity-0 translate-y-1 scale-95
                        transition-all duration-200 ease-out
                        group-hover:opacity-100
                        group-hover:translate-y-0
                        group-hover:scale-100">
                Track
              </h3> */}
            </div>

            {/* Track */}
            <div
              onClick={() => router.push('/Applications')}
              className="group cursor-pointer z-50 w-fit flex flex-col justify-center items-center
                        border border-[var(--color-border)] rounded-2xl p-4
                        bg-[var(--color-background)]/80 backdrop-blur-sm shadow-2xl"
            >
              <FileOpenIcon className="text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-gray)]/80" />
              {/* <h3   className="mt-1 text-sm
                        opacity-0 translate-y-1 scale-95
                        transition-all duration-200 ease-out
                        group-hover:opacity-100
                        group-hover:translate-y-0
                        group-hover:scale-100">
                Jobs
              </h3> */}
            </div>

              {/* Edit */}
            <div
              onClick={() => router.push('/profile/edit')}
              className="group cursor-pointer z-50 w-fit flex flex-col justify-center items-center
                        border border-[var(--color-border)] rounded-2xl p-4
                        bg-[var(--color-background)]/80 backdrop-blur-sm shadow-2xl "
            >
              <EditSquareIcon className="text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-gray)]/80" />
              {/* <h3 className="mt-1 text-sm
                        opacity-0 translate-y-1 scale-95
                        transition-all duration-200 ease-out
                        group-hover:opacity-100
                        group-hover:translate-y-0
                        group-hover:scale-100">
                Edit
              </h3> */}
            </div>
          </div>
          ) : null}

    </div>
  )
}

export default Navbar