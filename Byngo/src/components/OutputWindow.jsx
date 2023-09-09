import { IonButton, IonContent, IonIcon, IonItemDivider, IonText, IonTitle } from "@ionic/react";
import "../theme/Generics.css";
import "../theme/QueryOutput.css";
import { clipboard, checkmarkCircle } from 'ionicons/icons';
import { useState } from "react";



export default function OutputWindow(props){
     const [IconButton,setIconButton] = useState(clipboard);

     function CopyToClipboard(){
         navigator.clipboard.writeText("TESTTTT");
          setIconButton(checkmarkCircle);
          setTimeout(() => {
               setIconButton(clipboard)
          }, 3000);
     }

     return(
          <div className="ion-padding">
               <IonTitle className='myTitle'>Output</IonTitle>
               <IonItemDivider />
               <IonContent className="myOutput">
                    <IonText >
                         {props?.Output}
                    </IonText>
               </IonContent>
               
               <IonButton expand="block" color="warning" mode="ios" onClick={()=>CopyToClipboard()}>
                    Copy to clipboard
                    <IonIcon icon={IconButton}/>
               </IonButton>
          </div>
     )
}