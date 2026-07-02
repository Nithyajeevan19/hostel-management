// ─── Type Definitions ──────────────────────────────────────────

export interface Branch {
  id: string
  name: string
  address: string
  city: string
  totalRooms: number
  occupiedRooms: number
  status: 'active' | 'maintenance' | 'upcoming'
  manager: string
  phone: string
  monthlyRevenue: number
}

export interface AdminRoom {
  id: string
  roomNumber: string
  branchId: string
  branchName: string
  type: 'Single' | 'Double Sharing' | 'Triple Sharing'
  ac: boolean
  pricePerMonth: number
  status: 'available' | 'occupied' | 'vacating' | 'maintenance'
  residentName?: string
  vacatingDate?: string
  floor: number
}

export interface BookingRequest {
  id: string
  name: string
  phone: string
  email: string
  roomType: string
  branchPreference: string
  branchId?: string
  date: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
}

export interface VisitRequest {
  id: string
  name: string
  phone: string
  email: string
  visitType: 'in-person' | 'virtual'
  preferredDate: string
  preferredTime: string
  branchPreference: string
  branchId?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}

export interface Resident {
  id: string
  name: string
  phone: string
  email: string
  roomNumber: string
  branchId: string
  branchName: string
  moveInDate: string
  rentStatus: 'paid' | 'pending' | 'overdue'
  paidMonth?: string
  paidDate?: string
  monthlyRent: number
  securityDeposit: number
  occupation: string
}

export interface RevenueData {
  month: string
  revenue: number
  occupancy: number
}

export interface ActivityItem {
  id: string
  type: 'booking' | 'visit' | 'payment' | 'move-in' | 'move-out'
  message: string
  timestamp: string
}

// ─── Mock Data ─────────────────────────────────────────────────

export const BRANCHES: Branch[] = [
  {
    id: 'bh-001',
    name: 'SURYA PG — Bandra West',
    address: 'Plot 12, Carter Road, Bandra West',
    city: 'Mumbai',
    totalRooms: 24,
    occupiedRooms: 21,
    status: 'active',
    manager: 'Rajesh Kumar',
    phone: '7013392233',
    monthlyRevenue: 468000,
  },
  {
    id: 'mp-001',
    name: 'SURYA PG — Powai',
    address: '45, Central Avenue, Hiranandani Gardens, Powai',
    city: 'Mumbai',
    totalRooms: 32,
    occupiedRooms: 28,
    status: 'active',
    manager: 'Priya Sharma',
    phone: '7013392233',
    monthlyRevenue: 612000,
  },
  {
    id: 'gb-001',
    name: 'SURYA PG — Andheri East',
    address: '78, Saki Vihar Road, Andheri East',
    city: 'Mumbai',
    totalRooms: 20,
    occupiedRooms: 14,
    status: 'active',
    manager: 'Vikram Reddy',
    phone: '7013392233',
    monthlyRevenue: 294000,
  },
  {
    id: 'my-001',
    name: 'SURYA PG — Vile Parle West',
    address: '42, SV Road, Opposite Station, Vile Parle West',
    city: 'Mumbai',
    totalRooms: 28,
    occupiedRooms: 25,
    status: 'active',
    manager: 'Ananya Rao',
    phone: '7013392233',
    monthlyRevenue: 525000,
  },
  {
    id: 'ku-001',
    name: 'SURYA PG — Thane',
    address: '15, Ghodbunder Road, Near Jupiter Hospital, Thane',
    city: 'Mumbai',
    totalRooms: 18,
    occupiedRooms: 0,
    status: 'upcoming',
    manager: 'TBD',
    phone: '—',
    monthlyRevenue: 0,
  },
]

