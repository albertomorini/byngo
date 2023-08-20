import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './QueryTab.css';
import QueryComposer from "../components/QueryComposer";
import QueryOutput from "../components/QueryOutput";

export default function QueryTab(){
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Query</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          <IonGrid>
            <IonRow>
              <IonCol>
                <QueryComposer />

              </IonCol>
              <IonCol>
                <QueryOutput/>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};