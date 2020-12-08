import { v1 as uuid } from 'uuid'

import patients from '../../data/patients'
import { Patient, NonSensitivePatient, NewPatient, Entry } from '../types'
const getNonSensitivePatientData = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }))
}

const getPatientData = (): Patient[] => patients

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
    entries: []
  }
  patients.push(newPatient)
  return newPatient;
}

const addEntry = (entry: Entry, id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id)
  patient?.entries.push(entry)
  return patient
}

export default { getNonSensitivePatientData, getPatientData, addPatient, addEntry }