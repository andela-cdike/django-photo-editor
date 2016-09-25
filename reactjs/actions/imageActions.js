export function changeActiveImage(image_url) {
  return {
    type: "CHANGE_ACTIVE_IMAGE",
    payload: image_url
  }
}