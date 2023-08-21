import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './QueryTab.css';
import QueryComposer from "../components/QueryComposer";
import QueryOutput from "../components/QueryOutput";
import { useState } from 'react';

export default function QueryTab(){
  const [Output,setOutput] = useState();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Byngo • query section</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          <IonGrid>
            <IonRow>
              <IonCol>
                <QueryComposer setOutput={(obj)=>setOutput(obj)}/>

              </IonCol>
              <IonCol>
                <QueryOutput Output={Output}/>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};