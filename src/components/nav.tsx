import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import {Table, CreditCard, Store, Wallet} from "lucide-react";

export default function Nav() {
  return (
    <header>
      <nav className="flex justify-between items-center gap-1 p-4 shadow-2xl shadow-primary/10">
        <div>
          <h1>
            <a href="/">Next Auth Demo</a>
          </h1>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Link href={"/stripe/store"}>
            <Store/>
          </Link>
          <Link href={"/stripe/checkout"}>
            <CreditCard />
          </Link>
          <Link href={"/dashboard"}>
            <Table />
          </Link>
          <ModeToggle />
          <div className={"h-6 w-6 flex items-center justify-center"}>
            <UserButton afterSignOutUrl="/"/>
          </div>
        </div>
      </nav>
    </header>
  );
}
