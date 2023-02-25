import { NextPage } from 'next'
import AirportCard from '../components/airport-card'

import Layout from '../components/layout'
import useApiData from '../hooks/use-api-data'
import Airport from '../types/airport'

const Page: NextPage = () => {
  const {data: airports, loadmore} = useApiData<Airport>('/api/airports', [])

  return <Layout>
    <div className='max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold'>Code Challenge: Airports</h1>

      <input type='text' placeholder='Start Typing...' className='bg-gray-50 border rounded w-full p-3 mt-10' />

      <div className='flex mt-10'>
        <h2 className='text-xl font-bold mr-3'>Airports</h2>
        <div className='bg-blue-400 rounded-2xl text-white text-sm font-bold px-2 py-1'>6073</div>
      </div>

      <div className='grid grid-cols-2 gap-4 mt-5'>
        {airports.map(airport => (
          <AirportCard airport={airport} />
        ))}
      </div>

      <div onClick={loadmore} className='block text-neutral-500 text-sm cursor-pointer mt-3 px-3 py-1 border rounded-2xl w-24'>Load More</div>
    </div>
  </Layout>
}

export default Page
