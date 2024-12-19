// 'use client'
// import { useEffect, useState } from "react";.
// import { io } from "socket.io-client";

// const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://superdoggez.trueddns.com:10618";

// const useSocket = () => {
//   const [socket, setSocket] = useState(null);
//   const [CO2Data, setCO2Data] = useState(null);
//   const [AlcoholData, setAlcoholData] = useState(null);
  
//   useEffect(() => {
//     const newSocket = io(SOCKET_URL, { transports: ["websocket"] });
//     setSocket(newSocket);

//     newSocket.on("connect", () => {
//       console.log("Connected to WebSocket server:", newSocket.id);
//     });

//     newSocket.on("updateData", (data) => {
//       console.log("Received CO2 data:", data);
//       setCO2Data(data);
//     });

//     newSocket.on("updateData", (data2) => {
//       console.log("Received Alcohol data:", data2);
//       setAlcoholData(data2);
//     });

//     newSocket.on("disconnect", () => {
//       console.log("Disconnected from WebSocket server");
//     });

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   return { socket, CO2Data, AlcoholData };
// };

// export default useSocket;


'use client'
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://192.168.1.50:3002";

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [CO2Data, setCO2Data] = useState(null);
  const [AlcoholData, setAlcoholData] = useState(null);
  
  useEffect(() => {
    const newSocket = io(SOCKET_URL, { transports: ["websocket"] });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server:", newSocket.id);
    });

    newSocket.on("updateCO2Data", (data) => {
      console.log("Received CO2 data:", data);
      setCO2Data(data);
    });

    newSocket.on("updateAlcoholData", (data2) => {
      console.log("Received Alcohol data:", data2);
      setAlcoholData(data2);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return { socket, CO2Data, AlcoholData };
};

export default useSocket;
