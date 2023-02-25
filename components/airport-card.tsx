import Airport from '../types/airport'

interface AirportCardProps {
    airport: Airport
}

const AirportCard = ({airport}: AirportCardProps) => {
    return <a href={`/airports/${airport.iata.toLowerCase()}`} key={airport.iata} 
                className='mt-5 shadow-sm p-5 border rounded-lg flex flex-col justify-between items-start'>
        <div>
            {airport.name}, {airport.city}
        </div>
        <div className='text-mono text-neutral-500 mt-1'>
            {airport.country}
        </div>
    </a>
}

export default AirportCard
