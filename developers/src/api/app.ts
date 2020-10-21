import express from 'express'
import { developerRouter } from './router'
const app = express()

app.use(express.json())
app.use('/developers', developerRouter)
app.use('/', (req, res) => res.status(200).json({ message: 'devApp' }))

export { app }
