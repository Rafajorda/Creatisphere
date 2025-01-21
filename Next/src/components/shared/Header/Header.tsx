"use client";

/**
 * Separamos la lógica de los datos del Header para que el componente client
 * no nos empeore el SEO. Ya que la carga de datos está en el servidor
 */

import { useState, useEffect } from "react";
import { HeaderData } from "./HeaderData";
import React from "react";
import { usePathname } from "next/navigation"; // Importamos useRouter
import { useSession } from "next-auth/react";

export const Header = () => {
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Usamos useRouter para obtener la ruta activa
    const pathname = usePathname();

    const { data: session } = useSession();

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            setShowHeader(false);
        } else {
            setShowHeader(true);
        }
        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className={`sticky top-0 z-50 transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
            {/* Le pasamos la ruta activa al componente HeaderData */}
            <HeaderData activeRoute={pathname} session={session} />
        </div>
    );
};
