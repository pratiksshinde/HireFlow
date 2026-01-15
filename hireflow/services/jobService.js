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
      error: error.message
    };
  }
};

export const createApplication = async (companyName , jobRole , jobDescription , sentMailto , mailSubject , mailBody , sentResumeId) =>{
  try {
    const response = await axiosInstance.post("/",{
      companyName , jobRole , jobDescription , sentMailto , mailSubject , mailBody , sentResumeId
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