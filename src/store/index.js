import { decorate, configure, observable, action, runInAction } from "mobx"

configure({ enforceActions: true })

// copy from stackoverflow
const formatNumber = number =>
  number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")

const handleResponse = response => {
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response.json()
}

class gameStore {
  url = "https://swapi.co/api/planets/"
  count = 0
  repeat = []
  ready = false
  loading = false
  current = {}

  async init() {
    try {
      const resp = await fetch(this.url).then(handleResponse)
      runInAction(() => {
        this.count = resp.count
        this.ready = true
      })
    } catch (err) {
      console.error(err)
    }
  }

  async next() {
    this.loading = true
    const number = this.getRandom()

    try {
      const resp = await fetch(`${this.url}${number}`).then(handleResponse)

      let films = resp.films
      if (films.length !== 0) {
        films = await Promise.all(films.map(this.getFilm))
      } else {
        films = ["none"]
      }

      const terrain = resp.terrain.split(", ").join(" / ")
      const climate = resp.climate.split(", ").join(" / ")
      const population = formatNumber(resp.population)

      runInAction(() => {
        this.current = {
          name: resp.name,
          films,
          terrain,
          climate,
          population
        }
        this.repeat.push(number)
        this.loading = false
      })
    } catch (err) {
      console.error(err)
    }
  }

  async getFilm(film) {
    return await fetch(film)
      .then(handleResponse)
      .then(({ title }) => title)
  }

  getRandom() {
    let random = Math.floor(Math.random() * this.count) + 1
    if (this.repeat.includes(random)) {
      return this.getRandom()
    }
    return random
  }
}

decorate(gameStore, {
  loading: observable,
  current: observable,
  ready: observable,
  init: action,
  next: action
})

export default new gameStore()