export const ADMIN_ROOMS: AdminRoom[] = [
  // Bandra West
  { id: 'r-bh-101', roomNumber: '101', branchId: 'bh-001', branchName: 'Bandra West', type: 'Single', ac: true, pricePerMonth: 12000, status: 'occupied', residentName: 'Arun Mehta', floor: 1 },
  { id: 'r-bh-102', roomNumber: '102', branchId: 'bh-001', branchName: 'Bandra West', type: 'Single', ac: true, pricePerMonth: 12000, status: 'occupied', residentName: 'Sneha Gupta', floor: 1 },
  { id: 'r-bh-103', roomNumber: '103', branchId: 'bh-001', branchName: 'Bandra West', type: 'Double Sharing', ac: true, pricePerMonth: 9000, status: 'occupied', residentName: 'Karthik P.', floor: 1 },
  { id: 'r-bh-201', roomNumber: '201', branchId: 'bh-001', branchName: 'Bandra West', type: 'Single', ac: false, pricePerMonth: 8000, status: 'available', floor: 2 },
  { id: 'r-bh-202', roomNumber: '202', branchId: 'bh-001', branchName: 'Bandra West', type: 'Triple Sharing', ac: true, pricePerMonth: 7000, status: 'maintenance', floor: 2 },
  { id: 'r-bh-203', roomNumber: '203', branchId: 'bh-001', branchName: 'Bandra West', type: 'Double Sharing', ac: false, pricePerMonth: 6000, status: 'occupied', residentName: 'Rahul Nair', floor: 2 },
  // Powai
  { id: 'r-mp-101', roomNumber: '101', branchId: 'mp-001', branchName: 'Powai', type: 'Single', ac: true, pricePerMonth: 14000, status: 'occupied', residentName: 'Deepak Verma', floor: 1 },
  { id: 'r-mp-102', roomNumber: '102', branchId: 'mp-001', branchName: 'Powai', type: 'Double Sharing', ac: true, pricePerMonth: 10000, status: 'occupied', residentName: 'Isha Reddy', floor: 1 },
  { id: 'r-mp-201', roomNumber: '201', branchId: 'mp-001', branchName: 'Powai', type: 'Single', ac: true, pricePerMonth: 14000, status: 'available', floor: 2 },
  { id: 'r-mp-202', roomNumber: '202', branchId: 'mp-001', branchName: 'Powai', type: 'Triple Sharing', ac: false, pricePerMonth: 5500, status: 'occupied', residentName: 'Vishal K.', floor: 2 },
  { id: 'r-mp-301', roomNumber: '301', branchId: 'mp-001', branchName: 'Powai', type: 'Double Sharing', ac: true, pricePerMonth: 10000, status: 'occupied', residentName: 'Nidhi Jain', floor: 3 },
  // Andheri East
  { id: 'r-gb-101', roomNumber: '101', branchId: 'gb-001', branchName: 'Andheri East', type: 'Single', ac: true, pricePerMonth: 13000, status: 'occupied', residentName: 'Suresh Babu', floor: 1 },
  { id: 'r-gb-102', roomNumber: '102', branchId: 'gb-001', branchName: 'Andheri East', type: 'Double Sharing', ac: false, pricePerMonth: 6500, status: 'available', floor: 1 },
  { id: 'r-gb-201', roomNumber: '201', branchId: 'gb-001', branchName: 'Andheri East', type: 'Single', ac: false, pricePerMonth: 9000, status: 'available', floor: 2 },
  { id: 'r-gb-202', roomNumber: '202', branchId: 'gb-001', branchName: 'Andheri East', type: 'Triple Sharing', ac: true, pricePerMonth: 7500, status: 'maintenance', floor: 2 },
  // Vile Parle West
  { id: 'r-my-101', roomNumber: '101', branchId: 'my-001', branchName: 'Vile Parle West', type: 'Single', ac: true, pricePerMonth: 12000, status: 'occupied', residentName: 'Lakshmi Devi', floor: 1 },
  { id: 'r-my-102', roomNumber: '102', branchId: 'my-001', branchName: 'Vile Parle West', type: 'Double Sharing', ac: true, pricePerMonth: 9000, status: 'occupied', residentName: 'Amit Saxena', floor: 1 },
  { id: 'r-my-201', roomNumber: '201', branchId: 'my-001', branchName: 'Vile Parle West', type: 'Single', ac: false, pricePerMonth: 8000, status: 'available', floor: 2 },
  { id: 'r-my-301', roomNumber: '301', branchId: 'my-001', branchName: 'Vile Parle West', type: 'Triple Sharing', ac: false, pricePerMonth: 5000, status: 'occupied', residentName: 'Ramesh T.', floor: 3 },
]

export const BOOKING_REQUESTS: BookingRequest[] = [
  { id: 'bk-001', name: 'Aditya Sharma', phone: '+91 91234 56001', email: 'aditya@gmail.com', roomType: 'Single AC', branchPreference: 'Powai', branchId: 'mp-001', date: '2026-05-14', status: 'pending', notes: 'Needs parking space' },
  { id: 'bk-002', name: 'Priyanka Das', phone: '+91 91234 56002', email: 'priyanka@gmail.com', roomType: 'Double Sharing AC', branchPreference: 'Bandra West', branchId: 'bh-001', date: '2026-05-13', status: 'confirmed' },
  { id: 'bk-003', name: 'Mohammed Ali', phone: '+91 91234 56003', email: 'mali@gmail.com', roomType: 'Single Non-AC', branchPreference: 'Vile Parle West', branchId: 'my-001', date: '2026-05-12', status: 'completed' },
  { id: 'bk-004', name: 'Kavitha Reddy', phone: '+91 91234 56004', email: 'kavitha@gmail.com', roomType: 'Triple Sharing AC', branchPreference: 'Andheri East', branchId: 'gb-001', date: '2026-05-11', status: 'cancelled' },
  { id: 'bk-005', name: 'Rohit Joshi', phone: '+91 91234 56005', email: 'rohit@gmail.com', roomType: 'Double Sharing Non-AC', branchPreference: 'Powai', branchId: 'mp-001', date: '2026-05-15', status: 'pending' },
  { id: 'bk-006', name: 'Ananya Patel', phone: '+91 91234 56006', email: 'ananya@gmail.com', roomType: 'Single AC', branchPreference: 'Bandra West', branchId: 'bh-001', date: '2026-05-15', status: 'pending' },
]

export const VISIT_REQUESTS: VisitRequest[] = [
  { id: 'vr-001', name: 'Deepa Kumari', phone: '+91 92345 67001', email: 'deepa@gmail.com', visitType: 'in-person', preferredDate: '2026-05-16', preferredTime: '10:00 AM', branchPreference: 'Bandra West', branchId: 'bh-001', status: 'pending' },
  { id: 'vr-002', name: 'Sanjay Mishra', phone: '+91 92345 67002', email: 'sanjay@gmail.com', visitType: 'virtual', preferredDate: '2026-05-16', preferredTime: '2:00 PM', branchPreference: 'Powai', branchId: 'mp-001', status: 'confirmed' },
  { id: 'vr-003', name: 'Fatima Begum', phone: '+91 92345 67003', email: 'fatima@gmail.com', visitType: 'in-person', preferredDate: '2026-05-17', preferredTime: '11:00 AM', branchPreference: 'Andheri East', branchId: 'gb-001', status: 'pending' },
  { id: 'vr-004', name: 'Ravi Teja', phone: '+91 92345 67004', email: 'ravi@gmail.com', visitType: 'in-person', preferredDate: '2026-05-14', preferredTime: '4:00 PM', branchPreference: 'Vile Parle West', branchId: 'my-001', status: 'completed' },
  { id: 'vr-005', name: 'Nisha Agarwal', phone: '+91 92345 67005', email: 'nisha@gmail.com', visitType: 'virtual', preferredDate: '2026-05-15', preferredTime: '3:00 PM', branchPreference: 'Bandra West', branchId: 'bh-001', status: 'cancelled' },
]

export const RESIDENTS: Resident[] = [
  { id: 'res-001', name: 'Arun Mehta', phone: '+91 98001 00001', email: 'arun.m@gmail.com', roomNumber: '101', branchId: 'bh-001', branchName: 'Bandra West', moveInDate: '2026-01-15', rentStatus: 'paid', monthlyRent: 12000, securityDeposit: 24000, occupation: 'Software Engineer' },
  { id: 'res-002', name: 'Sneha Gupta', phone: '+91 98001 00002', email: 'sneha.g@gmail.com', roomNumber: '102', branchId: 'bh-001', branchName: 'Bandra West', moveInDate: '2026-02-01', rentStatus: 'paid', monthlyRent: 12000, securityDeposit: 24000, occupation: 'Data Analyst' },
  { id: 'res-003', name: 'Karthik P.', phone: '+91 98001 00003', email: 'karthik.p@gmail.com', roomNumber: '103', branchId: 'bh-001', branchName: 'Bandra West', moveInDate: '2025-11-10', rentStatus: 'pending', monthlyRent: 9000, securityDeposit: 18000, occupation: 'Student' },
  { id: 'res-004', name: 'Rahul Nair', phone: '+91 98001 00004', email: 'rahul.n@gmail.com', roomNumber: '203', branchId: 'bh-001', branchName: 'Bandra West', moveInDate: '2026-03-20', rentStatus: 'paid', monthlyRent: 6000, securityDeposit: 12000, occupation: 'UX Designer' },
  { id: 'res-005', name: 'Deepak Verma', phone: '+91 98001 00005', email: 'deepak.v@gmail.com', roomNumber: '101', branchId: 'mp-001', branchName: 'Powai', moveInDate: '2025-08-01', rentStatus: 'paid', monthlyRent: 14000, securityDeposit: 28000, occupation: 'Product Manager' },
  { id: 'res-006', name: 'Isha Reddy', phone: '+91 98001 00006', email: 'isha.r@gmail.com', roomNumber: '102', branchId: 'mp-001', branchName: 'Powai', moveInDate: '2026-01-05', rentStatus: 'overdue', monthlyRent: 10000, securityDeposit: 20000, occupation: 'MBA Student' },
  { id: 'res-007', name: 'Vishal K.', phone: '+91 98001 00007', email: 'vishal.k@gmail.com', roomNumber: '202', branchId: 'mp-001', branchName: 'Powai', moveInDate: '2025-12-15', rentStatus: 'paid', monthlyRent: 5500, securityDeposit: 11000, occupation: 'Intern' },
  { id: 'res-008', name: 'Nidhi Jain', phone: '+91 98001 00008', email: 'nidhi.j@gmail.com', roomNumber: '301', branchId: 'mp-001', branchName: 'Powai', moveInDate: '2026-04-01', rentStatus: 'paid', monthlyRent: 10000, securityDeposit: 20000, occupation: 'Consultant' },
  { id: 'res-009', name: 'Suresh Babu', phone: '+91 98001 00009', email: 'suresh.b@gmail.com', roomNumber: '101', branchId: 'gb-001', branchName: 'Andheri East', moveInDate: '2026-02-10', rentStatus: 'paid', monthlyRent: 13000, securityDeposit: 26000, occupation: 'DevOps Engineer' },
  { id: 'res-010', name: 'Lakshmi Devi', phone: '+91 98001 00010', email: 'lakshmi.d@gmail.com', roomNumber: '101', branchId: 'my-001', branchName: 'Vile Parle West', moveInDate: '2025-09-15', rentStatus: 'paid', monthlyRent: 12000, securityDeposit: 24000, occupation: 'Teacher' },
  { id: 'res-011', name: 'Amit Saxena', phone: '+91 98001 00011', email: 'amit.s@gmail.com', roomNumber: '102', branchId: 'my-001', branchName: 'Vile Parle West', moveInDate: '2026-03-01', rentStatus: 'pending', monthlyRent: 9000, securityDeposit: 18000, occupation: 'Freelancer' },
  { id: 'res-012', name: 'Ramesh T.', phone: '+91 98001 00012', email: 'ramesh.t@gmail.com', roomNumber: '301', branchId: 'my-001', branchName: 'Vile Parle West', moveInDate: '2025-10-20', rentStatus: 'paid', monthlyRent: 5000, securityDeposit: 10000, occupation: 'Student' },
]

