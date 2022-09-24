import { createStore } from 'vuex'
import axios from 'axios'

const api = axios.create({ baseURL: 'https://www.cbr-xml-daily.ru' })

interface ICurrency {
  ID: string,
  NumCode: string,
  CharCode: string,
  Nominal: number,
  Name: string,
  Value: number,
  Previous: number,
  deltaClass?: string
}

const getDeltaClass = (previous: number, current: number): string => {
  switch (previous > current) {
    case true:
      return 'down'
    case false:
      switch (previous < current) {
        case true:
          return 'up'
        case false:
          return 'didnt-change'
      }
  }
}

export default createStore({
  state: {
    currencies: []
  },
  getters: {
    getCurrencies: (state: any): ICurrency[] => state.currencies
  },
  mutations: {
    setCurrencies (state: any, payload: ICurrency[]): void {
      state.currencies = payload
    }
  },
  actions: {
    async getCurrencies ({ commit }: any): Promise<void> {
      const res = await api.get('/daily_json.js')
      commit('setCurrencies', Object.keys(res.data.Valute).map((currency: string): ICurrency => {
        const tmpCurrency: ICurrency = { ...res.data.Valute[currency] }
        tmpCurrency.Value = Number(tmpCurrency.Value.toFixed(2))
        tmpCurrency.Previous = Number(tmpCurrency.Previous.toFixed(2))
        tmpCurrency.deltaClass = getDeltaClass(tmpCurrency.Previous, tmpCurrency.Value)
        return tmpCurrency
      }))
    }
  }
})
