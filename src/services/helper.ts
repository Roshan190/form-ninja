/**
 * Checks if an element is visible in the DOM.
 * @param {HTMLElement} element - The DOM element to check visibility for.
 * @returns {boolean} - Returns true if the element is visible, false otherwise.
 */
export function isVisible(element: HTMLElement) {
  if (!element || !(element instanceof HTMLElement)) {
    return false; // Invalid element or not in DOM
  }

  const style = window.getComputedStyle(element);

  return (
    style.display !== "none" && // Element is not hidden via `display: none`
    style.visibility !== "hidden" && // Element is not hidden via `visibility: hidden`
    style.opacity !== "0" && // Element is not fully transparent
    element.offsetParent !== null // Element is part of the document layout (not `position: fixed` or `absolute` and outside the viewport)
  );
}
