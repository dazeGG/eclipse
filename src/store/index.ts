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
    currenciesFull: [],
    currencies: [],
    hasCurrencies: false,
    filteredCurrencies: [],
    computedValue: 0
  },
  getters: {
    getCurrencies: (state: any): ICurrency[] => state.currencies,
    hasCurrencies: (state: any): boolean => state.hasCurrencies,
    getFilteredCurrencies: (state: any): ICurrency[] => state.filteredCurrencies,
    getComputedValue: (state: any): ICurrency[] => state.computedValue
  },
  mutations: {
    setCurrenciesFull (state: any, payload: ICurrency[]): void {
      state.currenciesFull = payload
    },
    setCurrencies (state: any, payload: ICurrency[]): void {
      state.currencies = payload
    },
    setHasCurrencies (state: any, payload: boolean): void {
      state.hasCurrencies = payload
    },
    setFilteredCurrencies (state: any, payload: ICurrency[]): void {
      state.filteredCurrencies = payload
    },
    setComputedValue (state: any, payload: ICurrency[]): void {
      state.computedValue = payload
    }
  },
  actions: {
    async getCurrencies ({
      state,
      commit
    }: any): Promise<void> {
      const res = await api.get('/daily_json.js')
      commit('setCurrenciesFull', res.data.Valute)
      commit('setCurrencies', Object.keys(res.data.Valute).map((currency: string): ICurrency => {
        const tmpCurrency: ICurrency = { ...res.data.Valute[currency] }
        tmpCurrency.Value = Number(tmpCurrency.Value.toFixed(2))
        tmpCurrency.Previous = Number(tmpCurrency.Previous.toFixed(2))
        tmpCurrency.deltaClass = getDeltaClass(tmpCurrency.Previous, tmpCurrency.Value)
        return tmpCurrency
      }))
      commit('setHasCurrencies', true)
      commit('setFilteredCurrencies', state.currencies)
    },
    async filterCurrencies ({
      state,
      commit
    }: any, filterValue: string): Promise<void> {
      commit('setFilteredCurrencies', state.currencies.filter((currency: ICurrency): boolean => {
        filterValue = filterValue.toLowerCase()
        return currency.Name.toLowerCase().includes(filterValue) ||
          currency.CharCode.toLowerCase().includes(filterValue) ||
          currency.NumCode.toLowerCase().includes(filterValue)
      }))
    },
    async convert ({
      state,
      commit
    }: any, {
      baseValue,
      baseCurrency,
      computedCurrency
    }: { baseValue: number, baseCurrency: string, computedCurrency: string }): Promise<void> {
      const base = state.currenciesFull[baseCurrency]
      const computed = state.currenciesFull[computedCurrency]
      const baseInRUB = base.Value * baseValue / base.Nominal
      const oneRUBInComputed = computed.Nominal / computed.Value
      commit('setComputedValue', Number((baseInRUB * oneRUBInComputed).toFixed(5)))
    }
  }
})
