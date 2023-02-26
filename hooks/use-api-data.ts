import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import QueryResult from "../types/query-result"

interface UseApiResult<T> {
  dataList: T[],
  dataCount: number,
  isLoading: boolean,
  loadmore: () => void
}

export const useApiData = <T>(path: string, defaultValue: any): UseApiResult<T> => {
  const [ dataList, setDataList ] = useState<T[]>(defaultValue)
  const [ dataCount, setDataCount ] = useState<number>(0)
  const [ isLoading, setIsLoading ] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    axios.get<QueryResult<T>>(path).catch(err => err.response).then(response => {
      setDataList(response.data.list)
      setDataCount(response.data.totalCount)
      setIsLoading(false)
    })
  }, [])

  const loadmore = useCallback(() => {
    setIsLoading(true)
    const pathWithAfter = path+'?after='+dataList.length
    axios.get<QueryResult<T>>(pathWithAfter).catch(err => err.response).then(response => {
      setDataList(prevList => [...prevList, ...response.data.list])
      setIsLoading(false)
    })
  }, [dataList])

  return { dataList, dataCount, isLoading, loadmore }
}

export default useApiData
