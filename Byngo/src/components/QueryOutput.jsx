import { IonAlert, IonButton, IonIcon, IonItemDivider, IonText, IonTitle } from "@ionic/react";
import "../theme/Generics.css";
import "../theme/QueryOutput.css";
import { clipboard , checkmarkCircle} from 'ionicons/icons';
import { useState } from "react";



export default function QueryOutput(props){
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
               <IonTitle className='myTitle'>Query output</IonTitle>
               <IonItemDivider />
               <div className="myOutput">
                    <IonText >
                         {props?.Output}
                    </IonText>
               </div>
               
               <IonButton expand="block" color="warning" mode="ios" onClick={()=>CopyToClipboard()}>
                    Copy to clipboard
                    <IonIcon icon={IconButton}/>
               </IonButton>
          </div>
     )
}