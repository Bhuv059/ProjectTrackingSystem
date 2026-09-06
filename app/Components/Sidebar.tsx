"use client";

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({
  currentPage,
  setCurrentPage,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const menuItems = [
    {
      name: "Dashboard",
      icon: "⌂",
    },
    {
      name: "Projects",
      icon: "▣",
    },
    {
      name: "Completed",
      icon: "✓",
    },
  ];

  return (
    <>
      {/* Mobile / Tablet overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 top-16 z-40 bg-black/50 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-16 z-50
          h-[calc(100vh-64px)]
          w-64
          border-r border-teal-300/20
          bg-gradient-to-b from-[#063b39] via-[#064b47] to-[#052f2d]
          p-4
          shadow-[8px_0_30px_rgba(45,212,191,0.12)]
          transition-transform duration-300 ease-in-out

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          lg:static
          lg:z-auto
          lg:h-[calc(100vh-64px)]
          lg:translate-x-0
        `}
      >
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const active = currentPage === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setCurrentPage(item.name)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                  active
                    ? "bg-teal-300/15 text-teal-100 shadow-[0_0_18px_rgba(45,212,191,0.18)]"
                    : "text-teal-100/60 hover:bg-teal-300/10 hover:text-teal-50"
                }`}
              >
                <span className="text-lg">{item.icon}</span>

                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
