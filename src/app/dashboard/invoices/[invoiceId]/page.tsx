import { EditInvoice } from "@/components/globale/edit-invoice";
import { userRequire } from "@/hooks/user-require";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

async function getData(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

type Params = Promise<{ invoiceId: string }>;

export default async function EditInvoiceRoute({ params }: { params: Params }) {
  const session = await userRequire();
  const { invoiceId } = await params;
  const data = await getData(invoiceId, session.user?.id as string);

  return <EditInvoice data={data}/>;
}
