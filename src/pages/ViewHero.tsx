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
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
  IonTitle,
  IonItem,
  IonThumbnail,
} from '@ionic/react';
import { useLocation, useParams } from 'react-router';
import { Hero } from './Home';
import React from 'react';
import { useState } from 'react';
import { rocket, film, analytics } from 'ionicons/icons';
import axios from 'axios';

export interface Ship {
  name: string;
  model: string;
  starship_class: string;
}

const CardHeroes: React.FC = () => {

  const [ship, setShip] = useState<Ship>();
  const [hero, setHero] = useState<Hero>();

  React.useEffect(() => {
    setHero(parHero.params);
    fetchShip();
  }, [])


  const location = useLocation();
  const parHero: any = location.state;



  const fetchShip = async () => {
    const response = await axios({
      url: hero?.starships[0],
      method: 'get'
    });
    setShip(response.data);
  };


  const [shipActive, setShipActive] = useState<boolean>(true);
  const [filmActive, setFilmActive] = useState<boolean>(false);

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
          <IonCardContent>
            <h1>{hero?.name}</h1>
            <ul>
              <li>Height: {hero?.height}</li>
              <li>Mass: {hero?.mass}</li>
              <li>Gender: {hero?.gender}</li>
            </ul>
          </IonCardContent>
        </IonCard>

        <IonSegment value={shipActive ? "starships" : "films"}>
          <IonSegmentButton
            value="starships"
            onClick={() => {
              setShipActive(true);
              setFilmActive(false);
            }}
          >
            <IonLabel>Starships</IonLabel>
            <IonIcon icon={rocket} />
          </IonSegmentButton>

          <IonSegmentButton
            value="films"
            onClick={() => {
              setShipActive(false);
              setFilmActive(true);
            }}
          >
            <IonIcon icon={film} />
            <IonLabel>Films</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <IonContent className="ion-padding">
          {shipActive ? (
            <IonCard>
              <ul>
                <li>ship name : {ship?.name}</li>
                <li>ship model : {ship?.model}</li>
                <li>ship class : {ship?.starship_class}</li>
              </ul>
            </IonCard>
          ) : (
            <IonCard>
              {hero?.films[0]}
            </IonCard>

          )}
        </IonContent>
      </IonContent>
    </IonPage >
  );


};

export default CardHeroes;


