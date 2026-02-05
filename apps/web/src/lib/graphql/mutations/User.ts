import { gql } from '@apollo/client'

export const UPDATE_USER = gql`
  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`
