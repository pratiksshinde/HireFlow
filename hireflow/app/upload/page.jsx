"use client";

import React, { useEffect, useState } from 'react';
import BackupIcon from '@mui/icons-material/Backup';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import ShieldIcon from '@mui/icons-material/Shield';
import { Button } from "@/components/ui/button"
import {useRouter} from "next/navigation"

import Link from "next/link";

function UploadResume() {
  const [resume, setResume] = useState();
  const [password, setPassword] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const route = useRouter();

  const handlesubmit = ()=>{
    route.push('/Portfolio');
  }
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    if (droppedFile.type !== "application/pdf") {
      alert("Only PDF allowed");
      return;
    }

    setResume(droppedFile);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);


  const handleFileSelect = (e) => {
    const selected = e.target.files[0];

    if (selected.type !== "application/pdf") {
      alert("Only PDF allowed");
      return;
    }

    setResume(selected);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center relative overflow-hidden bg-[var(--color-background)]">
      
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orb 1 - Top Left */}
        <div 
          className={`absolute -bottom-80 -left-20 w-[500px] h-[500px]  rounded-full opacity-20 blur-3xl transition-all duration-1000 ${
            isVisible ? 'scale-100 opacity-20' : 'scale-50 opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle, var(--color-gray) 0%, transparent 70%)'
          }}
        />
         {/* Gradient Orb 3 - Bottom */}
        <div 
          className={`absolute bottom-80 left-90 -translate-x-1/2 w-[500px] h-[500px]  rounded-full opacity-20 blur-3xl transition-all duration-1000 ${
            isVisible ? 'scale-100 opacity-20' : 'scale-50 opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle, var(--color-gray) 0%, transparent 70%)'
          }}
        />
        {/* Gradient Orb 2 - Top Right */}
        <div 
          className={`absolute top-10 -right-90 w-[500px] h-[500px] rounded-full  rounded-full opacity-20 blur-3xl transition-all duration-1000 ${
            isVisible ? 'scale-100 opacity-20' : 'scale-50 opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle, var(--color-gray) 0%, transparent 70%)'
          }}
        />
        
       

        {/* Mesh Grid Overlay */}
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

      {/* Upload Card */}
      <div className={`relative z-10 w-full max-w-md mx-4 transition-all duration-700
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
      `}>

        <div 
          className="backdrop-blur-sm h-134 bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-2xl shadow-2xl p-8"
        >
          <div className="relative py-5">
            <div className={`text-center mb-10 transition-all duration-700 delay-200
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
              `}>

              <h1 className="text-3xl cursor-default font-bold text-[var(--color-foreground)] mb-2">Upload Your Resume</h1>
              <p className="text-[var(--color-foreground)]/60 cursor-default text-sm"> Build your professional portfolio in seconds</p>
            </div>

            <div className="space-y-5 w-full flex flex-col justify-center">
              <div
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center w-full h-50 px-4 py-6 rounded-xl 
                        border-2 border-dashed cursor-pointer transition-all
                        ${dragActive ? "border-[var(--color-gray)] bg-[var(--color-background)]/40" : "border-[var(--color-border)]"}
                    `}
                    onClick={() => document.getElementById("resumeUpload").click()}
                    >
                   <div
                    key={resume ? "uploaded" : "empty"}
                    className={`transition-all duration-300 transform
                                ${resume ? "opacity-100 scale-100" : "opacity-70 scale-90"}`}
                    >
                    {resume ? (
                        <CloudDoneIcon className="text-[var(--color-foreground)]/70" style={{ fontSize: "70px" }} />
                    ) : (
                        <BackupIcon className="text-[var(--color-foreground)]/70" style={{ fontSize: "70px" }} />
                    )}
                    </div>

                    <span className="text-[var(--color-foreground)]/60 mt-2">
                        {resume ? resume.name : "Drag & Drop resume here or Click to upload"}
                    </span>

                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="resumeUpload"
                    />
                    </div>

                  <div className="w-full flex justify-center mt-4">
                    <Button
                        className="w-full h-12 text-base font-medium cursor-pointer rounded-xl"
                        onClick={() => {
                        if (!resume) {
                            alert("Upload a resume first.")
                            return
                        }
                        handlesubmit()
                        console.log("Uploaded resume:", resume)
                        }}
                    >
                        Submit Resume
                    </Button>
                    </div>
 
                
                 <label
                    className="flex flex-col items-center justify-between w-full h-auto px-4 py-3 rounded-xl bg-[var(--color-background)] 
                             text-[var(--color-foreground)] cursor-default
                            "
                >
                    <span className="text-[var(--color-foreground)]/60 flex items-center justify-center gap-2">
                    <ShieldIcon/>Your resume is Secure & Private.
                    </span>
                </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadResume;