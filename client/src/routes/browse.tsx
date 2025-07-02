import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { Browse } from '../components/Browse/Browse'
import { Layout } from '../components/Layout/Layout'

export const Route = createFileRoute('/browse')({
  component: BrowsePage,
})

function BrowsePage() {
  return (
    <Layout title="Parcourir la cave">
      <Browse />
    </Layout>
  )
}