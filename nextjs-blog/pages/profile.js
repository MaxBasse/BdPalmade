import Head from 'next/head';
import styles from '../styles/Profile.module.css';
import Link from 'next/link'
import { Unity, useUnityContext } from "react-unity-webgl";
import * as db from "../pg"


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