import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Bengal Association for Literature and Culture",
  description: "Create an account for the Bengal Association administration system.",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
