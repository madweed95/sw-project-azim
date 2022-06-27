import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Css/Style.css";

export interface Hero {
  name: string;
  height: string;
  mass: string;
  gender: string;
  films: string[];
  starships: string[];
}

const Home: React.FC = () => {
  let history = useHistory();
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    fetchHeroes();
  }, []);

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const URL = "https://swapi.dev/api/people";
  const fetchHeroes = async () => {
    return axios({
      url: URL,
      method: "get",
    }).then((response) => {
      setHeroes(response.data.results);
      setIsLoading(false);
    });
  };
  if (isLoading) {
    return <IonSpinner name="crescent" className="spinnerCenter"></IonSpinner>;
  }

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
            <IonTitle size="large">Inbox</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {heroes.map((h) => (
            <IonItem
              key={h.name}
              onClick={() => {
                history.push(`/hero/${h.name}`, { params: h });
              }}
            >
              <div slot="start" className="dot dot-unread"></div>
              <IonLabel className="ion-text-wrap">{h.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
