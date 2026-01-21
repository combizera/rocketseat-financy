import { gql } from '@apollo/client'

export const LIST_TRANSACTION = gql`
  query ListTransactions{
    listTransactions {
      id
      user {
        id
        name
        email
      }
      category {
        id
        name
        color
        icon
      }
      amount
      type
      date
      description
    }
  }
`