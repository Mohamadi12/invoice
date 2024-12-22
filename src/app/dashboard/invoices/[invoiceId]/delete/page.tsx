import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { userRequire } from "@/hooks/user-require";
import prisma from "@/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import WarningGif from "../../../../../../public/warning-gif.gif";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/components/globale/submit-button";
import { DeleteInvoice } from "@/actions/delete-invoice/delete-invoice";

async function Authorize(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });
  if (!data) {
    return redirect("/dashboard/invoices");
  }
}

type Params = Promise<{ invoiceId: string }>;

export default async function DeleteInvoiceRoute({
  params,
}: {
  params: Params;
}) {
  const session = await userRequire();
  const { invoiceId } = await params;
  await Authorize(invoiceId, session.user?.id as string);

  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="max-w-[500px]">
        <CardHeader>
          <CardTitle>Delete Invoice</CardTitle>
          <CardDescription>
            Are you sure that you want to delete this invoice?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={WarningGif} alt="WarningGif" className="rounded-lg" />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Link
            href="/dashboard/invoices"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
          <form action={async () =>{
            "use server"
            await DeleteInvoice(invoiceId)
          }}>
              <SubmitButton text="Delete Invoice" variant={"destructive"}/>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
