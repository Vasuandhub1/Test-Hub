
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Moon } from "lucide-react";

export default function FacultyHome() {


  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-black dark:text-white">
      {/* Navbar */}
      <nav className="w-full p-4 flex justify-between items-center bg-zinc-300 dark:bg-zinc-800 shadow-md">
        <h1 className="text-xl font-bold">Faculty Portal</h1>
        
      </nav>

      {/* Hero Section */}
      <section className="text-center py-12 px-6">
        <h1 className="text-4xl font-bold">Welcome to Our Coding Test Platform</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Take coding assessments, improve your skills, and compete with peers.
        </p>
        <Button className="mt-6">Get Started</Button>
      </section>

      {/* College Advertisement Section */}
      <section className="px-6 py-8">
        <h2 className="text-2xl font-semibold mb-4">Top Colleges Partnered with Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["IIT Delhi", "NIT Trichy", "MIT Manipal"].map((college, index) => (
            <Card key={index} className="shadow-lg">
              <CardContent className="p-4 text-center">
                <h3 className="text-xl font-semibold">{college}</h3>
                <p className="text-gray-500 dark:text-gray-400">Leading in tech education</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Project Description Section */}
      <section className="px-6 py-8">
        <h2 className="text-2xl font-semibold mb-4">About the Platform</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Our platform offers a seamless experience for students to take coding tests, 
          track progress, and get insights into their performance. Designed for both 
          beginners and advanced coders.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center p-4 bg-zinc-300 dark:bg-zinc-800">
        &copy; 2025 Coding Test Platform | All Rights Reserved
      </footer>
    </div>
  );
}
