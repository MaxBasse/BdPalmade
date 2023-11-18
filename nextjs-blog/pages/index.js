import Head from 'next/head';
import router from 'next/router'
import styles from '../styles/Home.module.css';
import Link from 'next/link'

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
  console.log("prout");
 
}



export default function Home() {
  
  return (
    <div className={styles.body}>
      <header className={styles.header}>
          <div className={styles.menulist}>
              <MenuItem title="Home" link="/"/>
              <MenuItem title="Test" link="/profile"/>
              <MenuItem title="Oui" link="https://google.com"/>
          </div>
      </header>
        
      <form onSubmit={(e) => {handleSubmit(); e.preventDefault();}}>
        <input className={styles.form} type='email'  id='email' name='email' placeholder='prenom.nom@XXXX.icam.fr' pattern='.+@*.icam.fr'/>
      </form>
      
      <footer className={styles.footer}>
      </footer>


      
    </div>
  );
}