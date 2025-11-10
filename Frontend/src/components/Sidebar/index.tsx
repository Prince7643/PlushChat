import { useUserStore } from "../../store/useAuthStore";
import SidebarHeader from "./SidebarHeader";
import SidebarBody from "./SidebarBody";
import SidebarFooter from "./SidebarFooter";

const Sidebar = () => {
    const { isDark }=useUserStore()
  return (
    <aside 
        className={`flex flex-col h-full ${
            isDark?"bg-[#232323]":"bg-[#FFFFFF]"
            } text-white`}
        >
        {/* Header */}
        <SidebarHeader/>
        {/** Search bar */}
        <SidebarBody/>
        {/**Footer */}
        <SidebarFooter></SidebarFooter>
    </aside>
  );
};

export default Sidebar;
