export function updateEnhanceToolsValues(enhanceToolName=null, newValue=null) {
  if (enhanceToolName === null) {
    return {
      type: "INITIALIZE_ENHANCE_TOOLS_VALUES",
      payload: null
    }
  }

  switch (enhanceToolName) {
    case "contrast": {
      return {
        type: "UPDATE_CONTRAST_VALUE",
        payload: newValue
      }
    }
    case "brightness": {
      return {
        type: "UPDATE_BRIGHTNESS_VALUE",
        payload: newValue
      }
    }
    case "sharpness": {
      return {
        type: "UPDATE_SHARPNESS_VALUE",
        payload: newValue
      }
    }
    case "color": {
      return {
        type: "UPDATE_COLOR_VALUE",
        payload: newValue
      }
    }
    default: {
      return {
        type: "UPDATE_ENHANCE_TOOLS_REJECTED",
        payload: "ERROR: An invalid enhance tool name was supplied!!!"
      }
    }
  }
}
