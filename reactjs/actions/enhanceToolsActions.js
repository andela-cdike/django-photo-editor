export function updateEnhanceToolsValues(enhanceToolName=null, newValue=null) {
  if (enhanceToolName === null) {
    return {
      type: "INITIALIZE_ENHANCE_TOOLS_VALUES",
      payload: null
    }
  }

  switch (enhanceToolName) {
    case "Contrast": {
      return {
        type: "UPDATE_CONTRAST_VALUE",
        payload: newValue
      }
    }
    case "Brightness": {
      return {
        type: "UPDATE_BRIGHTNESS_VALUE",
        payload: newValue
      }
    }
    case "Sharpness": {
      return {
        type: "UPDATE_SHARPNESS_VALUE",
        payload: newValue
      }
    }
    case "Color": {
      return {
        type: "UPDATE_COLOR_VALUE",
        payload: newValue
      }
    }
    return {
      type: "UPDATE_ENHANCE_TOOLS_REJECTED",
      payload: "ERROR: An invalid enhance tool name was supplied!!!"
    }
  }
}