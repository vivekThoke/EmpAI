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


    
}   