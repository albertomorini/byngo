import { IonInput, IonLabel, IonRow, IonCol } from '@ionic/react';


export default function CollectionsInput(props) {
     return (
          <>
               <IonRow>
                    <IonCol size="2">
                         <IonLabel className='horizontalLabel'>MongoDB URL: </IonLabel>
                    </IonCol>
                    <IonCol size="10">
                         <IonInput
                              onIonInput={(ev) => props.setURL(ev.target.value)}
                              mode='md'
                              fill='outline'
                              placeholder='mongodb://localhost:27017/'
                         />
                    </IonCol>
               </IonRow>
               <IonRow>
                    <IonCol size="2">
                         <IonLabel className='horizontalLabel'>Database name: </IonLabel>
                    </IonCol>
                    <IonCol size="10">
                         <IonInput
                              required
                              onIonInput={(ev) => props.setDBName(ev.target.value)}
                              mode='md'
                              fill='outline'
                              placeholder='Database name'
                         />
                    </IonCol>
               </IonRow>
          </>
     )
}