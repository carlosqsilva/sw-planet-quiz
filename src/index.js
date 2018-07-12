import ReactDOM from "react-dom"
import { Provider } from "mobx-react"
import store from "./store"
import React from "react"
import App from "./app"

ReactDOM.render(
  <Provider game={store}>
    <App />
  </Provider>,
  document.getElementById("app")
)

window.addEventListener("load", () => {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    const sw = `${PUBLIC_URL}sw.js`

    navigator.serviceWorker
      .register(sw)
      .then(registration => {
        console.log("service worker registered")
      })
      .catch(error => console.error(error))
  }
})
