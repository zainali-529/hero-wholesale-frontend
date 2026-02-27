import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import MainLayout from '../../components/layout/MainLayout.jsx'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'

function ContactPage() {
  return (
    <MainLayout>
      <section className="mt-4">
        {/* Header */}
        <div className="mb-10 max-w-2xl space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-red-500">
            Contact us
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            We’re here to help you grow.
          </h1>
          <p className="text-sm text-slate-600 sm:text-[15px]">
            Have a question about our wholesale lines, delivery schedules, or bulk
            pricing? Reach out to our dedicated support team.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* Contact Info Column */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Get in touch
              </h3>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-900">
                      Head Office
                    </p>
                    <p className="text-sm text-slate-600">
                      2 Stacey Avenue
                      <br />
                      London N18 3PL, United Kingdom
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-900">Phone</p>
                    <p className="text-sm text-slate-600">
                      <span className="font-medium">Sales:</span> 020 8803 5621
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-900">Email</p>
                    <p className="text-sm text-slate-600">
                      sales@herocateringltd.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-900">
                      Operating Hours
                    </p>
                    <p className="text-sm text-slate-600">
                      Mon - Sat: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-sm text-slate-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="mb-6 text-lg font-semibold text-slate-900">
              Send us a message
            </h3>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business">Business name</Label>
                  <Input id="business" placeholder="Restaurant or Cafe name" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="tel" placeholder="0300 1234567" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-account">
                      Opening a new account
                    </SelectItem>
                    <SelectItem value="order-inquiry">
                      Order status or inquiry
                    </SelectItem>
                    <SelectItem value="product-info">
                      Product information
                    </SelectItem>
                    <SelectItem value="pricing">Bulk pricing quote</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  className="min-h-[120px]"
                />
              </div>

              <div className="pt-2">
                <Button className="w-full bg-red-600 hover:bg-red-700 sm:w-auto">
                  <Send className="mr-2 h-4 w-4" /> Send message
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 sm:mt-20">
          <div className="mb-8 space-y-2 text-center">
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Visit our Headquarters
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-600">
              Come say hello at our main distribution center. We're located in the heart of the wholesale district.
            </p>
          </div>
          
          <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm sm:aspect-[21/9]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2477.585724590393!2d-0.05445792434685794!3d51.61271177183754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761e64020c6a31%3A0x6a0f4c0a0c0c0c0c!2s2%20Stacey%20Ave%2C%20London%20N18%203PL%2C%20UK!5e0!3m2!1sen!2s!4v1709123456789!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default ContactPage
