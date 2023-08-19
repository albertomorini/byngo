import { IonTitle, IonTextarea, IonInput, IonLabel, IonButton } from '@ionic/react';


export default function QueryComposer(){
     return(
          <div>

               <IonTitle>Query composer</IonTitle>

               <IonLabel>MongoDB URL</IonLabel>
               <IonInput
                    mode='md'
                    fill='outline'
                    placeholder='mongo://localhost:27017/'
               />
               <br/>
               <select>
                    <option>SELECT</option>
                    <option>INSERT</option>
                    <option>UPDATE</option>
                    <option>DELETE</option>
               </select>
               <IonInput
                    mode='md'
                    fill='outline'
                    placeholder='collection name'
                    />
               <IonTextarea
                    placeholder='parameters/objects --> JSON!'
                    mode='md'
                    fill='outline'
                    counter="true"
                    maxlength={1000000}
                    />

               <IonButton
                    mode='ios'
                    color="success"
                    expand='block'
               >EXECUTE</IonButton>
          
          </div>

     )
}