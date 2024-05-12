import { Metadata } from 'next';
import Image from "next/image";
import axios from 'axios';
import https from 'https';
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
    const url = 'https://api.v3.livetrail.net/api/events/statistics/starters';
    const headers = {
      'accept': 'application/json',
      'X-Tenant': 'ecotrail_2024',
    };
    const agent = new https.Agent({ rejectUnauthorized: false });
    const instance = axios.create({
      httpsAgent: agent,
    });

    const response = await instance.get(url, { headers });
    const data: Stat.StatInterface[] = await response.data.races;
    return data;
  }

  const starters = await getApiStarters();

  return (
    <main>
      <h1>Répartition des partants par catégorie</h1>
      <Statistics stats={starters} />
    </main>
  );
}
