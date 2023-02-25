import { NextApiRequest, NextApiResponse } from 'next'

import { getAirportsAfter, searchAndGetAirportsAfter } from '../../models/airport'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  
  let after = parseInt(req.query.after as string)
  after = Number.isNaN(after) ? 0 : after
  const search = req.query.search as string

  let airports
  if(!search) {
    airports = await getAirportsAfter(after)
  }
  else {
    airports = await searchAndGetAirportsAfter(search, after)
  }

  res.status(200).json(airports)
}
