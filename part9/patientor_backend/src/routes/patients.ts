import express from 'express'
import patientService from '../services/patientService'
import { toNewPatient, toNewEntry } from '../utils'

const router = express.Router()

router.get('/:id', (req, res) => {
  console.log(req.params.id)
  console.log(patientService.getNonSensitivePatientData()
    .find(patient => patient.id === req.params.id));

  res.json(patientService.getNonSensitivePatientData()
    .find(patient => patient.id === req.params.id))
})

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body)
    const addedEntry = patientService.addPatient(newPatient)
    res.json(addedEntry)
  } catch (e) {
    res.status(400).send(e.message)
  }
})
router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id
    const newEntry = toNewEntry(req.body)
    const updatedPatient = patientService.addEntry(newEntry, id)
    if (!updatedPatient) throw new Error('error finding the patient')
    res.json(updatedPatient)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

router.get('/', (_req, res) => {

  res.json(patientService.getNonSensitivePatientData())
})
export default router