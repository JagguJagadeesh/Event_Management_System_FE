import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './themeButton'

function Nav() {
  return (
    <div className='flex justify-center py-2 shadow-2xl'>
        <div className='flex gap-10 px-10 py-2 rounded-md'>
        <Link className=' p-1 rounded-lg hover:text-violet-700' href='/'>Home</Link>
        <Link className=' p-1 rounded-lg hover:text-violet-700' href='/auth'>Signin/Signup</Link>
        <Link className=' p-1 rounded-lg hover:text-violet-700' href='/'>About</Link>
        <Link className=' p-1 rounded-lg hover:text-violet-700' href='/'>Contact</Link>
        <ModeToggle/>
        </div>
    </div>
  )
}

export default Nav