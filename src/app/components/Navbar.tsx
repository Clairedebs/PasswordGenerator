'use client'
import { useTheme } from 'next-themes'
import { Key, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { useState } from 'react'
import { Navbar, NavBody, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from '@/components/ui/resizable_navbar'


export function NavBar() {
  const { setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar className="fixed top-0 left-0 right-0" >
      {/* Desktop Navbar */}
      <NavBody>
        <div className="flex flex-row items-center gap-2">
          <Key />
          <Link href={'/'} className='text-3xl font-bold'>Randle</Link>
        </div>
        <div className="flex flex-row items-center gap-4">
          {/* Navigation links only on large screens */}
          <div className="hidden lg:flex gap-4">
            <div>
              <Button variant={'link'} className='cursor-pointer' asChild>
                <Link href="/features">Features</Link>
              </Button>
              <Button variant={'link'} className='cursor-pointer' asChild>
                <Link href="/pricing">Pricing</Link>
              </Button>
              <Button variant={'link'} className='cursor-pointer' asChild>
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
            <div className=""></div>
            <Button variant={'secondary'} className='cursor-pointer' asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
            <Button variant={'default'} className='cursor-pointer' asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
          {/* Theme toggle always visible */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className='bg-white border border-zinc-200 backdrop-blur-lg dark:bg-zinc-900 rounded-xl p-1'>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Mobile menu toggle only on mobile */}
          <div className="lg:hidden">
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </div>
        </div>
      </NavBody>
      {/* Mobile Navbar */}
      <MobileNav visible={isMobileMenuOpen}>
        <MobileNavHeader>
          <div className="flex flex-row items-center gap-2">
            <Key />
            <Link href={'/'} className='text-3xl font-bold'>Randle</Link>
          </div>
          <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
          <Button variant={'link'} className='w-full text-left' asChild onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/pricing">Features</Link>
          </Button>
          <Button variant={'link'} className='w-full text-left' asChild onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/pricing">Pricing</Link>
          </Button>
          <Button variant={'link'} className='w-full text-left' asChild onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/pricing">Contact</Link>
          </Button>
          <Button variant={'secondary'} className='w-full text-left' asChild onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button variant={'default'} className='w-full text-left' asChild onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/login">Login</Link>
          </Button>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}

export default NavBar
