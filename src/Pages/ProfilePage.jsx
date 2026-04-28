import { useState } from "react";
import { Camera, Mail, Phone, User, Save } from "lucide-react";

export default function ProfilePage({ user, onUpdate }) {
  const [form, setForm] = useState({ ...user });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const updated = { ...user, ...form };
    localStorage.setItem("loggedInUser", JSON.stringify(updated));
    onUpdate(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-white mb-1">My Profile</h1>
      <p className="text-gray-400 mb-8">Manage your personal information</p>

      {/* Avatar */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-emerald-600 flex items-center justify-center text-2xl font-bold text-white">
              {form.avatar}
            </div>
            <button className="absolute -bottom-2 -right-2 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-400 transition-colors">
              <Camera size={13} className="text-white" />
            </button>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{form.name}</h3>
            <p className="text-gray-400 text-sm">{form.email}</p>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full mt-1 inline-block">Active</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
        <h3 className="font-semibold text-white mb-4">Personal Information</h3>

        <div>
          <label className="text-sm text-gray-400 mb-1.5 flex items-center gap-2">
            <User size={14} /> Full Name
          </label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1.5 flex items-center gap-2">
            <Mail size={14} /> Email
          </label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1.5 flex items-center gap-2">
            <Phone size={14} /> Phone
          </label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
            value={form.phone || ""}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+91 00000 00000"
          />
        </div>

        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            saved ? "bg-gray-700 text-emerald-400" : "bg-emerald-500 hover:bg-emerald-400 text-white"
          }`}
        >
          <Save size={15} />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}