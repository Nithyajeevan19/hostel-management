'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { useAdminStore } from '@/lib/store'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const { addVisitRequest, addBookingRequest } = useAdminStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (formData.subject === 'visit') {
      addVisitRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        visitType: 'in-person',
        preferredDate: 'TBD',
        preferredTime: 'TBD',
        branchPreference: 'Unspecified',
      })
    } else {
      addBookingRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        roomType: 'Unspecified',
        branchPreference: 'Unspecified',
        date: new Date().toISOString().split('T')[0],
        notes: `Subject: ${formData.subject}. Message: ${formData.message}`,
      })
    }

    toast.success('Request sent successfully!', {
      description: 'You can now see this request in the Admin Dashboard.',
    })

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    })
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            autoComplete="name"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input
              id="phone"
              type="tel"
              placeholder="7013392233"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="subject">Subject</FieldLabel>
          <Select
            value={formData.subject}
            onValueChange={(value) => setFormData({ ...formData, subject: value })}
          >
            <SelectTrigger id="subject">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="visit">Schedule a Visit</SelectItem>
                <SelectItem value="inquiry">Room Inquiry</SelectItem>
                <SelectItem value="booking">Booking Assistance</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea
            id="message"
            placeholder="Tell us how we can help you..."
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </Field>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner className="size-4" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
