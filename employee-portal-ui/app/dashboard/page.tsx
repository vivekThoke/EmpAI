"use client";

import { useEffect, useState } from "react";
import api from "../services/apiClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [data, setData] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/user/me");
                setData(res.data);
            } catch (err) {
                router.push("/login");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white flex font-sans">

            {/* Sidebar */}
            <aside className="w-64 bg-[#121212] border-r border-white/10 p-6 flex flex-col justify-between">
                
                {/* Top */}
                <div>
                    <h1 className="text-xl font-semibold tracking-tight mb-8">
                        Employee Portal
                    </h1>

                    <nav className="space-y-3 text-sm text-gray-400">
                        <p className="hover:text-white cursor-pointer transition">Dashboard</p>
                        <p className="hover:text-white cursor-pointer transition">Employees</p>
                        <p className="hover:text-white cursor-pointer transition">Reports</p>
                        <p className="hover:text-white cursor-pointer transition">Settings</p>
                    </nav>
                </div>

                {/* Bottom */}
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        router.push("/login");
                    }}
                    className="text-sm text-orange-400 hover:underline text-left"
                >
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Dashboard
                    </h2>
                    <p className="text-sm text-gray-400">
                        Overview of your account
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-3 gap-6">

                    {/* Card 1 */}
                    <div className="p-6 rounded-xl bg-[#121212]/80 backdrop-blur-lg border border-white/10">
                        <p className="text-sm text-gray-400">User Info</p>
                        <p className="text-lg font-medium mt-2">
                            {data ? JSON.stringify(data) : "Loading..."}
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="p-6 rounded-xl bg-[#121212]/80 backdrop-blur-lg border border-white/10">
                        <p className="text-sm text-gray-400">Status</p>
                        <p className="text-lg font-medium mt-2 text-blue-400">
                            Active
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="p-6 rounded-xl bg-[#121212]/80 backdrop-blur-lg border border-white/10">
                        <p className="text-sm text-gray-400">Security</p>
                        <p className="text-lg font-medium mt-2 text-orange-400">
                            Protected
                        </p>
                    </div>

                </div>
            </main>
        </div>
    );
}