"use client";

import { useEffect, useState } from "react";
import AppsIcon from "@mui/icons-material/Apps";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout, me } from "../../services/authService";

const navItems = [
  { icon: HomeIcon, label: "Portfolio", path: "portfolio" },
  { icon: AppsIcon, label: "Jobs", path: "/jobs" },
  { icon: FileOpenIcon, label: "Track", path: "/Applications" },
  { icon: EditSquareIcon, label: "Edit", path: "/profile/edit" },
];

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const response = await me();
        if (!mounted) return;

        if (response?.success) {
          const nextUsername = response?.user?.username || localStorage.getItem("username") || "";
          setUsername(nextUsername);
          setIsAuthenticated(true);
          if (nextUsername) localStorage.setItem("username", nextUsername);
        }
      } catch {
        if (mounted) setIsAuthenticated(false);
      }
    };

    loadUser();
    return () => {
      mounted = false;
    };
  }, []);

  const logoutUser = async () => {
    const response = await logout();
    if (response.success) {
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      toast.success("Logged out successfully");
      router.push("/");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed bottom-4 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-white/70 bg-white/90 p-1.5 shadow-[0_18px_50px_-18px_rgba(15,23,42,0.45)] backdrop-blur-xl lg:bottom-auto lg:left-auto lg:right-6 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:flex-col"
    >
      {navItems.map(({ icon: Icon, label, path }) => {
        const target = path === "portfolio" ? `/Portfolio/${username}` : path;
        const isActive = path === "portfolio" ? pathname.startsWith("/Portfolio") : pathname === path;

        return (
          <button
            key={label}
            type="button"
            title={label}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
            onClick={() => router.push(target)}
            className={`group flex h-14 min-w-14 flex-col items-center justify-center rounded-xl px-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 lg:h-12 lg:w-12 lg:min-w-0 lg:px-0 ${
              isActive
                ? "bg-slate-950 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"
            }`}
          >
            <Icon sx={{ fontSize: 20 }} />
            <span className="mt-1 text-[10px] font-medium leading-none lg:hidden">{label}</span>
          </button>
        );
      })}

      <div className="mx-0.5 h-7 w-px bg-slate-200 lg:my-0.5 lg:h-px lg:w-7" />
      <button
        type="button"
        title="Logout"
        aria-label="Logout"
        onClick={logoutUser}
        className="flex h-14 min-w-14 flex-col items-center justify-center rounded-xl px-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 lg:h-12 lg:w-12 lg:min-w-0 lg:px-0"
      >
        <LogoutIcon sx={{ fontSize: 20 }} />
        <span className="mt-1 text-[10px] font-medium leading-none lg:hidden">Logout</span>
      </button>
    </nav>
  );
}
