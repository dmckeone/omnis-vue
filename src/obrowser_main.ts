// Declare jOmnis and ctrl_base instance on Window
declare global {
  interface Window {
    jOmnis: any
    ctrl_omnis_vue_hooks: any
  }
}

import { mountApp } from "./mount"

const OBROWSER_ID = Symbol("default")

const elem = document.getElementById("omnis-vue")
mountApp(OBROWSER_ID, elem)

// Fetch the control hooks for data to Omnis
const hooks = window.ctrl_omnis_vue_hooks.get(OBROWSER_ID)

// Init Omnis hook via jOmnis for oBrowser HTML Controls
const jOmnis = typeof window.jOmnis !== "undefined" ? window.jOmnis : {}

// Initialize Callbacks
jOmnis.callbackObject = {
  omnisOnLoad: hooks.onLoad,
  omnisGetData: hooks.getData,
  omnisSetData: hooks.setData
}

// Create event emit function
hooks.emitEvent = function (omnisEvent: { event: string; payload: string }) {
  if (typeof window.jOmnis !== "undefined") {
    jOmnis.sendControlEvent(omnisEvent)
  }
}

// Set new hooks (now containing the emit function)
window.ctrl_omnis_vue_hooks.set(OBROWSER_ID, hooks)
