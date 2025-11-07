import { LogOutIcon } from "lucide-react"
import ThemeChanger from "../ui/ThemeChanger"
import { userStore } from "../../store/useAuthStore"

const SidebarHeader = () => {
    const {logout,isDark}=userStore()
  return (
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-700 to-yellow-400 text-transparent bg-clip-text">
                PlusChat
            </h1>
            <div className="flex gap-3 items-center">
                <ThemeChanger />
                <LogOutIcon 
                    onClick={logout} 
                    className={`hover:text-gray-400 cursor-pointer ${
                        isDark?"text-white":"text-black"
                    } `}
                />
            </div>
        </header>
    )
}

export default SidebarHeader