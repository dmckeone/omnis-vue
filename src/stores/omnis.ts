// Declare ctrl_omnis_vue_hooks on window as a generic interface to Omnis
declare global {
  interface Window {
    ctrl_omnis_vue_hooks: any
  }
}

import { inject, ref } from "vue"
import { defineStore } from "pinia"

import { PROVIDE_OMNIS_COMPONENT_ID } from "@/global"

export const useOmnis = defineStore("Omnis", () => {
  const data = ref({})

  /* OMNIS ON LOAD

   Omnis calls this method when the component is first loaded
  */
  function omnisOnLoad() {}

  /* OMNIS GET DATA

   Omnis has requested the data from this component.  It must be in an Omnis-row compatible
   format.

   DEV WARNING: All nested objects need to be formatted as JSON
  */
  function omnisGetData() {
    return JSON.stringify(data.value)
  }

  /* OMNIS SET DATA

   Omnis is sending data to this component via a $redraw().  This method accepts the new
   data, formats it appropriately, and then redraws the current visual state.

   DEV WARNING: Any nested objects will come in as JSON, e.g. JSON.parse
  */
  function omnisSetData(newData: string) {
    try {
      if (newData != null) {
        data.value = JSON.parse(newData)
      } else {
        data.value = {}
      }
    } catch (e) {
      console.log("Receive data error", e)
    }
  }

  // Initialize Generic Callbacks Map
  if (typeof window.ctrl_omnis_vue_hooks == "undefined") {
    window.ctrl_omnis_vue_hooks = new Map()
  }

  const hooks = {
    onLoad: omnisOnLoad,
    getData: omnisGetData,
    setData: omnisSetData
  }

  const control_id = inject(PROVIDE_OMNIS_COMPONENT_ID)
  window.ctrl_omnis_vue_hooks.set(control_id, hooks)

  function emit(omnisEvent: { event: string; payload: string }) {
    const hooks = window.ctrl_omnis_vue_hooks.get(control_id)
    if (typeof hooks.emitEvent !== "undefined") {
      hooks.emitEvent(omnisEvent)
    }
  }

  /* EMIT EVENT

  Example code for how to emit a Control Event with jOmnis.

  Control events only have a single row, so it's considered best practice to come up with
  a standard key, like "eventName" below, to categorize the events dispatched to Omnis.  All
  other keys can then be used as arguments/data for that event.

 */
  function emitEvent(name: string, evt: string) {
    const omnisEvent = { event: name, payload: evt }
    emit(omnisEvent)
  }

  return { data, emitEvent }
})
