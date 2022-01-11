import Image from 'next/image'
import Link from 'next/link'
import LogoDark from '../public/mano_dark.png'


export default function navbar({ children }) {
  return (
    <>     
        <nav className={"navbar navbar-expand-lg navbar-light bg-light mb-4 pt-4"}>
            <div className={"container d-flex justify-content col-10"}>
                <Link href="/">
                    <a className={"navbar-brand"} >
                        <Image
                            src={LogoDark}
                            alt="Logo IT Consulting"
                            height={48}
                            width={48}
                            className={'imgLogo'}
                        />
                    </a>
                </Link>
                <div>
                    <div className={' ms-md-auto'}>
                        <ul className={"navbar-nav"}>                 
                            <li className={"nav-item"}>
                                <Link 
                                    href="/contacto">
                                    <a className={"btn btn-outline-primary btn-md-lg"}>Contactar</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}