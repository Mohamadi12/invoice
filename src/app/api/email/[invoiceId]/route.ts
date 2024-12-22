import { userRequire } from "@/hooks/user-require";
import prisma from "@/lib/db";
import { emailClient } from "@/lib/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await userRequire();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.com",
      name: "Nana Mohamadi",
    };

    emailClient.send({
      from: sender,
      to: [{ email: "dalizeta368@gmail.com" }],
      template_uuid: "74e8ab91-d3ca-4aeb-bd87-ac84357b8116",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "InvoiceNana",
        company_info_address: "Chad street 124",
        company_info_city: "Munich",
        company_info_zip_code: "345345",
        company_info_country: "Germany",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      { status: 500 }
    );
  }
}
