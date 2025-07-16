import { PiExport } from "react-icons/pi";
import { PiFileTextLight } from "react-icons/pi";

const transactions = [
  {
    id: "VBN1230",
    amount: 2000,
    status: "Done",
    dateTime: "2025-10-14, 18:12:45",
  },
  {
    id: "VBN1280",
    amount: 3000,
    status: "Failed",
    dateTime: "2025-10-14, 18:12:48",
  },
  {
    id: "VBN1270",
    amount: 8000,
    status: "Done",
    dateTime: "2025-10-14, 18:12:47",
  },
  {
    id: "VBN1630",
    amount: 2000,
    status: "Done",
    dateTime: "2025-10-14, 18:12:48",
  },
];

const statusColor = {
  Done: "bg-green-100 text-green-600",
  Failed: "bg-red-100 text-red-600",
};

const Transactions = () => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <button className="flex items-center gap-2 text-sm px-4 py-1 border rounded">
          <PiExport className="w-4 h-4" />
          Export
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2">Transaction ID</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
              <th className="py-2">Date & Time</th>
              <th className="py-2">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3">{txn.id}</td>
                <td className="py-3">{txn.amount.toFixed(2)}</td>
                <td className="py-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-2 w-fit ${statusColor[txn.status]}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        txn.status === "Done" ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    {txn.status}
                  </span>
                </td>
                <td className="py-3">{txn.dateTime}</td>
                <td className="py-3">
                  <button className="text-gray-700 hover:text-black">
                    <PiFileTextLight className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
