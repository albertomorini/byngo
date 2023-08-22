import { IonButton, IonCol, IonGrid, IonIcon, IonItemDivider, IonRow, IonTitle } from '@ionic/react';
import { doRequest } from '../httpRequester';
import CollectionsInput from './CollectionsInput';
import { useState } from 'react';
import "../theme/Generics.css";
import { addCircle, list, trash } from 'ionicons/icons';

export default function CollectionsManager(props){
     const [URL, setURL] = useState(undefined);
     const [DBname, setDBName] = useState(undefined);

     function listCollection(){
          doRequest("CollectionsList",{
               url:URL,
               database:DBname
          }).then(res=>res.json()).then(res=>{
               console.log(res);
               props.setOutput(JSON.stringify(res, null, 4));
          }).catch(err=>{
               props.setOutput(err);
          })
     }
     return(
          <IonGrid className='ion-padding'>
               <IonTitle className='myTitle'>Collections manager</IonTitle>
               <IonItemDivider/>
               <CollectionsInput
                    setURL={(str) => setURL(str)}
                    setDBName={(str) => setDBName(str)}
               />

               <IonRow>
                    <IonCol>
                         <IonButton
                              mode='ios'
                              expand='block'
                              color="medium"
                              onClick={() => listCollection()}
                         >
                              LIST
                              <IonIcon icon={list}/>
                         </IonButton>
                    </IonCol>
                    <IonCol>

                         <IonButton
                              expand='block'
                              mode='ios'
                              color="danger"
                         >
                              DELETE
                              <IonIcon icon={trash}/>
                         </IonButton>
                    </IonCol>
                    <IonCol>
                         <IonButton
                              expand='block'
                              mode='ios'
                              color="primary"
                         >
                              CREATE
                              <IonIcon icon={addCircle}/>
                         </IonButton>
                    </IonCol>
               </IonRow>
              
          </IonGrid >
     )
}