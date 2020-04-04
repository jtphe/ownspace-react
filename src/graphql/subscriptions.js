/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      firstname
      lastname
      email
      password
      picture
      notification
      role
      rootFolder
      group
      limitedStorage
      storageSpaceUsed
      totalStorageSpace
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      firstname
      lastname
      email
      password
      picture
      notification
      role
      rootFolder
      group
      limitedStorage
      storageSpaceUsed
      totalStorageSpace
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      firstname
      lastname
      email
      password
      picture
      notification
      role
      rootFolder
      group
      limitedStorage
      storageSpaceUsed
      totalStorageSpace
    }
  }
`;
export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup {
    onCreateGroup {
      id
      name
      userGroup {
        id
        firstname
        lastname
        email
        password
        picture
        notification
        role
        rootFolder
        group
        limitedStorage
        storageSpaceUsed
        totalStorageSpace
      }
    }
  }
`;
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup {
    onUpdateGroup {
      id
      name
      userGroup {
        id
        firstname
        lastname
        email
        password
        picture
        notification
        role
        rootFolder
        group
        limitedStorage
        storageSpaceUsed
        totalStorageSpace
      }
    }
  }
`;
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup {
    onDeleteGroup {
      id
      name
      userGroup {
        id
        firstname
        lastname
        email
        password
        picture
        notification
        role
        rootFolder
        group
        limitedStorage
        storageSpaceUsed
        totalStorageSpace
      }
    }
  }
`;
export const onCreateFile = /* GraphQL */ `
  subscription OnCreateFile {
    onCreateFile {
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
        picture
        notification
        role
        rootFolder
        group
        limitedStorage
        storageSpaceUsed
        totalStorageSpace
      }
      password
      parent
      uuid
      size
      mimeType
      type
    }
  }
`;
export const onUpdateFile = /* GraphQL */ `
  subscription OnUpdateFile {
    onUpdateFile {
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
        picture
        notification
        role
        rootFolder
        group
        limitedStorage
        storageSpaceUsed
        totalStorageSpace
      }
      password
      parent
      uuid
      size
      mimeType
      type
    }
  }
`;
export const onDeleteFile = /* GraphQL */ `
  subscription OnDeleteFile {
    onDeleteFile {
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
        picture
        notification
        role
        rootFolder
        group
        limitedStorage
        storageSpaceUsed
        totalStorageSpace
      }
      password
      parent
      uuid
      size
      mimeType
      type
    }
  }
`;
export const onCreateFolder = /* GraphQL */ `
  subscription OnCreateFolder {
    onCreateFolder {
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
        picture
        notification
        role
        rootFolder
        group
        limitedStorage
        storageSpaceUsed
        totalStorageSpace
      }
      password
      parent
      nbFiles
      content {
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
          picture
          notification
          role
          rootFolder
          group
          limitedStorage
          storageSpaceUsed
          totalStorageSpace
        }
        password
        parent
        uuid
        size
        mimeType
        type
      }
    }
  }
`;
export const onUpdateFolder = /* GraphQL */ `
  subscription OnUpdateFolder {
    onUpdateFolder {
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
        picture
        notification
        role
        rootFolder
        group
        limitedStorage
        storageSpaceUsed
        totalStorageSpace
      }
      password
      parent
      nbFiles
      content {
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
          picture
          notification
          role
          rootFolder
          group
          limitedStorage
          storageSpaceUsed
          totalStorageSpace
        }
        password
        parent
        uuid
        size
        mimeType
        type
      }
    }
  }
`;
export const onDeleteFolder = /* GraphQL */ `
  subscription OnDeleteFolder {
    onDeleteFolder {
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
        picture
        notification
        role
        rootFolder
        group
        limitedStorage
        storageSpaceUsed
        totalStorageSpace
      }
      password
      parent
      nbFiles
      content {
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
          picture
          notification
          role
          rootFolder
          group
          limitedStorage
          storageSpaceUsed
          totalStorageSpace
        }
        password
        parent
        uuid
        size
        mimeType
        type
      }
    }
  }
`;
export const onCreateRight = /* GraphQL */ `
  subscription OnCreateRight {
    onCreateRight {
      read
      edit
      documentId
    }
  }
`;
export const onUpdateRight = /* GraphQL */ `
  subscription OnUpdateRight {
    onUpdateRight {
      read
      edit
      documentId
    }
  }
`;
export const onDeleteRight = /* GraphQL */ `
  subscription OnDeleteRight {
    onDeleteRight {
      read
      edit
      documentId
    }
  }
`;
export const onCreateApp = /* GraphQL */ `
  subscription OnCreateApp {
    onCreateApp {
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
export const onUpdateApp = /* GraphQL */ `
  subscription OnUpdateApp {
    onUpdateApp {
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
export const onDeleteApp = /* GraphQL */ `
  subscription OnDeleteApp {
    onDeleteApp {
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
