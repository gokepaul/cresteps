import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center px-4 pt-16">
      <SignUp />
    </div>
  );
}
