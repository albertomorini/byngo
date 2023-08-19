import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './QueryTab.css';
import QueryComposer from "../components/QueryComposer"

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
          <QueryComposer />
        </div>
      </IonContent>
    </IonPage>
  );
};