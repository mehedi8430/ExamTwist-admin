import LoginForm from "@/pages/Auth/components/LoginForm";
import SignUpForm from "@/pages/Auth/components/SignUpForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center h-full px-4 md:w-lg">
        <h1 className="text-3xl text-center py-4 self-start">
          Login/Signup to your account
        </h1>
        <div className="w-full border border-border p-4 rounded-2xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="!font-normal">
              <TabsTrigger value="login" className="text-lg font-normal">
                Log In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="text-lg font-normal whitespace-nowrap"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
