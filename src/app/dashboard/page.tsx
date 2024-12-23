import { DashboardBlocks } from "@/components/globale/dashboard-blocks";
import { EmptyState } from "@/components/globale/empty-state";
import { InvoiceGraph } from "@/components/globale/invoice-graph";
import { RecentInvoices } from "@/components/globale/recent-invoices";
import { Skeleton } from "@/components/ui/skeleton";
import { userRequire } from "@/hooks/user-require";
import prisma from "@/lib/db";
import React, { Suspense } from "react";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });
  return data;
}

export default async function DashboardRoute() {
  const session = await userRequire();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.length < 1 ? (
        <EmptyState
          title="No invoices found"
          description="Create an invoice to see it right here"
          href="/dashboard/invoices/create"
          buttontext="Create Invoice"
        />
      ) : (
        <>
        <Suspense fallback={<Skeleton className="w-full h-full flex-1"/>}>
          <DashboardBlocks />
          <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
            <InvoiceGraph />
            <RecentInvoices />
          </div>
          </Suspense>
        </>
      )}
    </>
  );
}
