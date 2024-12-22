"use server";

import { userRequire } from "@/hooks/user-require";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function MarkAsPaidAction(invoiceId: string) {
  const session = await userRequire();

  const data = await prisma.invoice.update({
    where: {
      userId: session.user?.id,
      id: invoiceId,
    },
    data: {
      status: "PAID",
    },
  });
  return redirect("/dashboard/invoices");
}
