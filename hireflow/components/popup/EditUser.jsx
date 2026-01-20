
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { addSingleArchivement, editProfile } from '../../services/editPortfolioService';
import { getProfileData } from '../../services/portfolioService';
import { toast } from 'sonner';


function EditUser({onClose}) {
  const [name , setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [summary, setSummary] = useState("");
  const [data,setData]= useState("");


  useEffect(() => {
    getProfile();
  }, [])
  
  const getProfile = async ()=>{
    try {
      const data = await getProfileData();
      setData(data);
      setName(data.profiledata?.resumeData?.fullname);
      setEmail(data.profiledata?.resumeData?.email);
      setPhone(data.profiledata?.resumeData?.phone);
      setAddress(data.profiledata?.resumeData?.address);
      setSummary(data.profiledata?.resumeData?.summary);
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

  const updateProfile = async ()=>{
    try{
      const response = await editProfile(name,email,phone,address,summary);
      if(response.success){
        toast.success("Profile Updated.");
        onClose();
      }
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div >
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-50 flex flex-col items-center justify-center z-50">
      <span onClick={()=>onClose()} className='top-5 rounded-full bg-white/10 px-2 py-2 m-3 border backdrop-blur-lg border-white/10 bg-opacity-50'><CloseIcon/></span>
       <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-6 w-175 shadow-xl">
         <h2 className="text-2xl font-semibold  mb-4">Edit Profile</h2>
            <form onSubmit={(e)=>{
              e.preventDefault();
              updateProfile();
            }}>

            <div className='flex gap-5'>
                <div className='w-[50%]'>
             <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="categoryName">
                Full Name
                </label>
                <input
                type="text"
                
                id="fullname"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${name===data.profiledata?.resumeData?.fullname ? "text-gray-300" : "" }`}
                placeholder="Enter Name"
                />
            </div>
            <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="skillName">
                Email
                </label>
                <input
                type="email"
                id="email"
                
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className={`shadow appearance-none border rounded w-full  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${email===data.profiledata?.resumeData?.email ? "text-gray-300" : ""}`}
                placeholder="e.g. pratik@gmail.com"
                />
            </div>
            <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="skillName">
                Phone
                </label>
                <input
                type="text"
                id="phone"
                
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                className={`shadow appearance-none border rounded w-full  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${phone===data.profiledata?.resumeData?.phone ? "text-gray-300" : ""}`}

                placeholder="e.g. 9876654321"
                />
            </div>
            <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="skillName">
                Address
                </label>
                <input
                type="text"
                id="address"
                
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                className={`shadow appearance-none border rounded w-full  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${address===data.profiledata?.resumeData?.address ? "text-gray-300" : ""}`}

                placeholder="e.g. Abc Building, Pune"
                />
            </div>
            </div>
            
            <div className="mb-4 w-[50%]">
                <label className="block text-sm font-bold mb-2" htmlFor="skillName">
                Summary
                </label>
                <textarea
                type="text"
                id="summary"
                
                value={summary}
                onChange={(e)=>setSummary(e.target.value)}
                className={`shadow appearance-none border rounded w-full h-54 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline  ${summary===data.profiledata?.resumeData?.summary ? "text-gray-300" : ""}`}
                placeholder="Enter profile summary"
                />
            </div>
            </div>
            <div className='flex justify-center gap-3'>
             <div className="flex ">
                <button
                type="submit"
                className="bg-green/10 backdrop-blur-sm hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
            </div>
           
            </div>
            </form> 
            </div>
        </div>
    </div>
  )
}

export default EditUser