"use client";

import React, { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { getPortfolio } from "../../../services/portfolioService";
import { FormatDate } from "../../../utils/formatdates";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/common/navbar";

export default function Portfolio() {
  const params = useParams();  
  const { username } = params;
  const [Data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setLoggedInUserId(userId);
    if (!username) return; 
    const fetchData = async () => {
      const PortfolioData = await getPortfolio(username);
      setData(PortfolioData);
      console.log(PortfolioData);
    };
    fetchData();
  }, [username]);

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

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
         <Navbar userId="5"/>
        {/* Header Section */}
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <div className="backdrop-blur-sm bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-2xl shadow-2xl p-8 mb-6">
            <h1 className="text-4xl font-bold text-[var(--color-foreground)] mb-2">{resume.fullname}</h1>
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
              <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Skills</h2>
              
              {['technical', 'frameworks', 'databases', 'tools'].map((category) => {
                const categorySkills = portfolio.skills.filter(s => s.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category} className="mb-4">
                    <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-3 capitalize">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <span 
                          key={skill.id}
                          className="px-4 py-2 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-foreground)] text-sm hover:border-[var(--color-gray)]/50 transition-all"
                        >
                          {skill.skill}
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
              <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Experience</h2>
              
              {portfolio.experiences.map((exp) => (
                <div key={exp.id} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--color-foreground)]">{exp.jobTitle}</h3>
                      <p className="text-[var(--color-gray)] font-medium">{exp.company}</p>
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
        {portfolio.projects && portfolio.projects.length > 0 && (
          <div className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <div className="backdrop-blur-sm bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-2xl shadow-2xl p-8 mb-6">
              <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Projects</h2>
              
              <div className="grid gap-6">
                {portfolio.projects.map((project) => (
                  <div key={project.id} className="p-6 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-gray)]/50 transition-all">
                    <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">{project.projectName}</h3>
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
        )}

        {/* Education Section */}
        {portfolio.educations && portfolio.educations.length > 0 && (
          <div className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <div className="backdrop-blur-sm bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-2xl shadow-2xl p-8 mb-6">
              <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Education</h2>
              
              {portfolio.educations.map((edu) => (
                <div key={edu.id} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--color-foreground)]">{edu.degree}</h3>
                      {edu.fieldOfStudy && (
                        <p className="text-[var(--color-gray)] font-medium">{edu.fieldOfStudy}</p>
                      )}
                      <p className="text-[var(--color-foreground)]/70">{edu.institution}</p>
                    </div>
                    <div className="text-right text-[var(--color-foreground)]/60 text-sm">
                      {edu.startDate && <div>{FormatDate(edu.startDate)} - {edu.endDate ? FormatDate(edu.endDate) : 'Present'}</div>}
                      {edu.grade && <div>Grade: {edu.grade}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {portfolio.certifications && portfolio.certifications.length > 0 && (
          <div className={`transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <div className="backdrop-blur-sm bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-2xl shadow-2xl p-8 mb-6">
              <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Certifications</h2>
              
              <div className="grid gap-4">
                {portfolio.certifications.map((cert) => (
                  <div key={cert.id} className="p-4 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
                    <h3 className="text-lg font-semibold text-[var(--color-foreground)]">{cert.certificationName}</h3>
                    {cert.issuer && (
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
        )}

        {/* Achievements Section */}
        {portfolio.achievements && portfolio.achievements.length > 0 && (
          <div className={`transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <div className="backdrop-blur-sm bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Achievements</h2>
              
              <div className="space-y-3">
                {portfolio.achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start gap-3">
                    <span className="text-[var(--color-gray)] mt-1">🏆</span>
                    <p className="text-[var(--color-foreground)]/80">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}