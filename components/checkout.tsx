'use client'

import { useState } from 'react'
import Script from 'next/script'
import { startTransition } from 'react'
import { createRazorpayOrder } from '@/app/actions/razorpay'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance
  }
}

interface RazorpaySuccessResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

interface RazorpayFailureResponse {
  error: {
    description: string
  }
}

interface RazorpayOptions {
  key: string | undefined
  amount: string | number
  currency: string
  name: string
  description: string
  order_id: string
  handler: (response: RazorpaySuccessResponse) => void
  prefill: {
    name: string
    email: string
    contact: string
  }
  theme: {
    color: string
  }
}

interface RazorpayInstance {
  on: (event: 'payment.failed', handler: (response: RazorpayFailureResponse) => void) => void
  open: () => void
}

interface CheckoutProps {
  roomId: string
}

export function Checkout({ roomId }: CheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)

  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

  const handlePayment = async () => {
    if (!isScriptLoaded) {
      toast.error('Payment gateway is loading. Please try again in a moment.')
      return
    }

    setIsProcessing(true)

    try {
      const orderData = await createRazorpayOrder(roomId)

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Surya Mens & Women's PG",
        description: orderData.roomDesc,
        order_id: orderData.orderId,
        handler: function (response: RazorpaySuccessResponse) {
          // This function is called on successful payment
          setIsSuccess(true)
          toast.success('Payment successful!', {
            description: `Payment ID: ${response.razorpay_payment_id}`,
          })
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#8b5a2b', // Our primary brand color (fallback if okLCH isn't supported)
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', function (response: RazorpayFailureResponse) {
        toast.error('Payment failed', {
          description: response.error.description,
        })
      })
      rzp.open()
    } catch (error) {
      toast.error('Failed to initialize payment', {
        description: 'Please try again later.',
      })
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (!razorpayKey) {
    return (
      <Alert variant="destructive" className="my-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Configuration Error</AlertTitle>
        <AlertDescription>
          Razorpay is not configured. Please set NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your environment variables to enable payments.
        </AlertDescription>
      </Alert>
    )
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
        <CheckCircle2 className="size-16 text-primary mb-4" />
        <h3 className="text-2xl font-serif font-bold text-foreground">Booking Confirmed!</h3>
        <p className="mt-2 text-muted-foreground max-w-md">
          Thank you for choosing Surya Mens & Women&apos;s PG. Your security deposit has been paid successfully and your room is reserved. We will contact you shortly with the next steps.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[300px]">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        onReady={() => {
          setIsScriptLoaded(true)
        }}
        onError={() => {
          toast.error('Failed to load payment gateway')
        }}
      />
      
      <div className="text-center w-full max-w-sm">
        <h3 className="text-xl font-serif font-semibold mb-4">Complete Your Booking</h3>
        <p className="text-muted-foreground mb-8 text-sm">
          You are about to pay the security deposit to reserve your room. This amount is fully refundable.
        </p>
        
        <Button 
          size="lg" 
          className="w-full text-lg h-12 shadow-md hover:shadow-lg transition-all duration-300" 
          onClick={handlePayment} 
          disabled={isProcessing || !isScriptLoaded}
        >
          {isProcessing ? (
            <>
              <Spinner className="mr-2 size-5" />
              Processing...
            </>
          ) : (
            'Pay Securely with Razorpay'
          )}
        </Button>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0110 0v4"></path>
          </svg>
          100% Secure Checkout
        </div>
      </div>
    </div>
  )
}
