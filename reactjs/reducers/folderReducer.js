export default function reducer(state={
    folders: [],
    statistics: {
      numFolders: null,
      numImages: null
    },
    fetching: false,
    fetched: false,
    saving: false,
    saved: false,
    error: null,
  }, action) {

  switch (action.type) {
    case 'FETCH_FOLDERS': {
      return {...state, fetching: true}
    }
    case 'FETCH_FOLDERS_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }
    case 'FETCH_FOLDERS_FULFILLED': {
      const numFolders = action.payload.length;
      let numImages = 0;
      for (let i = 0; i < numFolders; i++) {
        numImages += action.payload[i].images.length;
      }

      return {
        ...state,
        fetching: false,
        fetched: true,
        statistics: {numFolders: numFolders, numImages: numImages},
        folders: action.payload
      }
    }
    case 'ADD_FOLDER': {
      return {...state, saving: true}
    }
    case 'ADD_FOLDER_REJECTED': {
      return {...state, saving: false, error: action.payload}
    }
    case 'ADD_FOLDER_FULFILLED': {
      const newStatistics = {...state.statistics};
      newStatistics['numFolders'] = state.statistics.numFolders + 1;

      return {
        ...state,
        saving: false,
        saved: true,
        statistics: newStatistics,
        folders: [...state.folders, action.payload],
      }
    }
    case 'ADD_NEW_IMAGE_TO_FOLDERS': {
      let newFolders = [...state.folders];
      const folderToUpdate = newFolders.findIndex(
        folder => folder.id === action.payload.folder
      );
      const updatedFolderImages = [...newFolders[folderToUpdate].images, action.payload];
      newFolders[folderToUpdate].images = updatedFolderImages;

      const newStatistics = {...state.statistics};
      newStatistics['numImages'] = state.statistics.numImages + 1;

      return {
        ...state,
        statistics: newStatistics,
        folders: newFolders
      }
    }
    case 'RENAME_FOLDER': {
      return {...state, saving: true}
    }
    case 'RENAME_FOLDER_REJECTED': {
      return {...state, saving: false, err: action.payload}
    }
    case 'RENAME_FOLDER_FULFILLED': {
      const { id, name } = action.payload;
      const newFolders = [...state.folders];
      const folderToUpdate = newFolders.findIndex(
        folder => folder.id === id
      );
      newFolders[folderToUpdate] = action.payload
      return {
        ...state,
        saving: false,
        saved:true,
        folders: newFolders
      }
    }
    case 'DELETE_FOLDER': {
      return {...state, saving: false}
    }
    case 'DELETE_FOLDER_REJECTED': {
      return {...state, saving: false, err: action.payload}
    }
    case 'DELETE_FOLDER_FULFILLED': {
      const newStatistics = {...state.statistics};
      newStatistics['numFolders'] = state.statistics.numFolders - 1;

      return {
        ...state,
        saving: false,
        saved: true,
        statistics: newStatistics,
        folders: state.folders.filter(folder => folder.id !== action.payload),
      }
    }
    case 'RENAME_IMAGE': {
      return {...state, saving: true}
    }
    case 'RENAME_IMAGE_REJECTED': {
      return {...state, saving: false, err: action.payload}
    }
    case 'RENAME_IMAGE_FULFILLED': {
      const { imageId, folderId, name } = action.payload;
      const newFolders = [...state.folders];
      const folderToUpdate = newFolders.findIndex(
        folder => folder.id === folderId
      );
      const imageToUpdate = newFolders[folderToUpdate].images.findIndex(
        image => image.id === imageId
      );
      newFolders[folderToUpdate].images[imageToUpdate].name = name

      return {
        ...state,
        saving: false,
        saved: true,
        folders: newFolders
      }
    }
    case 'SAVE_MODIFIED_IMAGE_TO_FOLDER': {
      const { folderId, imageId, largeImageUrl, thumbnailImageUrl } = action.payload;
      let newFolders = [...state.folders];
      const folderToUpdate = newFolders.findIndex(
        folder => folder.id === folderId
      );
      const imageToUpdate = newFolders[folderToUpdate].images.findIndex(
        image => image.id === imageId
      );
      newFolders[folderToUpdate].images[imageToUpdate].large_image_url = largeImageUrl;
      newFolders[folderToUpdate].images[imageToUpdate].thumbnail_image_url = thumbnailImageUrl;

      return {
        ...state,
        folders: newFolders
      }
    }
    case 'DELETE_IMAGE': {
      return {...state, saving: true}
    }
    case 'DELETE_IMAGE_REJECTED': {
      return {...state, saving: false, err: action.payload}
    }
    case 'DELETE_IMAGE_FULFILLED': {
      const { imageId, folderId } = action.payload;
      const newFolders = [...state.folders];
      const folderToUpdate = newFolders.findIndex(
        folder => folder.id === folderId
      );
      const updatedFolderImages = newFolders[folderToUpdate].images.filter(
        image => image.id !== imageId
      );
      newFolders[folderToUpdate].images = updatedFolderImages;
      
      const newStatistics = {...state.statistics};
      newStatistics['numImages'] = state.statistics.numImages - 1
      
      return {
        ...state,
        saving: false,
        saved: true,
        statistics: newStatistics,
        folders: newFolders
      }
    }
  }
  return state
}
