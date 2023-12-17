'use client';
import router from 'next/router'
import styles from '../styles/Home.module.css';
import Link from 'next/link'
import { sql } from '@vercel/postgres';
import { Suspense } from 'react';


function handleSubmit(){
  var emailinput = document.getElementById('email').value;
  router.push({
    pathname: "/game/game",
      query : {
      email : emailinput
    }
   })
 
}
function MenuItem(args) {
  return <li className={styles.menuitems}>
    <Link className={styles.link} href={args.link ? args.link : "/"}>  {args.title}  </Link>
  </li>
}

export default function Home() {
  return (
    <div className={styles.body}>
      <header className={styles.header}>
          <div className={styles.menulist}>
              <MenuItem title="HOME" link="/"/>
              <MenuItem title="TEST" link="/game/game"/>
              <MenuItem title="OUI" link="https://google.com"/>
          </div>
      </header>
      <form className={styles.form} onSubmit={(e) => {handleSubmit(); e.preventDefault();}}>
        <input className={styles.email} type='email'  id='email' name='email' placeholder='prenom.nom@XXXX.icam.fr' pattern='.+@*.icam.fr'/>
        <input className={styles.formsubmit} type='submit' name='Submit' /> 
      </form>
      
      


      
    </div>
  );
}
