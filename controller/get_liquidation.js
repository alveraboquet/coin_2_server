import fetch from "node-fetch"
import { streamNormalized, normalizeLiquidations, combine } from "tardis-dev";

let arr= []
// let's monitor BTC perpetuals swaps only
const monitoredExchanges = [
    { id: 'ftx', symbols: ['BTC-PERP', 'ETH-PERP'] },
    { id: 'bitmex', symbols: ['XBTUSD', 'ETHTUSD'] },
    { id: 'deribit', symbols: ['BTC-PERPETUAL', 'ETH-PERPETUAL'] },
    { id: 'binance-futures', symbols: ['BTCUSDT', 'ETHUSDT'] },
    { id: 'binance-delivery', symbols: ['BTCUSD_PERP', 'ETHUSD_PERP'] },
    { id: 'bitfinex-derivatives', symbols: ['BTCF0:USTF0', 'ETHF0:USTF0'] },
    { id: 'cryptofacilities', symbols: ['PI_XBTUSD', 'PI_ETHUSD'] },
    { id: 'huobi-dm-swap', symbols: ['BTC-USD', 'ETH-USD'] }
  ]
  
  async function monitorLiquidations() {
    const monitoredExchangesLiquidationsStreams = monitoredExchanges.map((exchange) => {
      return streamNormalized(
        {
          exchange: exchange.id,
          symbols: exchange.symbols,
          timeoutIntervalMS: 30 * 60 * 1000
        },
        normalizeLiquidations
      )
    })
  
    const combinedLiquidationStream = combine(...monitoredExchangesLiquidationsStreams)
  
    console.log('Liquidations monitor started...')
  
    for await (const liquidation of combinedLiquidationStream) {
      console.log(formatLiquidation(liquidation))
    }
  }
  
  const meta = {
    ftx: {
      name: 'FTX',
      contractMultiplier: 1,
      inverse: false
    },
    bitmex: {
      name: 'BitMEX',
      contractMultiplier: 1,
      inverse: true
    },
    deribit: {
      name: 'Deribit',
      contractMultiplier: 1,
      inverse: true
    },
    'binance-futures': {
      name: 'Binance USDT Futures',
      contractMultiplier: 1,
      inverse: false
    },
    'binance-delivery': {
      name: 'Binance COIN Futures',
      contractMultiplier: 1,
      inverse: true
    },
    'bitfinex-derivatives': {
      name: 'Bitfinex Derivatives',
      contractMultiplier: 1,
      inverse: false
    },
    cryptofacilities: {
      name: 'Kraken Futures',
      contractMultiplier: 1,
      inverse: true
    },
    'huobi-dm-swap': {
      name: 'Huobi Swap',
      contractMultiplier: 100,
      inverse: true
    }
  }
  
  const usdCurrencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  
  function formatLiquidation(liquidation) {
    const { name, contractMultiplier, inverse } = meta[liquidation.exchange]
    const position = liquidation.side === 'sell' ? 'long' : 'short'
    const price = usdCurrencyFormatter.format(liquidation.price)
    let normalizedAmount = liquidation.amount * contractMultiplier
    if (inverse === false) {
      normalizedAmount = normalizedAmount * liquidation.price
    }
    const liquidatedAmunt = usdCurrencyFormatter.format(normalizedAmount)
    const timestamp = liquidation.timestamp.toISOString()
    const direction = liquidation.side === 'sell' ? '📉' : '📈'
    console.log(
      `${direction} ${name} liquidated ${position} ${liquidation.symbol} position` +
      `at ${price}: ${liquidation.side} ${liquidatedAmunt}, timestmap: ${timestamp}`
    )
    return arr.push(
      `${direction} ${name} liquidated ${position} ${liquidation.symbol} position` +
        ` at ${price}: ${liquidation.side} ${liquidatedAmunt}, timestmap: ${timestamp}`
    );
  }
  
monitorLiquidations()
const get_liquidation= async (req, res)=> {
    return res.json(arr)
}

export default get_liquidation