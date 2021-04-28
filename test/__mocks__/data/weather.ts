export default {
  properties: {
    forecast: 'https://weather.mock',
    periods: [
      {
        shortForecast: 'Rain',
        startTime: '4/27/2021',
      },
      {
        shortForecast: 'Mostly Sunny',
        startTime: '4/28/2021',
      },
      { shortForecast: 'Sunny', startTime: '4/29/2021' },
    ],
  },
}
