import Image from "next/image";
import Link from "next/link";
import React from "react";

export const HeaderData = () => {
    return (
        <div className="bg-black text-white shadow-md">
            <nav className="mx-auto flex items-center justify-between px-20 pl-10 py-4">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" prefetch={false}>
                        <Image
                            src="/assets/logo/logo.png"
                            alt="BrandName Logo"
                            width={110}
                            height={100}
                            priority
                        />
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-8">
                    <Link href="/" prefetch={false} className="text-2xl">Home</Link>
                    <Link href="/shop" prefetch={false} className="text-2xl">Shop</Link>
                    <Link href="/Commisions" prefetch={false} className="text-2xl">Commisions</Link>
                    <Link href="/Portfolio" prefetch={false} className="text-2xl">Portfolio</Link>
                    <Link href="/contact" prefetch={false} className="text-2xl">Contact</Link>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <button
                        className="text-white hover:text-gray-300 focus:outline-none"
                        aria-label="Open Menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </nav>
        </div>
    );
};
