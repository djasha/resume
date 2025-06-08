
import React from 'react';
import { Mail, Phone, MapPin, Globe, User } from 'lucide-react';

export function CreativeTemplate({ data }) {
  const { personalInfo, experience, education, skills, colorScheme } = data;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="creative-template w-full max-w-4xl mx-auto bg-white text-gray-800 min-h-[297mm] overflow-hidden">
      <div className="flex">
        {/* Sidebar */}
        <div 
          className="w-1/3 p-6 text-white"
          style={{ 
            background: `linear-gradient(135deg, ${colorScheme.primary} 0%, ${colorScheme.secondary} 100%)` 
          }}
        >
          {/* Profile Picture */}
          <div className="text-center mb-6">
            {personalInfo.profilePicture ? (
              <img
                src={personalInfo.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-white/30"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-white/80" />
              </div>
            )}
            <h1 className="text-2xl font-bold mb-2">
              {personalInfo.fullName || 'Your Name'}
            </h1>
          </div>

          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 text-white/90">Contact</h3>
            <div className="space-y-2 text-sm">
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="break-all">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 text-white/90">Skills</h3>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-center"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-3 text-white/90">Education</h3>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="text-sm">
                    <div className="font-semibold">{edu.degree}</div>
                    {edu.field && <div className="text-white/80">{edu.field}</div>}
                    <div className="text-white/70">{edu.institution}</div>
                    <div className="text-xs text-white/60">
                      {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-8">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-8">
              <h2 
                className="text-2xl font-bold mb-4"
                style={{ color: colorScheme.primary }}
              >
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 
                className="text-2xl font-bold mb-6"
                style={{ color: colorScheme.primary }}
              >
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6">
                    <div 
                      className="absolute left-0 top-2 w-3 h-3 rounded-full"
                      style={{ backgroundColor: colorScheme.accent }}
                    />
                    <div 
                      className="absolute left-1.5 top-5 w-0.5 h-full"
                      style={{ backgroundColor: `${colorScheme.accent}30` }}
                    />
                    
                    <div className="mb-2">
                      <h3 
                        className="text-lg font-bold"
                        style={{ color: colorScheme.secondary }}
                      >
                        {exp.position}
                      </h3>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600 font-medium">{exp.company}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </p>
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
