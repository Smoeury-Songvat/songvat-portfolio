"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Content } from "@/components/contents/Content";

export default function Home() {
  const [theme, setTheme] = useState("primary");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "primary" ? "secondary" : "primary"));
  };
  return (
    <main className={`w-screen bg-${theme} text-${theme}-foreground `}>
      <Navbar theme={theme} toggleTheme={toggleTheme}></Navbar>
      <Content theme={theme}></Content>
    </main>
  );
}
