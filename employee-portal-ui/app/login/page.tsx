"use client";

import { useForm } from "react-hook-form";
import api from "../services/apiClient";
import { useRouter } from "next/router";

export default function LoginPage() {
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    const onSubmit = async (data: any) => {
        const res = await api.post("/auth/login", data);

        localStorage.setItem("token", res.data.token);

        router.push("/dashboard");
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("email")} placeholder="Email" />
                <input {...register("password")} type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}