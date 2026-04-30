import { createContext, useContext, useEffect, useState} from 'react';

export type ThemeName = 'light' | 'mid' | 'dark';
interface ThemeContextType {
    theme: ThemeName;
    setTheme: (theme: ThemeName) => void;
}


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {

    const [theme, setThemeState] = useState<ThemeName>(() => {
        return (localStorage.getItem('theme') as ThemeName) ?? 'mid';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const setTheme = (newTheme: ThemeName) => setThemeState(newTheme);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used inside ThemeProvider');

    return context;
}