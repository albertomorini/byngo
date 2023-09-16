import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItemDivider, IonRow, IonText, IonTitle } from "@ionic/react";
import "../theme/Generics.css";
import "../theme/QueryOutput.css";
import { clipboard, checkmarkCircle, trashBin } from 'ionicons/icons';
import { useState } from "react";



export default function OutputWindow(props) {
     const [IconButton, setIconButton] = useState(clipboard);

     function CopyToClipboard() {
          navigator.clipboard.writeText("TESTTTT");
          setIconButton(checkmarkCircle);
          setTimeout(() => {
               setIconButton(clipboard)
          }, 3000);
     }

     return (
          <div className="ion-padding">
               <IonTitle className='myTitle'>Output</IonTitle>
               <IonItemDivider />
               <IonContent className="myOutput">
                    <IonText >
                         {props?.Output}
                    </IonText>
               </IonContent>

               <IonGrid>
                    <IonRow>
                         <IonCol>
                              <IonButton expand="block" color="danger" mode="ios" onClick={() => props.setOutput("")}>
                                   Clear output
                                   <IonIcon icon={trashBin} />
                              </IonButton>
                         </IonCol>
                         <IonCol>
                              <IonButton expand="block" color="warning" mode="ios" onClick={() => CopyToClipboard()}>
                                   Copy to clipboard
                                   <IonIcon icon={IconButton} />
                              </IonButton>
                         </IonCol>
                    </IonRow>
               </IonGrid>

          </div>
     )
}