import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const TransactionHistory = () => {
  const { transactions, fetchTransactions } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      await fetchTransactions();
      setLoading(false);
    };
    loadTransactions();
  }, [fetchTransactions]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">Transaction History</p>
        </div>
        <div className="px-4 py-3 @container">
          <div className="flex overflow-hidden rounded-xl border border-[#dbe0e6] bg-white">
            <table className="flex-1">
              <thead>
                <tr className="bg-white">
                  <th className="px-4 py-3 text-left text-[#111418] w-[200px] text-sm font-medium leading-normal">Date</th>
                  <th className="px-4 py-3 text-left text-[#111418] w-[200px] text-sm font-medium leading-normal">Type</th>
                  <th className="px-4 py-3 text-left text-[#111418] w-[200px] text-sm font-medium leading-normal">Ticker</th>
                  <th className="px-4 py-3 text-left text-[#111418] w-[200px] text-sm font-medium leading-normal">Quantity</th>
                  <th className="px-4 py-3 text-left text-[#111418] w-[200px] text-sm font-medium leading-normal">Price</th>
                  <th className="px-4 py-3 text-left text-[#111418] w-[200px] text-sm font-medium leading-normal">Total</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t border-t-[#dbe0e6]">
                    <td className="h-[72px] px-4 py-2 w-[200px] text-[#60758a] text-sm font-normal leading-normal">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="h-[72px] px-4 py-2 w-[200px] text-[#111418] text-sm font-normal leading-normal">{transaction.type}</td>
                    <td className="h-[72px] px-4 py-2 w-[200px] text-[#111418] text-sm font-normal leading-normal">{transaction.ticker}</td>
                    <td className="h-[72px] px-4 py-2 w-[200px] text-[#60758a] text-sm font-normal leading-normal">{transaction.quantity}</td>
                    <td className="h-[72px] px-4 py-2 w-[200px] text-[#60758a] text-sm font-normal leading-normal">${transaction.price?.toFixed(2)}</td>
                    <td className="h-[72px] px-4 py-2 w-[200px] text-[#60758a] text-sm font-normal leading-normal">${(transaction.quantity * transaction.price)?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;