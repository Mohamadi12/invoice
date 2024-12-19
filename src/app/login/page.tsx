import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth";
import React from "react";

const Login = () => {
  return (
    <>
      <div className="flex h-screen items-center justify-center px-4">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-y-4"
              action={async (formData) => {
                "use server";
                await signIn("nodemailer", formData);
              }}
            >
              <div className="flex flex-col gap-y-4">
                <Label>Email</Label>
                <Input type="email" name="email" placeholder="test@gmail.com" />
              </div>
              <Button>Submit</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
