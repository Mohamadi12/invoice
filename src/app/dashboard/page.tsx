import { Button } from '@/components/ui/button'
import { userRequire } from '@/hooks/user-require'
import { signOut } from '@/lib/auth'
import React from 'react'

const DashboardLayout = async() => {
  const session = await userRequire()
  return (
    <div>
      <form action={async() =>{
        "use server"
        await signOut()
      }}>
       <Button>Sign out</Button>
      </form>
    </div>
  )
}

export default DashboardLayout