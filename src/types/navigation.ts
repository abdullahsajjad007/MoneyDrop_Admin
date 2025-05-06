import { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface NavbarProps {
  children: React.ReactNode;
}

export interface SidebarProps {
  items: NavItem[];
}