export const REVENUE_DATA: RevenueData[] = [
  { month: 'Dec', revenue: 1520000, occupancy: 78 },
  { month: 'Jan', revenue: 1680000, occupancy: 82 },
  { month: 'Feb', revenue: 1750000, occupancy: 84 },
  { month: 'Mar', revenue: 1820000, occupancy: 86 },
  { month: 'Apr', revenue: 1890000, occupancy: 88 },
  { month: 'May', revenue: 1899000, occupancy: 85 },
]

export const RECENT_ACTIVITY: ActivityItem[] = [
  { id: 'act-001', type: 'booking', message: 'New booking request from Aditya Sharma (Powai)', timestamp: '2 hours ago' },
  { id: 'act-002', type: 'payment', message: 'Rent received from Deepak Verma — ₹14,000', timestamp: '4 hours ago' },
  { id: 'act-003', type: 'visit', message: 'Visit confirmed for Deepa Kumari (Bandra West)', timestamp: '5 hours ago' },
  { id: 'act-004', type: 'move-in', message: 'Ananya Patel moved into Room 201, Andheri East', timestamp: '1 day ago' },
  { id: 'act-005', type: 'move-out', message: 'Harsh Patel vacated Room 305, Powai', timestamp: '2 days ago' },
  { id: 'act-006', type: 'payment', message: 'Overdue reminder sent to Isha Reddy — ₹10,000', timestamp: '2 days ago' },
  { id: 'act-007', type: 'booking', message: 'Booking confirmed for Priyanka Das (Bandra West)', timestamp: '3 days ago' },
  { id: 'act-008', type: 'visit', message: 'Virtual tour completed with Sanjay Mishra (Powai)', timestamp: '3 days ago' },
]

// ─── Helper Functions ──────────────────────────────────────────

export function getTotalStats() {
  const totalRooms = BRANCHES.filter(b => b.status === 'active').reduce((sum, b) => sum + b.totalRooms, 0)
  const occupiedRooms = BRANCHES.filter(b => b.status === 'active').reduce((sum, b) => sum + b.occupiedRooms, 0)
  const totalRevenue = BRANCHES.filter(b => b.status === 'active').reduce((sum, b) => sum + b.monthlyRevenue, 0)
  const pendingRequests = BOOKING_REQUESTS.filter(b => b.status === 'pending').length + VISIT_REQUESTS.filter(v => v.status === 'pending').length

  return {
    totalRooms,
    occupiedRooms,
    occupancyRate: Math.round((occupiedRooms / totalRooms) * 100),
    totalRevenue,
    totalResidents: RESIDENTS.length,
    pendingRequests,
    activeBranches: BRANCHES.filter(b => b.status === 'active').length,
  }
}
