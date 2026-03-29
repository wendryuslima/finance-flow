'use client'


import { authClient } from "./_lib/auth-client";
import { redirect } from "next/navigation";

const HomePage = () => {

  const {data: session} = authClient.useSession();

  if(!session) {
    redirect("/auth");
  }
     
  return ( 
    <h1>Ola mundo</h1>
   );
}
 
export default HomePage;