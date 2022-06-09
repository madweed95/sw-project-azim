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
import { rocket, film } from 'ionicons/icons';
import axios from 'axios';
import { title } from 'process';

const CardHeroes: React.FC = () => {

  const [hero, setHero] = useState<Hero>();
  const [ships, setShips] = useState<string[]>([]);
  const [films, setFilms] = useState<string[]>([]);

  const location = useLocation<[]>();
  const parHero: any = location.state;




  React.useEffect(() => {
    setHero(parHero.params);
  }, [])



  React.useEffect(() => {

    if (hero) {

      axios.all(hero.films.map(f => axios.get(f)))
        .then((value) => {
          let filmsData: string[] = [];
          value.map(filmData => {
            filmsData.push(filmData.data.title);
          })
          setFilms(filmsData)
        })
    }

    if (hero) {

      axios.all(hero.starships.map(s => axios.get(s)))
        .then((value) => {
          let shipsData: string[] = [];
          value.map(data => {
            shipsData.push(data.data.name);
          })
          setShips(shipsData)
        })
    }
  }, [hero])


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

              {ships.map(s =>
                <ul key={s}>
                  <li>{s}</li>
                </ul>
              )}

            </IonCard>
          ) : (
            <IonCard>

              {films.map(f =>
                <ul key={f}>
                  <li>{f}</li>
                </ul>
              )}

            </IonCard>

          )}
        </IonContent>
      </IonContent>
    </IonPage >
  );


};

export default CardHeroes;


