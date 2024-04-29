import { SignIn } from "@clerk/nextjs"

const page = () => {
  return (
    <SignIn path="/sign-in"/>
  )
}

export default page