import { Home, Camera, TrendingUp, Users, MapPin } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/scanner", icon: Camera, label: "Scanner" },
    { path: "/trends", icon: TrendingUp, label: "Trends" },
    { path: "/feed", icon: Users, label: "Feed" },
    { path: "/stores", icon: MapPin, label: "Stores" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.path} href={item.path}>
              <a className="flex flex-col items-center justify-center gap-1 px-4 py-2 min-w-[60px]">
                <Icon 
                  className={`h-5 w-5 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <span 
                  className={`text-xs font-medium ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </span>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
