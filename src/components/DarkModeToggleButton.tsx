import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className=" p-5 flex justify-end">
        <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200  dark:bg-gray-800 "
    >
      {theme === "dark" ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-600" />}
    </button>
    </div>
  );
}
