"use client";

import React, { useEffect, useState } from "react";
import { getJobsList } from "../../services/jobService";
import JobCard from "../../components/jobCard";
import Spinner from "../../components/ui/spinner";
import Navbar from "../../components/common/navbar";

export default function Jobs() {
      const [isVisible, setIsVisible] = useState(false);
      const [data, setData] = useState([]);
      const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchData = async()=>{
        setLoader(true);
        const data=await getJobsList(5)
         setData(data);  
    setLoader(false);
    console.log(data);
    }
    fetchData();
  }, [])
  

  
  return ( 
    <div className="min-h-screen w-full relative overflow-hidden bg-[var(--color-background)]">
     
      {loader ? (  <div className="absolute inset-0 transparent rounded-xl flex items-center justify-center z-10">
                    <Spinner className="h-14 w-14 text-gray-100" />
                </div> ) : ""}
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
           <Navbar className="z-9999"/>
      {/* Content */}
      <div className="relative z-10 max-w-5xl grid grid-cols-3 gap-4 mx-auto px-4 py-12">
        
         {data.map((job)=>(
            <JobCard key={job.id} job={job}/>
         ))}

        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <div>

          </div>
        </div>

      </div>
      
    </div>
  );
}