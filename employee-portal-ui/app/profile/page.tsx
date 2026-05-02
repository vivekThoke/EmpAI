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
}