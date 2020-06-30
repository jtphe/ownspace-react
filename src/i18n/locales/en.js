export default {
  splashScreen: {
    sloganPartOne: 'A place of ',
    sloganPartTwo: 'security'
  },
  loginPage: {
    welcome: 'Welcome !',
    ownspace: 'OwnSpace',
    email: 'E-mail',
    password: 'Password',
    newPassword: 'New password',
    login: 'Log In',
    forgottenPassword: 'Forgotten password',
    passwordInstructions:
      'An email with instructions for changing your password has been sent to you',
    titleForgottenPwd:
      'Enter the verification code that has been sent to you and your new password',
    placeholderCode: 'Verification code',
    needEmail: 'You must enter the email of the forgotten password',
    almostDone: "We're almost there !",
    wrongPassword: 'Wrong password',
    invalidPasswordEmail: 'Invalid email or incorrect password',
    invalidEmail: 'Invalid email',
    passwordUpdated: 'Password updated !',
    wrongVerificationCode: 'Wrong verification code'
  },
  totp: {
    titleGenerate: 'Enter this code in your authentication application',
    titleAuth:
      'Enter the authentication code of the two-factor authentication application on your device',
    placeholder: 'Authentication code',
    invalidToken: 'Invalid token',
    copied: 'Copied to clipboard !',
    copyToClipboard: 'Click on the code to copy it!',
    noEmpty: 'Field cannot be empty'
  },
  newPassword: {
    title: 'Please enter a new password',
    placeholder: 'New password',
    lengthError: 'The password must be at least 8 characters long'
  },
  menuPlus: {
    importFile: 'Import a file',
    createFile: 'Create a text file',
    createFolder: 'Create a folder',
    takePicture: 'Take a picture',
    imageGallery: 'Photo gallery'
  },
  createFile: {
    placeholderName: 'File name',
    placeholderContent: 'Type your text here...',
    tooShort:
      'The file name and its contents must contain at least 6 characters',
    noEmpty: 'Fields cannot be empty',
    titleTooLong: 'The file name must be less than or equal to 40 characters'
  },
  button: {
    validate: 'Validate',
    cancel: 'Cancel',
    next: 'Next',
    create: 'Create',
    rename: 'Rename',
    delete: 'Delete',
    add: 'Add',
    remove: 'Remove'
  },
  progressBar: {
    createFile: 'Creating the file'
  },
  userProfile: {
    lastname: 'Lastname',
    firstname: 'Firstname',
    email: 'E-mail',
    password: 'Password',
    signOut: 'Sign out',
    edit: 'Edit',
    help: 'Help',
    firstnamePlaceholder: 'Enter your firstname...',
    lastnamePlaceholder: 'Enter your lastname...',
    nothingToUdpate: 'Profile already up-to-date',
    profileUpdated: 'Profile updated !',
    oldPassword: 'Old password',
    newPassword: 'New password',
    confirmNewPassword: 'Confirm the new password',
    error1: 'Fields cannot be empty',
    error2: 'Passwords do not match',
    error3: 'New password requires at least 8 characters',
    error4: 'Old password incorrect',
    confirmSignOut: 'Confirm the sign out',
    cancel: 'Cancel',
    student: 'Student',
    teacher: 'Teacher',
    admin: 'Administrator',
    personalInfos: 'Personal information',
    securityPrivacy: 'Security and privacy',
    updatePassword: 'Update password',
    passwordInfo:
      'Please choose a strong password (at least 8 characters, upper case, lower case and special characters).',
    update: 'Update',
    cantEdit: "You cannot edit user's email"
  },
  document: {
    home: 'Home',
    loading: 'Loading',
    nbFile: {
      one: ' {{count}} file',
      other: ' {{count}} files',
      zero: ''
    },
    nbFolder: {
      one: '{{count}} folder',
      other: '{{count}} folders',
      zero: ''
    },
    noDocument: 'No document',
    createFolderTitle: 'Create a folder',
    createFolderPlaceholder: 'Enter a folder name',
    renameFileTitle: 'Rename the file',
    renameFilePlaceholder: 'Enter a file name',
    share: 'Share',
    protect: 'Protect with a password',
    unprotect: 'Remove the password',
    renameFolder: 'Rename the folder',
    renameFile: 'Rename the file',
    deleteFolder: 'Delete the folder',
    deleteFile: 'Delete the file',
    imported: 'File imported !',
    notSupported: 'Cannot import the file. Format not supported',
    cannotOpen: 'Cannot open file',
    downloadSpecificApp:
      'Please download an application that can open this type of file',
    tooShort: 'The file name must contain at least 2 characters',
    confirmDeleteFile: 'Are you sur you want to delete %{file} ?',
    confirmDeleteFolder:
      'Are you sure you want to delete the folder %{folder} and all its content ?',
    addFolderPassword: 'Add a password to the folder',
    renewFolderPassword: 'Add a new password to the folder',
    addFilePassword: 'Add a password to the file',
    renewFilePassword: 'Add a new password to the file',
    passwordPlaceholder: 'Enter a password...',
    newPasswordPlaceholder: 'Enter a new password...',
    enterFolderPassword: 'Enter the folder password',
    enterFilePassword: 'Enter the file password',
    removePassword: 'Remove the password from the %{folder} folder',
    confirmRemovePassword:
      'Are you sure you want to remove the password from the %{folder} folder ?',
    removeFilePassword: 'Remove the password from the %{file} file',
    confirmRemoveFilePassword:
      'Are you sure you want to remove the password of the %{file} file ?'
  },
  picture: {
    imported: 'Image imported'
  },
  folder: {
    error1: 'Password incorrect',
    passwordAdded: 'Password successfully added !',
    passwordRemoved: 'Password successfully removed !'
  },
  file: {
    deleted: 'File successfully deleted !'
  },
  shareModal: {
    share: 'Share',
    placeholder: 'Enter a user name...',
    userNotExist: "The user you searched doesn't exist",
    invitationTitle: {
      one: 'Invitation ({{count}})',
      other: 'Invitations ({{count}})',
      zero: ''
    },
    noUsersShared:
      'To share your document with users, enter their name in the search field above',
    read: 'Read',
    edit: 'Edit',
    titleGuest: {
      one: 'Shared user ({{count}})',
      other: 'Shared users ({{count}})',
      zero: ''
    },
    cantAddOneSelf: 'The document is already shared with you',
    noUserToShare: 'No users to share',
    cantAddOwner: 'You can not add the owner'
  }
};
