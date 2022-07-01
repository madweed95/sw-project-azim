import {
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Css/Style.css";
import { useQuery } from "react-query";

export interface Hero {
  name: string;
  height: string;
  mass: string;
  gender: string;
  films: string[];
  starships: string[];
  url: string;
}

const Home: React.FC = () => {
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPage, setNextPage] = useState();
  let history = useHistory();

  const loadData = (ev: any) => {
    if (!nextPage) setInfiniteDisabled(true);
    else pushData(ev);
    console.log("Loaded data");
  };

  const pushData = (infinteScroll: any) => {
    return axios({
      url: nextPage,
      method: "get",
    }).then((res) => {
      setNextPage(res.data.next);
      setHeroes([...heroes, ...res.data.results]);
      infinteScroll.target.complete();
    });
  };

  React.useEffect(() => {
    fetchHeroes();
  }, []);

  const URL = "https://swapi.dev/api/people";
  const fetchHeroes = () => {
    return axios({
      url: URL,
      method: "get",
    }).then((response) => {
      setNextPage(response.data.next);
      setHeroes(response.data.results);
      setIsLoading(false);
    });
  };
  if (isLoading) {
    return <IonSpinner name="crescent" className="spinnerCenter"></IonSpinner>;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Star Wars Heroes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense"></IonHeader>

        <IonList>
          {heroes.map((h) => (
            <IonItem
              key={h.url}
              onClick={() => {
                let paramUrl = h.url.split("/");
                const idHero = paramUrl[paramUrl.length - 2];
                history.push(`/hero/${idHero}`);
              }}
            >
              <div slot="start" className="dot dot-unread"></div>
              <IonLabel className="ion-text-wrap">{h.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonInfiniteScroll
          onIonInfinite={loadData}
          threshold="100px"
          disabled={isInfiniteDisabled}
        >
          <IonInfiniteScrollContent
            loadingSpinner="crescent"
            loadingText="Loading more heroes..."
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Home;
