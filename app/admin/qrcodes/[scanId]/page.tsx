'use client';

import { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useSearchParams, useParams } from 'next/navigation';
import axios from 'axios';

const containerStyle = {
    width: '100%',
    height: '400px',
};

interface Scan {
    ip: string;
    geo?: {
        ll?: [number, number];
        city?: string;
        country?: string;
    };
    timestamp: string;
}
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:7000';
export default function ScanDetailPage() {
    const params = useParams();
    const scanId = params.scanId as string;
    const searchParams = useSearchParams();
    const from = searchParams.get('from');
    console.log("From param:", from);

    const [scan, setScan] = useState<Scan | null>(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyBBYlYdpbci4zBhCSyLAJngOBLR3cRCGJA', // Replace with env var in production
    });

    useEffect(() => {
        if (!scanId) return;
        const getData = async () => {
            const res = await axios.get(`${API_BASE}/api/qrcodes`);
            setScan(res.data)
        }
        getData()
       
    }, [scanId]);
    if (!scan || !isLoaded) return <p>Loading...</p>;

    const position = {
        lat: scan.geo?.ll?.[0] || 0,
        lng: scan.geo?.ll?.[1] || 0,
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Scan Detail</h1>
            <p><strong>IP:</strong> {scan.ip}</p>
            <p><strong>Location:</strong> {scan.geo?.city || 'N/A'}, {scan.geo?.country || 'N/A'}</p>
            <p><strong>Time:</strong> {new Date(scan.timestamp).toLocaleString()}</p>

            <div className="mt-6">
                <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={10}>
                    <Marker position={position} />
                </GoogleMap>
            </div>
        </div>
    );
}
