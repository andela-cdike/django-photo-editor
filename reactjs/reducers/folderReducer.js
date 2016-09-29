export default function reducer(state={
    folders: [],
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
      return {
        ...state,
        fetching: false,
        fetched: true,
        folders: action.payload
      }
    }
    case 'ADD_FOLDER': {
      return {
        ...state,
        saving: true,
      }
    }
    case 'ADD_FOLDER_REJECTED': {
      return {...state, saving: false, error: action.payload}
    }
    case 'ADD_FOLDER_FULFILLED': {
      return {
        ...state,
        saving: false,
        saved: true,
        folders: [...state.folders, action.payload],
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
        console.log('payload: ', typeof(action.payload))
        // console.log('compare: ',  !== action.payload)
      return {
        ...state,
        folders: state.folders.filter(folder => folder.id !== action.payload),
      }
    }
  }
  return state
}
