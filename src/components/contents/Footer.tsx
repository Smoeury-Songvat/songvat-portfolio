import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  ExternalLink,
  Code2,
  Heart,
  Coffee,
  Calendar
} from "lucide-react";

interface FooterProps {
  theme: string;
}

const Footer = ({ theme }: FooterProps) => {
  const isDark = theme === "primary";

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "songvatsmoeury@gmail.com",
      href: "mailto:songvatsmoeury@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+855 97 323 8144",
      href: "tel:+855973238144"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Phnom Penh, Cambodia",
      href: null
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/smoeury-songvat",
      username: "@smoeury-songvat"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/smoeury-songvat-a79aa0261",
      username: "/in/smoeury-songvat"
    }
  ];

  return (
    <footer className="w-full mt-6">
      {/* Contact & Social Section */}
      <Card className={`mb-8 transition-all duration-300 ${
        isDark 
          ? "bg-gray-800/50 border-gray-700/50" 
          : "bg-white border-gray-200"
      }`}>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h3 className={`font-semibold text-lg mb-4 flex items-center gap-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                <Mail className="w-5 h-5" />
                Get In Touch
              </h3>
              <div className="space-y-3">
                {contactInfo.map((contact, idx) => {
                  const IconComponent = contact.icon;
                  const content = (
                    <div className="flex items-center gap-3 group">
                      <IconComponent className={`w-4 h-4 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`} />
                      <div>
                        <span className={`text-xs uppercase tracking-wide font-medium ${
                          isDark ? "text-gray-500" : "text-gray-400"
                        }`}>
                          {contact.label}
                        </span>
                        <p className={`${
                          isDark ? "text-gray-300" : "text-gray-700"
                        } ${contact.href ? "group-hover:underline" : ""}`}>
                          {contact.value}
                        </p>
                      </div>
                    </div>
                  );

                  return contact.href ? (
                    <a 
                      key={idx}
                      href={contact.href}
                      className="block transition-colors hover:opacity-75"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={idx}>
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className={`font-semibold text-lg mb-4 flex items-center gap-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                <Code2 className="w-5 h-5" />
                Connect With Me
              </h3>
              <div className="space-y-3">
                {socialLinks.map((social, idx) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group hover:opacity-75 transition-opacity"
                    >
                      <IconComponent className={`w-4 h-4 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`} />
                      <div>
                        <span className={`text-xs uppercase tracking-wide font-medium ${
                          isDark ? "text-gray-500" : "text-gray-400"
                        }`}>
                          {social.label}
                        </span>
                        <p className={`group-hover:underline ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}>
                          {social.username}
                        </p>
                      </div>
                      <ExternalLink className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`} />
                    </a>
                  );
                })}
              </div>

              {/* Quick Links */}
              <div className="mt-6">
                <h4 className={`text-sm font-medium mb-3 ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}>
                  Quick Links
                </h4>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://drive.google.com/file/d/1RNMfio70XI6Ie88q557t7fuo2VAYmBb0/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm hover:underline flex items-center gap-2 ${
                      isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-500"
                    }`}
                  >
                    View Resume
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://dgc.gov.kh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm hover:underline flex items-center gap-2 ${
                      isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-500"
                    }`}
                  >
                    Current Workplace
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Availability Status */}
      <Card className={`mb-8 ${
        isDark 
          ? "bg-green-900/20 border-green-800/50" 
          : "bg-green-50 border-green-200"
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              isDark ? "bg-green-400" : "bg-green-500"
            }`}></div>
            <div>
              <p className={`font-medium ${
                isDark ? "text-green-400" : "text-green-700"
              }`}>
                Available for new opportunities
              </p>
              <p className={`text-sm ${
                isDark ? "text-green-300/80" : "text-green-600"
              }`}>
                Open to backend development roles and freelance projects
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Section */}
      <div className={`border-t pt-6 ${
        isDark ? "border-gray-700" : "border-gray-200"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={`text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              Made with
            </span>
            <Heart className={`w-4 h-4 ${
              isDark ? "text-red-400" : "text-red-500"
            }`} />
            <span className={`text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              and
            </span>
            <Coffee className={`w-4 h-4 ${
              isDark ? "text-yellow-400" : "text-yellow-600"
            }`} />
            <span className={`text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              by Smoeury Songvat (Not Officially)
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className={`w-4 h-4 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`} />
            <span className={`text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              © {new Date().getFullYear()} All rights reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };