'use client';

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <motion.section
            className="bg-gradient-to-b from-slate-600 to-slate-400 text-white py-24 px-6 text-center"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h1 className="text-5xl font-bold mb-4">All Your Online Tools in One Place</h1>
            <p className="text-lg mb-6">A powerful suite of web applications to simplify your workflow.</p>
            <div className="space-x-4">
                <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg shadow hover:bg-gray-100">
                    Get Started
                </button>
                <button className="border border-white py-2 px-6 rounded-lg hover:bg-white hover:text-blue-600">
                    Explore Apps
                </button>
            </div>
        </motion.section>
    );
}
