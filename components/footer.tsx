import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import Image from "next/image";

const socialLinks = [
    {
        id: 1,
        name: "Instagram",
        link: "https://instagram.com/waistenprogramacion",
        icon: Instagram,
        username: "@waistenprogramacion"
    },
    {
        id: 2,
        name: "WhatsApp",
        link: "https://wa.me/5493446575620",
        icon: Phone,
        username: "+54 9 3446 57-5620"
    },
    {
        id: 3,
        name: "Email",
        link: "mailto:boriswaisten@gmail.com",
        icon: Mail,
        username: "boriswaisten@gmail.com"
    }
];

const Footer = () => {
    return (
        <footer className="bg-[#1a2332] text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Logo y descripción */}
                    <div className="space-y-4">
                        <Image 
                            src="/logoWaisten.svg"
                            alt="WaistenProgramación"
                            width={200}
                            height={200}
                            className="rounded-full "
                        />
                        <p className="text-gray-400 text-sm max-w-md">
                            Desarrollo de software profesional y soluciones tecnológicas innovadoras.
                        </p>
                    </div>

                    {/* Contacto */}
                    <div className="space-y-8">
                        <h3 className="text-xl font-semibold text-white mb-6">
                            CONTACTO
                        </h3>
                        <ul className="space-y-6">
                            {socialLinks.map((social) => (
                                <li key={social.id}>
                                    <Link 
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-gray-400 hover:text-white transition-colors"
                                    >
                                        <social.icon className="h-5 w-5 mr-3" />
                                        <span className="text-base">{social.username}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;