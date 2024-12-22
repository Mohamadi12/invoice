import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InvoiceActions from "./invoice-actions";
import prisma from "@/lib/db";
import { userRequire } from "@/hooks/user-require";
import { formatCurrency } from "@/hooks/format-currency";
import { Badge } from "@/components/ui/badge";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      total: true,
      status: true,
      createdAt: true,
      invoiceNumber: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

const InvoiceList = async () => {
  const session = await userRequire();
  const data = await getData(session.user?.id as string);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>#{invoice.invoiceNumber}</TableCell>
            <TableCell>{invoice.clientName}</TableCell>
            <TableCell>
              {formatCurrency({
                amount: invoice.total,
                currency: invoice.currency as any,
              })}
            </TableCell>
            <TableCell>
              <Badge>{invoice.status}</Badge>
            </TableCell>
            <TableCell>
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
              }).format(invoice.createdAt)}
            </TableCell>
            <TableCell className="text-right">
              <InvoiceActions id={invoice.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InvoiceList;