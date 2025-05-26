import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { MerchantContactButton } from "@/components/merchant-contact-button";

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <p className="text-muted-foreground mb-6">
          Have questions or feedback? We'd love to hear from you. Reach out
          through any of these channels.
        </p>

        <div className="space-y-4">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Our Location</p>
              <p className="text-muted-foreground">
                123 Fashion Street, Style City, SC 12345
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Phone Number</p>
              <p className="text-muted-foreground">(205) 637-3308</p>
            </div>
          </div>

          <div className="flex items-start">
            <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Email Address</p>
              <p className="text-muted-foreground">hello@NGO².com</p>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Business Hours</p>
              <p className="text-muted-foreground">
                Monday - Friday: 9am - 6pm
              </p>
              <p className="text-muted-foreground">Saturday: 10am - 4pm</p>
              <p className="text-muted-foreground">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <h3 className="text-lg font-medium mb-3">Connect on WhatsApp</h3>
        <p className="text-muted-foreground mb-4">
          For quick responses, reach out to us directly on WhatsApp.
        </p>
        <MerchantContactButton variant="default" className="w-full md:w-auto" />
      </div>

      <div className="pt-4">
        <h3 className="text-lg font-medium mb-3">Follow Us</h3>
        <p className="text-muted-foreground mb-4">
          Stay updated with our latest collections and promotions.
        </p>
        <div className="flex space-x-4">
          <a
            href="https://facebook.com/NGO²"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a
            href="https://tiktok.com/@NGO²"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-black text-white hover:bg-zinc-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
              <path d="M15 8c0 1.657-1.343 3-3 3"></path>
              <path d="M21 8v4c0 4.418-3.582 8-8 8s-8-3.582-8-8c0-3.418 2.159-6.337 5.172-7.497"></path>
              <path d="M15 2h-4v10"></path>
            </svg>
          </a>
          <a
            href="https://youtube.com/@NGO²"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
