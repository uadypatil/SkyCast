# SkyCast — Weather Forecasting Dashboard

SkyCast is a premium, responsive weather dashboard built with HTML5, CSS3, and JavaScript. It provides a clean SaaS-style interface for viewing current conditions, hourly and weekly forecasts, air-quality information, saved locations, weather highlights, and an interactive map.

> **Demo data notice:** The dashboard initially uses illustrative weather and air-quality values. City search can retrieve weather data from Open-Meteo when the service is reachable. Air-quality and some sidebar readings remain sample values and should not be used for health or safety decisions.

## Features

- **Responsive dashboard:** Three-column desktop layout that adapts to tablets and mobile screens.
- **Collapsible navigation:** Mobile-friendly sidebar with overlay.
- **Four dashboard views:** Overview, Hourly Forecast, 7-Day Forecast, and Air Quality.
- **Current weather highlights:** Temperature, high/low, feels-like temperature, humidity, wind, visibility, pressure, precipitation probability, UV index, and sunrise.
- **Charts:** Interactive temperature trends and weekly high/low comparisons with Chart.js.
- **Interactive map:** Leaflet map with OpenStreetMap tiles, a location marker, popup, zoom controls, and recenter action.
- **City search:** Includes sample cities and live location lookup using Open-Meteo geocoding and forecast endpoints.
- **Saved locations:** Quick selection of sample cities.
- **Weather alerts and air-quality widgets:** Dashboard cards for alerts, AQI, sunrise/sunset, and upcoming hourly conditions.
- **Accessible interactions:** Semantic HTML, accessible labels, keyboard-operable tabs, visible focus states, and reduced-motion support.
- **Single-file application:** HTML, CSS, and JavaScript are included in `index.html`.

## Built With

- HTML5
- CSS3
- JavaScript (ES6+)
- [Bootstrap 5](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Chart.js](https://www.chartjs.org/)
- [Leaflet](https://leafletjs.com/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [Open-Meteo](https://open-meteo.com/)
- [Google Fonts — Inter](https://fonts.google.com/specimen/Inter)

Libraries and fonts are loaded from CDNs, so an internet connection is required for the full experience.

## Getting Started

### Requirements

- A modern browser (Chrome, Edge, Firefox, or Safari).
- Internet access for CDN libraries, map tiles, and live location/weather lookup.

### Run Locally

1. Clone this repository:

   ```bash
   git clone https://github.com/<your-username>/<your-repository>.git
   ```

2. Open the project folder.
3. Open `index.html` in your browser.

For a more production-like local preview, serve the folder with a static HTTP server. For example, if Python is installed:

```bash
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## Using the Dashboard

1. Open the dashboard to see the default demo weather for Mumbai.
2. Use the search field to look up a city.
3. Select **Overview**, **Hourly Forecast**, **7-Day Forecast**, or **Air Quality** to switch dashboard views.
4. Select a city in the saved-locations panel to change the displayed weather.
5. Use the map's zoom controls or **Recenter map** to explore the selected location.
6. On smaller screens, use the menu button to open or close navigation.

The sample saved-city cards and some dashboard widgets use demo values. Searching for another city may retrieve live current and daily weather from Open-Meteo, depending on network availability.

## Weather Data and API Configuration

### Open-Meteo

City search uses the Open-Meteo geocoding endpoint, then requests forecast data from the Open-Meteo forecast API. These endpoints can be used without embedding an API key in the front end.

- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Forecast: `https://api.open-meteo.com/v1/forecast`
- Documentation: [Open-Meteo API Docs](https://open-meteo.com/en/docs)

The app requests current conditions, hourly information, and daily high/low temperatures, UV index, sunrise, and sunset. If the forecast request fails, the dashboard falls back to sample values.

### Using OpenWeatherMap Instead

If you adapt this project to use OpenWeatherMap or another provider that requires a private API key:

- Keep the key on a backend server or in a secure server-side environment variable.
- Have the front end call your backend endpoint.
- Do **not** commit API keys or place private credentials directly in `index.html`.

## Project Structure

```text
.
└── index.html    # Complete application: markup, styles, and JavaScript
```

## Browser and Network Notes

- Bootstrap, Bootstrap Icons, Chart.js, Leaflet, and the Inter font are loaded from external CDNs.
- The interactive map uses OpenStreetMap tiles and requires network access.
- Live geocoding and weather retrieval require access to Open-Meteo endpoints.
- If a CDN or API is unavailable, some features may not load; demo content is provided for the dashboard's initial state.

## Accessibility and Responsiveness

The interface includes semantic page sections, accessible names for controls, keyboard navigation for dashboard tabs, visible focus indicators, responsive layouts down to narrow mobile widths, and support for the `prefers-reduced-motion` setting.

## Limitations

- The initial dashboard values are illustrative and are not a live weather feed.
- Some air-quality values, saved-city conditions, and alerts are demonstration content.
- This project is a front-end dashboard demo; it does not provide user authentication or persist personal settings.
- Production use should include appropriate error handling, API monitoring, attribution, and validation of the data shown to users.

## License

No license has been specified yet. Add a `LICENSE` file before distributing or reusing this project if you want to grant explicit permissions to others.
