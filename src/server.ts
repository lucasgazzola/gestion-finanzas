const PORT = process.env.PORT || 3000
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`

import app from './app'
import dbClient from './database/client'

async function main() {
  try {
    await dbClient.$connect()
    console.log('Connected to the database')
    app.listen(PORT, () => {
      console.log(`Server is running on ${BASE_URL}`)
    })
  } catch (error) {
    console.error('Error connecting to the database:', error)
    process.exit(1)
  }
}

main()
