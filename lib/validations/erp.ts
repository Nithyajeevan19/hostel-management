import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const branchSchema = z.object({
  name: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  phone: z.string().optional(),
  status: z.enum(['active', 'maintenance', 'upcoming']).default('active'),
  managerId: z.string().optional(),
  totalRooms: z.number().int().min(0).default(0),
})

export const roomSchema = z.object({
  branchId: z.string().min(1),
  roomNumber: z.string().min(1),
  type: z.enum(['Single', 'Double Sharing', 'Triple Sharing']),
  ac: z.boolean().default(false),
  floor: z.number().int().min(0),
  pricePerMonth: z.number().int().min(0),
  status: z.enum(['vacant', 'occupied', 'vacating', 'maintenance']).default('vacant'),
  vacatingDate: z.string().date().optional(),
})

export const residentSchema = z.object({
  branchId: z.string().min(1),
  roomId: z.string().optional(),
  bedId: z.string().optional(),
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional(),
  occupation: z.string().optional(),
  moveInDate: z.string().date(),
  monthlyRent: z.number().int().min(0),
  securityDeposit: z.number().int().min(0).default(0),
  dueDay: z.number().int().min(1).max(31).default(5),
})

export const visitRequestSchema = z.object({
  branchId: z.string().optional(),
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  visitType: z.enum(['in_person', 'virtual']).default('in_person'),
  preferredDate: z.string().date().optional(),
  preferredTime: z.string().optional(),
  branchPreference: z.string().min(2),
})

export const invoiceCreateSchema = z.object({
  branchId: z.string().min(1),
  residentId: z.string().min(1),
  roomId: z.string().optional(),
  bedId: z.string().optional(),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2020),
  rent: z.number().int().min(0),
  electricity: z.number().int().min(0).default(0),
  laundry: z.number().int().min(0).default(0),
  maintenance: z.number().int().min(0).default(0),
  lateFee: z.number().int().min(0).default(0),
  discount: z.number().int().min(0).default(0),
  tax: z.number().int().min(0).default(0),
  dueDate: z.string().date(),
})
