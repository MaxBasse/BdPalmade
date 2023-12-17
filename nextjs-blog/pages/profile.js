import Head from 'next/head';
import styles from '../styles/Profile.module.css';
import Link from 'next/link'
import { Unity, useUnityContext } from "react-unity-webgl";
import {sql}  from "@vercel/postgres";
import {useState, useEffect, useCallback} from 'react'


function MenuItem(args) {
    return <li className={styles.menuitems}>
      <Link className={styles.link} href={args.link ? args.link : "/"}>  {args.title}  </Link>
    </li>
  }

function Menu(){
    return (
        <header className={styles.menubar}>
            <div className={styles.menulist}>
                <MenuItem title="Home" link="/"/>
                <MenuItem title="Test" link="/profile"/>
                <MenuItem title="Oui" link="https://google.com"/>
                
            </div>
        </header>
    );
}



/*const [received, setReceived] = useState(0)

  const { unityProvider, sendMessage, addEventListener, removeEventListener, loadingProgression,isLoaded } = useUnityContext({
    loaderUrl: "../UnityGame/Build/UnityGame.loader.js",
    frameworkUrl: "../UnityGame/Build/UnityGame.framework.js",
    dataUrl: "../UnityGame/Build/UnityGame.data",
    codeUrl: "../UnityGame/Build/UnityGame.wasm"
  });


  function sendDataToUnity() {
    sendMessage("GameController", "UpdateMessage", "plop la zone");
  }

  const handleUnitySendScore = useCallback((score) => {
    console.log("score : ", score)
    setReceived(score)
  }, []);




 
  useEffect(() => {
      addEventListener("TransfertScore", handleUnitySendScore);
    return () => {
        removeEventListener("TransfertScore", handleUnitySendScore);
    };
  }, [addEventListener, removeEventListener, handleUnitySendScore]);
 
 

  return (
    <div className="App">
      <h2>Jeu du Ninja Sauteur</h2>
      <Unity style={{ width: 1000, height: 600 }} unityProvider={unityProvider} />
      <div>
        Score dernier essai : {received}
      </div>
    </div>
  );
}*/

export default function Profile() {
  
  const { unityProvider, sendMessage, addEventListener, removeEventListener, loadingProgression,isLoaded } = useUnityContext({
    loaderUrl: "../UnityGame/Build/UnityGame.loader.js",
    frameworkUrl: "../UnityGame/Build/UnityGame.framework.js",
    dataUrl: "../UnityGame/Build/UnityGame.data",
    codeUrl: "../UnityGame/Build/UnityGame.wasm"
  });

  //function sendDataToUnity() {
  //  sendMessage("GameController", "UpdateMessage", "plop la zone");
  //}
  
    return (
      <div className={styles.body}>
      
       {Menu()}
       <Unity className={styles.unity} unityProvider={unityProvider} /> 
      </div>
      
    );
  }