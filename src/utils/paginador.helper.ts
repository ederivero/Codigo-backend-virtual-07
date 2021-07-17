export type TPaginationDto = {
  page: number;
  perPage: number;
};

export const paginatedHelper = (
  params: TPaginationDto
): { skip: number; limit: number } | void => {
  if (params.page && params.perPage) {
    return {
      skip: (params.page - 1) * params.perPage,
      limit: params.perPage,
    };
  }
};

export const paginationSerializer = (total: number, query: TPaginationDto) => {
  const { page, perPage } = query;
  // si el total es mayor o igual que los items por pagina entonces los items por pagina sera perPage y sino sera el total
  const itemsPerPage = total >= perPage ? perPage : total;
  // el techo de la division entre el total y los items por pagina
  const totalPages = Math.ceil(total / itemsPerPage);
  // si la pagina actual es mayor que uno y ademas la pagina es menor o igual que el total de paginas, entonces la pagina previa sera la pagina actual -1 y sino sera null (no habra)
  const prevPage = page > 1 && page <= totalPages ? page - 1 : null;
  // si el total de paginas es mayor que 1 y ademas la pagina es menor que el total de paginas entonces la pagina siguiente sera la pagina actual +1 y sino sera null (no habra)
  const nextPage = totalPages > 1 && page < totalPages ? page + 1 : null;

  return {
    perPage: itemsPerPage,
    total,
    page,
    prevPage,
    nextPage,
    totalPages,
  };
};
