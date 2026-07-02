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
  CalendarClock,
  Plus,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAdminStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import type { AdminRoom } from '@/lib/admin-data'

function getToday() {
  return new Date().toISOString().split('T')[0]
}

function getRoomStatusLabel(status: AdminRoom['status']) {
  if (status === 'available') return 'Vacant'
  if (status === 'vacating') return 'Vacating'
  return status.charAt(0).toUpperCase() + status.slice(1)
}

function getBranchDisplayName(name: string) {
  return name.replace('Mahi PG — ', '').replace('Mahi PG â€” ', '')
}

const emptyRoomForm = {
  roomNumber: '',
  branchId: '',
  type: 'Single' as AdminRoom['type'],
  ac: true,
  pricePerMonth: 0,
  status: 'available' as AdminRoom['status'],
  residentName: '',
  vacatingDate: getToday(),
  floor: 1,
}

export default function RoomsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [branchFilter, setBranchFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [vacatingRoom, setVacatingRoom] = useState<AdminRoom | null>(null)
  const [vacatingDate, setVacatingDate] = useState(getToday())
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newRoom, setNewRoom] = useState(emptyRoomForm)

  const { rooms, branches, currentUser, addRoom, updateRoomStatus, updateRoomOccupancy } = useAdminStore()

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
    vacating: CalendarClock,
    maintenance: Wrench,
  }

  const statusBadgeColors: Record<string, string> = {
    available: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    occupied: 'bg-blue-100 text-blue-700 border-blue-200',
    vacating: 'bg-orange-100 text-orange-700 border-orange-200',
    maintenance: 'bg-amber-100 text-amber-700 border-amber-200',
  }

  // Summary stats
  const totalAvailable = activeRooms.filter(r => r.status === 'available').length
  const totalOccupied = activeRooms.filter(r => r.status === 'occupied').length
  const totalVacating = activeRooms.filter(r => r.status === 'vacating').length
  const totalMaintenance = activeRooms.filter(r => r.status === 'maintenance').length

  const handleOpenVacatingDialog = (room: AdminRoom) => {
    setVacatingRoom(room)
    setVacatingDate(room.vacatingDate || getToday())
  }

  const handleSaveVacating = (e: React.FormEvent) => {
    e.preventDefault()
    if (!vacatingRoom) return

    updateRoomOccupancy(vacatingRoom.id, 'vacating', vacatingDate)
    toast.success(`Room ${vacatingRoom.roomNumber} marked vacating on ${new Date(vacatingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`)
    setVacatingRoom(null)
  }

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault()

    const finalBranchId = isManager ? targetBranchId : newRoom.branchId
    if (!finalBranchId) return

    const selectedBranch = branches.find((branch) => branch.id === finalBranchId)
    if (!selectedBranch) return

    addRoom({
      id: `r-${finalBranchId}-${Date.now()}`,
      roomNumber: newRoom.roomNumber.trim(),
      branchId: finalBranchId,
      branchName: getBranchDisplayName(selectedBranch.name),
      type: newRoom.type,
      ac: newRoom.ac,
      pricePerMonth: newRoom.pricePerMonth,
      status: newRoom.status,
      residentName: newRoom.status === 'occupied' || newRoom.status === 'vacating'
        ? newRoom.residentName.trim() || undefined
        : undefined,
      vacatingDate: newRoom.status === 'vacating' ? newRoom.vacatingDate : undefined,
      floor: newRoom.floor,
    })

    toast.success(`Room ${newRoom.roomNumber} added successfully`)
    setNewRoom(emptyRoomForm)
    setIsAddOpen(false)
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground tracking-tight">
            Room Inventory
          </h1>
          <p className="text-muted-foreground mt-1">
            {isManager ? 'View and manage rooms for your assigned branch' : 'View and manage rooms across all branches'}
          </p>
        </div>

        <Button className="gap-2 rounded-xl h-11 font-semibold" onClick={() => setIsAddOpen(true)}>
          <Plus className="size-4" />
          Add Room
        </Button>
      </div>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <form onSubmit={handleAddRoom}>
            <DialogHeader>
              <DialogTitle>Add Room</DialogTitle>
              <DialogDescription>
                Enter the room details and initial availability status.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[65vh] overflow-y-auto px-1">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="room-number">Room Number</Label>
                  <Input
                    id="room-number"
                    required
                    value={newRoom.roomNumber}
                    onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
                    placeholder="e.g. 401"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floor">Floor</Label>
                  <Input
                    id="floor"
                    type="number"
                    min={0}
                    required
                    value={newRoom.floor}
                    onChange={(e) => setNewRoom({ ...newRoom, floor: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              {!isManager && (
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <select
                    id="branch"
                    required
                    value={newRoom.branchId}
                    onChange={(e) => setNewRoom({ ...newRoom, branchId: e.target.value })}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select branch</option>
                    {branches.filter((branch) => branch.status === 'active').map((branch) => (
                      <option key={branch.id} value={branch.id}>{getBranchDisplayName(branch.name)}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="room-type">Room Type</Label>
                  <select
                    id="room-type"
                    value={newRoom.type}
                    onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value as AdminRoom['type'] })}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="Single">Single</option>
                    <option value="Double Sharing">Double Sharing</option>
                    <option value="Triple Sharing">Triple Sharing</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ac-type">AC Type</Label>
                  <select
                    id="ac-type"
                    value={newRoom.ac ? 'ac' : 'non-ac'}
                    onChange={(e) => setNewRoom({ ...newRoom, ac: e.target.value === 'ac' })}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="ac">AC</option>
                    <option value="non-ac">Non-AC</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Monthly Price</Label>
                  <Input
                    id="price"
                    type="number"
                    min={0}
                    required
                    value={newRoom.pricePerMonth}
                    onChange={(e) => setNewRoom({ ...newRoom, pricePerMonth: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-status">Initial Status</Label>
                  <select
                    id="room-status"
                    value={newRoom.status}
                    onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value as AdminRoom['status'] })}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="available">Vacant</option>
                    <option value="occupied">Occupied</option>
                    <option value="vacating">Vacating</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              {(newRoom.status === 'occupied' || newRoom.status === 'vacating') && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="resident-name">Resident Name</Label>
                    <Input
                      id="resident-name"
                      value={newRoom.residentName}
                      onChange={(e) => setNewRoom({ ...newRoom, residentName: e.target.value })}
                      placeholder="Optional"
                    />
                  </div>
                  {newRoom.status === 'vacating' && (
                    <div className="space-y-2">
                      <Label htmlFor="new-room-vacating-date">Vacating Date</Label>
                      <Input
                        id="new-room-vacating-date"
                        type="date"
                        required
                        value={newRoom.vacatingDate}
                        onChange={(e) => setNewRoom({ ...newRoom, vacatingDate: e.target.value })}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={!isManager && !newRoom.branchId}>Save Room</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!vacatingRoom} onOpenChange={(open) => !open && setVacatingRoom(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSaveVacating}>
            <DialogHeader>
              <DialogTitle>Mark Room Vacating</DialogTitle>
              <DialogDescription>
                Select the date this resident is expected to vacate the room.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Room</Label>
                <div className="rounded-xl border border-border bg-muted/30 px-3 py-2 text-sm font-semibold">
                  Room {vacatingRoom?.roomNumber || ''}
                  {vacatingRoom?.residentName ? ` - ${vacatingRoom.residentName}` : ''}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vacating-date">Vacating Date</Label>
                <Input
                  id="vacating-date"
                  type="date"
                  required
                  value={vacatingDate}
                  onChange={(e) => setVacatingDate(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Vacating Date</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
            <div className="size-10 rounded-xl bg-orange-50 flex items-center justify-center">
              <CalendarClock className="size-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-orange-600">{totalVacating}</p>
              <p className="text-xs text-muted-foreground">Vacating</p>
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
              <p className="text-xs text-muted-foreground">Vacant</p>
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
            <option value="available">Vacant</option>
            <option value="occupied">Occupied</option>
            <option value="vacating">Vacating</option>
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
                                {getRoomStatusLabel(room.status)}
                              </Badge>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="bg-background border border-border rounded-xl shadow-lg">
                            <DropdownMenuItem className="cursor-pointer" onClick={() => {
                              updateRoomOccupancy(room.id, 'available')
                              toast.success(`Room ${room.roomNumber} is now Vacant`)
                            }}>
                              Vacant
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => {
                              updateRoomOccupancy(room.id, 'occupied')
                              toast.success(`Room ${room.roomNumber} is now Occupied`)
                            }}>
                              Occupied
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleOpenVacatingDialog(room)}>
                              Vacating by date
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => {
                              updateRoomStatus(room.id, 'maintenance')
                              toast.success(`Room ${room.roomNumber} is under Maintenance`)
                            }}>
                              Maintenance
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        {room.status === 'vacating' && room.vacatingDate && (
                          <p className="mt-1 text-[11px] text-muted-foreground">
                            By {new Date(room.vacatingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        )}
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
