"use client";
import "../styles/header.css";

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

        <h1 className="app-title">ProjectTracker</h1>
      </div>

      <div className="header-right">
        <span className="welcome-text">Welcome back</span>

        <div className="profile-avatar">B</div>
      </div>
    </header>
  );
}
