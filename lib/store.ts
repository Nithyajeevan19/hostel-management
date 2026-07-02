import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  BRANCHES,
  ADMIN_ROOMS,
  BOOKING_REQUESTS,
  VISIT_REQUESTS,
  RESIDENTS,
  REVENUE_DATA,
  RECENT_ACTIVITY,
  Branch,
  AdminRoom,
  BookingRequest,
  VisitRequest,
  Resident,
  RevenueData,
  ActivityItem
} from './admin-data'

export interface User {
  id: string
  name: string
  email: string
  role: 'super_admin' | 'branch_manager'
  branchId?: string
}

export interface ManagerUser extends User {
  password?: string
}

interface AdminState {
  isAuthenticated: boolean
  currentUser: User | null
  managers: ManagerUser[]
  branches: Branch[]
  rooms: AdminRoom[]
  bookingRequests: BookingRequest[]
  visitRequests: VisitRequest[]
  residents: Resident[]
  revenueData: RevenueData[]
  recentActivity: ActivityItem[]

  // Auth actions
  login: (email: string, password: string) => { success: boolean; error?: string }
  logout: () => void

  // Manager actions
  addManager: (manager: ManagerUser) => void
  updateManager: (manager: ManagerUser) => void
  deleteManager: (id: string) => void

  // Data actions
  addBranch: (branch: Branch) => void
  deleteBranch: (id: string) => void
  addRoom: (room: AdminRoom) => void
  addResident: (resident: Resident) => void
  addVisitRequest: (request: Omit<VisitRequest, 'id' | 'status'>) => void
  addBookingRequest: (request: Omit<BookingRequest, 'id' | 'status'>) => void
  updateRoomStatus: (roomId: string, status: AdminRoom['status']) => void
  updateRoomOccupancy: (roomId: string, status: AdminRoom['status'], vacatingDate?: string) => void
  updateResidentRentPayment: (residentId: string, rentStatus: Resident['rentStatus'], paidMonth?: string, paidDate?: string) => void
  updateBookingStatus: (id: string, status: BookingRequest['status']) => void
  updateVisitStatus: (id: string, status: VisitRequest['status']) => void
}

