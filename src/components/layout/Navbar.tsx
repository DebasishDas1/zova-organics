'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight, Equal } from 'lucide-react'
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
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { usePathname } from 'next/navigation'
import { useUIStore } from '@/store/ui-store'
import Image from 'next/image'

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

  const [navScrolled, setNavScrolled] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setNavScrolled])

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
    <nav
      className={cn(
        navScrolled && 'bg-white/60',
        'fixed top-0 inset-x-0 z-50 px-6 transition-all duration-700 ease-out',
        'py-3',
        'backdrop-blur-xl',
        'supports-backdrop-filter:bg-parchment/40',
      )}
    >
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Zova Organic home"
          className={cn('text-xl md:text-2xl font-bold tracking-tight transition-colors')}
        >
          <Image
            src="/zova-logo-light.png"
            alt="Zova Organic"
            width={100}
            height={100}
            className="h-5 w-auto"
            priority
          />
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
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'group relative py-2',
                          'text-[13px] font-medium tracking-[-0.01em]',
                          'transition-all duration-200 ease-out',
                          isActive ? 'text-zova-green font-bold' : 'text-black/60',
                        )}
                      >
                        {link.name}
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
              'text-[12px] font-medium',
              'hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]',
              'transition-all duration-200',
            )}
          >
            <Link href="/contact">Become a Partner</Link>
            <ArrowRight className="ml-2 size-3.5" />
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2"
                aria-label="Open mobile menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Equal className="size-6" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              className={cn(
                'w-screen h-screen max-w-none border-none shadow-none',
                'bg-monk-beige/60 backdrop-blur-3xl',
                'p-8 flex flex-col rounded-l-2xl',
              )}
            >
              <SheetHeader className="p-0">
                <SheetTitle>
                  <Image
                    src="/zova-logo-light.png"
                    alt="Zova Organic"
                    width={100}
                    height={100}
                    className="h-4 w-auto"
                    priority
                  />
                </SheetTitle>
                <SheetDescription className="hidden">
                  Crafted in India. Trusted Worldwide.
                </SheetDescription>
              </SheetHeader>

              <div className="grow flex flex-col justify-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMobileMenu}
                    aria-current={isActiveLink(link.href) ? 'page' : undefined}
                    className={cn(
                      'text-3xl transition-colors',
                      isActiveLink(link.href) ? 'text-zova-green font-bold' : 'text-black/60',
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Footer */}
              <Button
                className={cn(
                  'h-12 rounded-full px-5',
                  'text-[12px] font-medium',
                  'transition-all duration-200',
                )}
              >
                <Link href="/contact">Become a Partner</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

NavbarComponent.displayName = 'Navbar'

export const Navbar = React.memo(NavbarComponent)
