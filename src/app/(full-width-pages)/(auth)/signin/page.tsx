import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Bengal Association for Literature and Culture",
  description: "Sign in to the Bengal Association administration system.",
};

export default function SignIn() {
  return <SignInForm />;
}
