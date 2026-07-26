import Link from "next/link"
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

function CustomLink({ href, text, Icon }: { href: string, text: string, Icon: IconType }) {
    const pathname = usePathname();
    const isActive =
        href === "/admin"
            ? pathname === "/admin"
            : pathname === href || pathname.startsWith(`${href}/`);
    return (
        <li>
            <Link href={href} className={`${isActive && "bg-amber-100 text-amber-600"} flex items-center gap-3 p-3 rounded-xl text-gray-700 transition-all`}>
                <Icon size={20} />
                <span>{text}</span>
            </Link>
        </li>
    )
}

export default CustomLink;