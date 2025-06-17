import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Calendar, MapPin, ExternalLink, Building2 } from "lucide-react";

interface ExperienceItem {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  achievements: string[];
  companyUrl?: string;
  type: "full-time" | "part-time" | "contract" | "internship";
}

interface ExperienceProps {
  theme: string;
}

const Experience = ({ theme }: ExperienceProps) => {
  theme = theme === "primary" ? "dark" : "light"; // Adjust theme for dark/light mode
  // Sample data - replace with your actual experience
  const experiences: ExperienceItem[] = [
    {
      id: "1",
      position: "Backend Developer",
      company: "Digital Government Committee",
      location: "Phnom Penh, Cambodia",
      startDate: "Nov 2023",
      endDate: "Present",
      description:
        "Develop backend development for government digital solutions, focusing on building scalable systems using ASP.NET",
      technologies: [
        "ASP.NET",
        "ASP.NET Core",
        "ASP.NET Web Forms",
        "Node.js",
        "Typescript",
        "SQL Server",
        "Docker",
      ],
      achievements: [
        "Developed Verify.gov.kh QR Code Generator Portal using ASP.NET",
        "Developed Government Prodcut Management System (GPMS)",
      ],
      companyUrl: "https://dgc.gov.kh",
      type: "full-time",
    },
    {
      id: "2",
      position: "Backend Developer",
      company: "Digital Government Committee",
      location: "Phnom Penh, Cambodia",
      startDate: "Aug 2023",
      endDate: "Oct 2023",
      description:
        "Worked on backend solutions to data import, and testing processes and developed tools for efficient system verification using Next.js and Cypress.",
      technologies: [
        "Node.js",
        "Next.js",
        "Express.js",
        "Typescript",
        "SQL Server",
        "Docker",
        "Cypress"
      ],
      achievements: [
        "Authentication & Authorization: Implemented secure access control with Keycloak in collaboration with the team.",
        "Data Import Tool: Developed a TypeScript-based tool in Express.js to streamline data management for Verify.gov.kh.",
        "Testing Tool: Built a Next.js and Cypress testing tool for efficient system status verification and reliability.",
      ],
      companyUrl: "https://dgc.gov.kh",
      type: "internship",
    },
  ];

  const getTypeColor = (type: string, theme: string) => {
    const isDark = theme === "dark";

    switch (type) {
      case "full-time":
        return isDark
          ? "bg-green-900/30 text-green-400 border-green-900/50"
          : "bg-green-100 text-green-700 border-green-200";
      case "part-time":
        return isDark
          ? "bg-blue-900/30 text-blue-400 border-blue-900/50"
          : "bg-blue-100 text-blue-700 border-blue-200";
      case "contract":
        return isDark
          ? "bg-orange-900/30 text-orange-400 border-orange-900/50"
          : "bg-orange-100 text-orange-700 border-orange-200";
      case "internship":
        return isDark
          ? "bg-purple-900/30 text-purple-400 border-purple-900/50"
          : "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return isDark
          ? "bg-gray-800/30 text-gray-400 border-gray-800/50"
          : "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <section className="w-full mt-6">
      <div className={`flex items-center gap-3 mb-6 text-${theme}-foreground`}>
        <Building2 className={`w-5 h-5 `} />
        <h2 className={`text-xl font-semibold tracking-tight`}>Experience</h2>
      </div>

      <div className="space-y-6">
        {experiences.map((exp) => (
          <Card
            key={exp.id}
            className={`transition-all duration-300 group hover:shadow-lg ${
              theme === "dark"
                ? "bg-gray-800/50 border-gray-700/50 hover:border-gray-600"
                : "bg-white border-gray-200 hover:border-gray-300"
            }`}
          >
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3
                      className={`font-semibold text-lg leading-tight ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {exp.position}
                    </h3>
                    <Badge
                      variant="outline"
                      className={`text-xs px-2 py-1 ${getTypeColor(
                        exp.type,
                        theme
                      )}`}
                    >
                      {exp.type.replace("-", " ")}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`font-medium ${
                        theme === "dark" ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      {exp.company}
                    </span>
                    {exp.companyUrl && (
                      <ExternalLink
                        className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                        onClick={() =>
                          window.open(
                            exp.companyUrl,
                            "_blank"
                          )
                        }
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`flex flex-col sm:items-end gap-1 text-sm shrink-0 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p
                className={`mb-4 leading-relaxed ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {exp.description}
              </p>

              {/* Key Achievements */}
              <div className="mb-4">
                <h4
                  className={`text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Key Achievements
                </h4>
                <ul className="space-y-1">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span
                        className={`w-1 h-1 rounded-full mt-2 shrink-0 ${
                          theme === "dark" ? "bg-gray-500" : "bg-gray-400"
                        }`}
                      ></span>
                      <span
                        className={
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }
                      >
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h4
                  className={`text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className={`text-xs px-2 py-1 ${
                        theme === "dark"
                          ? "bg-gray-700/50 text-gray-300 border-gray-600 hover:bg-gray-700"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Full Resume Link */}
          <CardFooter className="w-full flex items-center justify-center mt-6">
            <button
              className="text-xs opacity-50 hover:underline "
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/1RNMfio70XI6Ie88q557t7fuo2VAYmBb0/view?usp=sharing",
                  "_blank"
                )
              }
            >
              <div className="flex items-center">
                <span className="mr-1">View Details</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </button>
          </CardFooter>
    </section>
  );
};

export { Experience };
