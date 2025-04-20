import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Bol Chaal News",
  description:
    "Bol Chaal News privacy policy explains how we collect, use, and protect your personal information when you use our website and services.",
  openGraph: {
    title: "Privacy Policy | Bol Chaal News",
    description: "Learn how Bol Chaal News handles your personal information and protects your privacy.",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground">Last Updated: March 23, 2025</p>

          <p>
            Welcome to Bol Chaal News. We are committed to protecting your privacy and ensuring the security of your
            personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website or use our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>

          <h3 className="text-xl font-medium mt-6 mb-3">Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Register for an account</li>
            <li>Subscribe to our newsletter</li>
            <li>Submit news tips or content</li>
            <li>Participate in surveys or contests</li>
            <li>Contact us with inquiries</li>
            <li>Post comments on our articles</li>
          </ul>
          <p>
            This information may include your name, email address, phone number, location, and any other information you
            choose to provide.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">Automatically Collected Information</h3>
          <p>
            When you visit our website, we may automatically collect certain information about your device and usage
            patterns, including:
          </p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Device information</li>
            <li>Pages visited and time spent</li>
            <li>Referring websites</li>
            <li>Geographic location (country/city level)</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process and fulfill your requests</li>
            <li>Send you newsletters and updates</li>
            <li>Respond to your comments and inquiries</li>
            <li>Personalize your experience</li>
            <li>Monitor and analyze usage patterns</li>
            <li>Protect against unauthorized access and activities</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies and Similar Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to collect and track information about your browsing
            activities. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            However, if you do not accept cookies, you may not be able to use some portions of our service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Information Sharing and Disclosure</h2>
          <p>We may share your information in the following situations:</p>
          <ul>
            <li>
              <strong>Service Providers:</strong> We may share your information with third-party vendors and service
              providers who perform services on our behalf.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in
              response to valid requests by public authorities.
            </li>
            <li>
              <strong>Business Transfers:</strong> In the event of a merger, acquisition, or asset sale, your
              information may be transferred as a business asset.
            </li>
            <li>
              <strong>With Your Consent:</strong> We may share your information with third parties when we have your
              consent to do so.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
            Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>Access to your personal information</li>
            <li>Correction of inaccurate or incomplete information</li>
            <li>Deletion of your personal information</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
            <li>Objection to processing</li>
          </ul>
          <p>To exercise these rights, please contact us using the information provided in the "Contact Us" section.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 16. We do not knowingly collect personal
            information from children. If you are a parent or guardian and believe your child has provided us with
            personal information, please contact us.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy
            Policy periodically for any changes.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>
            Bol Chaal News
            <br />
            123 Media Avenue, Shimla
            <br />
            Himachal Pradesh, 171001
            <br />
            India
            <br />
            Email: privacy@bolchaalnews.com
            <br />
            Phone: +91 1234 567890
          </p>
        </div>
      </div>
    </div>
  )
}
