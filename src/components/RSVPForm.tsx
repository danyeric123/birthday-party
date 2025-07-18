import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Users, MessageSquare, CheckCircle, Loader2, AlertCircle, PartyPopper } from 'lucide-react'
import emailjs from '@emailjs/browser'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import MultiSelect from './ui/multi-select'

const rsvpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  guests: z.number().min(1, 'Must have at least 1 guest').max(8, 'Maximum 8 guests allowed'),
  dietary: z.array(z.string()).optional(),
  message: z.string().optional(),
  attending: z.enum(['yes', 'no'], {
    message: 'Please let us know if you can attend',
  }),
})

type RSVPFormData = z.infer<typeof rsvpSchema>

const DIETARY_OPTIONS = [
  { value: 'nut-allergy', label: '🥜 Nut Allergy (tree nuts)' },
  { value: 'peanut-allergy', label: '🥜 Peanut Allergy' },
  { value: 'seed-allergy', label: '🌻 Seed Allergy (sesame, sunflower, etc.)' },
  { value: 'gluten-free', label: '🌾 Gluten-Free/Celiac' },
  { value: 'dairy-free', label: '🥛 Dairy-Free/Lactose Intolerant' },
  { value: 'egg-allergy', label: '🥚 Egg Allergy' },
  { value: 'soy-allergy', label: '🫘 Soy Allergy' },
  { value: 'food-dye-sensitivity', label: '🌈 Food Dye Sensitivity' },
  { value: 'sugar-free', label: '🍯 Sugar-Free/Diabetic' },
  { value: 'other', label: '📝 Other (please specify in message)' },
]

export default function RSVPForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      guests: 1,
      attending: 'yes',
      dietary: [],
    },
  })

  const attending = form.watch('attending')

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      // Check if EmailJS environment variables are configured
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const recipientEmail = import.meta.env.VITE_RECIPIENT_EMAIL

      if (!publicKey || !serviceId || !templateId || !recipientEmail) {
        throw new Error('EmailJS environment variables not configured. Please check your .env file.')
      }

      // Prepare email data for EmailJS template
      const emailData = {
        to_email: recipientEmail,
        from_name: data.name,
        from_email: data.email,
        subject: `RSVP: ${data.name} - ${data.attending === 'yes' ? 'Attending' : 'Cannot Attend'} Birthday Party`,
        attending: data.attending === 'yes' ? 'YES ✅' : 'NO ❌',
        guest_count: data.attending === 'yes' ? data.guests : 'N/A',
        dietary_requirements: data.dietary && data.dietary.length > 0 
          ? data.dietary.map(d => DIETARY_OPTIONS.find(opt => opt.value === d)?.label || d).join(', ')
          : 'None specified',
        message: data.message || 'No additional message',
        event_name: "Tiferet Nagarpowers' Birthday Party",
        event_date: 'Sunday, August 10th, 2025',
        event_time: '2:00 PM - 5:00 PM',
        event_location: 'Cool Crafts of Long Island',
      }

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        emailData,
        publicKey
      )

      if (result.status === 200) {
        setIsSubmitted(true)
        
        // Close dialog after a delay
        setTimeout(() => {
          setIsOpen(false)
          setIsSubmitted(false)
          form.reset()
        }, 3000)
      } else {
        throw new Error('Failed to send RSVP')
      }
      
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to send RSVP. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setIsSubmitted(false)
      setSubmitError(null)
      form.reset()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="bg-pink-500 hover:bg-pink-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <Mail className="mr-2 h-5 w-5" />
          RSVP Now
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-3">
          <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            {isSubmitted ? (
              <>
                <CheckCircle className="h-6 w-6 text-green-500" />
                Thank You!
              </>
            ) : submitError ? (
              <>
                <AlertCircle className="h-6 w-6 text-red-500" />
                Oops! Something went wrong
              </>
            ) : (
              <>
                <PartyPopper className="h-6 w-6 text-purple-500" />
                RSVP to Tiferet's Party
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-gray-600 leading-relaxed">
            {isSubmitted 
              ? "Your RSVP has been sent successfully! We're so excited to celebrate with you. Keep an eye out for any updates about the party details."
              : submitError
              ? "We had trouble sending your RSVP. Please check your internet connection and try again, or contact us directly if the problem persists."
              : "Please let us know if you can join us for Tiferet's special birthday celebration! Your response helps us plan the perfect party for everyone."
            }
          </DialogDescription>
        </DialogHeader>

        {/* Error Message */}
        {submitError && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">{submitError}</p>
          </div>
        )}

        {isSubmitted ? (
          <div className="flex flex-col items-center py-8 space-y-6">
            <div className="relative">
              <CheckCircle className="h-20 w-20 text-green-500 animate-pulse" />
              <PartyPopper className="h-8 w-8 text-purple-500 absolute -top-2 -right-2" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-xl font-bold text-gray-800">RSVP Received! 🎉</p>
              <p className="text-gray-600 max-w-sm">
                Thank you for responding! We're thrilled you can celebrate with Tiferet. 
                You'll receive a confirmation email shortly with all the party details.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-center">
              <p className="text-sm text-purple-800 font-medium">
                🎂 Can't wait to party with you! 🎂
              </p>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="your.email@example.com" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Attending Field */}
              <FormField
                control={form.control}
                name="attending"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Will you be attending? *</FormLabel>
                    <FormControl>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="yes"
                            checked={field.value === 'yes'}
                            onChange={() => field.onChange('yes')}
                            className="text-green-500"
                          />
                          <span className="text-sm font-medium flex items-center gap-1">
                            <PartyPopper className="h-4 w-4" />
                            Yes, I'll be there!
                          </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="no"
                            checked={field.value === 'no'}
                            onChange={() => field.onChange('no')}
                            className="text-red-500"
                          />
                          <span className="text-sm font-medium">Sorry, can't make it 😔</span>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Conditional Fields for Attending = Yes */}
              {attending === 'yes' && (
                <>
                  {/* Number of Guests */}
                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Total number of guests (including yourself) *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max="8"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          />
                        </FormControl>
                        <FormDescription>
                          Maximum 8 guests allowed for this celebration
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Dietary Requirements */}
                  <FormField
                    control={form.control}
                    name="dietary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dietary Requirements or Allergies</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={DIETARY_OPTIONS}
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder="Select any dietary requirements..."
                          />
                        </FormControl>
                        <FormDescription>
                          Select all that apply. This helps us prepare appropriate kosher food for everyone.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* Message Field */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Message for Tiferet (optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a birthday message or any special notes..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Share your birthday wishes or let us know about any special accommodations needed!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="gap-2 sm:gap-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-pink-500 hover:bg-pink-600 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending RSVP...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send RSVP
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
} 