'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const [url, setUrl] = useState('');
    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');
    const [color, setColor] = useState('#000000');
    const [background, setBackground] = useState('#ffffff');
    const [wifi, setWifi] = useState(false);
    const [qrImage, setQrImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [logo, setLogo] = useState<File | null>(null);

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:7000';

    const handleLogoChange = (file: File | null) => {
        if (file && !file.type.startsWith('image/')) {
            setError('Only image files are allowed.');
            return;
        }

        if (file && file.size > 1024 * 1024) {
            setError('Image must be less than 1MB.');
            return;
        }

        setLogo(file);
    };

    const getContrastColor = (hex: string) => {
        const r = parseInt(hex.substr(1, 2), 16);
        const g = parseInt(hex.substr(3, 2), 16);
        const b = parseInt(hex.substr(5, 2), 16);
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000' : '#fff';
    };

    // const handleGenerate = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setError('');
    //     setQrImage('');

    //     try {
    //         const formData = new FormData();
    //         if (wifi) {
    //             formData.append('ssid', ssid);
    //             formData.append('password', password);
    //         } else {
    //             formData.append('url', url);
    //         }

    //         formData.append('color', color);
    //         formData.append('background', background);
    //         if (logo) formData.append('logo', logo);

    //         const endpoint = wifi ? `${API_BASE}/api/generate-qr` : `${API_BASE}/api/generate-qrtolink`;
    //         const res = await axios.post(endpoint, formData);
    //         setQrImage(res.data.qrImage);
    //     } catch (err: any) {
    //         setError(err.response?.data?.error || 'QR generation failed');
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setQrImage('');

        try {
            const formData = new FormData();
            if (wifi) {
                formData.append('ssid', ssid);
                formData.append('password', password);
            } else {
                formData.append('url', url);
            }

            formData.append('color', color);
            formData.append('background', background);
            if (logo) formData.append('logo', logo);

            // Correct endpoints matching your backend
            const endpoint = wifi
                ? `${API_BASE}/api/wifi`     // WiFi generate QR
                : `${API_BASE}/api/url`; // URL generate QR

            const res = await axios.post(endpoint, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setQrImage(res.data.qrImage);
        } catch (err: any) {
            setError(err.response?.data?.error || 'QR generation failed');
        } finally {
            setLoading(false);
        }
    };

    // const handleDownload = async () => {
    //     try {
    //         const formData = new FormData();
    //         if (wifi) {
    //             formData.append('ssid', ssid);
    //             formData.append('password', password);
    //         } else {
    //             formData.append('url', url);
    //         }

    //         formData.append('color', color);
    //         formData.append('background', background);
    //         if (logo) formData.append('logo', logo);

    //         const endpoint = wifi ? `${API_BASE}/api/generate-qr` : `${API_BASE}/api/download-qrtolink`;

    //         const res = await axios.post(endpoint, formData, { responseType: 'blob' });
    //         const blob = new Blob([res.data], { type: 'image/png' });
    //         const link = document.createElement('a');
    //         link.href = URL.createObjectURL(blob);
    //         link.download = 'qr-code.png';
    //         link.click();
    //     } catch {
    //         setError('Download failed');
    //     }
    // };
    const handleDownload = async () => {
        try {
            const formData = new FormData();
            if (wifi) {
                formData.append('ssid', ssid);
                formData.append('password', password);
            } else {
                formData.append('url', url);
            }

            formData.append('color', color);
            formData.append('background', background);
            if (logo) formData.append('logo', logo);

            // Correct endpoints matching your backend
            const endpoint = wifi
                ? `${API_BASE}/api/wifi/download`       // WiFi download QR
                : `${API_BASE}/api/url/download`;  // URL download QR

            const res = await axios.post(endpoint, formData, {
                responseType: 'blob',
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const blob = new Blob([res.data], { type: 'image/png' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'qr-code.png';
            link.click();
        } catch {
            setError('Download failed');
        }
    };

    useEffect(() => {
        if (qrImage) {
            const timer = setTimeout(() => {
                setQrImage('');
                setUrl('');
                setSsid('');
                setPassword('');
                setColor('#000000');
                setBackground('#ffffff');
                setLogo(null);
                alert('QR code expired. Please regenerate.');
            }, 10 * 60 * 1000);
            return () => clearTimeout(timer);
        }
    }, [qrImage]);

    const isFormValid = wifi ? ssid && password : url;

    const Button = ({ onClick, text, active }: { onClick: () => void; text: string; active: boolean }) => (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center justify-center w-full py-2 border rounded-md ${active ? 'bg-slate-800 text-blue-400' : 'bg-white'
                }`}
        >
            {text}
        </button>
    );

    return (
        <main className="min-h-screen text-black bg-slate-800 flex items-center justify-center p-4">
            <div className="bg-white shadow-xl rounded-lg max-w-md w-full p-6">
                <h1 className="text-2xl font-bold text-center mb-6">QR Code Generator</h1>

                <div className="flex w-full px-2 h-10 gap-2 mb-4">
                    <Button text="URL" onClick={() => { setWifi(false); setQrImage(''); }} active={!wifi} />
                    <Button text="WiFi" onClick={() => { setWifi(true); setQrImage(''); }} active={wifi} />
                </div>

                <form onSubmit={handleGenerate} className="space-y-4">
                    {!wifi ? (
                        <div className="border border-slate-300 rounded-md p-2">
                            <label htmlFor="url" className="block text-sm font-medium">URL</label>
                            <input
                                id="url"
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                                className="w-full mt-1 border bg-blue-100 rounded px-3 py-2"
                                placeholder="https://example.com"
                            />
                        </div>
                    ) : (
                        <div className="border border-slate-300 rounded-md p-2">
                            <div className="mb-2">
                                <label htmlFor="ssid" className="block text-sm font-medium">SSID</label>
                                <input
                                    id="ssid"
                                    type="text"
                                    value={ssid}
                                    onChange={(e) => setSsid(e.target.value)}
                                    required
                                    className="w-full mt-1 border bg-blue-100 rounded px-3 py-2"
                                    placeholder="Network name"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full mt-1 border bg-blue-100 rounded px-3 py-2"
                                    placeholder="Network password"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex space-x-4">
                        <div className="flex-1 flex flex-col items-center">
                            <label className="block text-sm font-medium" style={{ color: getContrastColor(color) }}>Foreground</label>
                            {!qrImage && (
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-20 h-10"
                                />
                            )}
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                            <label className="block text-sm font-medium" style={{ color: getContrastColor(background) }}>Background</label>
                            {!qrImage && (
                                <input
                                    type="color"
                                    value={background}
                                    onChange={(e) => setBackground(e.target.value)}
                                    className="w-20 h-10"
                                />
                            )}
                        </div>
                    </div>

                    {!qrImage && (
                        <label className="block text-sm font-medium">
                            Logo (optional)
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleLogoChange(e.target.files?.[0] || null)}
                                className="w-full border bg-blue-100 rounded px-3 py-2 mt-1"
                            />
                        </label>
                    )}

                    {!qrImage && (
                        <button
                            type="submit"
                            disabled={loading || !isFormValid}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                        >
                            {loading ? 'Generating...' : 'Generate QR'}
                        </button>
                    )}
                </form>

                {qrImage && (
                    <div className="mt-6 text-center">
                        <img src={qrImage} alt="QR Code" className="mx-auto max-w-full" />
                        <button
                            onClick={handleDownload}
                            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
                        >
                            Download
                        </button>
                    </div>
                )}

                {error && <p className="mt-4 text-red-600 text-sm text-center">{error}</p>}
            </div>
        </main>
    );
}
