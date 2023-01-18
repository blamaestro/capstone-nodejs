export const getDateQuery = (from, to, column = 'date') => {
  let resultQuery = '';
  if (from) resultQuery += ` AND ${column} >= "${from}"`;
  if (to) resultQuery += ` AND ${column} < "${to}"`;
  return resultQuery;
};

export const getLimitQuery = limit => (limit ? `LIMIT ${limit}` : '');
