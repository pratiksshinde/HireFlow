"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import axiosInstance from '../../lib/axiosInstance';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/common/navbar';

const plans = [
  { name: "Student", price: "₹99 / mo" ,cost:99},
  { name: "Fresher", price: "₹199 / mo",cost:199 },
  { name: "Experienced", price: "₹499 / mo",cost:499 },
];

function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [isVisible, setIsVisible] = useState(false);
  const route = useRouter();

    // const [responseId , setResponseId] = useState("");
    // const [responseStatus , setResponseStatus] = useState([]);

    const loadscript =()=>{
        return new Promise((resolve)=>{
            const script = document.createElement("script");

            script.src="https://checkout.razorpay.com/v1/checkout.js";
            script.onload =()=>{
                resolve(true);
            }
            script.onerror =()=>{
                resolve(false);
            }
            document.body.appendChild(script);
        })
    }

    const handlepayment = async()=>{
        const res = await loadscript();
        if(!res){
            toast("Razorpay SDK failed to load. Are you online?");
            return;
        }
        const amount = selectedPlan.cost;
        const orderRes = await axiosInstance.post("/auth/payment" , {plan:selectedPlan.name , currency:"INR"});

        const {order} = orderRes.data;

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "HireFlow",
            description: "Subscription Payment",
            order_id: order.id,
            handler: async function(response){
                const razorpay_payment_id = response.razorpay_payment_id;
                const razorpay_order_id = response.razorpay_order_id;
                const razorpay_signature = response.razorpay_signature;

                const verifyRes = await axiosInstance.post("/auth/verify_payment" , {
                    razorpay_order_id, razorpay_payment_id,razorpay_signature
                });

                if(verifyRes.status===200){
                    toast.success("Payment Successful!");
                    route.push("/jobs");
                }
                else{
                    toast.error("Payment verification failed. Please contact support.");
                }
                console.log(verifyRes);
            },
            prefill: {
                name: "Test User",
                email: "test@gmail.com",
            },
            theme: {
                color: "#8d6b1f"
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();   
    }

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center items-center relative overflow-hidden bg-[var(--color-background)]">
        
      {/* Background Orbs & Mesh */}
      <div className="absolute inset-0 overflow-hidden">
        {["-top-20 -left-20","-top-20 -right-20","-bottom-20 left-1/2 -translate-x-1/2"].map(pos => (
          <div
            key={pos}
            className={`absolute ${pos} w-[500px] h-[500px] rounded-full opacity-20 blur-3xl`}
            style={{ background: 'radial-gradient(circle, var(--color-gray) 0%, transparent 70%)' }}
          />
        ))}
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
        <Navbar/>
      {/* Subscription Card */}
      <div className={`relative z-10 w-full max-w-md mx-4 transition-all duration-700
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
      `}>
        <div className="backdrop-blur-sm bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8 transition-all duration-700 delay-200">
            <h1 className="text-3xl cursor-default font-bold text-[var(--color-foreground)] mb-2">
              Choose Your Plan
            </h1>
            <p className="text-[var(--color-foreground)]/60 cursor-default text-sm">
              Generate tailored job applications and track them automatically.
            </p>
          </div>

          {/* Plan Selection */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--color-foreground)] block mb-2">
                Who are you?
              </label>
              <div className="flex gap-3">
                {plans.map((plan) => {
                  const isSelected = selectedPlan.name === plan.name;
                  return (
                    <button
                      key={plan.name}
                      onClick={() => setSelectedPlan(plan)}
                      className={`
                        w-full px-4 py-3 rounded-xl cursor-pointer border font-medium transition-all
                        ${isSelected
                          ? "bg-gray-700 border-gray-600"
                          : "bg-[var(--color-background)] border-[var(--color-border)] hover:border-yellow-400"
                        }
                      `}
                    >
                      <span className={`text-lg font-bold ${
                        isSelected
                          ? "bg-clip-text text-transparent"
                          : "text-[var(--color-foreground)]"
                      }`}
                        style={isSelected ? { backgroundImage: 'linear-gradient(135deg,#3a2a00 0%,#8d6b1f 15%,#f5d27a 35%,#fff1b8 50%,#f5d27a 65%,#8d6b1f 85%,#3a2a00 100%)', WebkitBackgroundClip: 'text', color: 'transparent' } : {}}
                      >
                        {plan.name}
                      </span>
                      {isSelected && (
                        <p className="text-sm text-white mt-1">{plan.price}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Proceed Button */}
              <button
                className="
                  w-full mt-4 px-4 py-3 rounded-xl font-medium cursor-pointer
                  bg-[linear-gradient(135deg,#3a2a00_0%,#8d6b1f_15%,#f5d27a_35%,#fff1b8_50%,#f5d27a_65%,#8d6b1f_85%,#3a2a00_100%)]
                  border border-[#a67c00]
                  shadow-[inset_0_1px_2px_rgba(255,255,255,0.45),inset_0_-2px_3px_rgba(0,0,0,0.35),0_6px_14px_rgba(0,0,0,0.35)]
                  text-[#2b1b00]
                  hover:brightness-110 transition-all
                "
                onClick={()=>{handlepayment()}}
              >
                Proceed to Payment
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
