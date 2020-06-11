/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      createdAt
      updatedAt
      firstname
      lastname
      email
      password
      pictureName
      pictureUrl
      notification
      role
      group
      limitedStorage
      storageSpaceUsed
      totalStorageSpace
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        firstname
        lastname
        email
        password
        pictureName
        pictureUrl
        notification
        role
        group
        limitedStorage
        storageSpaceUsed
        totalStorageSpace
      }
      nextToken
    }
  }
`;
export const getGroup = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
      id
      name
      usersGroup {
        id
        createdAt
        updatedAt
        firstname
        lastname
        email
        password
        pictureName
        pictureUrl
        notification
        role
        group
        limitedStorage
        storageSpaceUsed
        totalStorageSpace
      }
    }
  }
`;
export const listGroups = /* GraphQL */ `
  query ListGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        usersGroup {
          id
          createdAt
          updatedAt
          firstname
          lastname
          email
          password
          pictureName
          pictureUrl
          notification
          role
          group
          limitedStorage
          storageSpaceUsed
          totalStorageSpace
        }
      }
      nextToken
    }
  }
`;
export const getFile = /* GraphQL */ `
  query GetFile($id: ID!) {
    getFile(id: $id) {
      id
      createdAt
      updatedAt
      name
      content
      owner
      sharedList {
        id
        createdAt
        updatedAt
        firstname
        lastname
        email
        password
        pictureName
        pictureUrl
        notification
        role
        group
        limitedStorage
        storageSpaceUsed
        totalStorageSpace
      }
      isProtected
      password
      parent
      size
      mimeType
      type
    }
  }
`;
export const listFiles = /* GraphQL */ `
  query ListFiles(
    $filter: ModelFileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        name
        content
        owner
        sharedList {
          id
          createdAt
          updatedAt
          firstname
          lastname
          email
          password
          pictureName
          pictureUrl
          notification
          role
          group
          limitedStorage
          storageSpaceUsed
          totalStorageSpace
        }
        isProtected
        password
        parent
        size
        mimeType
        type
      }
      nextToken
    }
  }
`;
export const getFolder = /* GraphQL */ `
  query GetFolder($id: ID!) {
    getFolder(id: $id) {
      id
      createdAt
      updatedAt
      name
      owner
      sharedList {
        id
        createdAt
        updatedAt
        firstname
        lastname
        email
        password
        pictureName
        pictureUrl
        notification
        role
        group
        limitedStorage
        storageSpaceUsed
        totalStorageSpace
      }
      isProtected
      password
      parent
      nbFiles
    }
  }
`;
export const listFolders = /* GraphQL */ `
  query ListFolders(
    $filter: ModelFolderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFolders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        name
        owner
        sharedList {
          id
          createdAt
          updatedAt
          firstname
          lastname
          email
          password
          pictureName
          pictureUrl
          notification
          role
          group
          limitedStorage
          storageSpaceUsed
          totalStorageSpace
        }
        isProtected
        password
        parent
        nbFiles
      }
      nextToken
    }
  }
`;
export const getRight = /* GraphQL */ `
  query GetRight($id: ID!) {
    getRight(id: $id) {
      read
      edit
      documentId
      user
    }
  }
`;
export const listRights = /* GraphQL */ `
  query ListRights(
    $filter: ModelRightFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRights(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        read
        edit
        documentId
        user
      }
      nextToken
    }
  }
`;
export const getApp = /* GraphQL */ `
  query GetApp($id: ID!) {
    getApp(id: $id) {
      groupId
      subscription
      pack
      custom
      headerColor
      iconeUrl
      font
    }
  }
`;
export const listApps = /* GraphQL */ `
  query ListApps(
    $filter: ModelAppFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        groupId
        subscription
        pack
        custom
        headerColor
        iconeUrl
        font
      }
      nextToken
    }
  }
`;
