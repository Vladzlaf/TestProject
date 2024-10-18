// import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  return redirect("/auth");
  // return (
  //   <main className="flex min-h-screen flex-col items-center p-24">
  //     <div>this will be the landing page of the main website</div>
  //     <Link href="/auth">Go to dashboard</Link>
  //   </main>
  // );
}
