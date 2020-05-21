// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
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
export const createGroup = /* GraphQL */ `
  mutation CreateGroup(
    $input: CreateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    createGroup(input: $input, condition: $condition) {
      id
      name
      userGroup {
        id
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
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup(
    $input: UpdateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    updateGroup(input: $input, condition: $condition) {
      id
      name
      userGroup {
        id
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
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup(
    $input: DeleteGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    deleteGroup(input: $input, condition: $condition) {
      id
      name
      userGroup {
        id
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
export const createFile = /* GraphQL */ `
  mutation CreateFile(
    $input: CreateFileInput!
    $condition: ModelFileConditionInput
  ) {
    createFile(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      name
      content
      owner
      sharedList {
        id
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
export const updateFile = /* GraphQL */ `
  mutation UpdateFile(
    $input: UpdateFileInput!
    $condition: ModelFileConditionInput
  ) {
    updateFile(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      name
      content
      owner
      sharedList {
        id
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
export const deleteFile = /* GraphQL */ `
  mutation DeleteFile(
    $input: DeleteFileInput!
    $condition: ModelFileConditionInput
  ) {
    deleteFile(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      name
      content
      owner
      sharedList {
        id
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
export const createFolder = /* GraphQL */ `
  mutation CreateFolder(
    $input: CreateFolderInput!
    $condition: ModelFolderConditionInput
  ) {
    createFolder(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      name
      owner
      sharedList {
        id
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
export const updateFolder = /* GraphQL */ `
  mutation UpdateFolder(
    $input: UpdateFolderInput!
    $condition: ModelFolderConditionInput
  ) {
    updateFolder(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      name
      owner
      sharedList {
        id
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
export const deleteFolder = /* GraphQL */ `
  mutation DeleteFolder(
    $input: DeleteFolderInput!
    $condition: ModelFolderConditionInput
  ) {
    deleteFolder(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      name
      owner
      sharedList {
        id
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
export const createRight = /* GraphQL */ `
  mutation CreateRight(
    $input: CreateRightInput!
    $condition: ModelRightConditionInput
  ) {
    createRight(input: $input, condition: $condition) {
      read
      edit
      documentId
      user
    }
  }
`;
export const updateRight = /* GraphQL */ `
  mutation UpdateRight(
    $input: UpdateRightInput!
    $condition: ModelRightConditionInput
  ) {
    updateRight(input: $input, condition: $condition) {
      read
      edit
      documentId
      user
    }
  }
`;
export const deleteRight = /* GraphQL */ `
  mutation DeleteRight(
    $input: DeleteRightInput!
    $condition: ModelRightConditionInput
  ) {
    deleteRight(input: $input, condition: $condition) {
      read
      edit
      documentId
      user
    }
  }
`;
export const createApp = /* GraphQL */ `
  mutation CreateApp(
    $input: CreateAppInput!
    $condition: ModelAppConditionInput
  ) {
    createApp(input: $input, condition: $condition) {
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
export const updateApp = /* GraphQL */ `
  mutation UpdateApp(
    $input: UpdateAppInput!
    $condition: ModelAppConditionInput
  ) {
    updateApp(input: $input, condition: $condition) {
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
export const deleteApp = /* GraphQL */ `
  mutation DeleteApp(
    $input: DeleteAppInput!
    $condition: ModelAppConditionInput
  ) {
    deleteApp(input: $input, condition: $condition) {
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
