'use client'

import React, { useCallback } from 'react'
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
import { useUIStore } from '@/store/ui-store'

const navLinks = [
  { name: 'Products', href: '/products' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Contact', href: '/contact' },
]

const NavbarComponent = () => {
  const pathname = usePathname()
  const { mobileMenuOpen, closeMobileMenu, setMobileMenuOpen } = useUIStore()

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
          aria-label="Zova Organic home"
          className={cn('text-xl md:text-2xl font-bold tracking-tight transition-colors')}
        >
          Zova Organic
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <NavigationMenu>
            <NavigationMenuList className="gap-10">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href)

                return (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          'group relative py-2',
                          'text-[13px] font-medium tracking-[-0.01em]',
                          'transition-all duration-200 ease-out',
                          isActive ? 'text-black' : 'text-black/55 hover:text-black',
                        )}
                      >
                        {link.name}

                        <motion.div
                          layoutId="nav-indicator"
                          className={cn(
                            'absolute -bottom-1 left-1/2 h-[1.5px] -translate-x-1/2 rounded-full bg-black',
                            isActive ? 'w-5' : 'w-0',
                          )}
                          transition={{
                            type: 'spring',
                            stiffness: 650,
                            damping: 40,
                            mass: 0.4,
                          }}
                        />
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <Button
            className={cn(
              'h-10 rounded-full px-5',
              'bg-black text-white',
              'text-[12px] font-medium',
              'shadow-[0_1px_2px_rgba(0,0,0,0.08)]',
              'hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]',
              'hover:-translate-y-px',
              'transition-all duration-200',
            )}
          >
            Become a Partner
            <ArrowRight className="ml-2 size-3.5" />
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="p-2">
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
              <SheetHeader className="hidden">
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
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: i * 0.06,
                        duration: 0.4,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className="text-4xl hover:text-[#8C6B4A] transition-colors"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Mobile Footer */}
              <div className="mt-auto">
                <Button
                  onClick={closeMobileMenu}
                  className="w-full rounded-full h-16 text-xs uppercase tracking-[0.3em] font-bold bg-[#2B1F14] text-white"
                >
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

NavbarComponent.displayName = 'Navbar'

export const Navbar = React.memo(NavbarComponent)
