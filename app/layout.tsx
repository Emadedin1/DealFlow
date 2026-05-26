import './globals.css'
import React from 'react'
import AppShell from '../components/layout/AppShell'

export const metadata = {
  title: 'DealFlow',
  description: 'A simple CRM for freelancers',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
