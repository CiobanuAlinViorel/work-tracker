"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Loader2, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import RegisterComponent from "../../types/RegisterComponent.type";

const inputBase = "w-full rounded-lg bg-[#2a5238] text-white placeholder-[#7aaa8a] text-sm px-4 py-3 outline-none focus:ring-2 focus:ring-[#4caf6e] transition border border-transparent disabled:opacity-50 disabled:cursor-not-allowed";
const inputError = "border-red-500";

export default function RegisterDesktop({
    register,
    handleRegister,
    isLoading,
    errors
}: RegisterComponent) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className="relative min-h-screen w-full flex flex-col bg-[#1a3320] overflow-hidden">
            <Image
                src="/kitty-desktop-register.png"
                alt="Kitty working in nature"
                fill
                className="object-cover object-center z-0"
                priority
            />
            <div className="absolute inset-0 bg-[#0d2218]/50 z-0" />

            {/* Top nav */}
            <header className="relative z-10 flex items-center justify-between px-8 pt-6 pb-4">
                <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="WorkTracker logo" width={30} height={30} />
                    <span className="text-white font-semibold text-xl tracking-wide" style={{ fontFamily: "'Georgia', serif" }}>
                        WorkTracker
                    </span>
                </div>
                <div className="flex items-center gap-5">
                    <Link href="/login" className="text-white/80 hover:text-white text-sm transition font-medium">
                        Log in
                    </Link>
                    <button type="button" className="text-white/60 hover:text-white transition" aria-label="More options">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
            </header>

            {/* Card */}
            <main className="relative z-10 flex flex-1 items-center justify-start px-12 py-8">
                <div className="w-full max-w-sm bg-[#1e3d28]/90 backdrop-blur-md rounded-2xl px-8 py-8 shadow-2xl flex flex-col gap-5">
                    <h1 className="text-white text-3xl font-bold leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
                        Track your time.
                        <br />
                        Own your day.
                    </h1>

                    <div className="flex flex-col gap-3">

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
                        className="w-full rounded-lg bg-[#3d9e5f] hover:bg-[#4caf6e] active:scale-95 text-white font-bold text-sm py-3 transition-all duration-150 shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
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

                    <p className="text-center text-[#7aaa8a] text-xs">
                        Already have an account?{" "}
                        <Link href="/login" className="text-white underline underline-offset-2 hover:text-[#4caf6e] transition">
                            Log In
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}