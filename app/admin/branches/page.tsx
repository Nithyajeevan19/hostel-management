'use client'

import { useState } from 'react'
import {
  Building2,
  MapPin,
  Phone,
  Users,
  IndianRupee,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  TrendingUp,
  Trash2,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAdminStore } from '@/lib/store'
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type BranchFormStatus = 'active' | 'maintenance' | 'upcoming'

export default function BranchesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddOpen, setIsAddOpen] = useState(false)
  const { branches, addBranch, deleteBranch } = useAdminStore()

  const [newBranch, setNewBranch] = useState({
    name: '',
    address: '',
    city: 'Pune',
    totalRooms: 0,
    status: 'active' as BranchFormStatus,
    manager: '',
    phone: '',
  })

  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const statusColors: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    maintenance: 'bg-amber-100 text-amber-700 border-amber-200',
    upcoming: 'bg-blue-100 text-blue-700 border-blue-200',
  }

  const handleAddBranch = (e: React.FormEvent) => {
    e.preventDefault()
    addBranch({
      ...newBranch,
      id: `br-${Date.now()}`,
      occupiedRooms: 0,
      monthlyRevenue: 0,
      name: `Surya Mens & Women's PG — ${newBranch.name}`
    })
    setIsAddOpen(false)
    toast.success('Branch added successfully!')
    setNewBranch({
      name: '',
      address: '',
      city: 'Pune',
      totalRooms: 0,
      status: 'active',
      manager: '',
      phone: '',
    })
  }

  const handleDelete = (id: string) => {
    deleteBranch(id)
    toast.success('Branch deleted successfully!')
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground tracking-tight">
            Branch Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage all your PG properties across Pune
          </p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-xl h-11 font-semibold">
              <Plus className="size-4" />
              Add Branch
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleAddBranch}>
              <DialogHeader>
                <DialogTitle>Add New Branch</DialogTitle>
                <DialogDescription>
                  Enter the details of the new PG branch here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Branch Area/Name</Label>
                  <Input id="name" required value={newBranch.name} onChange={e => setNewBranch({...newBranch, name: e.target.value})} placeholder="e.g. Madhapur Phase 2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required value={newBranch.address} onChange={e => setNewBranch({...newBranch, address: e.target.value})} placeholder="Full address" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rooms">Total Rooms</Label>
                    <Input id="rooms" type="number" required value={newBranch.totalRooms} onChange={e => setNewBranch({...newBranch, totalRooms: parseInt(e.target.value) || 0})} min="1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={newBranch.status} onValueChange={(v: BranchFormStatus) => setNewBranch({...newBranch, status: v})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager">Manager Name</Label>
                  <Input id="manager" value={newBranch.manager} onChange={e => setNewBranch({...newBranch, manager: e.target.value})} placeholder="Manager name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Manager Phone</Label>
                  <Input id="phone" value={newBranch.phone} onChange={e => setNewBranch({...newBranch, phone: e.target.value})} placeholder="+91..." />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Branch</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50">
              <Building2 className="size-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{branches.filter(b => b.status === 'active').length}</p>
              <p className="text-sm text-muted-foreground">Active Branches</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50">
              <Users className="size-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{branches.reduce((s, b) => s + b.totalRooms, 0)}</p>
              <p className="text-sm text-muted-foreground">Total Rooms</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-50">
              <IndianRupee className="size-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">₹{(branches.reduce((s, b) => s + b.monthlyRevenue, 0) / 100000).toFixed(1)}L</p>
              <p className="text-sm text-muted-foreground">Total Revenue / mo</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search branches..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl h-11"
        />
      </div>

      {/* Branch Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredBranches.map((branch) => {
          const occupancyPercent = branch.totalRooms > 0
            ? Math.round((branch.occupiedRooms / branch.totalRooms) * 100)
            : 0

          return (
            <Card key={branch.id} className="group relative overflow-hidden hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="font-serif text-lg">{branch.name.replace("Surya Mens & Women's PG — ", '')}</CardTitle>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="size-3.5" />
                      <span className="text-xs">{branch.address}</span>
                    </div>
                  </div>
                  <Badge className={`text-[10px] border ${statusColors[branch.status]}`}>
                    {branch.status === 'active' ? 'Active' : branch.status === 'maintenance' ? 'Maintenance' : 'Upcoming'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-2 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold text-foreground">{branch.totalRooms}</p>
                    <p className="text-[10px] text-muted-foreground font-medium">Rooms</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold text-foreground">{branch.occupiedRooms}</p>
                    <p className="text-[10px] text-muted-foreground font-medium">Occupied</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold text-foreground">{occupancyPercent}%</p>
                    <p className="text-[10px] text-muted-foreground font-medium">Occupancy</p>
                  </div>
                </div>

                {/* Occupancy Progress */}
                <div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        occupancyPercent >= 90 ? 'bg-red-500' :
                        occupancyPercent >= 70 ? 'bg-emerald-500' :
                        'bg-amber-500'
                      }`}
                      style={{ width: `${occupancyPercent}%` }}
                    />
                  </div>
                </div>

                {/* Revenue + Manager */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="size-3.5 text-emerald-600" />
                    <span className="text-sm font-bold text-foreground">₹{(branch.monthlyRevenue / 1000).toFixed(0)}K<span className="text-muted-foreground font-normal text-xs">/mo</span></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Phone className="size-3" />
                    {branch.manager || 'N/A'}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button onClick={() => toast.info('Manage functionality coming soon')} variant="outline" size="sm" className="flex-1 rounded-lg text-xs h-9">
                    <Settings className="size-3.5 mr-1.5" />
                    Manage
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="rounded-lg h-9 w-9 p-0">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toast.info('Edit branch clicked')}>
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-600" onClick={() => handleDelete(branch.id)}>
                        <Trash2 className="size-4 mr-2" />
                        Delete Branch
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
