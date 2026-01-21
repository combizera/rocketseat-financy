import { gql } from '@apollo/client'

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      category {
        id
        name
        color
        icon
      }
      amount
      type
      description
    }
  }
`

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($transactionId: String!, $data: UpdateTransactionInput!) {
    updateTransaction(id: $transactionId, data: $data) {
      id
      userId
      categoryId
      amount
      type
      date
      description
    }
  }
`

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($transactionId: String!) {
    deleteTransaction(id: $transactionId)
  }
`