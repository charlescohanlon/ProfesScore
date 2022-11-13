import type { NextApiRequest, NextApiResponse } from "next";
import { getResultsForQuery } from "../../backend/utils";
import { SearchQuery, SearchType } from "../../types";
import { Previews } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = queryFromParams(req);
  let page: number;
  try {
    page = parseInt(req.query.page as string);
  } catch (e) {
    res.status(400);
    return;
  }
  const results: Previews = await getResultsForQuery(query, page);

  res.status(200).json({ results });
}

function queryFromParams(req: NextApiRequest): SearchQuery {
  const query: SearchQuery = {
    type: req.query.type as SearchType,
  };
  switch (query.type) {
    case "professor":
      query.pq = req.query.pq as string;
      break;
    case "course":
      if (req.query.cq) query.cq = req.query.cq as string;
      else query.dq = req.query.dq as string;
      break;
    default:
      query.sq = [parseInt(req.query.sq[0]), parseInt(req.query.sq[1])];
  }
  return query;
}
