import React from 'react'
import styles from './Navber.module.css'

function Navber() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>LOGO</div>
      <ul className={styles.menu}>
        <li className={styles.menuItem}><a href="/">Home</a></li>
        <li className={styles.menuItem}><a href="/about">About</a></li>
        <li className={styles.menuItem}><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  )
}

export default Navber

