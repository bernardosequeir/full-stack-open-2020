import { v1 as uuid } from 'uuid'

import patients from '../../data/patients'
import { Patient, NonSensitivePatient, NewPatient } from '../types'
const getNonSensitivePatientData = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }))
}

const getPatientData = (): Patient[] => patients

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  }
  patients.push(newPatient)
  return newPatient;
}

export default { getNonSensitivePatientData, getPatientData, addPatient }