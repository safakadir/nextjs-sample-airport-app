import { NextPage } from 'next'
import { KeyboardEventHandler, KeyboardEvent, useState, ChangeEvent, useEffect, useCallback } from 'react'
import AirportCard from '../components/airport-card'

import Layout from '../components/layout'
import useApiData from '../hooks/use-api-data'
import Airport from '../types/airport'

const Page: NextPage = () => {
  const [searchText, setSearchText] = useState<string>('')
  const [currentSearch, setCurrentSearch] = useState<string | undefined>(undefined)

  const {dataList: airports, dataCount, isLoading, loadmore, hasMore} = useApiData<Airport>('/api/v2/airports', currentSearch, [])

  const handleSearchKeyDown: KeyboardEventHandler<HTMLInputElement> = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      console.log("Search: "+e.currentTarget.value)
      setCurrentSearch(e.currentTarget.value)
    }
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }

  const handleClearSearchBox = () => {
    setSearchText('')
  } 

  const handleClearSearch = () => {
    setCurrentSearch(undefined)
    handleClearSearchBox()
  }

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    if (scrollTop + clientHeight >= scrollHeight) {
      loadmore()
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <Layout>
    <div className='max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold'>Code Challenge: Airports</h1>

      <div className='relative mt-10'>
        <input type='text' placeholder='Start Typing...' className='bg-gray-50 border rounded w-full p-3' value={searchText} onChange={handleSearchChange} onKeyDown={handleSearchKeyDown} />
        {searchText !== '' && <span className='absolute m-2.5 py-1 px-2.5 rounded-full right-0 text-neutral-400 cursor-pointer hover:bg-gray-100' onClick={handleClearSearchBox}>X</span>}
      </div>

      <div className='flex mt-10'>
        <h2 className='text-xl font-bold mr-3'>Airports</h2>
        <div className='bg-blue-400 rounded-2xl text-white text-sm font-bold px-2 py-1'>{dataCount}</div>
        {!!currentSearch &&
          <div className='w-full flex justify-end items-end text-sm mr-3'>
            Showing results for<span className='font-bold mx-1'>{currentSearch}</span>
            <span className='relative text-neutral-400 cursor-pointer font-bold hover:bg-gray-50 py-1 px-2 top-1 rounded-full' onClick={handleClearSearch}>X</span>
          </div>
        }
      </div>

      <div className='mt-5'>
        {airports.length > 0 ? 
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {airports.map(airport => (
              <AirportCard airport={airport} key={airport.iata} />
            ))}
          </div>
        :
          <span>No airports found!</span>
        }
      </div>

      <div className='flex justify-end items-center mt-3'>
        <span className='mr-3'>Showing {airports.length} of {dataCount} records</span>
      </div>
    </div>
  </Layout>
}

export default Page
