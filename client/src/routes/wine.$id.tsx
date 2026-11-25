import { createFileRoute } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import WinePage from '../components/Wine/WinePage/WinePage';
import { getWineById } from '../api';
import { WineAndBottles } from '../Cellar.type';
import { Spinner } from '../components/Toolkit';

export const Route = createFileRoute('/wine/$id')({
  component: WineIdPage,
});

function WineIdPage() {
  const { id } = Route.useParams();

  const [wine, setWine] = useState<WineAndBottles | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWine = async () => {
      try {
        setLoading(true);
        const wineData = await getWineById(id, true);
        setWine(wineData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch wine');
      } finally {
        setLoading(false);
      }
    };

    fetchWine();
  }, [id]);

  if (loading) {
    return (
      <Layout title="Chargement…">
        <Spinner />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Vin introuvable">
        <p>Impossible de charger ce vin : {error}</p>
      </Layout>
    );
  }

  if (!wine) {
    return (
      <Layout title="Vin introuvable">
        <p>Ce vin n’existe pas ou plus.</p>
      </Layout>
    );
  }

  return (
    <Layout title={wine.name}>
      <WinePage wine={wine} />
    </Layout>
  );
}
