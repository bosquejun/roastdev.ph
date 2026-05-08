import { SignIn } from "@clerk/nextjs"

export default async function SignInPage() {
  return <SignIn signUpUrl="/auth/sign-up" />
}
