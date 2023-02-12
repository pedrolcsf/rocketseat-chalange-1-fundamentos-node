import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      if (!title) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'title is required' }),
        )
      }

      if (!description) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'title is required' }),
        )
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
      }
  
      database.insert('tasks', task)
  
      return res.writeHead(201).end()
    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const tasks = database.select('tasks')

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body
      
      const [task] = database.select('tasks', { id })

      if (!task) {
        return res.writeHead(404).end()
      }

      if (!title) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'title is required' }),
        )
      }

      if (!description) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'title is required' }),
        )
      }
      database.update('tasks', id, {
        title,
        description,
        updated_at: new Date()
      })
      
      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const [task] = database.select('tasks', { id })

      if (!task) {
        return res.writeHead(404).end()
      }

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const [task] = database.select('tasks', { id })

      if (!task) {
        return res.writeHead(404).end()
      }
      database.updateItemRow('tasks', id, {
        completed_at: new Date(),
        updated_at: new Date()
      })
      
      return res.writeHead(204).end()
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/teste'),
    handler: (req, res) => {
      console.log('teste')
      
      return res.writeHead(204).end()
    }
  },
]