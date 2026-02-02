"use client";

import { useState } from "react";
import { createApplication, getJobMail } from "../services/jobService";
import Spinner from "./ui/spinner";
import { toast } from "sonner"
import { useRouter } from "next/navigation";

export default function JobCard({ job }) {
    const router = useRouter();
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
                if(result.status === 403) {
                    toast.error("You have reached your email generation limit. Please upgrade your plan to continue.");
                    router.push("/Subscription");
                    return;
                }
                else{
                    toast.error(result.message || "Failed to generate email");
                    return;
                }
               
            }

            // Access the data correctly based on your backend response
            const responseData = result.response?.data?.data || result.data;
            
            if (!responseData) {
                toast.error("Failed to find Company email!!!");
                return;
            }

            const { validEmails, genrateMail } = responseData;

            // Check if validEmails exists and has items
            if (!validEmails || !Array.isArray(validEmails) || validEmails.length === 0) {
                toast.error("No valid email found for this company");
                return;
            }

            // Check if email body was generated
            if (!genrateMail) {
                toast.error("Failed to generate email body");
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
                label: "No I Skipped",
            },
            });
        }, 3000);

        } catch (error) {
            setIsLoading(false);
            console.error("Error in ApplyViaEmail:", error);
            toast.error("An error occurred while generating the email. Please try again.");
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
                label: "No I Skipped",
            },
            });
        }, 3000);   
          }}
        >
          Apply Now
        </a>
     <a
        className="
            inline-block cursor-pointer px-4 py-2 text-sm font-medium
            text-[#2b1b00]
            bg-[linear-gradient(135deg,#3a2a00_0%,#8d6b1f_15%,#f5d27a_35%,#fff1b8_50%,#f5d27a_65%,#8d6b1f_85%,#3a2a00_100%)]
            border border-[#a67c00]
            rounded-lg
            shadow-[inset_0_1px_2px_rgba(255,255,255,0.45),inset_0_-2px_3px_rgba(0,0,0,0.35),0_6px_14px_rgba(0,0,0,0.35)]
            transition-all duration-300
            hover:brightness-110
            active:brightness-95
        "
        onClick={ApplyViaEmail}
        >
        Apply via Email
        </a>

      </div>
     
    </div>
  );
}
