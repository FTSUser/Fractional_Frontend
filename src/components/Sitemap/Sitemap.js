import React from 'react'
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Sitemap.scss';
export default function Sitemap() {
  return (
    <div>
        <section className='site-map-alignment'>
            <div className='container'>
                <div className='Sitemap-title'>
                    <h1>Sitemap</h1>
                </div>
                <div className='sitemaplist'>
                    <ul>
                        <li>
                            <NavLink to="/">
                            <i class="fa-solid fa-angle-right"></i>
                            <span>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/learnpage">
                            <i class="fa-solid fa-angle-right"></i>
                            <span>Learn</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">
                            <i class="fa-solid fa-angle-right"></i>
                            <span>About</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/properties">
                            <i class="fa-solid fa-angle-right"></i>
                            <span>Properties</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/faq">
                            <i class="fa-solid fa-angle-right"></i>
                            <span>FAQ</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact-us">
                            <i class="fa-solid fa-angle-right"></i>
                            <span>Contact</span>
                            </NavLink>
                        </li>
                        <li>
                            <i class="fa-solid fa-angle-right"></i>
                            <span>Quick links</span>
                        </li>
                    </ul>
                    <ul className='left-align-sitemap'>
                        <li>
                            <NavLink to="/disclaimer">
                            <i class="fa-solid fa-angle-right"></i>
                            <span>Disclaimer</span>
                            </NavLink>
                        </li>
                    </ul>
                    <ul className=''>
                        <li>
                            <i class="fa-solid fa-angle-right"></i>
                            <span>Know More</span>
                        </li>
                    </ul>
                    <ul className='left-align-sitemap'>
                        <li>
                            <NavLink to="/termsofservice">
                            <i class="fa-solid fa-angle-right"></i>
                            <span>Terms of Service</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Careers">
                            <i class="fa-solid fa-angle-right"></i>
                            <span>Careers</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/privacypolicy">
                            <i class="fa-solid fa-angle-right"></i>
                            <span>Privacy Policy</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Press">
                            <i class="fa-solid fa-angle-right"></i>
                            <span>Press</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/companynews">
                            <i class="fa-solid fa-angle-right"></i>
                            <span>Company News</span>
                            </NavLink>
                        </li>
                    </ul>
                    <ul>
                    <li>
                        <NavLink to="/contact-us">
                    <i class="fa-solid fa-angle-right"></i>
                        <span>Contact Us</span>
                        </NavLink>
                    </li>
                    </ul>
                </div>
               

            </div>
        </section>
    </div>
  )
}
