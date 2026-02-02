"use client";

import React, { useEffect, useState } from "react";
import { getJobsList } from "../../services/jobService";
import JobCard from "../../components/jobCard";
import Spinner from "../../components/ui/spinner";
import Navbar from "../../components/common/navbar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Jobs() {
      const [isVisible, setIsVisible] = useState(false);
      const [data, setData] = useState([]);
      const [loader, setLoader] = useState(false);
      const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async()=>{
        setLoader(true);
        const data=await getJobsList(page)
         setData(data);  
    setLoader(false);
    console.log(page , " page data : ",data);
    }
    fetchData();
  }, [page])
  

  
  return ( 
    <div className="min-h-screen w-full relative overflow-hidden bg-[var(--color-background)]">
     
      {loader && !data.length ? (  <div className="absolute inset-0 transparent rounded-xl flex items-center justify-center z-100">
                    <Spinner className="h-14 w-14 text-gray-700 " />
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


      </div>
      {data.length==0 && !loader &&(
        <div className="relative z-10 w-full flex justify-center items-center">
          <h2 className="text-2xl font-semibold text-gray-500">No Jobs Available</h2>
        </div>
      )}
      {data.length>0 && (
      <div className="relative z-10 w-full flex gap-5 justify-center items-center">
        <button onClick={()=>{if(page!=1)setPage(page-1)}} className=" p-4 m-4 rounded-full border border-gray-700 pointer"><ArrowBackIosIcon /></button>
         {loader ? (
            <Spinner className="h-8 w-8 text-gray-800 " />
         ) : (
          <span className="text-gray-700 text-lg">Page {page}</span>
         )}
        <button onClick={()=>{setPage(page+1)}} className=" p-4 m-4 rounded-full border border-gray-700 pointer"><ArrowForwardIosIcon /></button>
        </div>
      )}
    </div>  
  );
}