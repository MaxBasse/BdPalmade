import router from 'next/router'
import styles from '../styles/Home.module.css';
import Link from 'next/link'
import { sql } from '@vercel/postgres';
import { Suspense } from 'react';

function MenuItem(args) {
  return <li className={styles.menuitems}>
    <Link className={styles.link} href={args.link ? args.link : "/"}>  {args.title}  </Link>
  </li>
}

function handleSubmit(){
  var emailinput = document.getElementById('email').value;
  router.push({
    pathname: "/profile",
      query : {
      email : emailinput
    }
   })
 
}

async function getDb(score){
  const {rows, fields} =
    await sql`SELECT Email FROM test WHERE Score  ${score};`;
    return {rows,fields}
}

export default function Home() {

     console.log({
     POSTGRES_URL: process.env.POSTGRES_URL,
      POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING
    });


  return (
    <div className={styles.body}>
      <header className={styles.header}>
          <div className={styles.menulist}>
              <MenuItem title="Home" link="/"/>
              <MenuItem title="Test" link="/profile"/>
              <MenuItem title="Oui" link="https://google.com"/>
              <Suspense fallback={<MenuItem title="{getDb(5000)}" link="https://google.com"/>}>
                <text>{getDb(5000)}</text>
              </Suspense>
          </div>
      </header>
      <form onSubmit={(e) => {handleSubmit(); e.preventDefault();}}>
        <input className={styles.form} type='email'  id='email' name='email' placeholder='prenom.nom@XXXX.icam.fr' pattern='.+@*.icam.fr'/>
        <input className={styles.formsubmit} type='submit' name='Submit'/> 
      </form>
      
      <footer className={styles.footer}>
      </footer>


      
    </div>
  );
}