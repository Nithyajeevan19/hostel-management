'use client'

import {
  IndianRupee,
  Users,
  Building2,
  Clock,
  TrendingUp,
  BedDouble,
  ArrowUpRight,
  CalendarCheck,
  UserPlus,
  CreditCard,
  LogIn,
  LogOut,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAdminStore, useTotalStats } from '@/lib/store'

export default function AdminDashboard() {
  const stats = useTotalStats()
  const { branches, revenueData, recentActivity, currentUser } = useAdminStore()

  const isManager = currentUser?.role === 'branch_manager'
  const targetBranchId = currentUser?.branchId

  const filteredBranches = isManager
    ? branches.filter(b => b.id === targetBranchId)
    : branches

  const branchName = isManager
    ? branches.find(b => b.id === targetBranchId)?.name.replace('SURYA PG — ', '') || ''
    : ''

  const totalRevenueAllActive = branches.filter(b => b.status === 'active').reduce((sum, b) => sum + b.monthlyRevenue, 0)
  const managerBranchRevenue = branches.find(b => b.id === targetBranchId)?.monthlyRevenue || 0
  const revenueFraction = totalRevenueAllActive > 0 ? (managerBranchRevenue / totalRevenueAllActive) : 0

  const filteredRevenueData = isManager
    ? revenueData.map(d => ({ ...d, revenue: Math.round(d.revenue * revenueFraction) }))
    : revenueData

  const filteredActivity = isManager
    ? recentActivity.filter(activity => activity.message.toLowerCase().includes(branchName.toLowerCase()))
    : recentActivity

  const kpiCards = [
    {
      title: 'Monthly Revenue',
      value: `₹${(stats.totalRevenue / 100000).toFixed(1)}L`,
      change: '+8.2%',
      icon: IndianRupee,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Total Residents',
      value: stats.totalResidents.toString(),
      change: '+3',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Occupancy Rate',
      value: `${stats.occupancyRate}%`,
      change: '+2.1%',
      icon: BedDouble,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      title: 'Pending Requests',
      value: stats.pendingRequests.toString(),
      change: 'Action needed',
      icon: Clock,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
  ]

  const activityIcons: Record<string, typeof CalendarCheck> = {
    booking: CalendarCheck,
    visit: UserPlus,
    payment: CreditCard,
    'move-in': LogIn,
    'move-out': LogOut,
  }

  const activityColors: Record<string, string> = {
    booking: 'bg-blue-100 text-blue-700',
    visit: 'bg-purple-100 text-purple-700',
    payment: 'bg-emerald-100 text-emerald-700',
    'move-in': 'bg-amber-100 text-amber-700',
    'move-out': 'bg-red-100 text-red-700',
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground mt-1">
          {isManager ? (
            `Welcome back. Here's what's happening at your assigned branch: ${branchName}.`
          ) : (
            `Welcome back. Here's what's happening across your ${stats.activeBranches} active branches.`
          )}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.title} className="relative overflow-hidden group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                    <p className="text-3xl font-bold tracking-tight text-foreground">{kpi.value}</p>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="size-3.5 text-emerald-600" />
                      <span className="text-xs font-semibold text-emerald-600">{kpi.change}</span>
                    </div>
                  </div>
                  <div className={`flex size-12 items-center justify-center rounded-2xl ${kpi.bg} transition-transform group-hover:scale-110`}>
                    <Icon className={`size-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Revenue Chart (Left — 3 columns) */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span className="font-serif text-lg">Revenue Trend</span>
              <Badge variant="outline" className="font-normal text-xs">Last 6 months</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-end gap-3 h-52">
              {filteredRevenueData.map((d, i) => {
                const maxRevenue = Math.max(...filteredRevenueData.map(r => r.revenue))
                const heightPercent = maxRevenue > 0 ? (d.revenue / maxRevenue) * 100 : 0
                return (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-xs font-bold text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      ₹{(d.revenue / 100000).toFixed(1)}L
                    </span>
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all duration-500 group-hover:from-emerald-500 group-hover:to-emerald-300 relative overflow-hidden"
                      style={{ height: `${heightPercent}%` }}
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{d.month}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Branch Occupancy (Right — 2 columns) */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="font-serif text-lg">Branch Occupancy</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {filteredBranches.filter(b => b.status === 'active').map((branch) => {
              const occupancyPercent = branch.totalRooms ? Math.round((branch.occupiedRooms / branch.totalRooms) * 100) : 0
              return (
                <div key={branch.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground truncate max-w-[140px]">{branch.name.replace('SURYA PG — ', '')}</span>
                    <span className="text-muted-foreground">{branch.occupiedRooms}/{branch.totalRooms} rooms</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        occupancyPercent >= 90 ? 'bg-red-500' :
                        occupancyPercent >= 70 ? 'bg-amber-500' :
                        'bg-emerald-500'
                      }`}
                      style={{ width: `${occupancyPercent}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{occupancyPercent}% occupied</p>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Bottom row — Recent Activity + Quick Stats */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Recent Activity (Left — 3 columns) */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="font-serif text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-1">
              {filteredActivity.slice(0, 10).map((activity) => {
                const Icon = activityIcons[activity.type] || CalendarCheck
                const colorClass = activityColors[activity.type] || 'bg-gray-100 text-gray-700'
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${colorClass}`}>
                      <Icon className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-snug">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                )
              })}
              {filteredActivity.length === 0 && (
                <div className="p-4 text-center text-sm text-muted-foreground">No recent activity found.</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Branch Stats (Right — 2 columns) */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="font-serif text-lg">Branch Revenue</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            {filteredBranches.filter(b => b.status === 'active').map((branch) => (
              <div
                key={branch.id}
                className="flex items-center justify-between p-3 rounded-xl border border-border/50 hover:border-primary/20 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                    <Building2 className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{branch.name.replace('SURYA PG — ', '')}</p>
                    <p className="text-xs text-muted-foreground">{branch.manager || 'N/A'}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-foreground">₹{(branch.monthlyRevenue / 1000).toFixed(0)}K</p>
                  <div className="flex items-center gap-0.5 justify-end text-emerald-600">
                    <ArrowUpRight className="size-3" />
                    <span className="text-[10px] font-semibold">+5%</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
