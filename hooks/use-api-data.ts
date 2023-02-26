import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import QueryResult from "../types/query-result"

interface UseApiResult<T> {
  dataList: T[],
  dataCount: number,
  isLoading: boolean,
  loadmore: () => void
}

export const useApiData = <T>(path: string, search: string|undefined, defaultValue: any): UseApiResult<T> => {
  const [ dataList, setDataList ] = useState<T[]>(defaultValue)
  const [ dataCount, setDataCount ] = useState<number>(0)
  const [ isLoading, setIsLoading ] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    axios.get<QueryResult<T>>(getPathWithSearch(path, search)).catch(err => err.response).then(response => {
      setDataList(response.data.list)
      setDataCount(response.data.totalCount)
      setIsLoading(false)
    })
  }, [search])

  const loadmore = useCallback(() => {
    setIsLoading(true)
    const pathWithAfter = appendAfter(getPathWithSearch(path, search), dataList.length)
    axios.get<QueryResult<T>>(pathWithAfter).catch(err => err.response).then(response => {
      setDataList(prevList => [...prevList, ...response.data.list])
      setIsLoading(false)
    })
  }, [dataList])

  return { dataList, dataCount, isLoading, loadmore }
}

const getPathWithSearch = (path: string, search: string|undefined): string => {
  return search ? path+'?search='+search : path
}

const appendAfter = (path: string, after: number): string => {
  return path.includes('?') ? path+'&after='+after : path+'?after='+after
}

export default useApiData
