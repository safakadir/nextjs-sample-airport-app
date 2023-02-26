import { NextApiRequest, NextApiResponse } from 'next'

import { findCountAll, findCountSearch, getAirportsAfter, searchAndGetAirportsAfter } from '../../../models/airport'
import Airport from '../../../types/airport'
import QueryResult from '../../../types/query-result'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  
  let after = parseInt(req.query.after as string)
  after = Number.isNaN(after) ? 0 : after
  const search = req.query.search as string

  let result: QueryResult<Airport>
  if(!search) {
    const airports = await getAirportsAfter(after)
    const countSearch = await findCountAll()
    result = {
      totalCount: countSearch,
      list: airports
    }
  }
  else {
    const airports = await searchAndGetAirportsAfter(search, after)
    const countAll = await findCountSearch()
    result = {
      totalCount: countAll,
      list: airports
    }
  }

  res.status(200).json(result)
}
