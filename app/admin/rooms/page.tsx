'use client'

import { useState, useMemo } from 'react'
import {
  Search,
  BedDouble,
  Snowflake,
  Fan,
  User,
  Wrench,
  CheckCircle2,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useAdminStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function RoomsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [branchFilter, setBranchFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const { rooms, branches, currentUser, updateRoomStatus } = useAdminStore()

  const isManager = currentUser?.role === 'branch_manager'
  const targetBranchId = currentUser?.branchId

  const activeRooms = useMemo(() => {
    if (isManager) {
      return rooms.filter((r) => r.branchId === targetBranchId)
    }
    return rooms
  }, [rooms, isManager, targetBranchId])

  const filteredRooms = useMemo(() => {
    return activeRooms.filter((room) => {
      const matchesSearch =
        room.roomNumber.includes(searchQuery) ||
        room.branchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (room.residentName && room.residentName.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesBranch = isManager || branchFilter === 'all' || room.branchId === branchFilter
      const matchesStatus = statusFilter === 'all' || room.status === statusFilter
      const matchesType = typeFilter === 'all' || room.type === typeFilter
      return matchesSearch && matchesBranch && matchesStatus && matchesType
    })
  }, [activeRooms, searchQuery, branchFilter, statusFilter, typeFilter, isManager])

  const statusIcons: Record<string, typeof CheckCircle2> = {
    available: CheckCircle2,
    occupied: User,
    maintenance: Wrench,
  }

  const statusBadgeColors: Record<string, string> = {
    available: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    occupied: 'bg-blue-100 text-blue-700 border-blue-200',
    maintenance: 'bg-amber-100 text-amber-700 border-amber-200',
  }

  // Summary stats
  const totalAvailable = activeRooms.filter(r => r.status === 'available').length
  const totalOccupied = activeRooms.filter(r => r.status === 'occupied').length
  const totalMaintenance = activeRooms.filter(r => r.status === 'maintenance').length

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground tracking-tight">
          Room Inventory
        </h1>
        <p className="text-muted-foreground mt-1">
          {isManager ? 'View and manage rooms for your assigned branch' : 'View and manage rooms across all branches'}
        </p>
      </div>

      {/* Summary Chips */}
      <div className="flex flex-wrap gap-3">
        <Card className="flex-1 min-w-[140px]">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-muted flex items-center justify-center">
              <BedDouble className="size-5 text-foreground" />
            </div>
            <div>
              <p className="text-xl font-bold">{activeRooms.length}</p>
              <p className="text-xs text-muted-foreground">Total Rooms</p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1 min-w-[140px]">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 className="size-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-emerald-600">{totalAvailable}</p>
              <p className="text-xs text-muted-foreground">Available</p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1 min-w-[140px]">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <User className="size-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-blue-600">{totalOccupied}</p>
              <p className="text-xs text-muted-foreground">Occupied</p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1 min-w-[140px]">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Wrench className="size-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-amber-600">{totalMaintenance}</p>
              <p className="text-xs text-muted-foreground">Maintenance</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by room #, branch, or resident..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl h-11"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {!isManager && (
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="h-11 rounded-xl border border-border bg-background px-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Branches</option>
              {branches.filter(b => b.status === 'active').map(b => (
                <option key={b.id} value={b.id}>{b.name.replace('Mahi PG — ', '')}</option>
              ))}
            </select>
          )}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 rounded-xl border border-border bg-background px-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-11 rounded-xl border border-border bg-background px-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Types</option>
            <option value="Single">Single</option>
            <option value="Double Sharing">Double Sharing</option>
            <option value="Triple Sharing">Triple Sharing</option>
          </select>
        </div>
      </div>

      {/* Rooms Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Room #</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Branch</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">AC</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Floor</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Price</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Status (Click to Edit)</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Resident</th>
                </tr>
              </thead>
              <tbody>
                {filteredRooms.map((room) => {
                  const StatusIcon = statusIcons[room.status]
                  return (
                    <tr key={room.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-foreground">{room.roomNumber}</td>
                      <td className="px-4 py-3.5">
                        <span className="text-foreground font-medium">{room.branchName}</span>
                      </td>
                      <td className="px-4 py-3.5 text-muted-foreground">{room.type}</td>
                      <td className="px-4 py-3.5">
                        {room.ac ? (
                          <span className="inline-flex items-center gap-1 text-blue-600 text-xs font-semibold">
                            <Snowflake className="size-3.5" /> AC
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-muted-foreground text-xs font-semibold">
                            <Fan className="size-3.5" /> Non-AC
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-muted-foreground">Floor {room.floor}</td>
                      <td className="px-4 py-3.5 font-semibold text-foreground">₹{room.pricePerMonth.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3.5">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="outline-none">
                              <Badge className={cn('gap-1 text-[10px] border cursor-pointer hover:opacity-80 transition-all select-none', statusBadgeColors[room.status])}>
                                <StatusIcon className="size-3" />
                                {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                              </Badge>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="bg-background border border-border rounded-xl shadow-lg">
                            <DropdownMenuItem className="cursor-pointer" onClick={() => {
                              updateRoomStatus(room.id, 'available')
                              toast.success(`Room ${room.roomNumber} is now Available`)
                            }}>
                              Available
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => {
                              updateRoomStatus(room.id, 'occupied')
                              toast.success(`Room ${room.roomNumber} is now Occupied`)
                            }}>
                              Occupied
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => {
                              updateRoomStatus(room.id, 'maintenance')
                              toast.success(`Room ${room.roomNumber} is under Maintenance`)
                            }}>
                              Maintenance
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                      <td className="px-4 py-3.5 text-muted-foreground">{room.residentName || '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {filteredRooms.length === 0 && (
            <div className="py-16 text-center text-muted-foreground">
              No rooms match your filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
