'use client'

import { useState, useMemo } from 'react'
import {
  Users,
  Plus,
  Search,
  Mail,
  Key,
  Building2,
  Trash2,
  Edit2,
  ShieldAlert,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAdminStore, ManagerUser } from '@/lib/store'
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

export default function ManagersPage() {
  const { managers, branches, addManager, updateManager, deleteManager, currentUser } = useAdminStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingManager, setEditingManager] = useState<ManagerUser | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    branchId: '',
  })

  const filteredManagers = useMemo(() => {
    return managers.filter((m) => {
      const branchName = branches.find((b) => b.id === m.branchId)?.name || ''
      return (
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branchName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
  }, [searchQuery, managers, branches])

  // Security guard for Client-Side rendering: if manager logs in, don't show the page content
  if (currentUser?.role !== 'super_admin') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShieldAlert className="size-16 text-red-500 mb-4 animate-bounce" />
        <h2 className="text-2xl font-serif font-bold text-foreground">Access Denied</h2>
        <p className="text-muted-foreground mt-2 max-w-md">
          You do not have administrative privileges to manage branch managers.
        </p>
      </div>
    )
  }

  const handleOpenAddDialog = () => {
    setEditingManager(null)
    setFormData({
      name: '',
      email: '',
      password: '',
      branchId: '',
    })
    setIsDialogOpen(true)
  }

  const handleOpenEditDialog = (manager: ManagerUser) => {
    setEditingManager(manager)
    setFormData({
      name: manager.name,
      email: manager.email,
      password: manager.password || '',
      branchId: manager.branchId || '',
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.branchId) {
      toast.error('Please assign a branch to the manager')
      return
    }

    if (editingManager) {
      // Edit
      updateManager({
        ...editingManager,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        branchId: formData.branchId,
      })
      toast.success('Manager updated successfully!')
    } else {
      // Add
      // Check if branch already has a manager assigned (warn, but proceed or replace)
      addManager({
        id: `mgr-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'branch_manager',
        branchId: formData.branchId,
      })
      toast.success('New Branch Manager registered successfully!')
    }

    setIsDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this manager? This will remove their dashboard login.')) {
      deleteManager(id)
      toast.success('Manager deleted successfully!')
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground tracking-tight">
            Branch Managers
          </h1>
          <p className="text-muted-foreground mt-1">
            Create, edit, and manage administrative credentials and branch assignments
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button onClick={handleOpenAddDialog} className="gap-2 rounded-xl h-11 font-semibold">
            <Plus className="size-4" />
            Add Manager
          </Button>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>{editingManager ? 'Edit Manager Details' : 'Register New Manager'}</DialogTitle>
                <DialogDescription>
                  Set credentials and assign a specific branch to this manager.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rajesh Kumar"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email / Username</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rajesh@homestay.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Login Password</Label>
                  <Input
                    id="password"
                    type="text"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="e.g. password123"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">Assigned Branch</Label>
                  <Select
                    value={formData.branchId}
                    onValueChange={(val) => setFormData({ ...formData, branchId: val })}
                  >
                    <SelectTrigger id="branch">
                      <SelectValue placeholder="Select Branch to Assign" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((b) => (
                        <SelectItem key={b.id} value={b.id}>
                          {b.name.replace('Mahi PG — ', '')} {b.manager && b.manager !== 'TBD' ? `(Current: ${b.manager})` : '(Unassigned)'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingManager ? 'Save Changes' : 'Register Manager'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, or branch..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl h-11"
        />
      </div>

      {/* Managers List Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Manager Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Login Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Password</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Assigned Branch</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredManagers.map((manager) => {
                  const assignedBranchName = branches.find((b) => b.id === manager.branchId)?.name?.replace('Mahi PG — ', '') || 'Unassigned'
                  const initials = manager.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()

                  return (
                    <tr key={manager.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                            {initials}
                          </div>
                          <span className="font-semibold text-foreground">{manager.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Mail className="size-3.5" />
                          {manager.email}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Key className="size-3.5" />
                          {manager.password || '••••••••'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1.5 text-foreground font-medium">
                          <Building2 className="size-3.5 text-primary" />
                          {assignedBranchName}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex gap-1.5">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs rounded-lg px-2.5"
                            onClick={() => handleOpenEditDialog(manager)}
                          >
                            <Edit2 className="size-3 mr-1" /> Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-xs rounded-lg px-2.5 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(manager.id)}
                          >
                            <Trash2 className="size-3 mr-1" /> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {filteredManagers.length === 0 && (
            <div className="py-16 text-center text-muted-foreground">
              No managers found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
