
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
  ChevronRight,
  LayoutDashboard,
  Users,
  Shield,
  ParkingSquare,
  Cpu,
  Bell,
  Settings,
  FileText,
  TicketCheck,
  Languages,
  LogOut
} from "lucide-react";
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
  },
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboarsdd",
    translationKey: "dashboard.title",
    permissionModule: "dashboard",
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { isOpen, toggle, close, open, dark, toggleTheme } = useSidebarStore();

  const isMobile = useIsMobile();
  const { pathname } = useLocation();
  const translate = useLanguageStore((state) => state.translate);
  const hasPermission = useAuthStore((state) => state.hasPermission);
  const logout = useAuthStore((state) => state.logout);

  // Auto-collapse on mobile, expand on desktop
  useEffect(() => {
    if (isMobile) {
      close();
    } else {
      open();
    }
  }, [isMobile, close, open]);


  // Function to determine if a menu item should be visible based on permissions
  const canViewItem = (item: SidebarItem) => {
    return hasPermission(item.permissionModule, 'view');
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-screen bg-coal-600 z-40 transition-all duration-300 border-r border-border sidebar-no-dark-content",
        isOpen ? "w-64" : "w-16",
        dark ? 'dark' : 'bg-white'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar header with logo */}
        <div className="h-16 flex items-center justify-between px-4 ">
          {isOpen && (
            <div className="text-xl font-bold text-primary" onClick={toggleTheme}>Rahatbina</div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="ml-auto"
          >
            {!isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>

        </div>

        {/* Scrollable sidebar menu */}
        <ScrollArea className="flex-1">
          <nav className="px-2 py-4">
            <ul className="space-y-1">
              {sidebarItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center py-2 px-3 rounded-md transition-colors",
                      pathname === item.path
                        ? "bg-primary text-white"
                        : dark
                          ? "text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          : "text-coal hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      !isOpen ? "justify-center" : "justify-start"
                    )}
                  >

                    <item.icon size={20} />
                    {isOpen && (
                      <span className="ml-3 text-sm whitespace-nowrap ">{translate(item.translationKey)}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </ScrollArea>

        {/* Sidebar footer with logout button */}
        <div className="h-16 flex items-center px-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={logout}
            className={cn(
              "flex items-center py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              !isOpen ? "justify-center w-full px-0" : "justify-start w-full"
            )}
          >
            <LogOut size={20} />
            {isOpen && (
              <span className="ml-3">{translate('common.logout')}</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
