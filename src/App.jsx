import { useState, useEffect } from "react";
import { AppProvider } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import GroupView from "./components/GroupView";
import ActivityFeed from "./components/ActivityFeed";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("loggedInUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [activeGroup, setActiveGroup] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  if (!user) return <LoginPage onLogin={setUser} />;

  return (
    <AppProvider>
      <div className="flex h-screen bg-gray-950 text-white font-sans overflow-hidden">
        <Sidebar
          activeGroup={activeGroup}
          setActiveGroup={setActiveGroup}
          activePage={activePage}
          setActivePage={setActivePage}
          user={user}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto">
          {activePage === "profile" && <ProfilePage user={user} onUpdate={setUser} />}
          {activePage === "activity" && <ActivityFeed />}
          {activePage === "group" && activeGroup && <GroupView groupId={activeGroup} />}
          {activePage === "dashboard" && <Dashboard setActiveGroup={setActiveGroup} setActivePage={setActivePage} />}
        </main>
      </div>
    </AppProvider>
  );
}