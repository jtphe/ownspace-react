import { createSelector } from 'reselect';

export const getToken = state => state.user.token;

export const getUser = state => state.user.user;

export const getPictureName = state => state.user.user.pictureName;

export const getPictureIsUploading = state => state.user.pictureIsUploading;

export const getUserStorageSpaceUsed = createSelector(getUser, user => {
  if (user.storageSpaceUsed === null) {
    return 0;
  } else {
    return user.storageSpaceUsed;
  }
});

export const getUserTotalStorageSpace = state =>
  state.user.user.totalStorageSpace;

export const getIsLimitedStorage = state => state.user.user.limitedStorage;
