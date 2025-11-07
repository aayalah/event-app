import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import LoginForm from "./components/login_form";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#EFF6FF] to-[#FAF5FF] font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex items-center justify-center py-32 px-16 dark:bg-black gap-8">
        <div>
          <h1 className="text-3xl font-bold">Event Hub</h1>
          <h2 className="text-2xl font-semibold mt-6">Discover Amazing Events & Communities</h2>
          <p>Join thousands of people connecting through events and groups powered by AI recommendations.</p>
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Log in to discover events and groups</CardDescription>
          </CardHeader>
          <CardContent>
            <div>OR CONTINUE WITH EMAIL</div>
            <LoginForm/>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
