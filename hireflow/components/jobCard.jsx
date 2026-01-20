"use client";

import { useState } from "react";
import { createApplication, getJobMail } from "../services/jobService";
import Spinner from "./ui/spinner";
import { toast } from "sonner"

export default function JobCard({ job }) {
    const [isLoading, setIsLoading] = useState(false);

    const jobDetails = {
        title: job.title,
        companyName: job.company,
        location: job.location
    };

    const ApplyViaEmail = async () => {
        console.log("trying email system...");
        setIsLoading(true);
        
        try {
            const result = await getJobMail(jobDetails);
            setIsLoading(false);
            console.log("Full result:", result);

            // Check if the request was successful
            if (!result.success) {
                alert(result.message || "Failed to generate email");
                return;
            }

            // Access the data correctly based on your backend response
            const responseData = result.response?.data?.data || result.data;
            
            if (!responseData) {
                alert("No response data received");
                return;
            }

            const { validEmails, genrateMail } = responseData;

            // Check if validEmails exists and has items
            if (!validEmails || !Array.isArray(validEmails) || validEmails.length === 0) {
                alert("No valid email found for this company");
                return;
            }

            // Check if email body was generated
            if (!genrateMail) {
                alert("Failed to generate email body");
                return;
            }

            const to = validEmails[0].email;
            const subject = `Application for ${job.title} role`;
            
            // Better formatting that preserves structure
            const formattedBody = genrateMail
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .join('\r\n\r\n');  // Add double line breaks between paragraphs

            const mailtoLink =
                `mailto:${to}` +
                `?subject=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(formattedBody)}`;

            window.location.href = mailtoLink;
            setTimeout(() => { 
            toast("Did you apply for this job?", {
                duration:Infinity,
            action: {
                label: "Yes",
                onClick: async () => await createApplication(jobDetails.companyName , jobDetails.title , job.description ),
            },
            cancel: {
                label: "No",
            },
            });
        }, 3000);

        } catch (error) {
            setIsLoading(false);
            console.error("Error in ApplyViaEmail:", error);
            alert("An error occurred while generating the email. Please try again.");
        }
    };

    return (
        <div className="relative w-full max-w-xl border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition">
            {/* Loading Spinner Overlay */}
            {isLoading && (
                <div className="absolute inset-0 bg-white/70 rounded-xl flex items-center justify-center z-10">
                    <Spinner className="h-14 w-14 text-gray-700" />
                </div>
            )}

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-900">
                {job.title}
            </h2>

            {/* Company */}
            <p className="text-sm text-gray-600 mt-1">
                {job.company}
            </p>

            {/* Location */}
            <p className="text-sm text-gray-500 mt-1">
                {job.location}
            </p>

            {/* Description */}
            <p className="text-sm text-gray-700 mt-3 line-clamp-4">
                {job.description}
            </p>
            
      {/* Apply Button */}
      <div className="mt-4 flex justify-between ">
        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block cursor-pointer px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800"
          onClick={(e) => {
            setTimeout(() => { 
            toast("Did you apply for this job?", {
                duration:Infinity,
            action: {
                label: "Yes",
                onClick: async () => await createApplication( jobDetails.companyName , jobDetails.title , job.description ),
            },
            cancel: {
                label: "No",
            },
            });
        }, 3000);   
          }}
        >
          Apply Now
        </a>
      <a
          className="inline-block cursor-pointer px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800"
          onClick={ () => {
            ApplyViaEmail();
        }}
        >
        Apply via Email
      
        </a>
      </div>
     
    </div>
  );
}
