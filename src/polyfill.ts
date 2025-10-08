declare global {
  interface Window {
    // Omnis Studio globals
    OMNIS_STUDIO_VERSION: any
    jOmnis: any
  }
}

// Polyfill for Omnis Studio 10 that adds the customDragHandling and customDropHandling
// properties to the jOmnis object.
export function customDragPolyfill() {
  // Only apply polyfill to Studio 10
  if (window.OMNIS_STUDIO_VERSION.substr(0, 2) !== "10") {
    return
  }

  // Only apply polyfill once
  if (!!window.jOmnis.hasPre11DragPolyfill && window.jOmnis.hasPre11DragPolyfill === true) {
    return
  }
  window.jOmnis.hasPre11DragPolyfill = true

  const origDragStart = window.jOmnis.dragStart
  window.jOmnis.dragStart = function (event: any, ...args: any[]) {
    const ctrl = this.getOmnisCtrl(event.target)
    if (!ctrl || ctrl.customDragHandling) return
    origDragStart.apply(this, event, ...args) // Call original function
  }

  const origDragOver = window.jOmnis.dragOver
  window.jOmnis.dragOver = function (event: any, ...args: any[]) {
    const ctrl = this.getOmnisCtrl(event.target)
    if (!ctrl || ctrl.customDropHandling || ctrl.form.customDropHandling) return
    origDragOver.apply(this, event, ...args) // Call original function
  }
}
