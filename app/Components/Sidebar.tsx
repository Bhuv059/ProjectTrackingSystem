"use client";
import "../styles/sidebar.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const status = searchParams.get("status");

  const menuItems = [
    {
      name: "Dashboard",
      icon: "⌂",
      path: "/",
    },
    {
      name: "Projects",
      icon: "▣",
      path: "/projects",
    },
    {
      name: "Completed",
      icon: "✓",
      path: "/projects?status=completed",
    },
  ];

  const handleNavigation = (path: string) => {
    setSidebarOpen(false);
    router.push(path);
  };

  const isActive = (name: string) => {
    if (name === "Dashboard") {
      return pathname === "/";
    }

    if (name === "Projects") {
      return pathname === "/projects" && status !== "completed";
    }

    if (name === "Completed") {
      return pathname === "/projects" && status === "completed";
    }

    return false;
  };

  return (
    <>
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setSidebarOpen(false)}
          className="sidebar-overlay lg:hidden"
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const active = isActive(item.name);

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => handleNavigation(item.path)}
                className={`sidebar-item ${active ? "active" : ""}`}
              >
                <span className="sidebar-icon">{item.icon}</span>

                <span className="sidebar-label">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
