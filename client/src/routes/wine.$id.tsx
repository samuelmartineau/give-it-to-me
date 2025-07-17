import { createFileRoute } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import WinePage from '../components/Wine/WinePage/WinePage';
import { getWineById } from '../api';
import { WineAndBottles } from '../Cellar.type';

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
    return <div>Loading wine...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!wine) {
    return <div>Wine not found</div>;
  }

  return (
    <Layout title={`Vin ${wine.id} - ${wine.name}`}>
      <WinePage wine={wine} />
    </Layout>
  );
}
