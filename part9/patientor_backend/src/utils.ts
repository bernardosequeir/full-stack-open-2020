import { NewPatient, Gender, Entry, Diagnosis, Discharge, HealthCheckRating, SickLeave } from './types'
import { v1 as uuid } from 'uuid'

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param)
}

const isHealthCheckRating = (param: any): param is HealthCheckRating => {

  return Object.values(HealthCheckRating).includes(param)
}

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name')
  }
  return name
}

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn')
  }
  return ssn
}

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date')
  }
  return date
}

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender')
  }

  return gender
}

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation')
  }

  return occupation
}

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description')
  }

  return description
}

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist')
  }

  return specialist
}

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
  if (!diagnosisCodes) {
    return []
  }
  if (!diagnosisCodes.every((code: any) => isString(code))) {
    throw new Error('Incorrect diagnosis codes')
  }

  return diagnosisCodes
}

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !discharge.date || !isString(discharge.date) || !discharge.criteria || !isString(discharge.criteria)) {
    throw new Error('Incorrect or missing Discharge')
  }
  return discharge
}

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing Rating')
  }

  return healthCheckRating
}
const parseEmployerName = (employerName: any): string => {
  if (!parseEmployerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName')
  }

  return employerName
}

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave) {
    return { startDate: "", endDate: "" }
  }
  if (!sickLeave.startDate || !parseDate(sickLeave.startDate) || !sickLeave.endDate || !parseDate(sickLeave.endDate)) {
    throw new Error('Incorrect sick leave')
  }
  return sickLeave
}

export const toNewPatient = (object: any): NewPatient => ({
  name: parseName(object.name),
  dateOfBirth: parseDate(object.dateOfBirth),
  ssn: parseSsn(object.ssn),
  gender: parseGender(object.gender),
  occupation: parseOccupation(object.occupation),
})

export const toNewEntry = (object: any): Entry => {
  const newEntry = ({
    id: uuid(),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
  })

  switch (object.type) {
    case "Hospital":
      return ({
        ...newEntry,
        type: "Hospital",
        discharge: parseDischarge(object.discharge)
      })
    case "HealthCheck":
      return ({
        ...newEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      })
    case "OccupationalHealthcare":
      return ({
        ...newEntry,
        type: "OccupationalHealthcare",
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave)
      })
    default:
      throw new Error('not a valid Entry');
  }
}
