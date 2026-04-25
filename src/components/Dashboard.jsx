import { useApp } from "../context/AppContext";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default function Dashboard({ setActiveGroup }) {
  const { groups, getGroupBalances } = useApp();

  let totalOwed = 0;
  let totalOwe = 0;

  groups.forEach((g) => {
    const balances = getGroupBalances(g);
    const myBal = balances["u1"] || 0;
    if (myBal > 0) totalOwed += myBal;
    if (myBal < 0) totalOwe += Math.abs(myBal);
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-8">Overview of all your expenses</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <DollarSign size={20} className="text-blue-400" />
            </div>
            <span className="text-gray-400 text-sm">Total Balance</span>
          </div>
          <p className={`text-2xl font-bold ${totalOwed - totalOwe >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            ₹{Math.abs(totalOwed - totalOwe).toFixed(0)}
          </p>
          <p className="text-xs text-gray-500 mt-1">{totalOwed - totalOwe >= 0 ? "In your favour" : "You owe"}</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} className="text-emerald-400" />
            </div>
            <span className="text-gray-400 text-sm">You are owed</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400">₹{totalOwed.toFixed(0)}</p>
          <p className="text-xs text-gray-500 mt-1">Across all groups</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
              <TrendingDown size={20} className="text-red-400" />
            </div>
            <span className="text-gray-400 text-sm">You owe</span>
          </div>
          <p className="text-2xl font-bold text-red-400">₹{totalOwe.toFixed(0)}</p>
          <p className="text-xs text-gray-500 mt-1">Across all groups</p>
        </div>
      </div>

      {/* Groups List */}
      <h2 className="text-lg font-semibold text-white mb-4">Your Groups</h2>
      <div className="grid grid-cols-2 gap-4">
        {groups.map((g) => {
          const balances = getGroupBalances(g);
          const myBal = balances["u1"] || 0;
          const totalExp = g.expenses.reduce((s, e) => s + e.amount, 0);

          return (
            <button
              key={g.id}
              onClick={() => setActiveGroup(g.id)}
              className="bg-gray-900 border border-gray-800 hover:border-emerald-500/50 rounded-2xl p-6 text-left transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">{g.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{g.members.length} members · {g.expenses.length} expenses</p>
                </div>
                <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-full">₹{totalExp.toLocaleString()}</span>
              </div>

              <div className={`text-sm font-medium ${myBal > 0 ? "text-emerald-400" : myBal < 0 ? "text-red-400" : "text-gray-400"}`}>
                {myBal > 0 ? `You get back ₹${myBal.toFixed(0)}` : myBal < 0 ? `You owe ₹${Math.abs(myBal).toFixed(0)}` : "All settled up ✓"}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}