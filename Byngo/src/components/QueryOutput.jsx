import { IonButton, IonIcon, IonItemDivider, IonText, IonTitle } from "@ionic/react";
import "../theme/Generics.css";
import "../theme/QueryOutput.css";
import { clipboard } from 'ionicons/icons';



export default function QueryOutput(){

     function CopyToClipboard(){
         navigator.clipboard.writeText("TESTTTT");

     }

     return(
          <div className="ion-padding">
               <IonTitle className='myTitle'>Query output</IonTitle>
               <IonItemDivider />
               <div className="myOutput">
                    <IonText >
                         Testtt
                    </IonText>
               </div>
               
               <IonButton expand="block" color="warning" mode="ios" onClick={()=>CopyToClipboard()}>
                    Copy to clipboard
                    <IonIcon icon={clipboard}/>
               </IonButton>
          </div>
     )
}