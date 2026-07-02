'use client'

import { useState, useMemo } from 'react'
import {
  Search,
  Users,
  Phone,
  Mail,
  Calendar,
  IndianRupee,
  Building2,
  BedDouble,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useAdminStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Resident } from '@/lib/admin-data'

function getCurrentMonth() {
  return new Date().toISOString().slice(0, 7)
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0]
}

function formatPaidMonth(month?: string) {
  if (!month) return ''

  return new Date(`${month}-01`).toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
  })
}

export default function ResidentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [branchFilter, setBranchFilter] = useState('all')
  const [rentFilter, setRentFilter] = useState('all')
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [paymentResident, setPaymentResident] = useState<Resident | null>(null)
  const [paymentForm, setPaymentForm] = useState({
    rentStatus: 'paid' as Resident['rentStatus'],
    paidMonth: getCurrentMonth(),
    paidDate: getCurrentDate(),
  })

  const { residents, branches, addResident, currentUser, updateResidentRentPayment } = useAdminStore()

  const isManager = currentUser?.role === 'branch_manager'
  const targetBranchId = currentUser?.branchId

  const activeResidents = useMemo(() => {
    if (isManager) {
      return residents.filter((r) => r.branchId === targetBranchId)
    }
    return residents
  }, [residents, isManager, targetBranchId])

  const [newResident, setNewResident] = useState({
    name: '',
    phone: '',
    email: '',
    roomNumber: '',
    branchId: '',
    moveInDate: new Date().toISOString().split('T')[0],
    rentStatus: 'pending' as 'paid' | 'pending' | 'overdue',
    monthlyRent: 0,
    securityDeposit: 0,
    occupation: '',
  })

  const filteredResidents = useMemo(() => {
    return activeResidents.filter((resident) => {
      const matchesSearch =
        resident.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resident.phone.includes(searchQuery) ||
        resident.occupation.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesBranch = isManager || branchFilter === 'all' || resident.branchId === branchFilter
      const matchesRent = rentFilter === 'all' || resident.rentStatus === rentFilter
      return matchesSearch && matchesBranch && matchesRent
    })
  }, [searchQuery, branchFilter, rentFilter, activeResidents, isManager])

  const rentStatusColors: Record<string, string> = {
    paid: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
    overdue: 'bg-red-100 text-red-700 border-red-200',
  }

  const rentStatusIcons: Record<string, typeof CheckCircle2> = {
    paid: CheckCircle2,
    pending: Clock,
    overdue: AlertTriangle,
  }

  const totalRent = activeResidents.reduce((s, r) => s + r.monthlyRent, 0)
  const paidCount = activeResidents.filter(r => r.rentStatus === 'paid').length
  const overdueCount = activeResidents.filter(r => r.rentStatus === 'overdue').length

  const handleAddResident = (e: React.FormEvent) => {
    e.preventDefault()
    const finalBranchId = isManager ? targetBranchId : newResident.branchId
    if (!finalBranchId) return

    const selectedBranch = branches.find(b => b.id === finalBranchId)
    if (!selectedBranch) return

    addResident({
      ...newResident,
      branchId: finalBranchId,
      id: `res-${Date.now()}`,
      branchName: selectedBranch.name.replace("Surya Mens & Women's PG — ", '')
    })
    
    setIsAddOpen(false)
    toast.success('Resident added successfully!')
    setNewResident({
      name: '', phone: '', email: '', roomNumber: '', branchId: '',
      moveInDate: new Date().toISOString().split('T')[0], rentStatus: 'pending',
      monthlyRent: 0, securityDeposit: 0, occupation: ''
    })
  }

  const openPaymentDialog = (resident: Resident) => {
    setPaymentResident(resident)
    setPaymentForm({
      rentStatus: resident.rentStatus,
      paidMonth: resident.paidMonth || getCurrentMonth(),
      paidDate: resident.paidDate || getCurrentDate(),
    })
  }

  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!paymentResident) return

    updateResidentRentPayment(
      paymentResident.id,
      paymentForm.rentStatus,
      paymentForm.rentStatus === 'paid' ? paymentForm.paidMonth : undefined,
      paymentForm.rentStatus === 'paid' ? paymentForm.paidDate : undefined
    )
    toast.success(`Rent status updated for ${paymentResident.name}`)
    setPaymentResident(null)
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground tracking-tight">
            Resident Directory
          </h1>
          <p className="text-muted-foreground mt-1">
            {isManager ? 'Complete directory of residents for your assigned branch' : 'Complete directory of all residents across branches'}
          </p>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-xl h-11 font-semibold">
              <Plus className="size-4" />
              Add Resident
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleAddResident}>
              <DialogHeader>
                <DialogTitle>Add New Resident</DialogTitle>
                <DialogDescription>
                  Enter the new resident's details here to onboard them to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto px-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" required value={newResident.name} onChange={e => setNewResident({...newResident, name: e.target.value})} placeholder="e.g. John Doe" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" required value={newResident.phone} onChange={e => setNewResident({...newResident, phone: e.target.value})} placeholder="+91..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required value={newResident.email} onChange={e => setNewResident({...newResident, email: e.target.value})} placeholder="email@..." />
                  </div>
                </div>
                {isManager ? (
                  <div className="space-y-2">
                    <Label htmlFor="room">Room Number</Label>
                    <Input id="room" required value={newResident.roomNumber} onChange={e => setNewResident({...newResident, roomNumber: e.target.value})} placeholder="e.g. 101" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch</Label>
                      <Select value={newResident.branchId} onValueChange={(v) => setNewResident({...newResident, branchId: v})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Branch" />
                        </SelectTrigger>
                        <SelectContent>
                          {branches.filter(b => b.status === 'active').map(b => (
                            <SelectItem key={b.id} value={b.id}>{b.name.replace("Surya Mens & Women's PG — ", '')}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="room">Room Number</Label>
                      <Input id="room" required value={newResident.roomNumber} onChange={e => setNewResident({...newResident, roomNumber: e.target.value})} placeholder="e.g. 101" />
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rent">Monthly Rent</Label>
                    <Input id="rent" type="number" required value={newResident.monthlyRent} onChange={e => setNewResident({...newResident, monthlyRent: parseInt(e.target.value) || 0})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input id="occupation" required value={newResident.occupation} onChange={e => setNewResident({...newResident, occupation: e.target.value})} placeholder="Student, Engineer..." />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={!isManager && !newResident.branchId}>Save Resident</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={!!paymentResident} onOpenChange={(open) => !open && setPaymentResident(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSavePayment}>
            <DialogHeader>
              <DialogTitle>Update Rent Payment</DialogTitle>
              <DialogDescription>
                Mark the resident's rent status and record the paid month and date.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Resident</Label>
                <div className="rounded-xl border border-border bg-muted/30 px-3 py-2 text-sm font-semibold">
                  {paymentResident?.name || 'Resident'}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rent-status">Rent Status</Label>
                <Select
                  value={paymentForm.rentStatus}
                  onValueChange={(value: Resident['rentStatus']) => setPaymentForm({ ...paymentForm, rentStatus: value })}
                >
                  <SelectTrigger id="rent-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {paymentForm.rentStatus === 'paid' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paid-month">Paid Month</Label>
                    <Input
                      id="paid-month"
                      type="month"
                      required
                      value={paymentForm.paidMonth}
                      onChange={(e) => setPaymentForm({ ...paymentForm, paidMonth: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paid-date">Paid Date</Label>
                    <Input
                      id="paid-date"
                      type="date"
                      required
                      value={paymentForm.paidDate}
                      onChange={(e) => setPaymentForm({ ...paymentForm, paidDate: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit">Save Payment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Users className="size-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold">{activeResidents.length}</p>
              <p className="text-xs text-muted-foreground">Total Residents</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <IndianRupee className="size-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xl font-bold">₹{(totalRent / 1000).toFixed(0)}K</p>
              <p className="text-xs text-muted-foreground">Expected Rent / mo</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 className="size-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-emerald-600">{paidCount}</p>
              <p className="text-xs text-muted-foreground">Rent Paid</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-red-50 flex items-center justify-center">
              <AlertTriangle className="size-5 text-red-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-red-600">{overdueCount}</p>
              <p className="text-xs text-muted-foreground">Overdue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, or occupation..."
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
                <option key={b.id} value={b.id}>{b.name.replace("Surya Mens & Women's PG — ", '')}</option>
              ))}
            </select>
          )}
          <select
            value={rentFilter}
            onChange={(e) => setRentFilter(e.target.value)}
            className="h-11 rounded-xl border border-border bg-background px-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Rent Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Residents Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Resident</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Contact</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Room</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Branch</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Move-in</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Rent</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredResidents.map((resident) => {
                  const StatusIcon = rentStatusIcons[resident.rentStatus]
                  const initials = resident.name.split(' ').map(n => n[0]).join('').slice(0, 2)
                  return (
                    <tr key={resident.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                            {initials}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{resident.name}</p>
                            <p className="text-xs text-muted-foreground">{resident.occupation}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Phone className="size-3" />{resident.phone}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Mail className="size-3" />{resident.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="flex items-center gap-1.5 font-medium text-foreground">
                          <BedDouble className="size-3.5 text-primary" />
                          Room {resident.roomNumber}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Building2 className="size-3.5" />
                          {resident.branchName}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Calendar className="size-3.5" />
                          {new Date(resident.moveInDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-foreground">₹{resident.monthlyRent.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex flex-col items-start gap-1.5">
                          <div className="flex items-center gap-2">
                            <Badge className={cn('gap-1 text-[10px] border', rentStatusColors[resident.rentStatus])}>
                              <StatusIcon className="size-3" />
                              {resident.rentStatus.charAt(0).toUpperCase() + resident.rentStatus.slice(1)}
                            </Badge>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="h-7 rounded-lg px-2 text-xs"
                              onClick={() => openPaymentDialog(resident)}
                            >
                              Update
                            </Button>
                          </div>
                          {resident.rentStatus === 'paid' && resident.paidMonth && resident.paidDate && (
                            <p className="text-[11px] text-muted-foreground">
                              {formatPaidMonth(resident.paidMonth)} on {new Date(resident.paidDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {filteredResidents.length === 0 && (
            <div className="py-16 text-center text-muted-foreground">No residents match your filters.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
