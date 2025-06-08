
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Layout } from 'lucide-react';
import { motion } from 'framer-motion';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design',
    preview: 'bg-gradient-to-br from-blue-500 to-purple-600'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional and professional',
    preview: 'bg-gradient-to-br from-gray-600 to-gray-800'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and artistic layout',
    preview: 'bg-gradient-to-br from-pink-500 to-orange-500'
  }
];

export function TemplateSelector({ currentTemplate, updateTemplate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Layout className="h-5 w-5" />
            Template Style
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={currentTemplate === template.id ? "default" : "outline"}
                  className={`h-auto p-4 flex flex-col items-center gap-3 w-full ${
                    currentTemplate === template.id
                      ? 'bg-white/20 border-white/40 text-white'
                      : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={() => updateTemplate(template.id)}
                >
                  <div className={`w-16 h-12 rounded ${template.preview}`} />
                  <div className="text-center">
                    <div className="font-medium">{template.name}</div>
                    <div className="text-xs opacity-70">{template.description}</div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
