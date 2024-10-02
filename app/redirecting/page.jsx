import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import "../globals.css";
import credentials from "../credentials/credentials";

const verifyUser = async (user) => {
  try {
    const request = await fetch("http://localhost:4000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await request.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
async function RedirectingPage() {
  const { user } = await credentials();

  const payload = {
    id: user?.id,
    given_name: user?.given_name,
    family_name: user?.family_name,
    email: user?.email,
    picture: user?.picture,
    role: "user",
  };
  const result = await verifyUser(payload);

  // console.log(result);
  {
    result.role === "user"
      ? redirect(`/${user.id}`)
      : redirect(`/${user.id}/dashboard`);
  }
}

export default RedirectingPage;
