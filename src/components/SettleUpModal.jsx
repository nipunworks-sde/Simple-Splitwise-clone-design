import { useState } from "react";
import { useApp } from "../context/AppContext";
import { X } from "lucide-react";

export default function SettleUpModal({ groupId, onClose }) {
  const { groups, getGroupBalances, getUserById, settleUp } = useApp();
  const group = groups.find((g) => g.id === groupId);

  const [from, setFrom] = useState("u1");
  const [to, setTo] = useState(group.members.find((m) => m !== "u1") || "u1");
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    settleUp(groupId, from, to, parseFloat(amount));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Settle Up</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Who's paying?</label>
            <select className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500" value={from} onChange={(e) => setFrom(e.target.value)}>
              {group.members.map((uid) => <option key={uid} value={uid}>{getUserById(uid).name}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Paying to?</label>
            <select className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500" value={to} onChange={(e) => setTo(e.target.value)}>
              {group.members.filter((m) => m !== from).map((uid) => <option key={uid} value={uid}>{getUserById(uid).name}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Amount (₹)</label>
            <input
              type="number"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 text-sm">Cancel</button>
          <button onClick={handleSubmit} className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium">Confirm</button>
        </div>
      </div>
    </div>
  );
}