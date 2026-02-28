type RefundAPIResponse = {
  id: string
  userId: string
  name: string
  category: CategoriesAPIEnum
  amount: number,
  filename: string
  user: {
    name: string
  }
}


type PaginationRefundsAPIResponse = {
  refunds: RefundAPIResponse[],
  pagination: { 
    totalRecords: number
    totalPages: number
    page: number
    perPage: number
   },

}