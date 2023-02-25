import airports from '../data/airports.json'
import Airport from '../types/airport'

const BATCH_SIZE = 10

export const findAirportByIata = async (iata: string): Promise<Airport | undefined> => {
  return airports.find(airport => airport.iata === iata.toUpperCase())
}

export const allAirports = async (): Promise<Airport[]> => {
  return airports.slice(0,10)
}

export const getAirportsAfter = async (after: number): Promise<Airport[]> => {
  return airports.slice(after, after+BATCH_SIZE)
}

export const searchAndGetAirportsAfter = async (search: string, after: number): Promise<Airport[]> => {
  const result = []
  const searchLower = search.toLowerCase()
  for(let airport of airports) {
    if(!isMatches(airport, searchLower)) continue
    if(result.length < BATCH_SIZE) result.push(airport)
    if(result.length == BATCH_SIZE) break
  }
  return result
}

const isMatches = (airport: Airport, search: string): boolean => {
  if(airport.name.toLowerCase().includes(search)) return true
  if(airport.city.toLowerCase().includes(search)) return true
  if(airport.iata.toLowerCase().includes(search)) return true
  if(airport.country.toLowerCase().includes(search)) return true
  return false
}
