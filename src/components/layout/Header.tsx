'use client';

import Link from 'next/link';
import {
  GraduationCap,
  Home,
  CalendarDays,
  LogIn,
  UserPlus,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/events', label: 'Events', icon: CalendarDays },
    { href: '/login', label: 'Login', icon: LogIn },
    { href: '/register', label: 'Register', icon: UserPlus },
  ];

  const NavLink = ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          'transition-colors hover:text-primary',
          isActive ? 'text-primary font-semibold' : 'text-muted-foreground',
          className
        )}
        onClick={() => setIsSheetOpen(false)}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <GraduationCap className="h-7 w-7 text-primary" />
          <span className="text-lg font-bold text-foreground sm:text-xl font-headline">
            Campus Connect
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/events">Events</NavLink>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader className="border-b pb-4">
                <SheetTitle className="flex items-center gap-2">
                  <GraduationCap className="h-7 w-7 text-primary" />
                  <span className="text-lg font-bold text-foreground font-headline">
                    Campus Connect
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium mt-6">
                {navLinks.map(({ href, label }) => (
                  <NavLink key={href} href={href}>
                    {label}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
