
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PersonalInfoForm } from '@/components/PersonalInfoForm';
import { ExperienceForm } from '@/components/ExperienceForm';
import { EducationForm } from '@/components/EducationForm';
import { SkillsForm } from '@/components/SkillsForm';
import { TemplateSelector } from '@/components/TemplateSelector';
import { ColorSchemeSelector } from '@/components/ColorSchemeSelector';
import { ResumePreview } from '@/components/ResumePreview';
import { Toaster } from '@/components/ui/toaster';
import { useResumeData } from '@/hooks/useResumeData';
import { exportToPDF } from '@/utils/pdfExport';
import { toast } from '@/components/ui/use-toast';
import { Download, FileText, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const {
    resumeData,
    loading,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    removeSkill,
    updateTemplate,
    updateColorScheme
  } = useResumeData();

  const handleExportPDF = async () => {
    try {
      toast({
        title: "Generating PDF...",
        description: "Please wait while we create your resume PDF.",
      });
      
      await exportToPDF('resume-preview', `${resumeData.personalInfo.fullName || 'resume'}.pdf`);
      
      toast({
        title: "Success!",
        description: "Your resume has been exported as PDF.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const tabItems = [
    { value: "personal", label: "Personal" },
    { value: "experience", label: "Experience" },
    { value: "education", label: "Education" },
    { value: "skills", label: "Skills" },
    { value: "template", label: "Template" },
    { value: "colors", label: "Colors" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 flex flex-col items-center justify-center text-white">
        <Loader2 className="h-16 w-16 animate-spin mb-4" />
        <p className="text-2xl font-semibold">Loading Your Resume...</p>
        <p className="text-lg">Please wait a moment.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Resume Builder
            </h1>
            <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Create stunning, professional resumes with our modern builder. Choose from multiple templates and customize every detail!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 glass-effect border-white/20 p-1 mb-6">
                  {tabItems.map(tab => (
                    <TabsTrigger 
                      key={tab.value} 
                      value={tab.value} 
                      className="text-xs lg:text-sm text-white/80 data-[state=active]:text-white data-[state=active]:bg-white/15 hover:bg-white/10 transition-all duration-200 py-2.5"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="personal" className="mt-0">
                  <PersonalInfoForm
                    personalInfo={resumeData.personalInfo}
                    updatePersonalInfo={updatePersonalInfo}
                  />
                </TabsContent>

                <TabsContent value="experience" className="mt-0">
                  <ExperienceForm
                    experience={resumeData.experience}
                    addExperience={addExperience}
                    updateExperience={updateExperience}
                    removeExperience={removeExperience}
                  />
                </TabsContent>

                <TabsContent value="education" className="mt-0">
                  <EducationForm
                    education={resumeData.education}
                    addEducation={addEducation}
                    updateEducation={updateEducation}
                    removeEducation={removeEducation}
                  />
                </TabsContent>

                <TabsContent value="skills" className="mt-0">
                  <SkillsForm
                    skills={resumeData.skills}
                    addSkill={addSkill}
                    removeSkill={removeSkill}
                  />
                </TabsContent>

                <TabsContent value="template" className="mt-0">
                  <TemplateSelector
                    currentTemplate={resumeData.template}
                    updateTemplate={updateTemplate}
                  />
                </TabsContent>

                <TabsContent value="colors" className="mt-0">
                  <ColorSchemeSelector
                    colorScheme={resumeData.colorScheme}
                    updateColorScheme={updateColorScheme}
                  />
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Export Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                onClick={handleExportPDF}
                size="lg"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Download className="h-5 w-5 mr-2" />
                Export as PDF
              </Button>
            </motion.div>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-effect border-white/20 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Live Preview</h2>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Real-time updates
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                <ResumePreview resumeData={resumeData} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <Toaster />
    </div>
  );
}

export default App;
