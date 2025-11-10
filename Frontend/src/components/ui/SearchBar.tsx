import { Search } from "lucide-react";
import { useState } from "react";
import { useUserStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const {setsearchUser,searchUser} = useUserStore();
  const {setIsChatClick,setIsContactClick}=useChatStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setsearchUser(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 flex items-center gap-2"
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search or start new chat"
          className="
            w-full
            pl-10 pr-10
            py-2
            rounded-full
            bg-slate-400/50 text-white
            placeholder-gray-800
            focus:outline-none focus:ring-2 focus:none
            transition-colors
          "
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            &times;
          </button>
        )}
      </div>

      {/* 👇 Add this button */}
      <button
        onClick={()=>{searchUser.length>0&&(setIsChatClick(false),setIsContactClick(false))}}
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full"
      >
        Go
      </button>
    </form>
  );
};

export default SearchBar;
