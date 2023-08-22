import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './QueryTab.css';
import OutputWindow from "../components/OutputWindow";
import CollectionsManager from "../components/CollectionsManager";
import { useState } from 'react';

export default function CollectionsTab() {
     const [Output, setOutput] = useState();
     return (
          <IonPage>
               <IonHeader>
                    <IonToolbar>
                         <IonTitle>Byngo • Collections</IonTitle>
                    </IonToolbar>
               </IonHeader>
               <IonContent fullscreen>
                    <div>
                         <IonGrid>
                              <IonRow>
                                   <IonCol>
                                        <CollectionsManager setOutput={(obj) => setOutput(obj)} />
                                   </IonCol>
                                   <IonCol>
                                        <OutputWindow Output={Output} />
                                   </IonCol>
                              </IonRow>
                         </IonGrid>
                    </div>
               </IonContent>
          </IonPage>
     );
};