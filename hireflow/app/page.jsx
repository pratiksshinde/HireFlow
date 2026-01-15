import { redirect } from 'next/navigation'
import React from 'react'

function page() {
  redirect('/Login');
  return (
    <div>
      
      HireFlow App Home Page
    </div>
  )
}

export default page
