import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service | Bol Chaal News",
  description: "The terms and conditions governing your use of Bol Chaal News website and services.",
  openGraph: {
    title: "Terms of Service | Bol Chaal News",
    description: "Read the terms and conditions for using Bol Chaal News services.",
  },
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground">Last Updated: March 23, 2025</p>

          <p>
            Welcome to Bol Chaal News. These Terms of Service ("Terms") govern your access to and use of the Bol Chaal
            News website, mobile applications, and services (collectively, the "Services"). Please read these Terms
            carefully before using our Services.
          </p>

          <p>
            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these
            Terms, please do not access or use our Services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Use of Services</h2>

          <h3 className="text-xl font-medium mt-6 mb-3">1.1 Eligibility</h3>
          <p>
            You must be at least 16 years old to use our Services. By using our Services, you represent and warrant that
            you meet this requirement.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">1.2 Account Registration</h3>
          <p>
            Some features of our Services may require you to register for an account. When you register, you agree to
            provide accurate, current, and complete information and to update this information to maintain its accuracy.
            You are responsible for maintaining the confidentiality of your account credentials and for all activities
            that occur under your account.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">1.3 Prohibited Conduct</h3>
          <p>You agree not to:</p>
          <ul>
            <li>Use our Services in any way that violates any applicable law or regulation</li>
            <li>
              Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity
            </li>
            <li>Interfere with or disrupt the operation of our Services or servers</li>
            <li>Attempt to gain unauthorized access to any portion of our Services</li>
            <li>Use our Services to transmit any viruses, malware, or other malicious code</li>
            <li>Collect or harvest any information from our Services, including user accounts</li>
            <li>Use automated means, including spiders, robots, or scrapers, to access our Services</li>
            <li>
              Post or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory,
              vulgar, obscene, or otherwise objectionable
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Content</h2>

          <h3 className="text-xl font-medium mt-6 mb-3">2.1 Our Content</h3>
          <p>
            All content provided through our Services, including but not limited to text, graphics, logos, images,
            audio, video, and software, is owned by Bol Chaal News or its licensors and is protected by copyright,
            trademark, and other intellectual property laws.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">2.2 User Content</h3>
          <p>
            You may have the opportunity to submit content to our Services, such as comments, news tips, or other
            materials ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive,
            royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt,
            publish, translate, create derivative works from, distribute, and display such User Content in any media.
          </p>
          <p>
            You represent and warrant that you own or have the necessary rights to submit User Content and that your
            User Content does not violate the rights of any third party or any applicable law.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">2.3 Content Moderation</h3>
          <p>
            We reserve the right, but have no obligation, to monitor, edit, or remove any User Content that we
            determine, in our sole discretion, violates these Terms or is otherwise objectionable.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Third-Party Links and Services</h2>
          <p>
            Our Services may contain links to third-party websites or services that are not owned or controlled by Bol
            Chaal News. We have no control over, and assume no responsibility for, the content, privacy policies, or
            practices of any third-party websites or services. You acknowledge and agree that Bol Chaal News shall not
            be responsible or liable for any damage or loss caused by or in connection with the use of any such
            third-party website or service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Disclaimer of Warranties</h2>
          <p>
            OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
            IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT
            DEFECTS WILL BE CORRECTED, OR THAT OUR SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES
            OR OTHER HARMFUL COMPONENTS.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, BOL CHAAL NEWS AND ITS OFFICERS, DIRECTORS, EMPLOYEES,
            AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
            INCLUDING BUT NOT LIMITED TO, LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH
            YOUR ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, OUR SERVICES.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Bol Chaal News and its officers, directors, employees, and
            agents from and against any and all claims, liabilities, damages, losses, or expenses, including reasonable
            attorneys' fees and costs, arising out of or in any way connected with your access to or use of our Services
            or your violation of these Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. If we make material changes to these Terms, we will
            notify you by posting the revised Terms on our website and updating the "Last Updated" date. Your continued
            use of our Services after such changes constitutes your acceptance of the revised Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your access to our Services, without prior notice or liability,
            for any reason, including, without limitation, if you breach these Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its
            conflict of law provisions.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>
            Bol Chaal News
            <br />
            123 Media Avenue, Shimla
            <br />
            Himachal Pradesh, 171001
            <br />
            India
            <br />
            Email: legal@bolchaalnews.com
            <br />
            Phone: +91 1234 567890
          </p>

          <div className="mt-8 border-t pt-6">
            <p>
              By using our Services, you acknowledge that you have read, understood, and agree to be bound by these
              Terms of Service and our{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
