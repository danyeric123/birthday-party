import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Users,
  MessageSquare,
  CheckCircle,
  Loader2,
  AlertCircle,
  PartyPopper,
  Heart,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { EVENT_CONFIG } from "../config/eventConfig";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import DietaryAutocomplete from "./ui/dietary-autocomplete";

const rsvpSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name too long"),
  email: z.string().email("Please enter a valid email address"),
  guests: z
    .number()
    .min(1, "Must have at least 1 guest")
    .max(8, "Maximum 8 guests allowed"),
  dietary: z.array(z.string()).optional(),
  message: z
    .string()
    .max(500, "Message too long (max 500 characters)")
    .optional(),
  attending: z.enum(["yes", "no"], {
    message: "Please let us know if you can attend",
  }),
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

const DIETARY_OPTIONS = [
  { value: "nut-allergy", label: "🥜 Nut Allergy (tree nuts)" },
  { value: "peanut-allergy", label: "🥜 Peanut Allergy" },
  { value: "seed-allergy", label: "🌻 Seed Allergy (sesame, sunflower, etc.)" },
  { value: "gluten-free", label: "🌾 Gluten-Free/Celiac" },
  { value: "dairy-free", label: "🥛 Dairy-Free/Lactose Intolerant" },
  { value: "egg-allergy", label: "🥚 Egg Allergy" },
  { value: "soy-allergy", label: "🫘 Soy Allergy" },
  { value: "food-dye-sensitivity", label: "🌈 Food Dye Sensitivity" },
  { value: "sugar-free", label: "🍯 Sugar-Free/Diabetic" },
  { value: "other", label: "📝 Other (please specify in message)" },
];

export function RSVPButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      size="lg"
      onClick={onClick}
      className="bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:from-pink-600 hover:to-violet-600 shadow-xl btn-hover-lift border-0 font-bold px-10 py-4 text-lg rounded-full magical-glow focus-magical"
    >
      <span className="mr-2 text-xl" aria-hidden="true">
        🦄
      </span>
      RSVP Now
    </Button>
  );
}