const INITIAL_MANAGERS: ManagerUser[] = [
  { id: 'mgr-1', name: 'Rajesh Kumar', email: 'rajesh@homestay.com', password: 'password123', role: 'branch_manager', branchId: 'bh-001' },
  { id: 'mgr-2', name: 'Priya Sharma', email: 'priya@homestay.com', password: 'password123', role: 'branch_manager', branchId: 'mp-001' },
  { id: 'mgr-3', name: 'Vikram Reddy', email: 'vikram@homestay.com', password: 'password123', role: 'branch_manager', branchId: 'gb-001' },
  { id: 'mgr-4', name: 'Ananya Rao', email: 'ananya@homestay.com', password: 'password123', role: 'branch_manager', branchId: 'my-001' },
]

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      currentUser: null,
      managers: INITIAL_MANAGERS,
      branches: BRANCHES,
      rooms: ADMIN_ROOMS,
      bookingRequests: BOOKING_REQUESTS,
      visitRequests: VISIT_REQUESTS,
      residents: RESIDENTS,
      revenueData: REVENUE_DATA,
      recentActivity: RECENT_ACTIVITY,

      login: (email, password) => {
        const emailLower = email.toLowerCase().trim()
        if (
          (emailLower === 'admin' || emailLower === 'admin@homestay.com') &&
          password === 'admin123'
        ) {
          const user: User = {
            id: 'admin-001',
            name: 'Admin',
            email: 'admin@homestay.com',
            role: 'super_admin',
          }
          set({ isAuthenticated: true, currentUser: user })
          return { success: true }
        }

        const manager = (get().managers || INITIAL_MANAGERS).find(
          (m) => m.email.toLowerCase() === emailLower && m.password === password
        )

        if (manager) {
          const user: User = {
            id: manager.id,
            name: manager.name,
            email: manager.email,
            role: manager.role,
            branchId: manager.branchId,
          }
          set({ isAuthenticated: true, currentUser: user })
          return { success: true }
        }

        return { success: false, error: 'Invalid email or password.' }
      },

      logout: () => set({ isAuthenticated: false, currentUser: null }),

      addManager: (manager) =>
        set((state) => {
          const currentManagers = state.managers || INITIAL_MANAGERS
          const updatedBranches = (state.branches || []).map((b) =>
            b.id === manager.branchId ? { ...b, manager: manager.name } : b
          )
          return {
            managers: [...currentManagers, manager],
            branches: updatedBranches,
          }
        }),

      updateManager: (updated) =>
        set((state) => {
          const currentManagers = state.managers || INITIAL_MANAGERS
          const updatedManagers = currentManagers.map((m) =>
            m.id === updated.id ? updated : m
          )
          const updatedBranches = (state.branches || []).map((b) =>
            b.id === updated.branchId ? { ...b, manager: updated.name } : b
          )
          return {
            managers: updatedManagers,
            branches: updatedBranches,
          }
        }),

      deleteManager: (id) =>
        set((state) => {
          const currentManagers = state.managers || INITIAL_MANAGERS
          const deleted = currentManagers.find((m) => m.id === id)
          const updatedManagers = currentManagers.filter((m) => m.id !== id)
          const updatedBranches = (state.branches || []).map((b) =>
            deleted && b.id === deleted.branchId ? { ...b, manager: 'TBD' } : b
          )
          return {
            managers: updatedManagers,
            branches: updatedBranches,
          }
        }),

      addBranch: (branch) =>
        set((state) => ({
          branches: [...state.branches, branch],
        })),

      deleteBranch: (id) =>
        set((state) => ({
          branches: state.branches.filter((b) => b.id !== id),
        })),

      addRoom: (room) =>
        set((state) => {
          const updatedRooms = [...state.rooms, room]
          const branchOccupancy: Record<string, number> = {}
          updatedRooms.forEach((r) => {
            if (r.status === 'occupied' || r.status === 'vacating') {
              branchOccupancy[r.branchId] = (branchOccupancy[r.branchId] || 0) + 1
            }
          })
          const updatedBranches = state.branches.map((b) =>
            b.id === room.branchId
              ? {
                  ...b,
                  totalRooms: b.totalRooms + 1,
                  occupiedRooms: branchOccupancy[b.id] || 0,
                }
              : b
          )

          return {
            rooms: updatedRooms,
            branches: updatedBranches,
          }
        }),

      addResident: (resident) =>
        set((state) => ({
          residents: [...state.residents, resident],
        })),

      addVisitRequest: (request) =>
        set((state) => {
          const newRequest: VisitRequest = {
            ...request,
            id: `vr-${Date.now()}`,
            status: 'pending',
          }
          const newActivity: ActivityItem = {
            id: `act-${Date.now()}`,
            type: 'visit',
            message: `New visit request from ${request.name} (${request.branchPreference})`,
            timestamp: 'Just now',
          }
          return {
            visitRequests: [newRequest, ...state.visitRequests],
            recentActivity: [newActivity, ...state.recentActivity],
          }
        }),

      addBookingRequest: (request) =>
        set((state) => {
          const newRequest: BookingRequest = {
            ...request,
            id: `bk-${Date.now()}`,
            status: 'pending',
          }
          const newActivity: ActivityItem = {
            id: `act-${Date.now()}`,
            type: 'booking',
            message: `New booking request from ${request.name} (${request.branchPreference})`,
            timestamp: 'Just now',
          }
          return {
            bookingRequests: [newRequest, ...state.bookingRequests],
            recentActivity: [newActivity, ...state.recentActivity],
          }
        }),

      updateRoomStatus: (roomId, status) =>
        set((state) => {
          const updatedRooms = state.rooms.map((r) =>
            r.id === roomId ? { ...r, status, vacatingDate: status === 'vacating' ? r.vacatingDate : undefined } : r
          )
          const branchOccupancy: Record<string, number> = {}
          updatedRooms.forEach((r) => {
            if (r.status === 'occupied' || r.status === 'vacating') {
              branchOccupancy[r.branchId] = (branchOccupancy[r.branchId] || 0) + 1
            }
          })
          const updatedBranches = state.branches.map((b) => ({
            ...b,
            occupiedRooms: branchOccupancy[b.id] || 0,
          }))

          return {
            rooms: updatedRooms,
            branches: updatedBranches,
          }
        }),

      updateRoomOccupancy: (roomId, status, vacatingDate) =>
        set((state) => {
          const updatedRooms = state.rooms.map((r) =>
            r.id === roomId
              ? {
                  ...r,
                  status,
                  residentName: status === 'available' ? undefined : r.residentName,
                  vacatingDate: status === 'vacating' ? vacatingDate : undefined,
                }
              : r
          )
          const branchOccupancy: Record<string, number> = {}
          updatedRooms.forEach((r) => {
            if (r.status === 'occupied' || r.status === 'vacating') {
              branchOccupancy[r.branchId] = (branchOccupancy[r.branchId] || 0) + 1
            }
          })
          const updatedBranches = state.branches.map((b) => ({
            ...b,
            occupiedRooms: branchOccupancy[b.id] || 0,
          }))

          return {
            rooms: updatedRooms,
            branches: updatedBranches,
          }
        }),

      updateResidentRentPayment: (residentId, rentStatus, paidMonth, paidDate) =>
        set((state) => {
          const updatedResidents = state.residents.map((r) =>
            r.id === residentId
              ? {
                  ...r,
                  rentStatus,
                  paidMonth: rentStatus === 'paid' ? paidMonth : undefined,
                  paidDate: rentStatus === 'paid' ? paidDate : undefined,
                }
              : r
          )
          const resident = state.residents.find((r) => r.id === residentId)
          const newActivity: ActivityItem = {
            id: `act-${Date.now()}`,
            type: 'payment',
            message: `Rent status for ${resident?.name || 'resident'} marked ${rentStatus}`,
            timestamp: 'Just now',
          }

          return {
            residents: updatedResidents,
            recentActivity: [newActivity, ...state.recentActivity],
          }
        }),

      updateBookingStatus: (id, status) =>
        set((state) => {
          const request = state.bookingRequests.find((b) => b.id === id)
          const updatedRequests = state.bookingRequests.map((b) =>
            b.id === id ? { ...b, status } : b
          )
          const activityMessage = `Booking request from ${request?.name} was ${status}`
          const newActivity: ActivityItem = {
            id: `act-${Date.now()}`,
            type: 'booking',
            message: activityMessage,
            timestamp: 'Just now',
          }
          return {
            bookingRequests: updatedRequests,
            recentActivity: [newActivity, ...state.recentActivity],
          }
        }),

      updateVisitStatus: (id, status) =>
        set((state) => {
          const request = state.visitRequests.find((v) => v.id === id)
          const updatedRequests = state.visitRequests.map((v) =>
            v.id === id ? { ...v, status } : v
          )
          const activityMessage = `Visit request from ${request?.name} was ${status}`
          const newActivity: ActivityItem = {
            id: `act-${Date.now()}`,
            type: 'visit',
            message: activityMessage,
            timestamp: 'Just now',
          }
          return {
            visitRequests: updatedRequests,
            recentActivity: [newActivity, ...state.recentActivity],
          }
        }),
    }),
    {
      name: 'admin-store-v2',
    }
  )
)

