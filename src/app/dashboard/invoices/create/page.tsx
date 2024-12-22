import CreateInvoice from "@/components/globale/create-invoice";
import { userRequire } from "@/hooks/user-require";
import prisma from "@/lib/db";
import React from "react";

async function getUserData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      address: true,
      email: true,
    },
  });
  return data;
}

const InvoiceCreationRoute = async () => {
  const session = await userRequire();
  const data = await getUserData(session.user?.id as string);
  return (
    <CreateInvoice
      firstName={data?.firstName as string}
      lastName={data?.lastName as string}
      address={data?.address as string}
      email={data?.email as string}
    />
  );
};

export default InvoiceCreationRoute;
