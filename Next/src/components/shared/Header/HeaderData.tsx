import Image from "next/image";
import Link from "next/link";
import React from "react";


interface HeaderDataProps {
    activeRoute: string; // Recibimos activeRoute como prop
    session: any;
}

export const HeaderData: React.FC<HeaderDataProps> = ({ activeRoute, session }) => {



    return (
        <div className="bg-black text-light-gold font-semibold shadow-md">
            <nav className="mx-auto flex items-center justify-between px-20 pl-10 py-4">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" prefetch={false}>
                        <Image
                            src="/assets/logo/logo.png"
                            alt="BrandName Logo"
                            width={100}
                            height={100}
                            priority
                        />
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-4 group-hover:opacity-100">
                    <Link
                        href="/"
                        prefetch={false}
                        className={`text-2xl px-4 py-1 rounded-lg hover:text-black hover:bg-gray-300 transition-colors duration-200 ${activeRoute === "/" ? "text-black bg-white" : ""}`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/Shop"
                        prefetch={false}
                        className={`text-2xl px-4 py-1 rounded-lg hover:text-black hover:bg-gray-300 transition-colors duration-200 ${activeRoute === "/Shop" ? "text-black bg-white" : ""}`}
                    >
                        Shop
                    </Link>
                    <Link
                        href="/Commissions"
                        prefetch={false}
                        className={`text-2xl px-4 py-1 rounded-lg hover:text-black hover:bg-gray-300 transition-colors duration-200 ${activeRoute === "/Commissions" ? "text-black bg-white" : ""}`}
                    >
                        Commissions
                    </Link>
                    <Link
                        href="/Portfolio"
                        prefetch={false}
                        className={`text-2xl px-4 py-1 rounded-lg hover:text-black hover:bg-gray-300 transition-colors duration-200 ${activeRoute === "/Portfolio" ? "text-black bg-white" : ""}`}
                    >
                        Portfolio
                    </Link>
                    {!session ? (
                        <Link
                            href="/Login"
                            prefetch={false}
                            className={`text-2xl font-bold text-black bg-gold px-4 py-2 rounded-lg hover:bg-dark-gold hover:text-white transition-colors duration-200 ${activeRoute === "/Auth" ? "bg-dark-gold text-white" : ""
                                }`}
                        >
                            Sign in
                        </Link>
                    ) :
                        <Link
                            href={`/Profile/${session.user.username}`}
                            prefetch={false}
                            className={`text-2xl font-bold text-black bg-gold px-4 py-2 rounded-lg hover:bg-dark-gold hover:text-white transition-colors duration-200 ${activeRoute === "/Profile" ? "bg-dark-gold text-white" : ""
                                }`}
                        >
                            {session.user.username}
                        </Link>
                    }
                </div>
            </nav>
        </div>
    );
};
