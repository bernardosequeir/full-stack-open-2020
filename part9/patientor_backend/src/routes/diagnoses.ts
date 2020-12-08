import express from 'express'
import diagnosticService from '../services/diagnosticService'

const router = express.Router()

router.get('/', (_req, res) => {

  console.log(diagnosticService.getDiagnoses());

  res.json(diagnosticService.getDiagnoses())
})

export default router