import { useState } from "react";
import { useApp } from "../context/AppContext";
import { X } from "lucide-react";

export default function AddGroupModal({ onClose }) {
  const { friends, addGroup } = useApp();
  const [name, setName] = useState("");
  const [selected, setSelected] = useState([]);

  const toggle = (id) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    addGroup(name, selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Create Group</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Group Name</label>
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
              placeholder="e.g. Weekend Trip, Office Lunch..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Add Friends</label>
            <div className="space-y-2">
              {friends.map((f) => (
                <button
                  key={f.id}
                  onClick={() => toggle(f.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                    selected.includes(f.id) ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400" : "bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold">{f.avatar}</div>
                  {f.name}
                  {selected.includes(f.id) && <span className="ml-auto text-emerald-400">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 text-sm">Cancel</button>
          <button onClick={handleSubmit} className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium">Create Group</button>
        </div>
      </div>
    </div>
  );
}