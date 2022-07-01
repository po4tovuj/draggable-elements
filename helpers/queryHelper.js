/**
 */
export const createQuery = function (limit = 20, page = 1) {
  const params = new URLSearchParams({ _limit: limit, _page: page })

  return { params }
}
