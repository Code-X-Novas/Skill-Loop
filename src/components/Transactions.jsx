import { useEffect, useState } from "react";
import { PiExport, PiFileTextLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import * as XLSX from "xlsx";

const statusColor = {
    SUCCESS: "bg-green-100 text-green-600",
    Failed: "bg-red-100 text-red-600",
};

const statusDot = {
    SUCCESS: "bg-green-500",
    Failed: "bg-red-500",
};

const Transactions = () => {
    const user = useSelector((state) => state.auth.user);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!user) return;

            try {
                const q = query(
                    collection(fireDB, "transactions"),
                    where("uid", "==", user.uid)
                );

                const snapshot = await getDocs(q);
                const txns = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setTransactions(txns);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [user]);

    // ✅ Export to Excel function
    const handleExport = () => {
        if (!transactions.length) return;

        const data = transactions.map((txn) => ({
            "Transaction ID": txn.paymentId || txn.id,
            Course: txn.courseTitle || "N/A",
            Amount: `₹${txn.pricePaid?.toFixed(2) || 0}`,
            Status: txn.paymentStatus,
            "Date & Time": txn.paidAt ? new Date(txn.paidAt).toLocaleString() : "N/A",
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

        XLSX.writeFile(workbook, "MyTransactions.xlsx");
    };

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold">Transactions</h2>
                <button
                    onClick={handleExport}
                    className="flex items-center cursor-pointer gap-2 text-sm px-4 py-1 border rounded hover:bg-gray-50 transition"
                >
                    <PiExport className="w-4 h-4" />
                    Export
                </button>
            </div>  

            {loading ? (
                <p className="text-center text-gray-500 py-8">Loading transactions...</p>
            ) : transactions.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No transactions found.</p>
            ) : (
                <>
                    {/* Table layout for md+ screens */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left text-sm border border-gray-300 min-w-[800px]">
                            <thead className="text-gray-600 bg-gray-100 border-b border-gray-300">
                                <tr>
                                    <th className="lg:p-3 p-2 lg:text-sm md:text-xs border-r border-gray-300">Transaction ID</th>
                                    <th className="lg:p-3 p-2 lg:text-sm md:text-xs border-r border-gray-300">Course</th>
                                    <th className="lg:p-3 p-2 lg:text-sm md:text-xs border-r border-gray-300">Amount</th>
                                    <th className="lg:p-3 p-2 lg:text-sm md:text-xs border-r border-gray-300">Status</th>
                                    <th className="lg:p-3 p-2 lg:text-sm md:text-xs">Date & Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((txn, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 border-b border-gray-300"
                                    >
                                        <td className="lg:p-3 p-2 lg:text-sm md:text-xs border-r border-gray-200">
                                            {txn.paymentId || txn.id}
                                        </td>
                                        <td className="lg:p-3 p-2 lg:text-sm md:text-xs border-r border-gray-200">
                                            {txn.courseTitle}{" "}
                                            <span className="text-gray-500">{txn.level}</span>
                                        </td>
                                        <td className="lg:p-3 p-2 lg:text-sm md:text-xs border-r border-gray-200">
                                            ₹{txn.pricePaid?.toFixed(2)}
                                        </td>
                                        <td className="lg:p-3 p-2 lg:text-sm md:text-xs border-r border-gray-200">
                                            <span
                                                className={`lg:px-3 px-2 py-1 text-xs font-medium rounded-full flex items-center gap-2 w-fit ${statusColor[txn.paymentStatus] || ""
                                                    }`}
                                            >
                                                <span
                                                    className={`w-2 h-2 rounded-full ${statusDot[txn.paymentStatus] || ""
                                                        }`}
                                                />
                                                {txn.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="lg:p-3 p-2 lg:text-sm md:text-xs">
                                            {new Date(txn.paidAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Card layout for mobile */}
                    <div className="md:hidden space-y-4">
                        {transactions.map((txn, index) => (
                            <div
                                key={index}
                                className="border border-gray-300 rounded-lg p-4 shadow-sm space-y-2"
                            >
                                <p className="text-sm">
                                    <span className="font-medium text-gray-600">
                                        Transaction ID:
                                    </span>{" "}
                                    {txn.paymentId || txn.id}
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium text-gray-600">Course:</span>{" "}
                                    {txn.courseTitle}{" "}
                                    <span className="text-gray-500">({txn.level})</span>
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium text-gray-600">Amount:</span> ₹
                                    {txn.pricePaid?.toFixed(2)}
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium text-gray-600">
                                        Date & Time:
                                    </span>{" "}
                                    {new Date(txn.paidAt).toLocaleString()}
                                </p>
                                <p className="text-sm flex items-center gap-2">
                                    <span className="font-medium text-gray-600">Status:</span>
                                    <span
                                        className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full ${statusColor[txn.paymentStatus] || ""
                                            }`}
                                    >
                                        <span
                                            className={`w-2 h-2 rounded-full ${statusDot[txn.paymentStatus] || ""
                                                }`}
                                        />
                                        {txn.paymentStatus}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Transactions;




