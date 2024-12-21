import InvoiceList from '@/components/globale/invoice-list'
import { badgeVariants } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const InvoiceRoute = () => {
  return (
    <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle className='text-2xl font-bold'>Invoices</CardTitle>
                    <CardDescription>Manage your invoices right here</CardDescription>
                </div>
                <Link href="/dashboard/invoices/create" className={badgeVariants()}>
                  <PlusIcon/> Create Invoice
                </Link>
            </div>
        </CardHeader>
        <CardContent>
            <InvoiceList />
        </CardContent>
    </Card>
  )
}

export default InvoiceRoute