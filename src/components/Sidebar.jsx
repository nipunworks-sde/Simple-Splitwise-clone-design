import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Users, LayoutDashboard, Plus, Wallet, Activity, UserCircle, LogOut, ChevronUp } from "lucide-react";
import AddGroupModal from "./AddGroupModal";

export default function Sidebar({ activeGroup, setActiveGroup, activePage, setActivePage, user, onLogout }) {
  const { groups } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Wallet size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">SplitEase</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => { setActivePage("dashboard"); setActiveGroup(null); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
              activePage === "dashboard" && !activeGroup ? "bg-emerald-500/20 text-emerald-400" : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>

          <button
            onClick={() => { setActivePage("activity"); setActiveGroup(null); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
              activePage === "activity" ? "bg-emerald-500/20 text-emerald-400" : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Activity size={18} /> Activity
          </button>

          {/* Groups */}
          <div className="pt-4">
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Groups</span>
              <button onClick={() => setShowModal(true)} className="text-emerald-400 hover:text-emerald-300 transition-colors">
                <Plus size={16} />
              </button>
            </div>

            {groups.map((g) => (
              <button
                key={g.id}
                onClick={() => { setActiveGroup(g.id); setActivePage("group"); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                  activeGroup === g.id ? "bg-emerald-500/20 text-emerald-400" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Users size={16} />
                <span className="truncate">{g.name}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* User Menu */}
        <div className="p-4 border-t border-gray-800 relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center gap-3 hover:bg-gray-800 rounded-xl p-2 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold text-white">
              {user?.avatar?.slice(0, 1) || "Y"}
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm text-white font-medium truncate">{user?.name || "You"}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
            </div>
            <ChevronUp size={14} className={`text-gray-400 transition-transform ${showUserMenu ? "" : "rotate-180"}`} />
          </button>

          {/* Dropdown */}
          {showUserMenu && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-xl">
              <button
                onClick={() => { setActivePage("profile"); setActiveGroup(null); setShowUserMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
              >
                <UserCircle size={16} /> My Profile
              </button>
              <div className="border-t border-gray-700" />
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-gray-700 transition-colors"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {showModal && <AddGroupModal onClose={() => setShowModal(false)} />}
    </>
  );
}