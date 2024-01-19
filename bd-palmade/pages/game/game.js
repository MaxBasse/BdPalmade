import style from '../../styles/Home.module.css';
import styles from '../../styles/Game.module.css';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useState, useEffect, useCallback, Suspense } from 'react';
import {MenuItem} from '../../PageComps/pagecomps'

export default function Game() {
  
  const [received, setReceived] = useState(0);
  const [scores, setScores] = useState([["arouf"],["gangsta"]]);
  const handle = useFullScreenHandle();
  const { unityProvider, sendMessage, addEventListener, removeEventListener, loadingProgression,isLoaded } = useUnityContext({
    loaderUrl: "../UnityGame/Build/UnityGame.loader.js",
    frameworkUrl: "../UnityGame/Build/UnityGame.framework.js",
    dataUrl: "../UnityGame/Build/UnityGame.data",
    codeUrl: "../UnityGame/Build/UnityGame.wasm"
  });
  const handleUnitySendScore = useCallback((score) => { 
      setReceived(score);
      onScore(score)
  }, []);

  async function onScore(score){
    const queryParameters = new URLSearchParams(window.location.search)
    var email = queryParameters.get("email")
    if(email == "") email = "null"
      await fetch('../api/'+email+"/"+ score, {
        method: 'POST',
      })
  
  }

  async function onScoreboardReload(event){
  
    const bestScores = await fetch('../api/ok', {
      method: 'GET'
    })
    bestScores.json().then(function(data){  
      setScores(data)
    })
    
  }

  useEffect(() => {
      addEventListener("TransfertScore", handleUnitySendScore);
    return () => {
        removeEventListener("TransfertScore", handleUnitySendScore);
    };
  }, [addEventListener, removeEventListener, handleUnitySendScore]);
     
  return (

            <div className={styles.body}>
              <header className={style.header}>
                <div className={style.menulist}>
                  <MenuItem title="HOME" link="/"/>
                  <MenuItem title="TEST" link="/game/game"/>
                  <MenuItem title="CLASSEMENT" link="/scoreboards"/>
                </div>
              </header>
              <button className={styles.fscreenbutton} onClick={handle.enter}>Plein Écran</button>
              <button className={styles.scoreboardbutton} onClick={onScoreboardReload}>Update Scoreboard</button>

              <FullScreen className={styles.fscreen} handle={handle}>
            
                <Unity className={styles.unity} onClick={handleUnitySendScore} unityProvider={unityProvider} />   

              </FullScreen>

            </div>
        
  );
  
}