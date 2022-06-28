import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import { useLocation } from "react-router";
import { Hero } from "./Home";
import React from "react";
import { useState } from "react";
import { rocket, film } from "ionicons/icons";
import axios from "axios";

const CardHeroes: React.FC = () => {
  const [hero, setHero] = useState<Hero>();
  const [ships, setShips] = useState<string[]>([]);
  const [films, setFilms] = useState<string[]>([]);
  const [selectedSegment, setselectedSegment] = useState<string>("films");
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation<[]>();
  const parHero: any = location.state;

  React.useEffect(() => {
    setHero(parHero.params);
  }, []);

  React.useEffect(() => {
    if (hero) {
      axios.all(hero.films.map((f) => axios.get(f))).then((value) => {
        let filmsData: string[] = [];
        value.map((filmData) => {
          filmsData.push(filmData.data.title);
        });
        setFilms(filmsData);
        setIsLoading(false);
      });

      axios.all(hero.starships.map((s) => axios.get(s))).then((value) => {
        let shipsData: string[] = [];
        value.map((ship) => {
          shipsData.push(ship.data.name);
        });
        setShips(shipsData);
      });
    }
  }, [hero]);
  if (isLoading) {
    return <IonSpinner name="crescent" className="spinnerCenter"></IonSpinner>;
  }

  return (
    <IonPage id="view-hero-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text="List of Heroes"
              defaultHref="/home"
            ></IonBackButton>
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

        <IonSegment value={selectedSegment}>
          <IonSegmentButton
            value="films"
            onClick={() => {
              setselectedSegment("films");
            }}
          >
            <IonIcon icon={film} />
            <IonLabel>Films</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            value="starships"
            onClick={() => {
              setselectedSegment("starships");
            }}
          >
            <IonLabel>Starships</IonLabel>
            <IonIcon icon={rocket} />
          </IonSegmentButton>
        </IonSegment>

        <IonContent className="ion-padding">
          <IonCard>
            {selectedSegment === "films" &&
              films.map((f) => (
                <ul key={f}>
                  <li>{f}</li>
                </ul>
              ))}
            {selectedSegment === "starships" &&
              ships.map((s) => (
                <ul key={s}>
                  <li>{s}</li>
                </ul>
              ))}
          </IonCard>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default CardHeroes;
