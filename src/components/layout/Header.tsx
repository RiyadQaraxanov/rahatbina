
import { useState } from "react";
import { Bell, Moon, Settings, Sun, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/useAuthStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Badge } from "@/components/ui/badge";
import { type ThemeMode } from "@/store/useSettingsStore";

export function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const translate = useLanguageStore((state) => state.translate);
  const { settings, updateSettings, toggle } = useSettingsStore();
  const { unreadCount, notifications, fetchNotifications, markAsRead } =
    useNotificationStore();

  const toggleTheme = () => {
    const newTheme: ThemeMode = settings.theme === "dark" ? "light" : "dark";
    updateSettings({ theme: newTheme });
    
    // Apply theme to document
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleNotificationClick = () => {
    fetchNotifications();
    setOpen(true);
  };

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getUserInitials = () => {
    if (!user || !user.firstName) return "U";
    return (user.firstName + user?.lastName)
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="h-16 px-4 w-full flex items-center justify-between bg-background">
      <div className="flex-1"></div>

      <div className="flex items-center space-x-2">
        {/* Theme toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {settings.theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
        {/* Settings */}
        <Button variant="ghost" size="icon" onClick={toggle}>
            <Settings size={20} />
        </Button>

        {/* Notifications */}
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleNotificationClick}>
              <Bell size={20} />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>{translate("notifications.title")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="py-2 px-4 text-center text-muted-foreground">
                {translate("notifications.empty")}
              </div>
            ) : (
              notifications.slice(0, 5).map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`px-4 py-2 cursor-pointer ${
                    !notification.isRead ? "bg-accent/10" : ""
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-start">
                      <span className="font-medium">{notification.title}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {new Date(notification.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {notification.message}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="justify-center text-center cursor-pointer"
              onClick={() => {
                setOpen(false);
                navigate("/notifications");
              }}
            >
              {translate("notifications.viewAll")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user?.firstName} {user?.lastName}</span>
                <span className="text-xs text-muted-foreground mt-1">
                  {user?.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick}>
              <User className="mr-2 h-4 w-4" />
              <span>{translate("profile.title")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>{translate("settings.title")}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{translate("common.logout")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
