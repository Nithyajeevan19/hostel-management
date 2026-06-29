'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Building2,
  BedDouble,
  CalendarCheck,
  Users,
  Home,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Bell,
  CheckCheck,
  Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAdminStore } from '@/lib/store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const sidebarItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/branches', label: 'Branches', icon: Building2, roles: ['super_admin'] },
  { href: '/admin/managers', label: 'Branch Managers', icon: Shield, roles: ['super_admin'] },
  { href: '/admin/rooms', label: 'Rooms', icon: BedDouble },
  { href: '/admin/bookings', label: 'Bookings & Visits', icon: CalendarCheck },
  { href: '/admin/residents', label: 'Residents', icon: Users },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isAuthenticated, logout, recentActivity, currentUser, branches } = useAdminStore()

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (!isAuthenticated && !isLoginPage) {
      router.push('/admin/login')
    } else if (isAuthenticated && currentUser && currentUser.role === 'branch_manager') {
      if (pathname.startsWith('/admin/branches') || pathname.startsWith('/admin/managers')) {
        router.push('/admin')
        import('sonner').then(({ toast }) => {
          toast.error('Access Denied', {
            description: 'You do not have permission to access this page.'
          })
        })
      }
    }
  }, [isAuthenticated, isLoginPage, currentUser, pathname, router])

  // If it's the login page, just render the children without the dashboard shell
  if (isLoginPage) {
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return null
  }

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  const allowedSidebarItems = sidebarItems.filter(
    (item) => !item.roles || (currentUser && item.roles.includes(currentUser.role))
  )

  const branchName = currentUser?.role === 'branch_manager'
    ? branches.find(b => b.id === currentUser.branchId)?.name.replace('Mahi PG — ', '')
    : null

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 flex flex-col bg-[#1a1f1e] text-white transition-transform duration-300 lg:relative lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between gap-3 p-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-600/80 text-white transition-all group-hover:bg-emerald-500">
              <Home className="size-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight">Mahi PG</span>
              <span className="block text-[10px] font-semibold text-white/50 uppercase tracking-widest">Admin Panel</span>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-md hover:bg-white/10">
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-white/30">
            Management
          </p>
          {allowedSidebarItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-emerald-600/20 text-emerald-400 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.2)]'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                )}
              >
                <Icon className={cn('size-5 transition-colors', active ? 'text-emerald-400' : 'text-white/40 group-hover:text-white/70')} />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight className="size-4 text-emerald-400/60" />}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              logout()
              router.push('/')
            }}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/50 hover:bg-white/5 hover:text-white transition-all"
          >
            <LogOut className="size-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-8 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors"
            >
              <Menu className="size-5" />
            </button>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">
                {sidebarItems.find(i => isActive(i.href))?.label || 'Dashboard'}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative p-2 rounded-xl hover:bg-muted transition-colors outline-none">
                  <Bell className="size-5 text-muted-foreground" />
                  {recentActivity.length > 0 && (
                    <span className="absolute top-1 right-1 size-2 rounded-full bg-red-500" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 border-border bg-background p-0 rounded-xl overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <span className="font-semibold text-foreground">Notifications</span>
                  <button className="text-xs text-muted-foreground flex items-center gap-1 hover:text-emerald-600 transition-colors">
                    <CheckCheck className="size-3" />
                    Mark all read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {recentActivity.length > 0 ? (
                    recentActivity.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="p-4 border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <p className="text-sm text-foreground">{activity.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">No new notifications</div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center gap-3 pl-3 border-l border-border/50">
              <div className="size-9 rounded-full bg-emerald-600/20 flex items-center justify-center text-emerald-600 font-bold text-sm">
                {currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'AD'}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold">{currentUser?.name || 'Admin'}</p>
                <p className="text-xs text-muted-foreground font-medium">
                  {currentUser?.role === 'super_admin' ? 'Super Admin' : `Manager — ${branchName || 'Branch'}`}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
