
import React, { useState } from 'react'
import { addSkillset } from '../../services/editPortfolioService'
import CloseIcon from '@mui/icons-material/Close';

function AddSkill({onClose}) {
  const [category, setCategory] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills,setSkills] = useState([]);
  const [proficiency, setProficiency] = useState([]);
  const [proficiencyInput, setProficiencyInput] = useState("");

  const addSkillsToList = () =>{
     if (!category.trim()) {
    alert("Category is required");
    return;
  }

  if (!skillInput.trim()) {
    alert("Skill name is required");
    return;
  }

  if (!proficiencyInput) {
    alert("Select proficiency");
    return;
  }

    if(!skillInput) return;
    setSkills([...skills, skillInput]);
    setProficiency([...proficiency, proficiencyInput]);
    setSkillInput("");
    setProficiencyInput("");

  }
  
  const removeSkillsFromList = (index) =>{
    setSkills(skills.filter((_,i) => i !== index));
    setProficiency(proficiency.filter((_,j)=> j !==index));

  }

  const addSkill = async ()=>{
    try {
      if(skillInput.length>0){
        return alert("You forgot to add latest entered Skill name");
      }
      const response = await addSkillset(skills, category.toLowerCase(), proficiency);
      alert("Skill added",response);
      onClose();
    } catch (error) {
      alert("Error :",error);
    }
  }
  return (
    <div >
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-50 flex flex-col items-center justify-center z-50">
      <span onClick={()=>onClose()} className='top-5 rounded-full bg-white/10 px-2 py-2 m-3 border backdrop-blur-lg border-white/10 bg-opacity-50'><CloseIcon/></span>
       <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-6 w-96 shadow-xl">
         <h2 className="text-2xl font-semibold  mb-4">Add New Skill</h2>
            <form onSubmit={(e)=>{
              e.preventDefault();
              addSkill();
            }}>
             <div className="mb-4">

                <label className="block text-sm font-bold mb-2" htmlFor="categoryName">
                Category Name
                </label>
                <input
                type="text"
                disabled={skills.length>0}
                
                id="categoryName"
                value={category}
                onChange={(e)=>{setCategory(e.target.value)}}
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Category (e.g. Frontend )"
                />
            </div>
            <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="skillName">
                Skill Name
                </label>
                <input
                type="text"
                id="skillName"
                
                value={skillInput}
                onChange={(e)=>setSkillInput(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter skill name"
                />
            </div>
            <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="proficiency">
                Proficiency Level
                </label>
                <select
                id="proficiency"
                value={proficiencyInput}
                
                onChange={(e)=>setProficiencyInput(Number(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                >
                <option value="">Select proficiency</option>
                <option value="1">Beginner</option>
                <option value="2">Intermediate</option>
                <option value="3">Advanced</option>
                <option value="5">Expert</option>
                </select>
            </div>
            <div className="flex flex-wrap w-80 border-b mb-5 gap-1 pb-2 max-h-28 overflow-y-auto">

                {skills.map((skill,index) => (
                  <span className='px-2 py-1 bg-white/20 rounded-xl m-3 opacity-75' key={index} >{skill}<CloseIcon onClick={()=>removeSkillsFromList(index)} className='-mt-8 -mr-5' sx={{fontSize:24}}/></span>
                ))}
            </div>
            <div className='flex justify-center gap-3'>
           {skills.length>0?
             <div className="flex ">
                <button
                type="submit"
                className="bg-green/10 backdrop-blur-sm hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
            </div>
            : null} 
             <div className="">
                <button
                type="button"
                className="bg-blue/50 bg-opacity-50 backdrop-blur-sm hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={()=>addSkillsToList()}
                >
                Add Skill
                </button>
            </div>
            </div>
            </form> 
            </div>
        </div>
    </div>
  )
}

export default AddSkill