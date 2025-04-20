import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Bol Chaal News",
  description:
    "Get in touch with Bol Chaal News team for inquiries, feedback, news tips, or advertising opportunities.",
  openGraph: {
    title: "Contact Bol Chaal News",
    description: "Reach out to Himachal Pradesh's premier news channel for inquiries, feedback, or collaboration.",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Bol Chaal News Logo",
      },
    ],
  },
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Main Office</h3>
                <p className="text-muted-foreground">
                  Bol Chaal News Headquarters
                  <br />
                  Mehre, Barsar, Shimla
                  <br />
                  Himachal Pradesh, 174305
                  <br />
                  India
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Phone</h3>
                <p className="text-muted-foreground">
                  Editorial: +91 8988 089 080
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Email</h3>
                <p className="text-muted-foreground">
                  General Inquiries: info@bolchaalnews.com
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Working Hours</h3>
                <p className="text-muted-foreground">
                  Monday to Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: Closed (Emergency news desk remains operational)
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Enter subject"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Enter your message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
