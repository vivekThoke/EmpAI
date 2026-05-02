"use-client";

import { useEffect, useState } from "react";
import api from "../services/apiClient";
import { useRouter } from "next/router";
import { userAgentFromString } from "next/server";

export default function ProfilePage() {
    const [form, setForm] = useState({
        name: "",
        department: "",
        designation: "",
    });

    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await api.get("/user/me");

            setForm({
                name: res.data.name || "",
                department: res.data.department || "",
                designation: res.data.designation || "",
            });
        };

        fetchUser();
    }, []);

    const handleUpdate = async (e: any) => {
        e.preventDefault();

        await api.put("/user", form);

        alert("Profile updated successfull");

        router.push("/dashboard");
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">Update Profile</h1>

            <form onSubmit={handleUpdate} className="space-y-4">
                <input className="border p-2 w-full"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value})} 
                />

                <input className="border p-2 w-full"
                        placeholder="Department"
                        value={form.department}
                        onChange={(e) => setForm({ ...form, department: e.target.value})}
                />

                <input className="border p-2 w-full"
                        placeholder="Designation"
                        value={form.designation}
                        onChange={(e) => setForm({ ...form, designation: e.target.value})}
                />

                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Save
                </button>
            </form>
        </div>
    )

}