import { gql } from '@apollo/client'

export const LIST_CATEGORIES = gql`
  query ListCategories{
    listCategories {
      id
      name
      description
      icon
      color
      transactionsCount
      totalAmount
    }
  }
`