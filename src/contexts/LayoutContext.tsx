import React, { createContext, useContext, useState } from 'react';

type LayoutMode = 'three-column' | 'two-column' | 'full-width';

interface LayoutContextType {
  layoutMode: LayoutMode;
  setLayoutMode: React.Dispatch<React.SetStateAction<LayoutMode>>;
  sectionVisibility: Record<string, boolean>;
  toggleSectionVisibility: (section: string) => void;
  fontSizeScale: number;
  setFontSizeScale: React.Dispatch<React.SetStateAction<number>>;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('three-column');
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({
    summary: true,
    education: true,
    workExperience: true,
    projects: true,
    skills: true,
    tools: true,
    languages: true,
    certifications: true,
  });
  const [fontSizeScale, setFontSizeScale] = useState<number>(100);

  const toggleSectionVisibility = (section: string) => {
    setSectionVisibility(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <LayoutContext.Provider value={{
      layoutMode,
      setLayoutMode,
      sectionVisibility,
      toggleSectionVisibility,
      fontSizeScale,
      setFontSizeScale,
    }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) throw new Error('useLayout must be used within LayoutProvider');
  return context;
};
