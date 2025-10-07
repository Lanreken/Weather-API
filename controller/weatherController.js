const axios = require("axios");

exports.getWeather = async (req, res) => {
  try {
    const city = req.query.city;

    if (!city) {
      return res.status(400).json({
        statusCode: false,
        statusText: "Bad Request",
        message: "City name is required",
      });
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
    const response = await axios.get(apiUrl, { validateStatus: () => true });

    if (response.status === 401) {
      return res.status(401).json({
        statusCode: false,
        statusText: "Unauthorized",
        message: "Invalid API key. Please provide a valid API key.",
      });
    }
    const data = response.data;

    if (data.cod === "404") {
      return res.status(404).json({
        statusCode: false,
        statusText: "Not Found",
        message: "City not found. Please provide a valid city name.",
      });
    }

    console.log(data);

    const result = {
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].description,
      wind_speed: data.wind.speed,
    };

    return res.status(200).json({
      statusCode: true,
      statusText: "OK",
      message: "Weather data retrieved successfully",
      data: result,
    });

  } catch (error) {
    res.status(500).json({
      statusCode: false,
      statusText: "Internal Server Error",
      message: "Error retrieving weather data: " + error.message,
    });
  }
};
