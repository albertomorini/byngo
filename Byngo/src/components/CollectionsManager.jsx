import { IonButton, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonItemDivider, IonRow, IonTitle } from '@ionic/react';
import { doRequest } from '../httpRequester';
import CollectionsInput from './CollectionsInput';
import { useState } from 'react';
import "../theme/Generics.css";
import { addCircle, list, pencil, trash } from 'ionicons/icons';

export default function CollectionsManager(props) {
     const [URL, setURL] = useState(undefined);
     const [DBname, setDBName] = useState(undefined);
     const [CollectionName, setCollectionName] = useState(undefined);
     const [NewName,setNewName] = useState(undefined);


     function createCollection() {
          doRequest("CollectionCreate", {
               url: URL,
               database: DBname,
               name: CollectionName
          }).then(res => res.json()).then(res => {
               props.setOutput(JSON.stringify(res, null, 4))
          }).catch(err => {
               props.setOutput(err);
          })
     }
     function deleteCollection() {
          //TODO: ASK CONFIRM
          doRequest("CollectionDelete", {
               url: URL,
               database: DBname,
               name: CollectionName
          }).then(res => res.json()).then(res => {
               props.setOutput(JSON.stringify(res, null, 4))
          }).catch(err => {
               props.setOutput(err);
          })
     }

     function listCollection() {
          doRequest("CollectionsList", {
               url: URL,
               database: DBname
          }).then(res => res.json()).then(res => {
               props.setOutput(JSON.stringify(res, null, 4));
          }).catch(err => {
               props.setOutput(err);
          })
     }

     function renameCollection(){
          doRequest("CollectionRename",{
               url: URL,
               database: DBname,
               oldName: CollectionName,
               newName: NewName
          }).then(res=>res.json()).then(res=>{
               props.setOutput(JSON.stringify(res, null, 4))
          }).catch(err=>{
               props.setOutput(err);
          })
     }


     return (
          <IonGrid className='ion-padding'>
               <IonTitle className='myTitle'>Collections manager</IonTitle>
               <IonItemDivider />
               <CollectionsInput
                    setURL={(str) => setURL(str)}
                    setDBName={(str) => setDBName(str)}
               />

               <IonItemDivider/>
               <IonItemDivider/>

               <IonRow>
                    <IonCol>
                         <IonCardTitle>List</IonCardTitle>
                         <IonButton
                              mode='ios'
                              expand='block'
                              color="medium"
                              onClick={() => listCollection()}
                         >
                              LIST COLLECTIONS
                              <IonIcon icon={list} />
                         </IonButton>
                    </IonCol>
               </IonRow>
               <br />


               <IonRow>
                    <IonCardTitle>Create/Delete</IonCardTitle>

                    <IonInput
                         onIonInput={(ev) => setCollectionName(ev.target.value)}
                         mode='md'
                         fill='outline'
                         placeholder='Collection name'
                    />
               </IonRow>
               <IonRow>

                    <IonCol>
                         <IonButton
                              expand='block'
                              mode='ios'
                              color="danger"
                              onClick={() => deleteCollection()}
                         >
                              DELETE
                              <IonIcon icon={trash} />
                         </IonButton>
                    </IonCol>
                    <IonCol>
                         <IonButton
                              expand='block'
                              mode='ios'
                              color="primary"
                              onClick={() => createCollection()}
                         >
                              CREATE
                              <IonIcon icon={addCircle} />
                         </IonButton>
                    </IonCol>
               </IonRow>
               <br/>
               <IonCardTitle>Rename</IonCardTitle>
               <IonRow>
                    <IonCol size="6">
                         <IonInput
                              onIonInput={(ev) => setCollectionName(ev.target.value)}
                              mode='md'
                              fill='outline'
                              placeholder='Collection actual name'
                         />
                    </IonCol>
                    <IonCol size="6">
                         <IonInput
                              onIonInput={(ev) => setNewName(ev.target.value)}
                              mode='md'
                              fill='outline'
                              placeholder='Collection new name'
                         />
                    </IonCol>
               </IonRow>
               <IonButton
                    expand='block'
                    mode='ios'
                    color="warning"
                    onClick={() => renameCollection()}
               >
                    RENAME
                    <IonIcon icon={pencil} />
               </IonButton>
          </IonGrid >
     )
}