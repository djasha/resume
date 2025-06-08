
import React from 'react';
import { Mail, Phone, MapPin, Globe, User } from 'lucide-react';

export function ModernTemplate({ data }) {
  const { personalInfo, experience, education, skills, colorScheme } = data;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="modern-template w-full max-w-4xl mx-auto bg-white text-gray-800 min-h-[297mm] p-8">
      {/* Header */}
      <div className="flex items-start gap-6 mb-8">
        <div className="flex-shrink-0">
          {personalInfo.profilePicture ? (
            <img
              src={personalInfo.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4"
              style={{ borderColor: colorScheme.primary }}
            />
          ) : (
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center border-4"
              style={{ borderColor: colorScheme.primary, backgroundColor: `${colorScheme.primary}20` }}
            >
              <User className="h-8 w-8" style={{ color: colorScheme.primary }} />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2" style={{ color: colorScheme.primary }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
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
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          )}
        </div>
      </div>

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ color: colorScheme.primary, borderColor: colorScheme.primary }}>
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: colorScheme.secondary }}>
                      {exp.position}
                    </h3>
                    <p className="text-gray-600 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
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
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ color: colorScheme.primary, borderColor: colorScheme.primary }}>
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: colorScheme.secondary }}>
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ color: colorScheme.primary, borderColor: colorScheme.primary }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: colorScheme.accent }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
