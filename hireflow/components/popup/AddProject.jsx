
import React, { useState } from 'react'
import { addSingleProject, addSkillset } from '../../services/editPortfolioService'
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'sonner';

function AddProject({onClose}) {
  const [name , setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const addProject = async ()=>{
    const response = await addSingleProject(name,description,link);
    console.log("response from popup: ",response);
    if (response.success){
        toast.success("project added");
        onClose();
    }else
        toast.error("Failed to add project");
  }

  return (
    <div >
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-50 flex flex-col items-center justify-center z-50">
      <span onClick={()=>onClose()} className='top-5 rounded-full bg-white/10 px-2 py-2 m-3 border backdrop-blur-lg border-white/10 bg-opacity-50'><CloseIcon/></span>
       <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-6 w-124 shadow-xl">
         <h2 className="text-2xl font-semibold  mb-4">Add New Project</h2>
            <form onSubmit={(e)=>{
              e.preventDefault();
              addProject();
            }}>
             <div className="mb-4">

                <label className="block text-sm font-bold mb-2" htmlFor="categoryName">
                Project Name
                </label>
                <input
                type="text"
                
                id="projectName"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Project's Name"
                />
            </div>
            <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="skillName">
                Project Description
                </label>
                <textarea
                type="text"
                id="description"
                
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full h-60 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Project's descrtiption.."
                />
            </div>
            <div className="mb-4">

                <label className="block text-sm font-bold mb-2" htmlFor="categoryName">
                Project's Link
                </label>
                <input
                type="link"
                
                id="link"
                value={link}
                onChange={(e)=>{setLink(e.target.value)}}
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Add your Link"
                />
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

export default AddProject