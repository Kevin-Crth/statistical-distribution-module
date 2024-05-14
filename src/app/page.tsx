import { Metadata } from 'next';
import * as Stat from '../types/stat';
import './page.scss';
import { Statistics } from "../components/Statistics/Statistics";

export const metadata: Metadata = {
  title: "Statistiques Ecotrail 2024",
  description: "Découvrez les statistiques de participation par genre et catégorie pour chaque course de l'Ecotrail 2024",
  keywords: ["Ecotrail", "Trail", "Course", "Course à pied", "Statistiques", "Ecotrail 2024", "Trail running", "Ultra trail", "Participation", "Partants"],
  metadataBase: new URL('https://livetrail.net'),
  openGraph: {
    type: "website",
    url: "https://livetrail.net",
    title: "Statistiques Ecotrail 2024",
    description: "Découvrez les statistiques de participation par genre pour chaque course de l'Ecotrail 2024",
    siteName: "Live Trail",
    images: [{
      url: "ecotrail.jpg",
    }],
  }
};

export default async function Home() {
  async function getApiStarters() {
    const response = await fetch('http://api.v3.livetrail.net/api/events/statistics/starters', {
      method: 'GET',
      headers : {
        'accept': 'application/json',
        'X-Tenant': 'ecotrail_2024',
      },
    })
    const data = await response.json();
    const races : Stat.StatInterface[] = data.races;
    return (races);
  }

  const starters = await getApiStarters();

  return (
    <main>
      <h1>Répartition des partants par catégorie</h1>
      <Statistics stats={starters} />
    </main>
  );
}
