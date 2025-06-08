
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const colorPresets = [
  { name: 'Purple Gradient', primary: '#667eea', secondary: '#764ba2', accent: '#f093fb' },
  { name: 'Ocean Blue', primary: '#2196F3', secondary: '#21CBF3', accent: '#45B7D1' },
  { name: 'Sunset Orange', primary: '#FF6B6B', secondary: '#FF8E53', accent: '#FF6B9D' },
  { name: 'Forest Green', primary: '#4CAF50', secondary: '#8BC34A', accent: '#CDDC39' },
  { name: 'Royal Purple', primary: '#9C27B0', secondary: '#673AB7', accent: '#E91E63' },
  { name: 'Crimson Red', primary: '#F44336', secondary: '#E91E63', accent: '#FF5722' }
];

export function ColorSchemeSelector({ colorScheme, updateColorScheme }) {
  const handleColorChange = (field, color) => {
    updateColorScheme({
      ...colorScheme,
      [field]: color
    });
  };

  const applyPreset = (preset) => {
    updateColorScheme({
      primary: preset.primary,
      secondary: preset.secondary,
      accent: preset.accent
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Palette className="h-5 w-5" />
            Color Scheme
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {colorPresets.map((preset, index) => (
              <motion.button
                key={preset.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => applyPreset(preset)}
                className="p-3 rounded-lg bg-white/5 border border-white/20 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex gap-1 mb-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: preset.primary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: preset.secondary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: preset.accent }}
                  />
                </div>
                <div className="text-xs text-white/80">{preset.name}</div>
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-white/90">Primary Color</Label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="color"
                  value={colorScheme.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="w-12 h-10 rounded border border-white/20 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={colorScheme.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="flex-1 h-10 px-3 rounded border border-white/20 bg-white/10 text-white text-sm"
                />
              </div>
            </div>
            <div>
              <Label className="text-white/90">Secondary Color</Label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="color"
                  value={colorScheme.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="w-12 h-10 rounded border border-white/20 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={colorScheme.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="flex-1 h-10 px-3 rounded border border-white/20 bg-white/10 text-white text-sm"
                />
              </div>
            </div>
            <div>
              <Label className="text-white/90">Accent Color</Label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="color"
                  value={colorScheme.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="w-12 h-10 rounded border border-white/20 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={colorScheme.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="flex-1 h-10 px-3 rounded border border-white/20 bg-white/10 text-white text-sm"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
