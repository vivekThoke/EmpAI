"use client";

import { useEffect, useState } from "react";
import api from "../services/apiClient";
import { useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    LogOut,
    ShieldCheck,
    Activity,
    User
} from "lucide-react";

interface UserData {
    name: string;
    email: string;
    department: string | null;
    designation: string | null;
}

export default function Dashboard() {
    const [data, setData] = useState<UserData | null>(null);
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
        <div className="min-h-screen bg-neutral-950 text-white flex">

            {/* Sidebar */}
            <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col justify-between">

                <div>
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-neutral-800">
                        <h1 className="text-lg font-semibold tracking-tight">
                            Employee Portal
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 space-y-2">

                        <div className="flex items-center gap-3 bg-neutral-800 text-white px-4 py-3 rounded-xl">
                            <LayoutDashboard size={18} />
                            <span className="text-sm font-medium">Dashboard</span>
                        </div>

                        <div className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-3 rounded-xl cursor-pointer transition">
                            <Users size={18} />
                            <span className="text-sm font-medium">Employees</span>
                        </div>

                        <div className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-3 rounded-xl cursor-pointer transition">
                            <FileText size={18} />
                            <span className="text-sm font-medium">Reports</span>
                        </div>

                        <div className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-3 rounded-xl cursor-pointer transition">
                            <Settings size={18} />
                            <span className="text-sm font-medium">Settings</span>
                        </div>

                    </nav>
                </div>

                {/* Logout */}
                <div className="p-4 border-t border-neutral-800">
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            router.push("/login");
                        }}
                        className="w-full flex items-center gap-3 text-red-400 hover:bg-red-500/10 px-4 py-3 rounded-xl transition"
                    >
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">

                {/* Top Navbar */}
                <header className="h-16 border-b border-neutral-800 px-8 flex items-center justify-between">

                    <div>
                        <h2 className="text-lg font-semibold">Dashboard</h2>
                        <p className="text-sm text-neutral-400">
                            Welcome back
                        </p>
                    </div>

                    <div className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center">
                        <User size={18} />
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8 space-y-8">

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-6">

                        {/* Card */}
                        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-neutral-400">
                                    Account Status
                                </p>

                                <Activity size={18} className="text-blue-400" />
                            </div>

                            <h3 className="text-2xl font-semibold mt-4">
                                Active
                            </h3>

                            <p className="text-sm text-neutral-500 mt-2">
                                System running normally
                            </p>
                        </div>

                        {/* Card */}
                        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-neutral-400">
                                    Security
                                </p>

                                <ShieldCheck size={18} className="text-green-400" />
                            </div>

                            <h3 className="text-2xl font-semibold mt-4">
                                Protected
                            </h3>

                            <p className="text-sm text-neutral-500 mt-2">
                                JWT authentication enabled
                            </p>
                        </div>

                        {/* Card */}
                        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-neutral-400">
                                    Employees
                                </p>

                                <Users size={18} className="text-orange-400" />
                            </div>

                            <h3 className="text-2xl font-semibold mt-4">
                                24
                            </h3>

                            <p className="text-sm text-neutral-500 mt-2">
                                Total registered employees
                            </p>
                        </div>

                    </div>

                    {/* User Profile Section */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold">
                                User Profile
                            </h3>

                            <p className="text-sm text-neutral-400 mt-1">
                                Logged in employee information
                            </p>
                        </div>

                        {data ? (
                            <div className="grid grid-cols-2 gap-6">

                                <div>
                                    <p className="text-sm text-neutral-500">
                                        Full Name
                                    </p>

                                    <p className="mt-2 text-base font-medium">
                                        {data.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-neutral-500">
                                        Email Address
                                    </p>

                                    <p className="mt-2 text-base font-medium">
                                        {data.email}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-neutral-500">
                                        Department
                                    </p>

                                    <p className="mt-2 text-base font-medium">
                                        {data.department || "Not Assigned"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-neutral-500">
                                        Designation
                                    </p>

                                    <p className="mt-2 text-base font-medium">
                                        {data.designation || "Not Assigned"}
                                    </p>
                                </div>

                            </div>
                        ) : (
                            <div className="animate-pulse space-y-4">

                                <div className="h-4 bg-neutral-800 rounded w-1/4"></div>
                                <div className="h-4 bg-neutral-800 rounded w-1/2"></div>
                                <div className="h-4 bg-neutral-800 rounded w-1/3"></div>

                            </div>
                        )}
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold">
                                Recent Activity
                            </h3>

                            <p className="text-sm text-neutral-400 mt-1">
                                Latest account actions
                            </p>
                        </div>

                        <div className="space-y-4">

                            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                                <div>
                                    <p className="text-sm font-medium">
                                        Login successful
                                    </p>

                                    <p className="text-xs text-neutral-500 mt-1">
                                        JWT authentication completed
                                    </p>
                                </div>

                                <span className="text-xs text-neutral-500">
                                    Today
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                                <div>
                                    <p className="text-sm font-medium">
                                        Dashboard accessed
                                    </p>

                                    <p className="text-xs text-neutral-500 mt-1">
                                        User accessed protected route
                                    </p>
                                </div>

                                <span className="text-xs text-neutral-500">
                                    Today
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}