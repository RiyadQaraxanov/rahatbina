import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useSidebarStore } from "@/store/useSidebarStore";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SettingsSidebar } from "@/components/layout/SettingsSideBar";

export default function MainLayout() {
  const { settings } = useSettingsStore();
  const { isOpen } = useSidebarStore();
  const isMobile = useIsMobile();

  // Tema ayarı
  useEffect(() => {
    const isDark =
      settings.theme === "dark" ||
      (settings.theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", isDark);
  }, [settings.theme]);

  return (
    <div className="h-screen flex overflow-hidden bg-background text-foreground w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300",
          isOpen ? "ml-64" : "ml-16" // ← sidebar genişliği açıkken 256px, kapalıyken 64px
        )}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
      <SettingsSidebar />
    </div>
  );
}
