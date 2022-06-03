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
            <IonCardTitle>{hero?.name}</IonCardTitle>
          </IonCardHeader>


          <IonCardContent>
            <h1>Information</h1>
            <ul>
              <li>gender: { }</li>
            </ul>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            This is content, without any paragraph or header tags,
            within an ion-cardContent element.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CardExamples;


