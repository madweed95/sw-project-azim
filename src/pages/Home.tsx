import {
  IonButton,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Css/Style.css";
import { push } from "ionicons/icons";

export interface Hero {
  name: string;
  height: string;
  mass: string;
  gender: string;
  films: string[];
  starships: string[];
}
export interface Hero2 {
  name: string;
  height: string;
  mass: string;
  gender: string;
  films: string[];
  starships: string[];
}

const Home: React.FC = () => {
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();

  const pushData = () => {
    const URL = "https://swapi.dev/api/people/?page=2";
    return axios({
      url: URL,
      method: "get",
    }).then((res) => {
      // console.log(res.data.results);
      console.log(res.data.results);
      setHeroes([...heroes, ...res.data.results]);
    });
  };
  const loadData = (ev: any) => {
    setTimeout(() => {
      pushData();
      console.log("Loaded data");
      ev.target.complete();
      if (heroes.length === 1000) {
        setInfiniteDisabled(true);
      }
    }, 500);
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
          {heroes.map((h, i) => (
            <IonItem
              key={i}
              onClick={() => {
                history.push(`/hero/${h.name}`, { params: h });
              }}
            >
              <div slot="start" className="dot dot-unread"></div>
              <IonLabel className="ion-text-wrap">{h.name}</IonLabel>
            </IonItem>
          ))}
          {/* {data.map((item, index) => {
            return (
              <IonItem key={index}>
                <IonLabel>{item}</IonLabel>
              </IonItem>
            );
          })} */}
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
