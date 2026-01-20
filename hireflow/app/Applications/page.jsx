"use client";

import React, { useEffect, useState } from 'react'
import Navbar from '../../components/common/navbar'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deleteApplication, getAllApplications } from '../../services/jobService';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


function Applications() {
  const router = useRouter();
  const [allApplications, setAllApplications] = useState([]);
  useEffect(() => {
    const fetchApplications = async () => {
    try {
      const result = await getAllApplications();
      
      if (result.success) {
        setAllApplications(result.response);
      }
 

    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };
  
  fetchApplications();
  }, [])

  const handleDeleteApplication = async (applicationId) => {
    try {
       await deleteApplication (applicationId).then((response) => {
        if (response.success) {
          toast.success("Application deleted successfully");
          // Update the state to remove the deleted application
          setAllApplications(prevApplications => 
            prevApplications.filter(app => app.id !== applicationId)
          );
        } else {
          toast.error("Failed to delete application");
        }
      });
    } catch (error) {
      toast.error("Error deleting application:", error);
    }
  };
  
  return (
     <div className="min-h-screen w-full relative overflow-hidden bg-[var(--color-background)]">
      
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-gray) 0%, transparent 70%)'
          }}
        />
        
        <div 
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-gray) 0%, transparent 70%)'
          }}
        />
        
        <div 
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-gray) 0%, transparent 70%)'
          }}
        />

        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-gray) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-gray) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
         <Navbar  userId="5"/>

          <div className="transition-all duration-700  opacity-100 translate-y-0">
            <div className="backdrop-blur-sm bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-2xl shadow-2xl p-8 mb-6">
              <h1 className="text-3xl font-bold mb-2 text-[var(--color-foreground)]">Applications</h1>
              <p className="text-[var(--color-gray)]">Track and manage your job applications in one place.</p>
              <div className="mt-4">
                {allApplications?.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {allApplications.map((application) => {
                      return(
                        <div key={application.id} className="p-4 group border border-[var(--color-border)] rounded-2xl bg-[var(--color-background)]/70 backdrop-blur-sm">
                          <span className='flex justify-between'>
                            <h2 className="text-xl font-semibold text-[var(--color-foreground)]">{application.jobRole}</h2>
                            <p className=" text-[var(--color-gray)]">Applied on: {new Date(application.createdAt).toLocaleDateString()}</p>
                            </span>

                          <p className="text-[var(--color-gray)]">Company: {application.companyName}</p>
                         
                          {/* Smooth fade and slide transition */}
                            <p className="mt-2 text-[var(--color-gray)] opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-96 transition-all duration-500 ease-in-out">
                              {application.jobDescription}
                            </p>
                         
                          <span className='flex justify-end gap-3'>
                           <DeleteOutlineIcon onClick={() => handleDeleteApplication(application.id)} className="text-red-300 hover:text-red-700 transition-all duration-200 cursor-pointer" />
                           
                          </span>
                        </div>
                      )
                    })}
                  </div>
                ) : ( 
                <div   onClick={() => router.push("/jobs")} className="pointer w-full h-64 border-2 border-dashed border-[var(--color-border)] rounded-2xl flex flex-col items-center justify-center text-[var(--color-gray)]">
                  <p className="mb-2">No applications found.</p>
                  <p>Start applying to jobs, to see them Click here.</p>  
                  </div>
                )}
                </div>
              </div>
            </div>
         </div>
      </div>
  )
}

export default Applications