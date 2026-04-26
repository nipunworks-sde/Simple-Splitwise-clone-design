import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Plus, ArrowRight } from "lucide-react";
import AddExpenseModal from "./AddExpenseModal";
import SettleUpModal from "./SettleUpModal";

export default function GroupView({ groupId }) {
  const { groups, getGroupBalances, getUserById } = useApp();
  const [showExpense, setShowExpense] = useState(false);
  const [showSettle, setShowSettle] = useState(false);

  const group = groups.find((g) => g.id === groupId);
  if (!group) return null;

  const balances = getGroupBalances(group);

  return (
    <>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">{group.name}</h1>
            <p className="text-gray-400 mt-1">{group.members.length} members</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowSettle(true)}
              className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 text-sm transition-all"
            >
              Settle Up
            </button>
            <button
              onClick={() => setShowExpense(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-all"
            >
              <Plus size={16} /> Add Expense
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Expenses */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold text-white mb-4">Expenses</h2>
            <div className="space-y-3">
              {[...group.expenses].reverse().map((exp) => {
                const paidByUser = getUserById(exp.paidBy);
                const myShare = exp.splitBetween.includes("u1") ? exp.amount / exp.splitBetween.length : 0;
                const iPaid = exp.paidBy === "u1";

                return (
                  <div key={exp.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-lg">
                      💸
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">{exp.description}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {paidByUser.name} paid · {exp.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">₹{exp.amount.toLocaleString()}</p>
                      <p className={`text-xs mt-0.5 ${iPaid ? "text-emerald-400" : "text-red-400"}`}>
                        {iPaid ? `you lent ₹${(exp.amount - myShare).toFixed(0)}` : `you owe ₹${myShare.toFixed(0)}`}
                      </p>
                    </div>
                  </div>
                );
              })}
              {group.expenses.length === 0 && (
                <div className="text-center py-12 text-gray-600">No expenses yet. Add one!</div>
              )}
            </div>
          </div>

          {/* Balances */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Balances</h2>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
              {group.members.map((uid) => {
                const user = getUserById(uid);
                const bal = balances[uid] || 0;
                return (
                  <div key={uid} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-700 flex items-center justify-center text-xs font-bold">
                        {user.name[0]}
                      </div>
                      <span className="text-sm text-gray-300">{user.name}</span>
                    </div>
                    <span className={`text-sm font-semibold ${bal > 0 ? "text-emerald-400" : bal < 0 ? "text-red-400" : "text-gray-500"}`}>
                      {bal > 0 ? `+₹${bal.toFixed(0)}` : bal < 0 ? `-₹${Math.abs(bal).toFixed(0)}` : "settled"}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Who owes whom */}
            <h2 className="text-lg font-semibold text-white mt-6 mb-3">Settlements</h2>
            <div className="space-y-2">
              {group.members
                .filter((uid) => uid !== "u1" && (balances[uid] || 0) < 0)
                .map((uid) => {
                  const user = getUserById(uid);
                  const amt = Math.abs(balances[uid]);
                  return (
                    <div key={uid} className="bg-gray-900 border border-gray-800 rounded-xl p-3 flex items-center gap-2 text-sm">
                      <span className="text-gray-400">{user.name}</span>
                      <ArrowRight size={14} className="text-gray-600" />
                      <span className="text-emerald-400">You</span>
                      <span className="ml-auto text-white font-medium">₹{amt.toFixed(0)}</span>
                    </div>
                  );
                })}
              {group.members
                .filter((uid) => uid !== "u1" && (balances["u1"] || 0) < 0 && (balances[uid] || 0) > 0)
                .map((uid) => {
                  const user = getUserById(uid);
                  return (
                    <div key={uid} className="bg-gray-900 border border-gray-800 rounded-xl p-3 flex items-center gap-2 text-sm">
                      <span className="text-emerald-400">You</span>
                      <ArrowRight size={14} className="text-gray-600" />
                      <span className="text-gray-400">{user.name}</span>
                      <span className="ml-auto text-red-400 font-medium">₹{Math.abs(balances["u1"]).toFixed(0)}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {showExpense && <AddExpenseModal groupId={groupId} onClose={() => setShowExpense(false)} />}
      {showSettle && <SettleUpModal groupId={groupId} onClose={() => setShowSettle(false)} />}
    </>
  );
}