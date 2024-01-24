export interface IPaginationOptions {
  page: number
  limit: number
}

export interface IPaginationOutput {
  currentPage: number
  totalPages: number
}

export interface IPaginationQueryParams {
  page: string
  limit: string
}

// export const getPagination = (currentPage: number, limit: number, totalPages: number): IPaginationOutput => {
//   const skip = (currentPage - 1) * limit
//   return {
//     currentPage: currentPage,
//     totalPages: Math.ceil(skip / limit)
//   }
// }
