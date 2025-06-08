
import React from 'react';
import { Mail, Phone, MapPin, Globe, User } from 'lucide-react';

export function ClassicTemplate({ data }) {
  const { personalInfo, experience, education, skills, colorScheme } = data;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="classic-template w-full max-w-4xl mx-auto bg-white text-gray-800 min-h-[297mm] p-8">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
        {personalInfo.profilePicture ? (
          <img
            src={personalInfo.profilePicture}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-gray-300"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-gray-400" />
          </div>
        )}
        
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600 mb-4">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {personalInfo.location}
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              {personalInfo.website}
            </div>
          )}
        </div>
        
        {personalInfo.summary && (
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">{personalInfo.summary}</p>
        )}
      </div>

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 font-medium italic">{exp.company}</p>
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

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-gray-600 italic">{edu.institution}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800 uppercase tracking-wide border-b border-gray-300 pb-2">
            Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {skills.map((skill, index) => (
              <div key={index} className="text-gray-700 font-medium">
                • {skill}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
