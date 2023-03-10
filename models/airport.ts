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
  let skipped = 0
  for(let airport of airports) {
    if(!isMatches(airport, searchLower)) continue
    if(skipped < after) {
      skipped++
      continue
    }
    if(result.length < BATCH_SIZE) result.push(airport)
    if(result.length == BATCH_SIZE) break
  }
  return result
}

export const findCountAll = async (): Promise<number> => {
  return airports.length
}

export const findCountSearch = async (search: string): Promise<number> => {
  return airports.filter(a => isMatches(a, search)).length
}

const isMatches = (airport: Airport, search: string): boolean => {
  if(airport.name.toLowerCase().includes(search)) return true
  if(airport.city.toLowerCase().includes(search)) return true
  if(airport.iata.toLowerCase().includes(search)) return true
  if(airport.country.toLowerCase().includes(search)) return true
  return false
}
