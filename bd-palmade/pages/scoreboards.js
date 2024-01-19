
import style from '../styles/Home.module.css';
import styles from '../styles/Game.module.css';
import Link from 'next/link'
import { useState, useEffect, useCallback, Suspense } from 'react';

export default function Home() {

  const [scores, setScores] = useState([["arouf"],["gangsta"]]);
  async function onScoreboardReload(event){
  
    const bestScores = await fetch('../api/ok', {
      method: 'GET'
    })
    bestScores.json().then(function(data){  
      setScores(data)
    })
    
  }
  



  return (
    <div className={style.body}>
      <header className={style.header}>
          <div className={style.menulist}>
              <MenuItem title="HOME" link="/"/>
              <MenuItem title="JEU" link="/game/game"/>
              <MenuItem title="CLASSEMENT" link="/scoreboards"/>
          </div>
      </header>

      <button className={styles.scoreboardbutton} onClick={onScoreboardReload}>Update Scoreboard {scores[0][1]}</button>
    </div>
  );
}


function MenuItem(args) {
  return <li className={style.menuitems}>
    <Link className={style.link} href={args.link ? args.link : "/"}>  {args.title}  </Link>
  </li>
}
