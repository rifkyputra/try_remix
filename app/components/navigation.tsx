import { Link } from '@remix-run/react'
import {PropsWithChildren, } from 'react'
import { useLocation } from "@remix-run/react";


const Navigation = () => {
  return (
    <div className='flex'>
      <div>
        <h1 className='px-4 py-2 font-extrabold mr-10'>
          Remix
        </h1>
      </div>
        <NavItem link={'/'}>
            Home
        </NavItem>
        <NavItem link='/todo'>
          Todo
        </NavItem>

        <NavItem link='/register'>
          Register
        </NavItem>


        <NavItem link='/login'>
          Login
        </NavItem>

        <NavItem link='/users'>
          Users
        </NavItem>
        
        
    </div>
  )
}

type Props = {
    link: string;

    children : React.ReactNode;
}

const NavItem = (props: Props) => {
  const locs = useLocation()
    return (
      <Link to={props.link}>
        <div className={`px-4 py-2 ${locs.pathname.toLowerCase() === props.link.toLocaleLowerCase() ? 'font-bold' : '' }`}>
            {props.children}
{/* {window.location.pathname} */}
        </div>
        </Link>
    )
}

export default Navigation

function useRoute() {
  throw new Error('Function not implemented.')
}
