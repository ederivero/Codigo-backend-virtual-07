from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class PaginacionMesa(PageNumberPagination):
    page_query_param = "pagina"
    page_size = 3
    max_page_size = 5
    page_size_query_param = "cantidad"

    def get_paginated_response(self, data):
        return Response(data={
            "data": {
                "success": True,
                "content": data,
                "message": None
            },
            "paginacion": {
                "pagPrev": self.get_previous_link(),
                "pagSig": self.get_next_link(),
                "total": self.page.paginator.count
            }
        })
