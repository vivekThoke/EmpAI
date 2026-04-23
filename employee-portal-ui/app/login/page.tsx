"use client";

import { useForm } from "react-hook-form";
import api from "../services/apiClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { register, handleSubmit, formState: {errors}, } = useForm();
    const router = useRouter();

    const onSubmit = async (data: any) => {
        try {
            const res = await api.post("/Auth/login", data);
            localStorage.setItem("token", res.data.token);
            router.push("/dashboard");
        }
        catch (err: any) {
            alert(err.response?.data || "Login Failed");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit(onSubmit)}
                    className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl mb-4">Login</h2>

                <input 
                    {...register("email", {required: "Email is required"})} 
                    placeholder="Email"
                    className="w-full mb-3 p-2 border rounded" />

                <input 
                    {...register("password", {required: "Password is required"})} 
                    type="password" 
                    placeholder="Password"
                    className="w-full mb-3 p-2 border rounded" />

                <button type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
            </form>
        </div>
    )
}