export function useTotalStats() {
  const currentUser = useAdminStore((state) => state.currentUser)
  const branches = useAdminStore((state) => state.branches)
  const bookingRequests = useAdminStore((state) => state.bookingRequests)
  const visitRequests = useAdminStore((state) => state.visitRequests)
  const residents = useAdminStore((state) => state.residents)

  const isManager = currentUser?.role === 'branch_manager'
  const targetBranchId = currentUser?.branchId

  const filteredBranches = isManager
    ? branches.filter((b) => b.id === targetBranchId)
    : branches

  const activeBranches = filteredBranches.filter((b) => b.status === 'active')
  
  const totalRooms = activeBranches.reduce((sum, b) => sum + b.totalRooms, 0)
  const occupiedRooms = activeBranches.reduce((sum, b) => sum + b.occupiedRooms, 0)
  const totalRevenue = activeBranches.reduce((sum, b) => sum + b.monthlyRevenue, 0)

  const filteredBookings = isManager
    ? bookingRequests.filter((b) => b.branchId === targetBranchId)
    : bookingRequests
  const filteredVisits = isManager
    ? visitRequests.filter((v) => v.branchId === targetBranchId)
    : visitRequests

  const pendingRequests =
    filteredBookings.filter((b) => b.status === 'pending').length +
    filteredVisits.filter((v) => v.status === 'pending').length

  const filteredResidents = isManager
    ? residents.filter((r) => r.branchId === targetBranchId)
    : residents

  return {
    totalRooms,
    occupiedRooms,
    occupancyRate: totalRooms ? Math.round((occupiedRooms / totalRooms) * 100) : 0,
    totalRevenue,
    totalResidents: filteredResidents.length,
    pendingRequests,
    activeBranches: activeBranches.length,
  }
}
