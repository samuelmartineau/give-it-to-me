import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { AddStepsConnected } from '../components/Add/AddSteps'
import { Layout } from '../components/Layout/Layout'

export const Route = createFileRoute('/add')({
  component: AddPage,
})

function AddPage() {
  return (
    <Layout title="Ajouter une nouvelle bouteille">
      <AddStepsConnected />
    </Layout>
  )
}