import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { io } from 'socket.io-client';
import { ArrowLeft, Bike, MessageCircle, Phone } from 'lucide-react';
import axios from 'axios';

const socket = io('http://localhost:5000');

const riderIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/71/71422.png',
    iconSize: [40, 40],
});

function RecenterMap({ lat, lng }) {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng]);
    }, [lat, lng]);
    return null;
}

const Tracking = ({ orderId, setView }) => {
    const [riderPos, setRiderPos] = useState({ lat: 31.5204, lng: 74.3587 });
    const [orderStatus, setOrderStatus] = useState('pending');

    useEffect(() => {
        // Order ka current status fetch karein
        const checkStatus = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/orders/order/${orderId}`);
                setOrderStatus(res.data.status);
            } catch (err) { console.error(err); }
        };
        checkStatus();

        socket.on(`receive_location_${orderId}`, (data) => {
            setRiderPos({ lat: data.lat, lng: data.lng });
        });

        return () => socket.off(`receive_location_${orderId}`);
    }, [orderId]);

    return (
        <div className="h-screen w-full relative bg-gray-100">
            {/* Header */}
            <div className="absolute top-6 left-6 right-6 z-[1000] flex justify-between items-center pointer-events-none">
                <button
                    onClick={() => setView('history')}
                    className="bg-black text-white p-4 rounded-2xl shadow-2xl pointer-events-auto flex items-center gap-2 font-bold hover:bg-gray-800 transition-all"
                >
                    <ArrowLeft size={20} /> Back
                </button>

                <div className="bg-white p-5 rounded-[2rem] shadow-2xl pointer-events-auto border-4 border-black">
                    <p className="font-black italic text-xl flex items-center gap-2 tracking-tighter uppercase">
                        <Bike className="text-[#98FF98]" />
                        {orderStatus === 'pending' ? 'Waiting for Rider...' : 'Rider is Moving!'}
                    </p>
                </div>
            </div>

            {/* Bottom Info Card */}
            <div className="absolute bottom-10 left-6 right-6 z-[1000] pointer-events-none">
                <div className="bg-white max-w-md mx-auto p-6 rounded-[3rem] border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] pointer-events-auto flex justify-between items-center">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase">Estimated Time</p>
                        <h4 className="text-2xl font-black italic">12-15 MINS</h4>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setView('chat')}
                            className="bg-[#98FF98] p-4 rounded-2xl border-2 border-black hover:scale-105 transition-all"
                        >
                            <MessageCircle size={24} />
                        </button>
                        <button className="bg-black text-white p-4 rounded-2xl border-2 border-black hover:scale-105 transition-all">
                            <Phone size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* LIVE MAP */}
            <MapContainer center={[riderPos.lat, riderPos.lng]} zoom={15} scrollWheelZoom={true} className="h-full w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[riderPos.lat, riderPos.lng]} icon={riderIcon}>
                    <Popup>Rider is here!</Popup>
                </Marker>
                <RecenterMap lat={riderPos.lat} lng={riderPos.lng} />
            </MapContainer>
        </div>
    );
};

export default Tracking;