import { createLazyFileRoute } from '@tanstack/react-router'
import React from 'react'
import Search from '../components/Search/Search'
import { Layout } from '../components/Layout/Layout'

export const Route = createLazyFileRoute('/search')({
  component: SearchPage,
})

function SearchPage() {
  return (
    <Layout title="Chercher une bouteille">
      <Search />
    </Layout>
  )
}