'use client';

import { useEffect, useState } from 'react';

type Device = {
    id: string;
    name: string;
    ip: string;
    hostname: string
};

type ApiDevice = {
    ip: string;
    hostname?: string;
};

export default function NetworkScanner() {
    const [localIP, setLocalIP] = useState('');
    const [devices, setDevices] = useState<Device[]>([]);
    const [error, setError] = useState('');

    // Basic IP fetch fallback (if needed for display)
    const getLocalIP = async () => {
        try {
            const res = await fetch('https://api64.ipify.org?format=json'); // Public IP (not local)
            const data = await res.json();
            setLocalIP(data.ip);
        } catch (err) {
            console.error('Failed to get IP address', err);
        }
    };

    const scanNetwork = async () => {
        try {
            const res = await fetch('http://185.113.249.137:5096/scan');

            const data: ApiDevice[] = await res.json();
            const formatted = data.map((d: ApiDevice, index: number) => ({
                id: String(index),
                name: `Device ${index + 1}`,
                ip: d.ip,
                hostname: d.hostname || 'Unknown',
            }));
            setDevices(formatted);
        } catch (err) {
            setError('Failed to fetch devices.');
            console.error('Error fetching devices:', err);
        }
    };

    useEffect(() => {
        getLocalIP();
        scanNetwork();
    }, []);

    return (
        <main className="min-h-screen bg-gray-100 text-black p-6">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Connected Devices</h1>
                <p className="text-sm text-gray-500 mb-4">Local/Public IP: {localIP || 'Fetching...'}</p>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <ul className="space-y-2">
                    {devices.map((device) => (
                        <li
                            key={device.id}
                            className="p-4 border border-gray-300 rounded hover:bg-gray-50 transition"
                        >
                            <p className="font-medium">{device.name}</p>
                            <p className="text-gray-600">{device.ip}</p>
                            <p className="font-medium">{device.hostname}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
