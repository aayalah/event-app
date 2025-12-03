"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoginForm from "./components/login_form";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import SignUpForm from "./components/signup_form";

export default function Home() {

  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#EFF6FF] to-[#FAF5FF] font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-6xl flex items-center justify-center py-32 px-16 dark:bg-black gap-8">
        <div>
          <h1 className="text-3xl font-bold">Event Hub</h1>
          <h2 className="text-2xl font-semibold mt-6">Discover Amazing Events & Communities</h2>
          <p>Join thousands of people connecting through events and groups powered by AI recommendations.</p>
        </div>
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader className="w-full">
            <CardTitle>{mode=="login"?"Welcome Back":"Create Account"}</CardTitle>
            <CardDescription>{mode=="login"?"Log in to discover events and groups":"Join our community to discover amazing events"}</CardDescription>
            {/* <div className="flex flex-row gap-2 w-full max-w-sm mx-auto">
              <Button variant="outline" className="flex items-center justify-center gap-2">
                <FcGoogle className="text-xl"/>
                Continue with Google
              </Button>
              <Button  variant="outline" className="flex items-center justify-center gap-2">
                <FaFacebook className="text-xl"/>
                Continue with Facebook
              </Button>
            </div> */}
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-3 test-gray-500 text-xs">OR CONTINUE WITH EMAIL</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            {mode == "login" ? <LoginForm/> : <SignUpForm/>}
            <div className="flex items-center justify-center mt-5">
              <span className="flex space-x-1 items-center justify-center"><p className="inline-block w-auto">{mode == "login" ? "Don't have an account?" : "Already have an account?"}</p><Button className="hover:underline font-bold bg-transparent text-black hover:bg-transparent text-base"  onClick={() => setMode(mode == "login" ? "signup" : "login")}>{mode == "login" ? "Sign Up" : "Log In"}</Button></span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
