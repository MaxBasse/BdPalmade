
import style from '../styles/Home.module.css';
import styles from '../styles/Game.module.css';
import { useState, useEffect, useCallback, Suspense } from 'react';
import {MenuItem} from '../PageComps/pagecomps'
import { DataGrid } from '@mui/x-data-grid';
export default function Home() {  
  const [scores, setScores] = useState([{id : 1, email: "data[i][0]", score: "data[i][1]"}]);  
  var rows = [];


  function updateRows(data, length){
    var rows = [];
    for(var i = 0;i<length; i ++){
      rows[i] = {id : i, email: data[i][0], score: data[i][1]}
    }

    return rows;
  }

  async function onScoreboardReload(event){
  
    const bestScores = await fetch('../api/ok', {
      method: 'GET'
    })
    bestScores.json().then(function(data){  

      
      setScores(updateRows(data,data.length))
      
      rows = updateRows()


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

      <div className={style.scoreboard}>

        <DataGrid 
        columns = {[{ field: 'email', headerName: 'Email', width: 300}, { field: 'score', headerName: 'Score', width: 300 }]} 
        rows={scores} 
        
        />
      </div>


      <button className={styles.scoreboardbutton} onClick={onScoreboardReload}>Update Scoreboard</button>
    </div>
  );
}




