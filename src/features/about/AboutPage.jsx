import MainLayout from '../../components/layout/MainLayout.jsx'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'

function AboutPage() {
  const teamMembers = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      image: '/team-1.jpg',
      bio: 'With 15+ years in wholesale distribution, Sarah founded Hero Foods to revolutionize bulk supply chains.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Chief Operations Officer',
      image: '/team-2.jpg',
      bio: 'Leading our operations with expertise in logistics optimization and supply chain excellence.'
    },
    {
      name: 'James Mitchell',
      role: 'Director of Sales',
      image: '/team-3.jpg',
      bio: 'Dedicated to building lasting partnerships with our clients and understanding their unique needs.'
    }
  ]

  const values = [
    {
      title: 'Quality First',
      description: 'We source only premium products that meet rigorous quality standards for your business.'
    },
    {
      title: 'Reliability',
      description: 'Consistent on-time delivery and dependable service you can count on every time.'
    },
    {
      title: 'Innovation',
      description: 'Continuously improving our processes and offerings to stay ahead of market demands.'
    },
    {
      title: 'Partnership',
      description: 'Building genuine relationships with our customers, not just transactions.'
    }
  ]

  const sellingPoints = [
    {
      number: '15+',
      label: 'Years Industry Experience'
    },
    {
      number: '500+',
      label: 'Active Clients Nationwide'
    },
    {
      number: '99.2%',
      label: 'On-Time Delivery Rate'
    },
    {
      number: '24/7',
      label: 'Customer Support'
    }
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative -mx-4 -mt-8 mb-12 sm:-mx-6 lg:-mx-8">
        <div className="relative h-96 overflow-hidden bg-slate-900">
          <img 
            src="/about-hero.jpg" 
            alt="Professional wholesale warehouse" 
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-4">
              Our Story
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 max-w-3xl leading-tight">
              Revolutionizing Wholesale Distribution
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl">
              Connecting businesses with premium wholesale products at scale
            </p>
          </div>
        </div>
      </section>

      {/* Company History Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-3">
              Our Heritage
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Built on Trust and Experience
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Hero Wholesale Foods started with a simple vision: to simplify bulk purchasing for businesses of all sizes. Founded in 2009, we've grown from a small regional distributor to a trusted national partner serving over 500 active clients.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Our journey reflects our commitment to understanding the unique challenges of wholesale buyers. We've invested in infrastructure, relationships, and technology to ensure every transaction is seamless and every delivery reliable.
            </p>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Learn Our Full Story
            </Button>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img 
              src="/values-image.jpg" 
              alt="Company warehouse operations" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mb-16 bg-slate-50 -mx-4 px-4 py-12 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="inline-block w-1 h-6 bg-red-500 rounded" />
                Our Mission
              </h3>
              <p className="text-slate-600 leading-relaxed">
                To empower businesses by providing reliable, high-quality wholesale products and services that streamline operations, reduce costs, and enable growth for companies of every size.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="inline-block w-1 h-6 bg-red-500 rounded" />
                Our Vision
              </h3>
              <p className="text-slate-600 leading-relaxed">
                To be the most trusted and innovative wholesale distribution partner in North America, known for operational excellence, customer-centricity, and industry leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-3">
            By The Numbers
          </p>
          <h2 className="text-3xl font-bold text-slate-900">
            Our Impact & Scale
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {sellingPoints.map((point, index) => (
            <Card key={index} className="p-6 text-center border-0 bg-slate-50 hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-red-500 mb-2">
                {point.number}
              </div>
              <div className="text-sm text-slate-600 font-medium">
                {point.label}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-3">
            What Drives Us
          </p>
          <h2 className="text-3xl font-bold text-slate-900">
            Core Values That Guide Our Work
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="p-6 border-0 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 flex-shrink-0">
                  <span className="text-red-500 font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {value.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-3">
            Leadership Team
          </p>
          <h2 className="text-3xl font-bold text-slate-900">
            Meet The Experts Behind Hero Wholesale
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden bg-slate-200">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-red-500 mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="mb-16 bg-slate-50 -mx-4 px-4 py-12 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-3">
              Unique Selling Points
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              Why Choose Hero Wholesale?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Comprehensive Product Range
                </h3>
                <p className="text-slate-600 text-sm">
                  Frozen, dry, beverage, and packaging lines all in one place
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Competitive Pricing
                </h3>
                <p className="text-slate-600 text-sm">
                  Volume discounts and wholesale rates that maximize your margins
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Fast & Reliable Delivery
                </h3>
                <p className="text-slate-600 text-sm">
                  99.2% on-time delivery rate with real-time tracking
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Dedicated Support
                </h3>
                <p className="text-slate-600 text-sm">
                  24/7 customer service and dedicated account managers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-3">
          Ready To Partner
        </p>
        <h2 className="text-3xl font-bold text-slate-900 mb-6">
          Grow Your Business With Us
        </h2>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          Join hundreds of businesses already benefiting from our wholesale solutions. Let's discuss how we can support your growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-red-500 hover:bg-red-600 text-white px-8">
            Get Started Today
          </Button>
          <Button variant="outline" className="px-8">
            Contact Our Sales Team
          </Button>
        </div>
      </section>
    </MainLayout>
  )
}

export default AboutPage