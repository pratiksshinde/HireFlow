import axiosInstance from "../lib/axiosInstance"

export const getJobsList =  async(page)=>{
    try {
        const response = await axiosInstance.get(`/jobs/suggestedJobs/list/${page}`);
        console.log(response);
        return response.data.jobs;
    } catch (error) {
        console.log("issue :",error);
        return {success:false , error};
    }
}
export const getJobMail = async (jobDetails) => {
  try {
    const response = await axiosInstance.post('/jobs/coldMail', {
      title: jobDetails.title,
      companyName: jobDetails.companyName,
      location: jobDetails.location
    });
    
    return {
      success: true,
      response: response
    };
  } catch (error) {
    console.error('Error getting job mail:', error);
    return {
      success: false,
      status: error.response?.status,
      error: error.message
    };
  }
};

export const createApplication = async (companyName , jobRole , jobDescription ) =>{
  try {
    const response = await axiosInstance.post("/jobs/createApplication",{
      companyName , jobRole , jobDescription 
    })
    return {
      success: true,
      response:response
    }
  } catch (error) {
    console.error('Error getting job mail:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export const getAllApplications = async (page,limit) =>{
  try {
    const response = await axiosInstance.get(`/jobs/getApplications/${page}/${limit}`);
    console.log("Applications response:", response);
    return {
      success: true,
      response:response
    }
  } catch (error) {
    console.error('Error getting job mail:', error);
    return {
      success: false,
      error: error.message
    };
  }
} 

export const deleteApplication = async (applicationId) => {
  try {
    const response = await axiosInstance.delete(`/jobs/deleteApplication/${applicationId}`);
    console.log("Delete application response:", response);  
    return {
      success: true,
      response: response.data
    };
  } catch (error) {
    console.error('Error deleting application:', error);
    return {
      success: false,
      error: error.message
    };
  }
};