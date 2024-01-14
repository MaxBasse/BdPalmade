import style from '../../styles/Home.module.css';
import styles from '../../styles/Game.module.css';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useSearchParams } from 'next/navigation';
import { Unity, useUnityContext } from "react-unity-webgl";
import { useState, useEffect, useCallback, Suspense } from 'react';
import {MenuItem} from '../../PageComps/pagecomps'

export default function Game() {

  const params = useSearchParams();
  const [received, setReceived] = useState(0);
  const handle = useFullScreenHandle();
  const { unityProvider, sendMessage, addEventListener, removeEventListener, loadingProgression,isLoaded } = useUnityContext({
    loaderUrl: "../UnityGame/Build/UnityGame.loader.js",
    frameworkUrl: "../UnityGame/Build/UnityGame.framework.js",
    dataUrl: "../UnityGame/Build/UnityGame.data",
    codeUrl: "../UnityGame/Build/UnityGame.wasm"
  });
  const handleUnitySendScore = useCallback((score) => { 
  
      setReceived(score);
      
    
  }, []);


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
                  <MenuItem title="OUI" link="https://google.com"/>
                </div>
              </header>
              <button className={styles.fscreenbutton} onClick={handle.enter}>Plein Écran {received}</button>

              <Unity className={styles.unity} unityProvider={unityProvider} />  
        
              <FullScreen handle={handle}>
            
                <Unity className={styles.unity} unityProvider={unityProvider} />  

              </FullScreen>

            </div>
        
  );
  
}