interface RSVPFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RSVPForm({ open, onOpenChange }: RSVPFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedAttending, setSubmittedAttending] = useState<
    "yes" | "no" | null
  >(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      guests: 1,
      attending: "yes",
      dietary: [],
      name: "",
      email: "",
      message: "",
    },
  });

  const attending = form.watch("attending");

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Check if EmailJS environment variables are configured
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const recipientEmail = import.meta.env.VITE_RECIPIENT_EMAIL;

      if (!publicKey || !serviceId || !templateId || !recipientEmail) {
        throw new Error(
          "EmailJS environment variables not configured. Please check your .env file."
        );
      }

      // Prepare email data for EmailJS template
      const emailData = {
        to_email: recipientEmail,
        from_name: data.name,
        from_email: data.email,
        subject: `RSVP: ${data.name} - ${
          data.attending === "yes" ? "Attending" : "Cannot Attend"
        } Birthday Party`,
        attending: data.attending === "yes" ? "YES ✅" : "NO ❌",
        guest_count: data.attending === "yes" ? data.guests : "N/A",
        dietary_requirements:
          data.dietary && data.dietary.length > 0
            ? data.dietary
                .map(
                  (d) =>
                    DIETARY_OPTIONS.find((opt) => opt.value === d)?.label || d
                )
                .join(", ")
            : "None specified",
        message: data.message || "No additional message",
        event_name: EVENT_CONFIG.email.eventName,
        event_date: EVENT_CONFIG.event.date.readable,
        event_time: EVENT_CONFIG.event.time.duration,
        event_location: EVENT_CONFIG.venue.name,
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        emailData,
        publicKey
      );

      if (result.status === 200) {
        setSubmittedAttending(data.attending);
        setIsSubmitted(true);

        // Close dialog after a delay
        setTimeout(() => handleOpenChange(false), 4000);
      } else {
        throw new Error("Failed to send RSVP");
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to send RSVP. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      setIsSubmitted(false);
      setSubmittedAttending(null);
      setSubmitError(null);
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md w-[95vw] max-h-[90vh] overflow-y-auto gradient-magical-card border-2 border-pink-200">
        <DialogHeader className="text-center space-y-4">
          <div className="text-4xl mb-1" aria-hidden="true">
            🦄
          </div>
          <DialogTitle className="text-2xl font-bold rainbow-text flex items-center justify-center gap-2">
            {isSubmitted ? (
              submittedAttending === "no" ? (
                <span className="text-violet-700">Thanks for letting us know</span>
              ) : (
                <>
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-green-600">Thank You!</span>
                  <span className="text-2xl">🎉</span>
                </>
              )
            ) : submitError ? (
              <>
                <AlertCircle className="h-6 w-6 text-red-500" />
                <span className="text-red-600">Oops! Something went wrong</span>
                <span className="text-2xl">😔</span>
              </>
            ) : (
              <>
                RSVP to Rivkah's Unicorn Party
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-gray-600 leading-relaxed">
            {isSubmitted
              ? submittedAttending === "no"
                ? "Your RSVP has been sent. We're sorry you'll miss it!"
                : "Your RSVP has been sent. We're so excited to celebrate with you!"
              : submitError
              ? "We had trouble sending your RSVP. Please check your internet connection and try again, or contact us directly if the problem persists."
              : "Please let us know if you can join us for Rivkah's magical unicorn birthday celebration! Your response helps us plan the perfect party for everyone."}
          </DialogDescription>
        </DialogHeader>

        {/* Error Message */}
        {submitError && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">{submitError}</p>
          </div>
        )}

        {isSubmitted ? (
          submittedAttending === "no" ? (
            <div className="flex flex-col items-center py-8 space-y-4 text-center">
              <Heart className="h-16 w-16 text-pink-400 fill-pink-100" />
              <p className="text-xl font-bold text-violet-700">
                Sorry you'll miss it!
              </p>
              <p className="text-gray-600 max-w-sm leading-relaxed">
                Thank you for letting us know. We'll miss you at the party, and
                we'll save a little unicorn magic for you! 🦄
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center py-8 space-y-6">
              <div className="relative animate-bounce-magical">
                <CheckCircle className="h-20 w-20 text-green-500" />
                <span
                  className="text-4xl absolute -bottom-2 -left-3"
                  aria-hidden="true"
                >
                  🦄
                </span>
              </div>
              <div className="text-center space-y-3">
                <p className="text-xl font-bold rainbow-text">
                  Yay! See you there!
                </p>
                <p className="text-gray-600 max-w-sm leading-relaxed">
                  Thank you for letting us know. Rivkah can't wait to celebrate
                  with you!
                </p>
              </div>
              <div className="bg-gradient-to-r from-pink-50 to-violet-50 px-6 py-4 rounded-2xl border border-pink-200 text-center">
                <p className="text-sm text-pink-700 font-bold">
                  {EVENT_CONFIG.event.date.display} ·{" "}
                  {EVENT_CONFIG.event.time.duration}
                </p>
                <p className="text-xs text-violet-600 mt-1">
                  {EVENT_CONFIG.venue.address.full}
                </p>
              </div>
            </div>
          )
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      Full Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="h-12 text-base"
                        {...field}
                      />
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
                    <FormLabel className="text-base font-semibold">
                      Email Address *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        className="h-12 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-sm">
                      Only used if we need to reach you about the party
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Attending Field */}
              <FormField
                control={form.control}
                name="attending"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-base font-semibold">
                      Will you be attending? *
                    </FormLabel>
                    <FormControl>
                      <div className="gap-4 grid">
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-green-200 bg-green-50/50 hover:bg-green-50 transition-colors">
                          <input
                            type="radio"
                            value="yes"
                            id="attending-yes"
                            checked={field.value === "yes"}
                            onChange={() => field.onChange("yes")}
                            className="w-4 h-4 text-green-600 border-green-300 focus:ring-green-500"
                          />
                          <Label
                            htmlFor="attending-yes"
                            className="flex items-center gap-2 cursor-pointer font-medium text-green-700"
                          >
                            <PartyPopper className="h-4 w-4" />
                            Yes, I'll be there! 🎉
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-red-200 bg-red-50/50 hover:bg-red-50 transition-colors">
                          <input
                            type="radio"
                            value="no"
                            id="attending-no"
                            checked={field.value === "no"}
                            onChange={() => field.onChange("no")}
                            className="w-4 h-4 text-red-600 border-red-300 focus:ring-red-500"
                          />
                          <Label
                            htmlFor="attending-no"
                            className="cursor-pointer font-medium text-red-700"
                          >
                            Sorry, can't make it 😔
                          </Label>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Conditional Fields for Attending = Yes */}
              {attending === "yes" && (
                <div className="space-y-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
                  <div className="flex items-center gap-2">
                    <PartyPopper className="h-5 w-5 text-pink-600" />
                    <h4 className="font-semibold text-pink-700">
                      Party Details
                    </h4>
                  </div>

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
                            className="h-12 text-base"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 1)
                            }
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
                          <DietaryAutocomplete
                            options={DIETARY_OPTIONS}
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder="Type to search dietary requirements..."
                          />
                        </FormControl>
                        <FormDescription>
                          Type to search and select dietary requirements. Try
                          "gluten", "dairy", "nuts", etc. This helps us prepare
                          appropriate kosher food for everyone.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Message Field */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Message for Rivkah (optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a birthday message or any special notes..."
                        className="resize-none min-h-[100px] text-base"
                        maxLength={500}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Share your birthday wishes or let us know about any
                      special accommodations needed! ({field.value?.length || 0}
                      /500)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  disabled={isSubmitting}
                  className="flex-1 h-12"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-12 bg-pink-600 hover:bg-pink-700 text-white font-semibold btn-hover-lift"
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
  );
}
