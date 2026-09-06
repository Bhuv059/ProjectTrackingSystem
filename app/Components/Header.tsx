"use client";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-teal-300/20 bg-gradient-to-r from-[#073b3a] via-[#075e59] to-[#064e4a] px-4 shadow-[0_0_25px_rgba(45,212,191,0.25)] sm:px-6">
      <div className="flex items-center gap-3">
        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-teal-100 transition hover:bg-teal-300/10 lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? (
            <span className="text-2xl">×</span>
          ) : (
            <span className="text-2xl">☰</span>
          )}
        </button>

        <h1 className="text-lg font-bold tracking-wide text-teal-50 sm:text-xl">
          ProjectTracker
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <span className="hidden text-sm text-teal-100/70 sm:block">
          Welcome back
        </span>

        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-teal-200/40 bg-teal-400/20 font-bold text-teal-50 shadow-[0_0_15px_rgba(45,212,191,0.4)]">
          B
        </div>
      </div>
    </header>
  );
}
