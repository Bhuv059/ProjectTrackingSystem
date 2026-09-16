"use client";
import "../styles/header.css";
import Image from "next/image";
interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="header-left">
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="menu-button lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={sidebarOpen}
        >
          <span className="text-2xl">{sidebarOpen ? "×" : "☰"}</span>
        </button>
        <Image
          src="/favicon.ico"
          alt="Project Tracker logo"
          width={42}
          height={42}
          className="app-logo"
        />
        <h1 className="app-title">ProjectTracker</h1>
      </div>

      <div className="header-right">
        <span className="welcome-text">Welcome back</span>

        <div className="profile-avatar">B</div>
      </div>
    </header>
  );
}
