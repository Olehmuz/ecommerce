"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const makeRequest = async () => {
  const token = await getSession()

  const res = await axios("http://localhost:3001/brands", {
    headers: {
      Authorization: `Bearer ${token?.user.accessToken}`,
    },
  })
  const data = res.data;
  console.log(data);
}

const logout = async () => {
  signOut()
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello, world!
      <div>
        <Button className="m-2" onClick={() => makeRequest()}>Make request</Button>
        <Button className="m-2" onClick={() => logout()}>Logout</Button>
      </div>
    </main>
  );
}
