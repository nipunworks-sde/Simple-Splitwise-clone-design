import { useState } from "react";
import { useApp } from "../context/AppContext";
import { X } from "lucide-react";

export default function AddExpenseModal({ groupId, onClose }) {
  const { groups, getUserById, addExpense } = useApp();
  const group = groups.find((g) => g.id === groupId);

  const [form, setForm] = useState({
    description: "",
    amount: "",
    paidBy: "u1",
    splitBetween: group.members,
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = () => {
    if (!form.description || !form.amount) return;
    addExpense(groupId, { ...form, amount: parseFloat(form.amount) });
    onClose();
  };

  const toggleMember = (uid) => {
    setForm((f) => ({
      ...f,
      splitBetween: f.splitBetween.includes(uid)
        ? f.splitBetween.filter((m) => m !== uid)
        : [...f.splitBetween, uid],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Add Expense</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Description</label>
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
              placeholder="e.g. Dinner, Cab, Hotel..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Amount (₹)</label>
            <input
              type="number"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
              placeholder="0"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Paid by</label>
            <select
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
              value={form.paidBy}
              onChange={(e) => setForm({ ...form, paidBy: e.target.value })}
            >
              {group.members.map((uid) => (
                <option key={uid} value={uid}>{getUserById(uid).name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Split between</label>
            <div className="flex flex-wrap gap-2">
              {group.members.map((uid) => {
                const user = getUserById(uid);
                const selected = form.splitBetween.includes(uid);
                return (
                  <button
                    key={uid}
                    onClick={() => toggleMember(uid)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      selected ? "bg-emerald-500 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    {user.name}
                  </button>
                );
              })}
            </div>
            {form.splitBetween.length > 0 && form.amount && (
              <p className="text-xs text-gray-500 mt-2">
                ₹{(parseFloat(form.amount) / form.splitBetween.length).toFixed(2)} per person
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Date</label>
            <input
              type="date"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 text-sm transition-all">Cancel</button>
          <button onClick={handleSubmit} className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-all">Add Expense</button>
        </div>
      </div>
    </div>
  );
}