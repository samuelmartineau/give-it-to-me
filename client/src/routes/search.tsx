import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import Search from '../components/Search/Search';
import { Layout } from '../components/Layout/Layout';
import { z } from 'zod';

const searchSchema = z.object({
  wineFamilies: z.array(z.string()).optional(),
  wineCategories: z.array(z.string()).optional(),
  wineTypes: z.array(z.string()).optional(),
  favorites: z.boolean().optional(),
  outsideBoxes: z.boolean().optional(),
  name: z.string().optional()
});

export type SearchParams = z.infer<typeof searchSchema>;

export const Route = createFileRoute('/search')({
  component: SearchPage,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return searchSchema.parse(search);
  },
});

function SearchPage() {
  return (
    <Layout title="Chercher une bouteille">
      <Search />
    </Layout>
  );
}
