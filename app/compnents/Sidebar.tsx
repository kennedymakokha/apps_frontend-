import { Home, Settings, Users } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
    return (
        <aside className="w-64  bg-slate-700 text-white shadow h-full flex flex-col">
            <div className="text-xl font-bold p-4">Admin</div>
            <nav className="flex-1">
                <ul className="space-y-2 p-2">
                    <li className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
                        <Home size={18} /> Dashboard
                    </li>
                    <li className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
                        <Link href='/admin/qrcodes' className="flex gap-2" ><Users size={18} /> codes</Link>
                    </li>
                    <li className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
                        <Settings size={18} /> Settings
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
