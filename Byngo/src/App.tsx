import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cog, server,document } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import CollectionsTab from './pages/CollectionsTab';
import  QueryTab from './pages/QueryTab';
import Settings from './pages/Settings';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        
        <IonRouterOutlet>
          <Route exact path="/collections">
            <CollectionsTab />
          </Route>
          <Route exact path="/query">
            <QueryTab />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
         
          <Route exact path="/">
            <Redirect to="/query" />
          </Route>
        </IonRouterOutlet>


        <IonTabBar slot="bottom">

          <IonTabButton tab="collections" href="/collections">
            <IonIcon aria-hidden="true" icon={server} />
            <IonLabel>Collections</IonLabel>
          </IonTabButton>

          <IonTabButton tab="query" href="/query">
            <IonIcon aria-hidden="true" icon={document} />
            <IonLabel>Query</IonLabel>
          </IonTabButton>

          <IonTabButton tab="settings" href="/settings">
            <IonIcon aria-hidden="true" icon={cog} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
          
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
