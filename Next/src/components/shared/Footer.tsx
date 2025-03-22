import React from 'react';
// import { Twitter, Instagram, Linkedin } from 'lucide-react';
import { TwitterIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-stone-900 text-white text-center p-10">
            <p>&copy; {new Date().getFullYear()} Creatisphere. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label='Twitter'>
                    <TwitterIcon className="w-6 h-6 text-white hover:text-blue-500" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label='Instagram'>
                    <InstagramIcon className="w-6 h-6 text-white hover:text-pink-500" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label='Linkedin'>
                    <LinkedinIcon className="w-6 h-6 text-white hover:text-blue-300" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;