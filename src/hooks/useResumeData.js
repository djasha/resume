
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/use-toast';

const defaultResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    profilePicture: null,
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  template: 'modern',
  colorScheme: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#f093fb'
  }
};

const USER_ID_KEY = 'resumeBuilderUserId'; 

function getUserId() {
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
}

export function useResumeData() {
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [loading, setLoading] = useState(true);
  const userId = getUserId();

  const loadResumeData = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('data')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { 
        console.error('Error loading resume data:', error);
        toast({ title: "Error", description: "Failed to load resume data.", variant: "destructive" });
        setResumeData(defaultResumeData);
      } else if (data) {
        setResumeData(data.data);
      } else {
        setResumeData(defaultResumeData);
      }
    } catch (err) {
      console.error('Unexpected error loading resume data:', err);
      toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
      setResumeData(defaultResumeData);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const saveResumeData = useCallback(async (currentData) => {
    if (loading) return; 
    try {
      const { error } = await supabase
        .from('resumes')
        .upsert({ user_id: userId, data: currentData, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });

      if (error) {
        console.error('Error saving resume data:', error);
        toast({ title: "Save Error", description: "Failed to save resume data to cloud.", variant: "destructive" });
      } else {
         toast({ title: "Saved!", description: "Your resume data is saved to the cloud.", duration: 2000 });
      }
    } catch (err) {
      console.error('Unexpected error saving resume data:', err);
      toast({ title: "Save Error", description: "An unexpected error occurred while saving.", variant: "destructive" });
    }
  }, [userId, loading]);

  useEffect(() => {
    loadResumeData();
  }, [loadResumeData]);

  useEffect(() => {
    if (!loading && resumeData !== defaultResumeData) {
      const debounceSave = setTimeout(() => {
        saveResumeData(resumeData);
      }, 1000); 
      return () => clearTimeout(debounceSave);
    }
  }, [resumeData, saveResumeData, loading]);


  const updateStateAndSave = (updaterFn) => {
    setResumeData(prev => {
      const newState = updaterFn(prev);
      return newState;
    });
  };

  const updatePersonalInfo = (field, value) => {
    updateStateAndSave(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const addExperience = () => {
    updateStateAndSave(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' }]
    }));
  };

  const updateExperience = (id, field, value) => {
    updateStateAndSave(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const removeExperience = (id) => {
    updateStateAndSave(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    updateStateAndSave(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now(), institution: '', degree: '', field: '', startDate: '', endDate: '', current: false }]
    }));
  };

  const updateEducation = (id, field, value) => {
    updateStateAndSave(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  const removeEducation = (id) => {
    updateStateAndSave(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = (skill) => {
    if (skill) {
      updateStateAndSave(prev => ({
        ...prev,
        skills: prev.skills.includes(skill) ? prev.skills : [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (skill) => {
    updateStateAndSave(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const updateTemplate = (template) => {
    updateStateAndSave(prev => ({ ...prev, template }));
  };

  const updateColorScheme = (colorScheme) => {
    updateStateAndSave(prev => ({ ...prev, colorScheme }));
  };

  return {
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
  };
}
