import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import prisma from "@/lib/db";
import { userRequire } from "@/hooks/user-require";
import { formatCurrency } from "@/hooks/format-currency";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientEmail: true,
      clientName: true,
      total: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });
  return data;
}

export async function RecentInvoices() {
  const session = await userRequire();
  const data = await getData(session.user?.id as string);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
        <CardContent className="flex flex-col gap-8">
          {data.map((item) => (
            <div className="flex items-center gap-4" key={item.id}>
              <Avatar className="hidden sm:flex size-9">
                <AvatarFallback>{item.clientName.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium leading-normal">
                  {item.clientName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.clientEmail}
                </p>
              </div>
              <div className="ml-auto font-medium">
                +
                {formatCurrency({
                  amount: item.total,
                  currency: item.currency as any,
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </CardHeader>
    </Card>
  );
}
