"use server"

import { userRequire } from "@/hooks/user-require"
import prisma from "@/lib/db"
import { redirect } from "next/navigation"

export async function DeleteInvoice(invoiceId: string){
    const session = await userRequire()

    const data = await prisma.invoice.delete({
        where: {
            userId: session.user?.id,
            id: invoiceId
        }
    })
    return redirect("/dashboard/invoices")
}