'use client'

import React from "react";
import { useState, useEffect} from "react";
import Image from "next/image";
import Sidebar from "./Components/Sidebar";
import useSocket from "./hooks/useSocket";
import SyncLoader from "react-spinners/SyncLoader";
import { DrownsyLogs } from "./DrownsyLogs";

export default function Dashboard() {
    const [StatePage, setStatePage] = useState(0);
    const { CO2Data, AlcoholData } = useSocket();

    const { Sleepstat } = useSocket();
    const [fileCount, setFileCount] = useState(null);

    useEffect(() => {
      const fetchFileCount = async () => {
        const response = await fetch('/api/fileCount');
        const data = await response.json();
        setFileCount(data.count);
        
      };
  
      fetchFileCount();
    }, []);



  return (
    <>
    <div className="bg-gradient-to-r from-blue-50 to-blue-200 min-h-screen flex">
        <nav className="w-64 h-screen bg-[#2D3A4B] text-white flex flex-col shadow-xl">
            <div className="p-6 border-b-2 border-[#cccbc8]">
                <h1 className="text-2xl font-extrabold text-white">
                Fatigue Detection
                </h1>
            </div>

            <div className="flex-1 space-y-4 p-6">
                <div
                onClick={() => setStatePage(0)}
                className="block text-lg font-medium text-gray-300 hover:bg-[#dcdcdc] hover:text-[#071952] rounded-lg py-2 px-4 transition duration-300"
                >
                Dashboard
                </div>
                <div
                onClick={() => setStatePage(1)}
                className="block text-lg font-medium text-gray-300 hover:bg-[#dcdcdc] hover:text-[#071952] rounded-lg py-2 px-4 transition duration-300"
                >
                Logs
                </div>
            </div>

            
        </nav>

      {StatePage === 0 && 
      <main className="flex-1 p-8 space-y-8">
        <h1 className="flex justify-center text-4xl font-semibold text-gray-800 mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center justify-center space-y-6 min-h-[220px] border-t-4 border-[#071952] transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="text-xl font-semibold text-gray-700">
              CO2 Level
            </div>
            <div className="text-6xl font-extrabold text-[#071952]">
            {CO2Data ? (
              typeof CO2Data === 'string' 
                ? (parseFloat(CO2Data.match(/\d+\.\d+/)?.[0]) || 0)
                : CO2Data
            ) : (
              <p className="flex flex-col animate-pulse text-2xl pb-2 justify-center items-center">
                <SyncLoader className="mt-4"/><br/>
                Waiting for CO2 data...
              </p>
            )}
              <span className="block text-xl font-normal text-gray-500 text-center">
                ppm
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center justify-center space-y-6 min-h-[220px] border-t-4 border-[#071952] transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="text-xl font-semibold text-gray-700">
              Alcohol Level
            </div>
            <div className="text-6xl font-extrabold text-[#071952]">
            {AlcoholData ? (
              typeof AlcoholData === 'string' 
                ? parseFloat(AlcoholData.replace(/[^\d.]/g, '')) 
                : AlcoholData
            ) : (
              <p className="flex flex-col text-2xl pb-2 justify-center items-center animate-pulse">
                <SyncLoader className="mt-4"/><br/>
                Waiting for Alcohol data...
              </p>
            )}
              <span className="block text-xl font-normal text-gray-500 text-center">
                ppm
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center justify-center space-y-6 min-h-[220px] border-t-4 border-[#071952] transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="text-xl font-semibold text-gray-700">
              Drwonsy Stats
            </div>
            <div className="text-6xl font-extrabold text-[#071952]">
            {fileCount !== null ? (
              fileCount
            ) : (
              <span className="flex animate-pulse text-3xl pb-4">Fetching Data...</span>
            )}
              <span className="block text-xl font-normal text-gray-500 text-center">
                Times
              </span>
            </div>
          </div>

          
        </div>
      </main>}
      {StatePage === 1 && <DrownsyLogs/>}
    </div>
  </>
  );
}