import style from '../../styles/Home.module.css';
import styles from '../../styles/Game.module.css';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useSearchParams } from 'next/navigation';
import { Unity, useUnityContext } from "react-unity-webgl";
import { useState, useEffect, useCallback, Suspense } from 'react';
import {MenuItem} from '../../PageComps/pagecomps'
import { sql } from '@vercel/postgres';

/*function App() {
  

 


  function sendDataToUnity() {
    sendMessage("GameController", "UpdateMessage", "plop la zone");
  }

  const handleUnityButtonClicked = useCallback((count) => {
    console.log("btn clicked", count)
    setReceived(count)
  }, []);




 
  useEffect(() => {
    addEventListener("ButtonClicked", handleUnityButtonClicked);
    return () => {
      removeEventListener("ButtonClicked", handleUnityButtonClicked);
    };
  }, [addEventListener, removeEventListener, handleUnityButtonClicked]);
 
 

  return (
    <div className="App">
      <h2>Test Jeux Unity sur web</h2>
      
      <div>
        <button onClick={sendDataToUnity}>Envoyer</button>
      </div>
      <div>
        Nombre de cliques reçus : {received}
      </div>
    </div>
  );
}

export default App;*/

async function insert(email, score) {
  /*try {
    const { rows } = await sql`INSERT INTO scoreboard VALUES (${email,score})`;
} catch (e){
   console.log("Could not fetch posts from database", e);
}*/

const pool = createPool({
  connectionString: process.env.SOME_POSTGRES_CONNECTION_STRING,
});

}
  




export default function Game() {

  const params = useSearchParams();

  const [received, setReceived] = useState(0)
  
  

  const handle = useFullScreenHandle();
   
  const { unityProvider, sendMessage, addEventListener, removeEventListener, loadingProgression,isLoaded } = useUnityContext({
    loaderUrl: "../UnityGame/Build/UnityGame.loader.js",
    frameworkUrl: "../UnityGame/Build/UnityGame.framework.js",
    dataUrl: "../UnityGame/Build/UnityGame.data",
    codeUrl: "../UnityGame/Build/UnityGame.wasm"
  });

  const handleUnitySendScore = useCallback((score) => {
    
    if(score>received) {
      setReceived(score)
      console.log("score : ") 
      insert(params.get("email"), score)
      setReceived(0)
    }
    
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