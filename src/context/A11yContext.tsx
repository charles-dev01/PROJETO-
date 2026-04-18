import * as React from 'react';

interface A11ySettings {
  dyslexic: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
}

interface A11yContextType {
  isDark: boolean;
  settings: A11ySettings;
  toggleDarkMode: () => void;
  toggleSetting: (key: keyof A11ySettings) => void;
}

const A11yContext = React.createContext<A11yContextType | undefined>(undefined);

export const useA11y = () => {
  const context = React.useContext(A11yContext);
  if (!context) throw new Error('useA11y must be used within A11yProvider');
  return context;
};

export const A11yProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = React.useState(true);
  const [settings, setSettings] = React.useState<A11ySettings>({
    dyslexic: false,
    highContrast: false,
    reduceMotion: false,
  });

  const toggleDarkMode = () => setIsDark(prev => !prev);
  const toggleSetting = (key: keyof A11ySettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const rootClasses = [
    isDark ? 'dark' : '',
    settings.dyslexic ? 'dyslexic' : '',
    settings.highContrast ? 'high-contrast' : '',
    settings.reduceMotion ? 'reduce-motion' : '',
  ].filter(Boolean).join(' ');

  return (
    <A11yContext.Provider value={{ isDark, settings, toggleDarkMode, toggleSetting }}>
      <div className={`${rootClasses} min-h-screen bg-background text-foreground transition-colors duration-500`}>
        {children}
      </div>
    </A11yContext.Provider>
  );
};
