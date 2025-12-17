import axiosInstance from "../lib/axiosInstance"


export const deleteSingleSkill = async(skillId)=>{
    try {
        const response = await axiosInstance.delete(`/resume/editResume/deleteskill/${skillId}`);
        return { success: true, message: response.data.message };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Failed to delete skill." }; 
    }
}

export const deleteSingleExperience = async(experienceId)=>{
    try {
        const response = await axiosInstance.delete(`/resume/editResume/deleteExperience/${experienceId}`);
        return { success: true, message: response.data.message };   
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Failed to delete experience." };    

    }
}

export const deleteSingleEducation = async(educationId)=>{
    try {
        const response = await axiosInstance.delete(`/resume/editResume/deleteEducation/${educationId}`);
        return { success: true, message: response.data.message };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Failed to delete education."};
    }
}

export const addSingleEducation = async(institutionName,degree,course,score,startDate,endDate,description)=>{
    try {
        const response = await axiosInstance.post("/resume/editResume/addEducation",{institutionName,degree,course,score,startDate,endDate,description});
        return {success: true , message: response.data.message};
    } catch (error) {
        return {success: false, message: error.data.message};
    }
}

export const deleteSingleProject = async(projectId)=>{
    try {
         const response = await axiosInstance.delete(`/resume/editResume/deleteProject/${projectId}`);
         return { success: true, message: response.data.message };
    }
    catch (error) {
        return { success: false, message: error.response?.data?.message || "Failed to delete project." };
    }
}

export const addSingleProject = async(projectName,description,link)=>{
    try {
         console.log({ projectName, description, link }, typeof projectName);
        const response = await axiosInstance.post('resume/editResume/addProject' ,{projectName,description,link});
        console.log(response);
        return { success: true, message:response.data.message ,response}
    } catch (error) {
        console.log(error);
        return {success: false, message: error.response?.data?.message}
    }
}

export const addSkillset = async(skills, category, proficiency)=>{
    try {
        const response = await axiosInstance.post('/resume/editResume/addSkill', {skills, category, proficiency});
        return {success: true, message: response.data.message};
    } catch (error) {
        return { success: false, message: error.response?.data?.message}
    }
}

export const addSingleCertification = async (certificationName, issuingOrganization, issueDate)=>{
    try {
        const response = await axiosInstance.post('/resume/editResume/addCertification',{certificationName, issuingOrganization, issueDate});
        return {success:true , message: response.data.message};
    } catch (error) {
        return {success:false, message: error.data.message};
    }
}
export const deleteSingleCertification = async (certificationId) => {
  try {
    const response = await axiosInstance.delete(
      `/resume/editResume/deleteCertification/${certificationId}`
    );

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error.response?.data?.message || "Delete failed",
    };
  }
};

export const deleteSingleArchivement = async (archivementId)=>{
    try {
        const response = await axiosInstance.delete(`/resume/editResume/deleteArchivement/${archivementId}`);
        return {success:true ,message:response.data.message};
    } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error.response?.data?.message || "Delete failed",
    };
  }
}

export const addSingleArchivement = async (achivement,description)=>{
    try {
        const response = await axiosInstance.post("/resume/editResume/addArchivement",{achivement,description});
        return {success:true ,message:response.data.message};
    } catch (error) {
         return {
      success: false,
      message: error.response?.data?.message,
    };
    }
}
