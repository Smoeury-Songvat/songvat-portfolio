import { SunMoon, MapPinHouse, Globe, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Phnom_Penh",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(now);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const bgTheme = theme === "secondary" ? "bg-slate-200" : "bg-slate-800";

  return (
    <header className="w-full flex flex-row justify-between p-3 md:p-5 md:fixed md:z-20">
      <button
        onClick={toggleTheme}
        className={`cursor-pointer rounded-md p-1 ${bgTheme}`}
      >
        <SunMoon size={18} />
      </button>
      <section className="flex items-center justify-center gap-1.5">
        <div
          className={`flex items-center justify-center gap-1 px-1.5 py-1 rounded-md ${bgTheme}`}
        >
          <MapPinHouse size={12} />
          <p className="text-[10px] font-sans font-medium ">PHNOM PENH</p>
        </div>
        <div
          className={`flex items-center justify-center gap-1 px-1.5 py-1 rounded-md ${bgTheme}`}
        >
          <Globe size={12} />
          <p className="text-[10px]">GMT+7</p>
        </div>
        <div
          className={`flex items-center justify-center gap-1 px-1.5 py-1 rounded-md ${bgTheme}`}
        >
          <Clock size={12} />
          <time className="text-[10px]">{time}</time>
        </div>
      </section>
    </header>
  );
};

export { Navbar };
