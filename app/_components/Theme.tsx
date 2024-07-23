import * as React from "react";
import { Moon, Sun, Palette } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const colorModes = [
  { name: "Light", value: "light", icon: Sun },
  { name: "Dark", value: "dark", icon: Moon },
];

const accentColors = [
  { name: "Default", value: "default", color: "#000000" },
  { name: "Orange", value: "orange", color: "#f97316" },
  { name: "Rose", value: "rose", color: "#e11d48" },
  { name: "Blue", value: "blue", color: "#3b82f6" },
  { name: "Green", value: "green", color: "#22c55e" },
  // Add more accent colors here if needed
];

const gradients = [
  { name: "Purpleish", value: "purpleish", gradient: "linear-gradient(to top left,#cc208e,#6713d2)" },
  {name:"Cyanish",value:"cyanish",gradient:"linear-gradient(to top left,#4CB8C4,#3CD3AD)"},
  {name:"Yellowish",value:"yellowish",gradient:"linear-gradient(to top left,#ffe259,#ffa751)"},
  {name:"Maronish",value:"maronish",gradient:"linear-gradient(to top left,#870000,#190A05)"},
  {name:"New",value:"new",gradient:"linear-gradient(to top left,#A445B2,#D41872,#FF0066)"}
  // Add more gradients here if needed
];

export default function Theme() {
  const { resolvedTheme } = useTheme();

  const handleThemeChange = (newTheme: string) => {
    const root = window.document.documentElement;
    const currentClasses = root.className.split(" ");

    // Remove existing theme classes
    root.classList.remove(
      ...colorModes.map(mode => mode.value),
      ...accentColors.map(color => `theme-${color.value}`),
      ...gradients.map(gradient => `theme-${gradient.value}`)
    );

    if (colorModes.map(mode => mode.value).includes(newTheme)) {
      // Changing color mode
      root.classList.add(newTheme);
      // Preserve accent color or gradient if it exists
      const currentTheme = currentClasses.find(cls => cls.startsWith('theme-'));
      if (currentTheme) {
        root.classList.add(currentTheme);
      }
    } else if (gradients.some(gradient => gradient.value === newTheme)) {
  
      // Applying gradient theme
      root.classList.add(`theme-${newTheme}`);
      root.classList.add("dark");
    } else {
    
      // Changing accent color
      root.classList.add(`theme-${newTheme}`);
      root.classList.add("dark");
    }

    // setTheme(newTheme);
  };

  const currentMode = resolvedTheme || 'light';
  const CurrentModeIcon = colorModes.find(mode => mode.value === currentMode)?.icon || Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-10 h-10">
          <CurrentModeIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem disabled className="font-semibold">
          Accent Color
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {accentColors.map((color) => (
          <DropdownMenuItem
            key={color.value}
            onClick={() => handleThemeChange(color.value)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: color.color }}
              ></div>
              <span>{color.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className="font-semibold">
          Gradients
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {gradients.map((gradient) => (
          <DropdownMenuItem
            key={gradient.value}
            onClick={() => handleThemeChange(gradient.value)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ background: gradient.gradient }}
              ></div>
              <span>{gradient.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className="font-semibold">
          Choose theme
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {colorModes.map((mode) => (
          <DropdownMenuItem
            key={mode.value}
            onClick={() => handleThemeChange(mode.value)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span>{mode.name}</span>
            <mode.icon className="h-4 w-4" />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}