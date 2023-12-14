import Link from 'next/link';
import { Container, Button, Image, Navbar, Nav, Row, Col } from 'react-bootstrap';
import { Inter } from 'next/font/google'
import 'styles/globals.css'
import { children } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
  return (
    <div>
      {/* NAVBAR */}
      <Navbar className='navbarAll' expand='md'>
        <Container className='navbar' fluid >
          <Container className='logo-cont'>
              <Image src='/Logo FloVanya White.png' width={50} height={50} />
              <a href='#' className='navbar-logo'>
                FloVanya
              </a>
          </Container>
          <div class="navbar-nav">
            <a href="#">Home</a>
            <a href="#about">Explore</a>
            <a href="#menu">Order</a>
          </div>
          <div class="navbar-extra">
            <a href="#" id="search"><i data-feather="search"></i></a>
            <a href="#" id="shopping-cart"><i data-feather="shopping-cart"></i></a>
            <a href="#signIn">Sign In</a>
            <button class="signUpBut">
              Sign Up
            </button>
            <a href="#" id="menu-lapis"><i data-feather="menu"></i></a>
          </div>
        </Container>
      </Navbar>
      {/* NAVBAR */}

      {children}

      {/* FOOTER */}
        <footer style={{ backgroundColor : 'black' , height : '240px' }}>
        
        </footer>
      {/* FOOTER */}
    </div>
  );
}
