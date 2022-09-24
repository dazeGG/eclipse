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
  Previous: number
}

export default createStore({
  state: {
    currencies: []
  },
  getters: {
    getCurrencies: state => state.currencies
  },
  mutations: {
    setCurrencies (state: any, payload: ICurrency[]) {
      state.currencies = payload
    }
  },
  actions: {
    async getCurrencies ({ commit }: any) {
      const res = await api.get('/daily_json.js')
      commit('setCurrencies', Object.keys(res.data.Valute).map((currency: string): ICurrency => {
        res.data.Valute[currency].Value = res.data.Valute[currency].Value.toFixed(2)
        res.data.Valute[currency].Previous = res.data.Valute[currency].Previous.toFixed(2)
        return res.data.Valute[currency]
      }))
    }
  }
})
