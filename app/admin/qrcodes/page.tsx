'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWifi, FaLink } from 'react-icons/fa';
import { AiOutlineReload } from 'react-icons/ai';
import Link from 'next/link';

interface QRCode {
    _id: string;
    type: 'wifi' | 'url';
    active: boolean;
    color: string;
    background: string;
    scanCount: number;
    data: {
        ssid?: string;
        password?: string;
        url?: string;
    };
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:7000';

export default function AdminDashboard() {
    const [qrcodes, setQrcodes] = useState<QRCode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchQRCodes();
    }, []);

    const fetchQRCodes = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE}/api/qrcodes`);
            setQrcodes(res.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch QR codes');
        } finally {
            setLoading(false);
        }
    };

    const toggleActive = async (id: string) => {
        try {
            const res = await axios.get(`${API_BASE}/api/toggle/${id}`);
            if (res.data.success) {
                setQrcodes(prev =>
                    prev.map(qr =>
                        qr._id === id ? { ...qr, active: res.data.active } : qr
                    )
                );
            }
        } catch (err) {
            alert('Failed to toggle QR status');
        }
    };

    return (
        <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen font-sans">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold tracking-tight">Admin QR Dashboard</h1>
                <button
                    onClick={fetchQRCodes}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-md text-sm font-medium"
                >
                    <AiOutlineReload /> Refresh
                </button>
            </div>

            {loading ? (
                <p className="text-center animate-pulse">Loading QR codes...</p>
            ) : error ? (
                <p className="text-red-400 text-center">{error}</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden shadow-lg text-sm">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="p-4 text-left">ID</th>
                                <th className="p-4 text-left">Type</th>
                                <th className="p-4 text-left">Data</th>
                                <th className="p-4 text-left">scanCount</th>
        <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {qrcodes.map((qr, index) => (
                                <tr key={qr._id} className={`border-t border-gray-600 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-850'}`}>
                                    <td className="p-4 font-mono text-gray-300">{qr._id.slice(-6)}</td>
                                    <td className="p-4 flex items-center gap-2 capitalize">
                                        {qr.type === 'wifi' ? <FaWifi /> : <FaLink />}
                                        {qr.type}
                                    </td>
                                    <td className="p-4">
                                        {qr.type === 'wifi' ? (
                                            <>
                                                <div><span className="font-semibold">SSID:</span> {qr.data.ssid}</div>
                                                <div><span className="font-semibold">Password:</span> {qr.data.password}</div>
                                            </>
                                        ) : (
                                            <a href={qr.data.url} className="text-blue-400 underline hover:text-blue-300" target="_blank" rel="noreferrer">
                                                {qr.data.url}
                                            </a>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 text-xs rounded-full font-semibold transition ${qr.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                            {qr.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 text-xs rounded-full font-semibold transition ${qr.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                            {qr.scanCount}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <Link href={`/admin/qrcodes/${qr._id}`} className={`px-3 py-1 text-xs rounded-full font-semibold transition ${qr.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                            View
                                        </Link>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => toggleActive(qr._id)}
                                            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition text-sm"
                                        >
                                            Toggle
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
