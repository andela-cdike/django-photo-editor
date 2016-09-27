export default function reducer(state={
    activeImage: {
      id: null,
      url: null
    },
    uploadImageErrorStatus: {
      msg: null,
      status: null,
    },
    error: null,
  }, action) {

  switch (action.type) {
    case 'CHANGE_ACTIVE_IMAGE': {
      return {...state, activeImage: action.payload};
    }
    case 'APPLY_FILTER_N_EFFECT_TOOLS_REJECTED': {
      return {...state, error: action.payload};
    }
    case 'APPLY_FILTER_N_EFFECT_TOOLS_FULFILLED': {
      const newActiveImage = {...state.activeImage};
      newActiveImage['url'] = action.payload;

      return {...state, activeImage: newActiveImage};
    }
    case 'APPLY_ENHANCE_TOOL_REJECTED': {
      return {...state, error: action.payload};
    }
    case 'APPLY_ENHANCE_TOOL_FULFILLED': {
      const newActiveImage = {...state.activeImage};
      newActiveImage['url'] = action.payload;

      return {...state, activeImage: newActiveImage};
    }
    case 'RESIZE_IMAGE_REJECTED': {
      return {...state, error: action.payload};
    }
    case 'RESIZE_IMAGE_FULFILLED': {
      const newActiveImage = {...state.activeImage};
      newActiveImage['url'] = action.payload;

      return {...state, activeImage: newActiveImage};
    }
    case 'RESET_UPLOAD_ERRORS_STATUS': {
      return {...state, uploadImageErrorStatus: action.payload}
    }
    case 'UPLOAD_IMAGE_REJECTED': {
      const msg = action.payload.data.msg;
      const newUploadImageErrorStatus = {
        msg: msg,
        status: 'error' 
      };
      console.log(newUploadImageErrorStatus)
      return {
        ...state,
        uploadImageErrorStatus: newUploadImageErrorStatus
      };
    }
    case 'UPLOAD_IMAGE_FULFILLED': {
      const newActiveImage = {...state.activeImage};
      newActiveImage['id'] = action.payload.id;
      newActiveImage['url'] = action.payload.url;
      const newUploadImageErrorStatus = {
        msg: null,
        status: 'success'
      }

      return {
        ...state,
        activeImage: newActiveImage,
        uploadImageErrorStatus: newUploadImageErrorStatus
      }
    }
  }
  return state
}  
