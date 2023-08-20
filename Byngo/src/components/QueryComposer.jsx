import { IonTitle, IonTextarea, IonInput, IonLabel, IonButton, IonItemDivider, IonGrid, IonRow, IonCol, IonCheckbox, IonIcon } from '@ionic/react';
import "../theme/QueryComposer.css";
import "../theme/Generics.css";
import { useState } from 'react';
import { chevronForward } from 'ionicons/icons';


export default function QueryComposer() {
     const [CRUDSelected, setCRUDSelected] = useState("SELECT");
     const [URL, setURL] = useState();
     const [DBname, setDBName] = useState();
     const [ColName, setColName] = useState();

     const [FilterBox, setFilterBox] = useState(); //visible for select/delete/update
     const [NewObjBox, setNewObjBox] = useState(); //for insert/update
     const [Upsert, setUpsert] = useState(); //Visibile only on UPDATE for upsert update (if not exists, create)

     function execute(){

     }


     return (
          <div className='ion-padding'>

               <IonTitle className='myTitle'>Query composer</IonTitle>
               <IonItemDivider />

              

               <IonItemDivider />

               <IonGrid>

                    <IonRow>
                         <IonCol size="2">
                              <IonLabel className='horizontalLabel'>MongoDB URL: </IonLabel>
                         </IonCol>
                         <IonCol size="10">
                              <IonInput
                                   onIonInput={(ev) => setURL(ev.target.value)}
                                   mode='md'
                                   fill='outline'
                                   placeholder='mongo://localhost:27017/'
                              />
                         </IonCol>
                    </IonRow>
                    <IonRow>
                         <IonCol size="2">
                              <IonLabel className='horizontalLabel'>Database name: </IonLabel>
                         </IonCol>
                         <IonCol size="10">
                              <IonInput
                                   onIonInput={(ev) => setDBName(ev.target.value)}
                                   mode='md'
                                   fill='outline'
                                   placeholder='Database name'
                              />
                         </IonCol>
                    </IonRow>
                   

                    <IonRow>
                         <IonCol size="2">
                              <select className='mySelect' onChange={(ev) => setCRUDSelected(ev.target.value)}>
                                   <option value="SELECT" key="SELECT">SELECT</option>
                                   <option value="INSERT" key="INSERT">INSERT</option>
                                   <option value="UPDATE" key="UPDATE">UPDATE</option>
                                   <option value="DELETE" key="DELETE">DELETE</option>
                              </select>
                         </IonCol>
                         <IonCol size="10">
                              <IonInput
                                   onIonInput={(ev) => setColName(ev.target.value)}
                                   mode='md'
                                   fill='outline'
                                   placeholder='collection name'
                              />
                         </IonCol>

                    </IonRow>

                    {//FILTER BOX
                         (CRUDSelected == "SELECT" || CRUDSelected == "DELETE" || CRUDSelected == "UPDATE") ?
                              <IonRow>
                                   <IonCol>
                                        <IonLabel>Filter parameters: </IonLabel>
                                        <IonTextarea
                                             onIonInput={(ev) => setFilterBox(ev.target.value)}
                                             placeholder='Filter parametrs, in JSON notation!'
                                             mode='md'
                                             fill='outline'
                                             counter="true"
                                             autoGrow="true"
                                             rows={7}
                                             maxlength={1000000}
                                        />
                                   </IonCol>
                              </IonRow>
                              :
                              null
                    }

                    {// NEW OBJECT --> insert/update
                         (CRUDSelected == "INSERT" || CRUDSelected == "UPDATE") ?
                              <IonRow>
                                   <IonCol>
                                        <IonLabel>New object</IonLabel>
                                        <IonTextarea
                                             onIonInput={(ev) => setNewObjBox(ev.target.value)}
                                             placeholder='JSON body of the new object or the data you want to update'
                                             mode='md'
                                             fill='outline'
                                             counter="true"
                                             autoGrow="true"
                                             rows={7}
                                             maxlength={1000000}
                                        />
                                   </IonCol>
                              </IonRow>
                              :
                              null
                    }

                    {//UPSERT FLAG
                         (CRUDSelected == "UPDATE") ?
                              <IonRow>
                                   <IonCheckbox labelPlacement="start" onIonChange={(ev) => setUpsert(ev.target.value)}>UPSERT</IonCheckbox>
                              </IonRow>
                              :
                              null
                    }


               </IonGrid>

               <IonButton
                    onClick={()=>execute()}
                    mode='ios'
                    color="success"
                    expand='block'
               >
                    EXECUTE 
                    <IonIcon icon={chevronForward}/>
               </IonButton>

          </div>

     );
}