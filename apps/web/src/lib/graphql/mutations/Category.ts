import { gql } from '@apollo/client'

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      id
      userId
      name
      description
      icon
      color
    }
  }
`

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($categoryId: String!,$data: UpdateCategoryInput!) {
    updateCategory(id: $categoryId, data: $data) {
      id
      userId
      name
      description
      icon
      color
    }
  }
`

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($categoryId: String!) {
    deleteCategory(id: $categoryId)
  }
`