import { useUserStore } from "../../store/useAuthStore"
import {
  Sun,
  Moon,
} from "lucide-react";
const ThemeChanger = () => {
  const { isDark, setIsDark}=useUserStore()
  const toggleTheme = () => {
    setIsDark();
  };
  return (
    <div className="flex items-center gap-1">
      <Sun className={`${isDark ? "text-gray-400" : "text-yellow-600"}`}></Sun>
      <input
        type="checkbox" 
        checked={isDark}
        onChange={toggleTheme}
        className={`toggle toggle-md  ${isDark ? "text-gray-100" : "text-gray-800"}`}

       />
      <Moon className={`${isDark ? "text-gray-100" : "text-gray-800"}`}></Moon>
    </div>
  )
}

export default ThemeChanger