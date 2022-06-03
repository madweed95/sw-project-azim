import { useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react';
import { useLocation, useParams } from 'react-router';
import { Hero } from './Home';
import React from 'react';


export const CardExamples: React.FC = () => {
  const [hero, setHero] = useState<Hero>();
  const location = useLocation();
  const parHero: any = location.state;
  React.useEffect(() => {
    setHero(parHero.params)
  }, [])
  console.log(hero?.starships)

  return (
    <IonPage id="view-hero-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="List of Heroes" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle></IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <h1>{hero?.name}</h1>
            <ul>
              <li>Height: {hero?.height}</li>
              <li>Mass: {hero?.mass}</li>
              <li>Gender: {hero?.gender}</li>
            </ul>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>

          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CardExamples;


