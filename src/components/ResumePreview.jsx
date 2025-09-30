import React from "react";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

const ResumePreview = ({ resumeData }) => {
  // Default data structure for demonstration

  // Use provided data or fallback to default
  const data = resumeData;

  return (
    <div
      className="bg-white shadow-lg mx-auto"
      style={{ width: "210mm", minHeight: "297mm", padding: "15mm" }}
    >
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          {data.personalInfo.jobTitle}
        </h2>

        <div className="contact-info">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{data.personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{data.personalInfo.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{data.personalInfo.location}</span>
            </div>
            {data.personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                <span>{data.personalInfo.website}</span>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="w-4 h-4" />
                <span>{data.personalInfo.linkedin}</span>
              </div>
            )}
            {data.personalInfo.github && (
              <div className="flex items-center gap-1">
                <Github className="w-4 h-4" />
                <span>{data.personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>

        {data.personalInfo.summary && (
          <p className="text-gray-700 leading-relaxed">
            {data.personalInfo.summary}
          </p>
        )}
      </header>

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-4 border-gray-300">
            Professional Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {exp.position}
                  </h3>
                  <p className="text-gray-700">
                    {exp.company} • {exp.location}
                  </p>
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <ul className="list-disc list-inside ml-4 space-y-1">
                {exp.achievements.map((achievement, index) => (
                  <li key={index} className="text-gray-700 text-sm">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700">
                    {edu.institution} • {edu.location}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                  )}
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills Section */}
      {data.skills && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.skills.technical && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.technical.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.skills.soft && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.soft.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-sm rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
            Projects
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                {project.name}
              </h3>
              <p className="text-gray-700 text-sm mb-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
