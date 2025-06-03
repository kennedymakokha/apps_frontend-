// 

import Link from "next/link";
import { Chart } from "../compnents/Chart";
import { Navbar } from "../compnents/navbar";
import { Sidebar } from "../compnents/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-slate-700 text-black overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-4 overflow-y-auto bg-gray-50">
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
                        <div>
                            <div>
                                <h2 className="text-xl font-semibold">Coded</h2>
                                <Link href='/admin/qrcodes' className="text-2xl">120</Link>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h2 className="text-xl font-semibold">Revenue</h2>
                                <p className="text-2xl">$8,450</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h2 className="text-xl font-semibold">Orders</h2>
                                <p className="text-2xl">342</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h2 className="text-xl font-semibold">Sessions</h2>
                                <p className="text-2xl">1,023</p>
                            </div>
                        </div>
                    </div> */}
                  
                    {children}
                </main>
            </div>
        </div>
    );
}