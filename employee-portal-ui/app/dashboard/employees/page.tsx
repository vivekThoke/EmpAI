"use-client";

import api from "@/app/services/apiClient";
import { getUserRole } from "@/app/services/jwt";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EmployeePage() {
    const [users, setUsers] = useState<any[]>([]);

    const router = useRouter();

    useEffect(() => {
        const role = getUserRole();

        if (role !== "Admin") {
            router.push("/dashboard");
            return;
        }

        const fetchUsers = async () => {
            try {
                const res = await api.get("/user");

                setUsers(res.data);
            } catch {
                alert("Failed to load employees");
            }
        };

        fetchUsers();
    }, []);


    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Employee</h1>

            <table className="w-full border border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Department</th>
                        <th className="border p-2">Designation</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((u, index) => (
                        <tr key={index}>
                            <td className="border p-2">{u.name}</td>
                            <td className="border p-2">{u.email}</td>
                            <td className="border p-2">{u.department}</td>
                            <td className="border p-2">{u.designation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}   