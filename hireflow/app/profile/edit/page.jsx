"use client";

import React, { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { getPortfolio } from "../../../services/portfolioService";
import { FormatDate } from "../../../utils/formatdates";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { useRouter } from "next/navigation";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { deleteSingleExperience, deleteSingleSkill, deleteSingleEducation, deleteSingleProject, deleteSingleCertification, deleteSingleArchivement } from "../../../services/editPortfolioService";
import AddSkill from "../../../components/popup/AddSkill.jsx";
import AddProject from "../../../components/popup/AddProject.jsx";
import AddEducation from "../../../components/popup/AddEducation.jsx";
import AddCertification from "../../../components/popup/AddCertification.jsx";
import AddArchivement from "../../../components/popup/AddArchivement.jsx";
import EditUser from "../../../components/popup/EditUser.jsx";
import Navbar from "../../../components/common/navbar.jsx";
import { toast } from "sonner";



export default function EditProfile() {

  // const params = useParams();  
  // const username = localStorage.getItem("username");
  const [Data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [addSkill, setAddSkill] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [addEducation, setAddEducation] = useState(false);
  const [addcertification, setAddCertification] = useState(false);
  const [addArchivement, setAddArchivement] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) return;
    const fetchData = async () => {
      const PortfolioData = await getPortfolio(username);
      setData(PortfolioData);
      console.log(PortfolioData);
    };
    fetchData();
  }, [addSkill , addProject , addArchivement,addEducation,addcertification, openEditUser]);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  if (!Data) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center bg-[var(--color-background)]">
        <div className="text-[var(--color-foreground)] text-xl">Loading...</div>
      </div>
    );
  }

  const deleteSkill = async (skillId) => {
    try {
      console.log("Deleting skill with ID:", skillId);
      const response = await deleteSingleSkill(skillId);
      if (response.success) {
        setData(prev => ({
          ...prev,
          portfolio: {
            ...prev.portfolio,
            skills: prev.portfolio.skills.filter(
              skill => skill.id !== skillId
            )
          }
        }));
      }
    } catch (error) {
      
    }
  };

 const deleteExperience = async (experienceId) => {
    try {
      console.log("Deleting experience with ID:", experienceId);
      const response = await deleteSingleExperience(experienceId);
      if (response.success) {
        setData(prev => ({
          ...prev,
          portfolio: {
            ...prev.portfolio,
            experiences: prev.portfolio.experiences.filter(
              exp => exp.id !== experienceId
            )
          }
        }));
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast.error("Failed to delete experience. Please try again.");
    }
  };

  const deleteEducation = async (educationId) => {
    try {
      console.log("Deleting education with ID:", educationId);
      const response = await deleteSingleEducation(educationId);
      if (response.success) {
        setData(prev => ({
          ...prev,
          portfolio: {
            ...prev.portfolio,
            educations: prev.portfolio.educations.filter(
              edu => edu.id !== educationId
            )
          }
        }));
      }
    } catch (error) {
      console.error("Error deleting education:", error);
      toast.error("Failed to delete education. Please try again.");
    }
  };

  const deleteProject = async (projectId) => {
    try {
      console.log("Deleting project with ID:", projectId);
      const response = await deleteSingleProject(projectId);
      if (response.success) {
        setData(prev => ({
          ...prev,
          portfolio: {
            ...prev.portfolio,
            projects: prev.portfolio.projects.filter(
              project => project.id !== projectId
            )
          }
        }));
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project. Please try again.");
    }
  };

 const deleteCertificate = async (certificationId) => {
  try {
    console.log("certification id : ", certificationId);
    const response = await deleteSingleCertification(certificationId);
    console.log("response :",response);
    if (response.success) {
      toast.success("deleted certificate");
      setData(prev => ({
        ...prev,
        portfolio: {
          ...prev.portfolio,
          certifications: prev.portfolio.certifications.filter(
            cert => cert.id !== certificationId
          )
        }
      }));
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteArchivement = async (archivementId) => {
  try {
    const response = await deleteSingleArchivement(archivementId);

    if (response.success) {
      setData(prev => ({
        ...prev,
        portfolio: {
          ...prev.portfolio,
          achievements: prev.portfolio.achievements.filter(
            a => a.id !== archivementId
          )
        }
      }));
    }
  } catch (error) {
    console.log(error);
  }
};



  const portfolio = Data.portfolio;
  const resume = portfolio.resume;

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[var(--color-background)]">
      
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-gray) 0%, transparent 70%)'
          }}
        />
        
        <div 
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-gray) 0%, transparent 70%)'
          }}
        />
        
        <div 
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-gray) 0%, transparent 70%)'
          }}
        />

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
           <Navbar userId="5" className="z-9999"/>
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <div className="backdrop-blur-sm bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-2xl shadow-2xl p-8 mb-6">
            <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-[var(--color-foreground)] mb-2">{resume.fullname}</h1>
            <EditSquareIcon onClick={()=>{setOpenEditUser(true)}} className="ml-2 text-blue-300 hover:text-blue-700 transition-all duration-200 cursor-pointer mt-1"/>    
            </div>
            <div className="flex flex-wrap gap-4 text-[var(--color-foreground)]/70 text-sm mb-4">
              {resume.email && <span>📧 {resume.email}</span>}
              {resume.phone && <span>📱 {resume.phone}</span>}
              {resume.address && <span>📍 {resume.address}</span>}
            </div>
            {resume.summary && (
              <p className="text-[var(--color-foreground)]/80 leading-relaxed">{resume.summary}</p>
            )}
          </div>
        </div>


        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <div className={`transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <div className="backdrop-blur-sm bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-2xl shadow-2xl p-8 mb-6">
              <span className="flex gap-3">
              <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Skills</h2>
              <AddIcon onClick={()=>{setAddSkill(true)}} className="text-green-300  hover:text-green-700 hover:border-green-700 p-1 border border-green-300 rounded-full transition-all duration-200 cursor-pointer mt-1"/>
              </span>

              {['technical', 'frameworks', 'databases', 'tools'].map((category) => {
                const categorySkills = portfolio.skills.filter(s => s.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category} className="mb-4">
                    {/* <span className="flex gap-3"> */}
                    <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-3 capitalize">{category}</h3>
                    {/* <DeleteOutlineIcon  className="text-red-300 hover:text-red-700 transition-all duration-200 cursor-pointer"/> */}
                    {/* </span> */}
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <span 
                          key={skill.id}
                          className="px-4 py-2 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-foreground)] text-sm transition-all"
                        >
                          {skill.skill} <span onClick={()=>{deleteSkill(skill.id)}} className="absolute cursor-pointer rounded-full border border-[var(--color-border)] px-1 -mr-5 -mt-5 hover:border-red-700 transition-all"><CloseIcon sx={{ fontSize: 13 }} className="text-red-300 font-[5px] hover:text-red-700 transition-all duration-200 cursor-pointer"/></span>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Experience Section */}
        {portfolio.experiences && portfolio.experiences.length > 0 && (
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <div className="backdrop-blur-sm bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-2xl shadow-2xl p-8 mb-6">
              <span className="flex gap-3">
              <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Experience</h2>
              <AddIcon className="text-green-300  hover:text-green-700 hover:border-green-700 p-1 border border-green-300 rounded-full transition-all duration-200 cursor-pointer mt-1"/>
              </span>

              {portfolio.experiences.map((exp) => (
                <div key={exp.id} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-1">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--color-foreground)]">{exp.jobTitle}</h3>
                      <p className="text-[var(--color-gray)] font-medium">{exp.company}</p>
                    </div>
                    {/* <EditSquareIcon className="ml-2 text-blue-300 hover:text-blue-700 transition-all duration-200 cursor-pointer mt-1"/> */}
                    <DeleteOutlineIcon onClick={()=> deleteExperience(exp.id)} className="text-red-300 hover:text-red-700 transition-all duration-200 cursor-pointer mt-1"/>
                    </div>

                    <div className="text-right text-[var(--color-foreground)]/60 text-sm">
                      {exp.startDate && <div>{FormatDate(exp.startDate)} - {exp.endDate ? FormatDate(exp.endDate) : 'Present'}</div>}
                      {exp.location && <div>{exp.location}</div>}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-[var(--color-foreground)]/80 mt-2 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <div className="backdrop-blur-sm bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-2xl shadow-2xl p-8 mb-6">
              <span className="flex gap-3">
              <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Projects</h2>
              <AddIcon onClick={()=>setAddProject(true)} className="text-green-300  hover:text-green-700 hover:border-green-700 p-1 border border-green-300 rounded-full transition-all duration-200 cursor-pointer mt-1"/>
              </span>
              <div className="grid gap-6">
                {portfolio.projects.map((project) => (
                  <div key={project.id} className="p-6 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-gray)]/50 transition-all">
                    <div className="flex items-start  gap-1">
                    <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">{project.projectName}</h3>
                      <span className="flex gap-1">
                      {/* <EditSquareIcon className="ml-2 text-blue-300 hover:text-blue-700 transition-all duration-200 cursor-pointer mt-1"/> */}
                    <DeleteOutlineIcon onClick={()=>{deleteProject(project.id)}} className="text-red-300 hover:text-red-700 transition-all duration-200 cursor-pointer mt-1"/>
                    </span>
                    </div>
                    <p className="text-[var(--color-foreground)]/80 leading-relaxed mb-3">{project.description}</p>
                    {project.technologies && (
                      <p className="text-sm text-[var(--color-foreground)]/60 mb-3">
                        <span className="font-medium">Technologies:</span> {project.technologies}
                      </p>
                    )}
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[var(--color-gray)] hover:text-[var(--color-gray)]/80 transition-colors text-sm font-medium"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>


        {/* Education Section */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <div className="backdrop-blur-sm bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-2xl shadow-2xl p-8 mb-6">
              <span className="flex gap-3">
              <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Education</h2>
              <AddIcon onClick={()=>{setAddEducation(true)}} className="text-green-300  hover:text-green-700 hover:border-green-700 p-1 border border-green-300 rounded-full transition-all duration-200 cursor-pointer mt-1"/>
              </span>
              {portfolio.educations.map((edu) => (
                <div key={edu.id} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="">
                    <div className="flex gap-3 items-center">
                      <h3 className="text-xl font-semibold text-[var(--color-foreground)]">{edu.degree}</h3>
                        <span className="flex gap-1">
                        {/* <EditSquareIcon className="ml-2 text-blue-300 hover:text-blue-700 transition-all duration-200 cursor-pointer mt-1"/> */}
                        <DeleteOutlineIcon onClick={() => deleteEducation(edu.id)} className="text-red-300 hover:text-red-700 transition-all duration-200 cursor-pointer mt-1"/>
                        </span>
                    </div>
                      {edu.fieldOfStudy && (
                        <p className="text-[var(--color-gray)] font-medium">{edu.fieldOfStudy}</p>
                      )}
                      <p className="text-[var(--color-foreground)]/70">{edu.institution}</p>
                    </div>
                    <div className="text-right text-[var(--color-foreground)]/60 text-sm">
                      {edu.startDate && <div>{FormatDate(edu.startDate)} - {edu.endDate ? FormatDate(edu.endDate) : 'Present'}</div>}
                      {edu.score && <div>{edu.score}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


        {/* Certifications Section */}
          <div className={`transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <div className="backdrop-blur-sm bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-2xl shadow-2xl p-8 mb-6">
              <span className="flex gap-3">
              <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Certifications</h2>
               <AddIcon onClick={()=>{setAddCertification(true)}} className="text-green-300  hover:text-green-700 hover:border-green-700 p-1 border border-green-300 rounded-full transition-all duration-200 cursor-pointer mt-1"/>
              </span>

              <div className="grid gap-4">
                {portfolio.certifications.map((cert) => (
                  <div key={cert.id} className="p-4 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
                   <span className="absolute right-14 gap-1">
                        {/* <EditSquareIcon className="ml-2 text-blue-300 hover:text-blue-700 transition-all duration-200 cursor-pointer mt-1"/> */}
                        <DeleteOutlineIcon onClick={() => {deleteCertificate(cert.id)}} className="text-red-300 hover:text-red-700 transition-all duration-200 cursor-pointer mt-1"/>
                        </span>
                    <h3 className="text-lg font-semibold text-[var(--color-foreground)]">{cert.certificationName}</h3>
                    {cert.issuingOrganization && (
                      <p className="text-[var(--color-foreground)]/70 text-sm">{cert.issuingOrganization}</p>
                    )}
                    {cert.issueDate && (
                      <p className="text-[var(--color-foreground)]/60 text-sm mt-1">{FormatDate(cert.issueDate)}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        {/* Achievements Section */}
          <div className={`transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <div className="backdrop-blur-sm bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-2xl shadow-2xl p-8">
              <span className="flex gap-3">
              <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Achievements</h2>
              <AddIcon onClick={()=>{setAddArchivement(true)}} className="text-green-300  hover:text-green-700 hover:border-green-700 p-1 border border-green-300 rounded-full transition-all duration-200 cursor-pointer mt-1"/>
              </span>

              <div className="space-y-3">
                {portfolio.achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start gap-3">
                    <span className="text-[var(--color-gray)] mt-1">🏆</span>
                    <span className="absolute right-14 gap-1">
                        {/* <EditSquareIcon className="ml-2 text-blue-300 hover:text-blue-700 transition-all duration-200 cursor-pointer mt-1"/> */}
                        <DeleteOutlineIcon onClick={() => {deleteArchivement(achievement.id)}} className="text-red-300 hover:text-red-700 transition-all duration-200 cursor-pointer mt-1"/>
                        </span>
                    <p className="font-bold text-[var(--color-foreground)]/80">{achievement.achivement}</p>
                    <p className="text-[var(--color-foreground)]/80">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>
      {addSkill && <AddSkill onClose={() => setAddSkill(false)} />}
      {addProject && <AddProject onClose={() => setAddProject(false)} />}
      {addEducation && <AddEducation onClose={() => setAddEducation(false)} />}
      {addcertification && <AddCertification onClose={() => setAddCertification(false)} />}
      {addArchivement && <AddArchivement onClose={() => setAddArchivement(false)} />}
      {openEditUser && <EditUser onClose={() => setOpenEditUser(false)} />}

    </div>
  );
}