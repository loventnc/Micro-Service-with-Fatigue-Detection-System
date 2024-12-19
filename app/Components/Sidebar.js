'use client'
import Link from "next/link";

export default function Sidebar() {
  return (
    <nav className="w-64 h-screen bg-[#2D3A4B] text-white flex flex-col shadow-xl">
      <div className="p-6 border-b-2 border-[#cccbc8]">
        <h1 className="text-2xl font-extrabold text-white">
          Fatigue Detection
        </h1>
      </div>

      <div className="flex-1 space-y-4 p-6">
        <div
          className="block text-lg font-medium text-gray-300 hover:bg-[#dcdcdc] hover:text-[#071952] rounded-lg py-2 px-4 transition duration-300"
        >
          Dashboard
        </div>
        <div

          className="block text-lg font-medium text-gray-300 hover:bg-[#dcdcdc] hover:text-[#071952] rounded-lg py-2 px-4 transition duration-300"
        >
          Logs
        </div>
      </div>

      <div className="p-6 border-t-2 border-[#cccbc8]">
        <h2 className="text-lg font-semibold text-white">Teams</h2>
        <ul className="space-y-4 mt-4">
          <li>
            <span className="text-gray-300">406 Chanchanon</span>
          </li>
          <li>
            <span className="text-gray-300">422 Manotham</span>
          </li>
          <li>
            <span className="text-gray-300">435 Nattanischa</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
