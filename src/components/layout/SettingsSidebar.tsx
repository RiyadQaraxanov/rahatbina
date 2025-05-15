
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils/classnames";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    LayoutDashboard,
    LogOut,
    Moon,
    Sun,
    X
} from "lucide-react";
import { useSettingsStore, type ThemeMode } from "@/store/useSettingsStore";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { useSidebarStore } from "@/store/useSidebarStore";

type SidebarItem = {
    title: string;
    icon: React.ElementType;
    path: string;
    translationKey: string;
    permissionModule: string;
};

const sidebarItems: SidebarItem[] = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
        translationKey: "dashboard.title",
        permissionModule: "dashboard",
    }
];

export function SettingsSidebar() {
    const { isOpen, toggle, close, open, settings, updateSettings } = useSettingsStore();
    const {dark, toggleTheme: sidebarTheme} = useSidebarStore()
    const isMobile = useIsMobile();
    const { pathname } = useLocation();
    const translate = useLanguageStore((state) => state.translate);

    // Auto-collapse on mobile, expand on desktop
    useEffect(() => {
        if (isMobile) {
            close();
        }
    }, [isMobile, close, open]);

    const toggleTheme = () => {
        const newTheme: ThemeMode = settings.theme === "dark" ? "light" : "dark";
        updateSettings({ theme: newTheme });

        // Apply theme to document
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <div
            className={cn(
                "fixed top-0 right-0 h-screen bg-background z-40 transition-all duration-300 border-l border-border ",
                isOpen ? "w-64" : "w-0"
            )}
        >
            <div className="flex flex-col h-full">
                {/* Sidebar header with logo */}
                <div className="h-16 flex items-center justify-between px-4 ">
                    {isOpen && (
                        <div className="text-xl font-bold text-primary">Ayarlar</div>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggle}
                        className="ml-auto"
                    >
                        {!isOpen ? <ChevronLeft size={18} /> : <X size={18} />}
                    </Button>

                </div>

                {/* Scrollable sidebar menu */}
                <ScrollArea className="flex-1 px-2">
                    <Card className="p-3 bg-yellow-200 min-w-60">
                        <p>
                            Ümumi rəng sxemini, yan menyunu və s. <b>fərdiləşdir</b>
                        </p>
                    </Card>
                    <nav className="px-2 py-4">
                        <ul className="space-y-1">
                            <div className="flex items-center justify-between">

                                <h2 className="font-semibold">
                                    Rəng sxemi
                                </h2>
                                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                                    {settings.theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                                </Button>
                            </div>
                            <Separator />
                        </ul>
                        <ul className="space-y-1 mt-3">
                            <div className="flex items-center justify-between">

                                <h2 className="font-semibold">
                                    Sol panel rəngi
                                </h2>
                                <Button variant="ghost" size="icon" onClick={sidebarTheme}>
                                    {dark ? <Sun size={20} /> : <Moon size={20} />}
                                </Button>
                            </div>
                            <Separator />
                        </ul>
                    </nav>
                </ScrollArea>

            </div>
        </div>
    );
}
