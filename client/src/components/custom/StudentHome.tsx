import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Moon } from "lucide-react";

export default function StudentHome() {

 
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-black dark:text-white">
      {/* Navbar */}
      <nav className="w-full p-4 flex justify-between items-center bg-zinc-300 dark:bg-zinc-800 shadow-md">
        <h1 className="text-xl font-bold">Student Portal</h1>
        
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
        <h2 className="text-2xl font-semibold mb-4">Chameli Devi Group of Institutes</h2>
        <Card className="shadow-lg">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold">Leading the Future of Education</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Chameli Devi Group of Institutes is committed to excellence in education, 
              fostering innovation, and preparing students for global opportunities.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Join a thriving community of learners and take your coding skills to the next level.
            </p>
          </CardContent>
        </Card>
      </section>
      {/* Footer */}
      <footer className="text-center p-4 bg-zinc-300 dark:bg-zinc-800">
        &copy; 2025 Coding Test Platform | All Rights Reserved
      </footer>
    </div>
  );
}
