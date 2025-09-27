import Link from 'next/link'
import React from 'react'
import { FaOctopusDeploy } from 'react-icons/fa'

const NavBar = () => {
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' }
    ]
    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href='/'><FaOctopusDeploy size={40} /></Link>
            <ul className='flex space-x-6'>
                {
                    links?.map((link, index) => (
                        <Link
                            key={index}
                            className='text-zinc-500 hover:text-zinc-800 transition-colors'
                            href={link?.href}
                        >
                            {link?.label}
                        </Link>
                    ))
                }
            </ul>
        </nav>
    )
}

export default NavBar