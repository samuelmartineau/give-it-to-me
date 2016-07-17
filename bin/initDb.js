#!/usr/bin/env node
const config = require('../config')

const knex = require('knex')({
  dialect: 'sqlite3',
  connection: {
    filename: config.DB.filename
  }
})

knex.schema
  .createTable('wines', table => {
    table.increments('id').primary()
    table.string('blur')
    table.string('name')
    table.string('source')
    table.string('wineCategory')
    table.string('wineType')
    table.string('thumbnailFileName')
    table.string('pictureFileName')
    table.string('positionComment')
    table.boolean('isInBoxes')
    table.boolean('_deleted').defaultTo(false)
    table.boolean('isFavorite').defaultTo(false)
    table.integer('bottleType')
    table.integer('year')
    table.integer('wineFamily')
    table.integer('stock')
    table.integer('count')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
  .createTable('bottles', table => {
    table.increments('id').primary()
    table.integer('box')
    table.integer('cell')
    table.boolean('_deleted').defaultTo(false)
    table.integer('wine_id')
      .references('wines.id')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
  .catch(console.error)
  .finally(process.exit)
