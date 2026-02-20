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
                      123 Wholesale Market, New Food Sector
                      <br />
                      Karachi, Pakistan
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
                      <span className="font-medium">Sales:</span> +92 300
                      1234567
                    </p>
                    <p className="text-sm text-slate-600">
                      <span className="font-medium">Support:</span> +92 300
                      7654321
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
                      sales@wholesalehero.com
                    </p>
                    <p className="text-sm text-slate-600">
                      support@wholesalehero.com
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

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <h4 className="mb-2 font-medium text-slate-900">
                Opening a new account?
              </h4>
              <p className="mb-4 text-sm text-slate-600">
                For restaurants and cafes looking to open a credit account,
                please visit our Partner page for requirements.
              </p>
              <Button
                variant="outline"
                asChild
                className="h-8 border-slate-200 bg-white text-xs hover:bg-white hover:text-red-600"
              >
                <Link to="/partner">View partner requirements</Link>
              </Button>
            </div>
          </div>

          {/* Contact Form Column */}
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
          <div className="h-[300px] w-full overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 shadow-sm sm:h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d924237.1542365415!2d66.59496426464843!3d25.19297839616892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f4455504035!2sKarachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1715421234567!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            ></iframe>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default ContactPage
