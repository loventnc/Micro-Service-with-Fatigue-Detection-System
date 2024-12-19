'use client'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;

export default function TestPage() {
  const [sensorData, setSensorData] = useState(null); 
  const [connected, setConnected] = useState(false); 
  const [images, setImages] = useState([]); // สเตทใหม่สำหรับเก็บรายการรูปภาพ

  useEffect(() => {
    socket = io('http://superdoggez.trueddns.com:10618'); 

    socket.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
    });

    // เมื่อได้รับข้อมูลเซ็นเซอร์
    socket.on('updateData', (data) => {
      console.log('Received data:', data);
      setSensorData(data); 
    });

    // เมื่อได้รับข้อมูลรูปภาพจาก server
    socket.on('imageSaved', (data) => {
      console.log('Received image saved confirmation:', data);
      if (data.message) {
        // เพิ่มรายการรูปภาพในสเตท
        setImages(prevImages => [
          ...prevImages,
          { filename: data.filename, timestamp: new Date().toLocaleString() }
        ]);
      }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Test Page - Sensor Data</h1>
      <p>
        <strong>Status:</strong>{' '}
        {connected ? (
          <span style={{ color: 'green' }}>Connected</span>
        ) : (
          <span style={{ color: 'red' }}>Disconnected</span>
        )}
      </p>

      <div style={{ marginTop: '20px' }}>
        <h2>Sensor Data</h2>
        {sensorData ? (
          <pre
            style={{
              background: '#f4f4f4',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd',
            }}
          >
            {JSON.stringify(sensorData, null, 2)}
          </pre>
        ) : (
          <p>No data received yet...</p>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Detected Drowsy Images</h2>
        {images.length > 0 ? (
          <ul>
            {images.map((image, index) => (
              <li key={index}>
                <strong>{image.filename}</strong> (Detected at: {image.timestamp})
                <br />
                <img
                  src={`http://192.168.1.50:3001/uploads/${image.filename}`}
                  alt={image.filename}
                  style={{ maxWidth: '200px', marginTop: '10px' }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No drowsy images detected yet...</p>
        )}
      </div>
    </div>
  );
}