"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import RegisterComponent from "../../types/RegisterComponent.type";

const inputBase = "w-full rounded-lg bg-[#2a5238] text-white placeholder-[#7aaa8a] text-sm px-4 py-3 outline-none focus:ring-2 focus:ring-[#4caf6e] transition border border-transparent disabled:opacity-50 disabled:cursor-not-allowed";
const inputError = "border-red-500";

export default function RegisterMobile({
    register,
    handleRegister,
    isLoading,
    errors
}: RegisterComponent) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className="relative min-h-screen w-full flex flex-col bg-[#1a3320] overflow-hidden">
            {/* Header */}
            <header className="relative z-10 flex items-center gap-2 px-5 pt-10 pb-2">
                <Image src="/logo.png" alt="WorkTracker logo" width={28} height={28} />
                <span className="text-white font-semibold text-lg tracking-wide" style={{ fontFamily: "'Georgia', serif" }}>
                    WorkTracker
                </span>
            </header>

            {/* Hero image */}
            <div className="relative w-full" style={{ height: "38vh", minHeight: 220 }}>
                <Image
                    src="/kitty-mobile-register.png"
                    alt="Kitty working in nature"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1e3d28] to-transparent" />
            </div>

            {/* Card */}
            <div className="relative z-10 mx-4 -mt-6 rounded-2xl bg-[#1e3d28] px-6 pt-6 pb-8 flex flex-col gap-4 shadow-2xl">
                <h1 className="text-white text-2xl font-bold leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
                    Track your time.
                    <br />
                    Own your day.
                </h1>

                <div className="flex flex-col gap-3 mt-1">

                    {/* Username */}
                    <div className="flex flex-col gap-1">
                        <input
                            type="text"
                            placeholder="Full Name"
                            disabled={isLoading}
                            className={`${inputBase} ${errors.username ? inputError : ""}`}
                            {...register("username")}
                        />
                        {errors.username && (
                            <p className="text-red-400 text-xs px-1">{errors.username.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <input
                            type="email"
                            placeholder="Email Address"
                            disabled={isLoading}
                            className={`${inputBase} ${errors.email ? inputError : ""}`}
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-red-400 text-xs px-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1">
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                disabled={isLoading}
                                className={`${inputBase} pr-11 ${errors.password ? inputError : ""}`}
                                {...register("password")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                disabled={isLoading}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7aaa8a] hover:text-white transition disabled:opacity-50"
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-400 text-xs px-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Confirm password */}
                    <div className="flex flex-col gap-1">
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="Confirm Password"
                                disabled={isLoading}
                                className={`${inputBase} pr-11 ${errors.passwordConfirmation ? inputError : ""}`}
                                {...register("passwordConfirmation")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm((v) => !v)}
                                disabled={isLoading}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7aaa8a] hover:text-white transition disabled:opacity-50"
                                aria-label="Toggle confirm password visibility"
                            >
                                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {errors.passwordConfirmation && (
                            <p className="text-red-400 text-xs px-1">{errors.passwordConfirmation.message}</p>
                        )}
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="button"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-[#3d9e5f] hover:bg-[#4caf6e] active:scale-95 text-white font-bold text-sm py-3 mt-1 transition-all duration-150 shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                    onClick={handleRegister}
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Creating account...
                        </>
                    ) : (
                        "Sign Up"
                    )}
                </button>

                <p className="text-center text-[#7aaa8a] text-xs mt-1">
                    Already have an account?{" "}
                    <Link href="/login" className="text-white underline underline-offset-2 hover:text-[#4caf6e] transition">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
}