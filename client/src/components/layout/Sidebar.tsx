"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "../shared/Logo";
import { navigation } from "@/constants/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="border-b border-border px-6 py-8">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          General
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 rounded-xl px-3 py-3
                  text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }
                `}
              >
                <Icon className="h-5 w-5" />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-6 py-5">
        <p className="text-xs text-muted-foreground">Result Analyzer</p>

        <p className="mt-1 text-sm font-medium">Version 1.0</p>
      </div>
    </aside>
  );
}
