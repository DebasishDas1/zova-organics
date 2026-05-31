'use client'

import { useCallback, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { Menu, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from '@/components/ui/sheet'
import { usePathname } from 'next/navigation'

const navLinks = [
  {
    name: 'Collections',
    href: '/collections',
  },
  {
    name: 'Capabilities',
    href: '/capabilities',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
]

export const Navbar = () => {
  const pathname = usePathname()

  const isActiveLink = useCallback(
    (href: string) => {
      if (href === '/') {
        return pathname === '/'
      }

      return pathname.startsWith(href)
    },
    [pathname],
  )

  return (
    <nav className="fixed inset-x-0 top-0 z-50 pt-4">
      <div className="container-zova flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            'font-serif italic text-xl md:text-2xl font-bold tracking-tight transition-colors duration-500',
          )}
        >
          The Traveling Monk
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href)

                const base =
                  'relative px-5 py-2 rounded-full text-[11px] uppercase tracking-[0.3em] font-semibold transition-colors duration-300 block'

                const inactive = cn('opacity-70 hover:opacity-100', 'hover:bg-black/5')

                return (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.href}
                        className={cn(base, isActive ? 'bg-green-500 text-white' : inactive)}
                      >
                        <span className="relative z-10">{link.name}</span>
                        {isActive && (
                          <motion.div
                            layoutId="navbar-active-pill"
                            className={cn('absolute inset-0 rounded-full', 'bg-black/5')}
                            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                          />
                        )}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <Button
            className={cn(
              'rounded-full px-7 h-11 text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-500',
              'bg-black text-white hover:bg-black/80',
            )}
          >
            Become a Partner <ArrowRight className="size-3.5 ml-2" />
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                // onClick={toggleMobileMenu}
                className={cn('p-2 transition-colors duration-500')}
              >
                <Menu className="size-6" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className={cn(
                'w-screen h-screen max-w-none border-none shadow-none',
                'bg-monk-beige/60 backdrop-blur-3xl',
                'p-8 flex flex-col rounded-l-2xl',
              )}
            >
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>This action cannot be undone.</SheetDescription>
              </SheetHeader>

              {/* Mobile Header */}
              <div className="pt-8 flex justify-between items-center">
                <span className="text-lg font-semibold tracking-tighter">ZOVA</span>
              </div>

              <div className="grow flex flex-col justify-center gap-8">
                <AnimatePresence>
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.6 }}
                    >
                      <Link
                        href={link.href}
                        //   onClick={closeMobileMenu}
                        className="text-4xl font-serif italic text-[#2B1F14] hover:text-[#8C6B4A] transition-colors"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Mobile Footer */}
              <div className="mt-auto">
                <Button className="w-full rounded-full h-16 text-xs uppercase tracking-[0.3em] font-bold bg-[#2B1F14] text-white">
                  Join a journey
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
