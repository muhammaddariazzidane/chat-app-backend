import mongoose from 'mongoose'
import 'dotenv/config'

mongoose
  .connect(`${process.env.DATABASE_URL}`)
  .then(() => {
    console.log('connect to mongodb')
  })
  .catch((error) => {
    console.log(`error ${error}`)
  })
