interface QueryResult<T> {
    list: T[],
    totalCount: number,
    hasMore: boolean
}

export default QueryResult
