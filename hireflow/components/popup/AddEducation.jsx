
import React, { useState } from 'react'
// import { addSingleEducation, addSkillset } from '../../services/editPortfolioService'
import CloseIcon from '@mui/icons-material/Close';
import { addSingleEducation } from '../../services/editPortfolioService';
import { toast } from 'sonner';

function AddEducation({onClose}) {
  const [institutionName,setInstitutionName] = useState("");
  const [degree, setDegree] = useState("");
  const [course, setCourse] = useState("");
  const [score, setScore] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");


  const addEducation = async ()=>{
    const response = await addSingleEducation(institutionName,degree,course,score,startDate,endDate,description);
    console.log("response from popup: ",response);
    if (score){
        toast.success("Education added");
        onClose();
    }else
        toast.error("Failed to add Education");
  }

  return (
    <div >
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-50 flex flex-col items-center justify-center z-50">
      <span onClick={()=>onClose()} className='top-5 rounded-full bg-white/10 px-2 py-2 m-3 border backdrop-blur-lg border-white/10 bg-opacity-50'><CloseIcon/></span>
       <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-6 w-224 shadow-xl">
         <h2 className="text-2xl font-semibold  mb-4">Add New Education</h2>
            <form onSubmit={(e)=>{
              e.preventDefault();
              addEducation();
            }}>
                <div className='flex gap-10'>
                <div className='w-100'>
             <div className="mb-4">

                <label className="block text-sm font-bold mb-2" htmlFor="categoryName">
                Institution Name
                </label>
                <input
                type="text"
                
                id="InstitutionName"
                value={institutionName}
                onChange={(e)=>{setInstitutionName(e.target.value)}}
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Education's Name"
                />
            </div>
             <div className="mb-4">

                <label className="block text-sm font-bold mb-2" htmlFor="categoryName">
                Degree
                </label>
                <input
                type="text"
                
                id="DegreeName"
                value={degree}
                onChange={(e)=>{setDegree(e.target.value)}}
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="e.g. Btech, BE,..."
                />
            </div>
             <div className="mb-4">

                <label className="block text-sm font-bold mb-2" htmlFor="categoryName">
                Field of Study
                </label>
                <input
                type="text"
                
                id="course"
                value={course}
                onChange={(e)=>{setCourse(e.target.value)}}
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="e.g. Computer Science, Electronics,..."
                />
            </div>
             <div className="mb-4">

                <label className="block text-sm font-bold mb-2" htmlFor="categoryName">
                Score
                </label>
                <input
                type="text"
                
                id="score"
                value={score}
                onChange={(e)=>{setScore(e.target.value)}}
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="e.g. 76.80%, 8CGPA,..."
                />
            </div>
            </div>
            <div>
                <div className='flex gap-3 items-center mb-4'>
             <div className="w-50">

                <label className="block text-sm font-bold mb-2" htmlFor="categoryName">
                Start Date
                </label>
                <input
                type="date"
                
                id="startdate"
                value={startDate}
                onChange={(e)=>{setStartDate(e.target.value)}}
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Start Date"
                />
                 </div>
                 <div className='w-50'>
                 <label className="block text-sm font-bold mb-2" htmlFor="categoryName">
                End Date
                </label>
                <input
                type="date"
                
                id="enddate"
                value={endDate}
                onChange={(e)=>{setEndDate(e.target.value)}}
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Start Date"
                />
            </div>
            </div>
            <div className="mb-4">
                <label className="  text-sm font-bold mb-2" htmlFor="skillName">
                 Add Description 
                </label>
                <textarea
                type="text"
                id="description"
                
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full h-60 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter descrtiption (Optional)..."
                />
            </div>
            </div>
           
            </div>
            <div className='flex justify-center gap-3'>
             <div className="flex w-90 border-b border-white/20 rounded-lg">
                <button
                type="submit"
                className="bg-green/10 backdrop-blur-sm w-full hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

export default AddEducation