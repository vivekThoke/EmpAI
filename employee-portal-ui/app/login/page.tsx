"use client";

import { useForm } from "react-hook-form";
import api from "../services/apiClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const router = useRouter();

    const onSubmit = async (data: any) => {
        try {
            const res = await api.post("/Auth/login", data);
            localStorage.setItem("token", res.data);
            router.push("/dashboard");
        } catch (err: any) {
            alert(err.response?.data || "Login Failed");
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center font-sans text-white">

            {/* Card */}
            <div className="w-[400px] px-8 py-10 rounded-2xl 
                            bg-[#121212]/80 backdrop-blur-xl 
                            border border-white/10 
                            shadow-[0_0_40px_rgba(0,0,0,0.6)]">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Sign in
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Access your enterprise dashboard
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-xs text-gray-400 font-medium tracking-wide">
                            EMAIL
                        </label>

                        <input
                            {...register("email", { required: "Email is required" })}
                            placeholder="you@company.com"
                            className="w-full px-3 py-2.5 rounded-lg 
                                       bg-[#0A0A0A] border border-white/10 
                                       text-sm text-white
                                       placeholder:text-gray-500
                                       focus:outline-none 
                                       focus:border-blue-500 
                                       focus:ring-1 focus:ring-blue-500
                                       transition-all"
                        />

                        {errors.email && (
                            <p className="text-[11px] text-orange-400">
                                {errors.email.message as string}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="text-xs text-gray-400 font-medium tracking-wide">
                            PASSWORD
                        </label>

                        <input
                            {...register("password", { required: "Password is required" })}
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-3 py-2.5 rounded-lg 
                                       bg-[#0A0A0A] border border-white/10 
                                       text-sm text-white
                                       placeholder:text-gray-500
                                       focus:outline-none 
                                       focus:border-blue-500 
                                       focus:ring-1 focus:ring-blue-500
                                       transition-all"
                        />

                        {errors.password && (
                            <p className="text-[11px] text-orange-400">
                                {errors.password.message as string}
                            </p>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 py-2.5 rounded-lg text-sm font-medium
                                   bg-gradient-to-r from-blue-600 to-orange-500
                                   hover:opacity-90 active:scale-[0.99]
                                   transition-all duration-200
                                   disabled:opacity-50 cursor-pointer"
                    >
                        {isSubmitting ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-500">
                        New User?{" "}
                        <span
                            onClick={() => router.push("/register")}
                            className="text-blue-400 cursor-pointer hover:underline"
                        >
                            Register
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}