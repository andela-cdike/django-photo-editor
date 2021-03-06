export default function reducer(state = {
  activeImage: {
    id: null,
    url: null,
    name: null,
    folderId: null,
  },
  uploadImageErrorStatus: {
    msg: null,
    status: null,
  },
  processingInProgress: false,
  error: null,
  showSpinner: false,
}, action) {
  switch (action.type) {
    case 'CHANGE_ACTIVE_IMAGE': {
      return { ...state, activeImage: action.payload, showSpinner: false };
    }
    case 'SHOW_SPINNER_ANIMATION': {
      return { ...state, showSpinner: action.payload };
    }
    case 'APPLY_FILTER_N_EFFECT_TOOLS_REJECTED': {
      return { ...state, showSpinner: false, error: action.payload };
    }
    case 'APPLY_FILTER_N_EFFECT_TOOLS_FULFILLED': {
      const newActiveImage = { ...state.activeImage };
      newActiveImage.url = action.payload;

      return {
        ...state,
        activeImage: newActiveImage,
        processingInProgress: true,
        showSpinner: false,
      };
    }
    case 'APPLY_ENHANCE_TOOL_REJECTED': {
      return { ...state, showSpinner: false, error: action.payload };
    }
    case 'APPLY_ENHANCE_TOOL_FULFILLED': {
      const newActiveImage = { ...state.activeImage };
      newActiveImage.url = action.payload;

      return {
        ...state,
        activeImage: newActiveImage,
        processingInProgress: true,
        showSpinner: false,
      };
    }
    case 'RESIZE_IMAGE_REJECTED': {
      return { ...state, showSpinner: false, error: action.payload };
    }
    case 'RESIZE_IMAGE_FULFILLED': {
      const newActiveImage = { ...state.activeImage };
      newActiveImage.url = action.payload;

      return {
        ...state,
        activeImage: newActiveImage,
        processingInProgress: true,
        showSpinner: false,
      };
    }
    case 'RESET_UPLOAD_ERROR_STATUS': {
      return { ...state, uploadImageErrorStatus: action.payload };
    }
    case 'UPLOAD_IMAGE_REJECTED': {
      const msg = action.payload.data.msg;
      const newUploadImageErrorStatus = {
        msg,
        status: 'error',
      };

      return {
        ...state,
        uploadImageErrorStatus: newUploadImageErrorStatus,
        showSpinner: false,
      };
    }
    case 'UPLOAD_IMAGE_FULFILLED': {
      const newActiveImage = { ...state.activeImage };
      newActiveImage.id = action.payload.id;
      newActiveImage.url = action.payload.large_image_url;
      newActiveImage.name = action.payload.name;
      newActiveImage.folderId = action.payload.folder;
      const newUploadImageErrorStatus = {
        msg: null,
        status: 'success',
      };

      return {
        ...state,
        activeImage: newActiveImage,
        uploadImageErrorStatus: newUploadImageErrorStatus,
        showSpinner: false,
      };
    }
    case 'UNDO_IMAGE_PROCESSING_REJECTED': {
      return { ...state, showSpinner: false, error: action.payload };
    }
    case 'UNDO_IMAGE_PROCESSING_FULFILLED': {
      const newActiveImage = { ...state.activeImage };
      newActiveImage.url = action.payload;

      return {
        ...state,
        activeImage: newActiveImage,
        processingInProgress: false,
        showSpinner: false,
      };
    }
    case 'SAVE_IMAGE_PROCESSING_REJECTED': {
      return { ...state, showSpinner: false, error: action.payload };
    }
    case 'SAVE_IMAGE_PROCESSING_FULFILLED': {
      const newActiveImage = { ...state.activeImage };
      newActiveImage.url = action.payload;

      return {
        ...state,
        activeImage: newActiveImage,
        processingInProgress: false,
        showSpinner: false,
      };
    }

    // no default
  }
  return state;
}
