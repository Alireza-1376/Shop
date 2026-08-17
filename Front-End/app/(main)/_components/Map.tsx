"use client"
import "@/lib/leaflet";
import { Marker, Popup } from 'react-leaflet'
import { MapContainer } from 'react-leaflet'
import { TileLayer } from 'react-leaflet/TileLayer'

function Map() {
    const position: [number, number] = [35.806994196528876, 51.42950713634492]

    return (
        <MapContainer className='w-full h-80 z-10' center={position} zoom={16} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>

                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map


