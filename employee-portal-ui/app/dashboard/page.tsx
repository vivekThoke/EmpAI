"use client";

import { useEffect, useState } from "react";
import api from "../services/apiClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [data, setData] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push("/login");
            return;
        }

        const fetchData = async () => {
            try {
                const res = await api.get("/user/me");
                setData(res.data);
            }
            catch (err) {
                router.push("/login");
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>{data}</p>
            <button onClick={() => {
                localStorage.removeItem("token");
                router.push("/login");
            }}>
                Logout 
            </button>
        </div>
    )
}