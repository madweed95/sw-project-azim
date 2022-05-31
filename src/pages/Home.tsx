
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Home.css';
import React, { useState } from 'react';
import axios from 'axios';




export interface Hero {
  name: string;
  height: string;
  mass: string;
  gender: string;
  films: string[];
  starships: string[];
}

const Home: React.FC = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);

  React.useEffect(() => {
    fetchHeroes()
  }, [])
  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const URL = 'https://swapi.dev/api/people';
  const fetchHeroes = () => {

    return axios({
      url: URL,
      method: 'get'
    }).then(response => {
      setHeroes(response.data.results);
      console.log(heroes)
    })
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Star Wars Heroes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Inbox
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {heroes.map(h =>
            <IonItem routerLink={`/message/${h.name}`} detail={false}>
              <div slot="start" className="dot dot-unread"></div>
              <IonLabel className="ion-text-wrap">{h.name}</IonLabel>
            </IonItem>)}
        </IonList>
      </IonContent>
    </IonPage>
  )
};

export default Home;
