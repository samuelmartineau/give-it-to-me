import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import Home from '../components/Home/Home'
import { Layout } from '../components/Layout/Layout'

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  return (
    <Layout title="Mon activité">
      <Home />
    </Layout>
  )
}