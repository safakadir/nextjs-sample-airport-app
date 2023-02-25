import axios from "axios"
import { useCallback, useEffect, useState } from "react"

interface UseApiProps<T> {
  data: T[],
  loadmore: () => void
}

export const useApiData = <T>(path: string, defaultValue: any): UseApiProps<T> => {
  const [ data, setData ] = useState<T[]>(defaultValue)

  useEffect(() => {
    axios.get<T[]>(path).catch(err => err.response).then(response => {
      setData(response.data)
    })
  }, [])

  const loadmore = useCallback(() => {
    axios.get<T[]>(path+'?after='+data.length).catch(err => err.response).then(response => {
      setData(prevData => [...prevData, ...response.data])
    })
  }, [data])

  return { data, loadmore }
}

export default useApiData
