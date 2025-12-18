# import requests
# from config import Config

# # CITY_COORDS = {
# #     "Ameerpet": (17.4375, 78.4483),
# #     "Gachibowli": (17.4401, 78.3489),
# #     "Kukatpally": (17.4948, 78.3996),
# #     "Begumpet": (17.4446, 78.4691),
# #     "Secunderabad": (17.4399, 78.4983),
# # }

# CITY_COORDS = {
#     "Visakhapatnam": (17.6868, 83.2185),
#     "Vijayawada": (16.5062, 80.6480),
#     "Guntur": (16.3067, 80.4365),
#     "Nellore": (14.4426, 79.9865),
#     "Kurnool": (15.8281, 78.0373),
#     "Rajahmundry": (17.0005, 81.8040),
#     "Kakinada": (16.9891, 82.2475),
#     "Tirupati": (13.6288, 79.4192),
#     "Chittoor": (13.2172, 79.1003),
#     "Anantapur": (14.6819, 77.6006),
#     "Kadapa": (14.4673, 78.8242),
#     "Eluru": (16.7107, 81.0952),
#     "Machilipatnam": (16.1875, 81.1389),
#     "Ongole": (15.5057, 80.0499),
#     "Vizianagaram": (18.1067, 83.3956),
#     "Srikakulam": (18.2969, 83.8977),
#     "Tenali": (16.2433, 80.6400),
#     "Nandyal": (15.4770, 78.4836),
#     "Proddatur": (14.7502, 78.5481),
#     "Bhimavaram": (16.5449, 81.5212),
# }


# def fetch_real_aqi(location):
#     lat, lon = CITY_COORDS.get(location, CITY_COORDS["Visakhapatnam"])

#     url = "https://api.openweathermap.org/data/2.5/air_pollution"
#     params = {
#         "lat": lat,
#         "lon": lon,
#         "appid": Config.OPENWEATHER_API_KEY
#     }

#     res = requests.get(url, params=params)
#     data = res.json()
#     print("OPENWEATHER RESPONSE:", data)
#     comp = data["list"][0]["components"]
#     aqi_index = data["list"][0]["main"]["aqi"]

#     # Convert AQI scale (1–5) → 0–300 approx
#     aqi_map = {1: 30, 2: 80, 3: 130, 4: 180, 5: 250}

#     return {
#         "location": location,
#         "aqi": aqi_map.get(aqi_index, 80),
#         "pm25": comp["pm2_5"],
#         "pm10": comp["pm10"],
#         "co": comp["co"],
#         "no2": comp["no2"],
#         "so2": comp["so2"],
#         "o3": comp["o3"]
#     }

# import requests
# from config import Config
# from utils.aqi_utils import calculate_aqi_from_pm25

# CITY_COORDS = {
#     "Visakhapatnam": (17.6868, 83.2185),
#     "Vijayawada": (16.5062, 80.6480),
#     "Guntur": (16.3067, 80.4365),
#     "Nellore": (14.4426, 79.9865),
#     "Kurnool": (15.8281, 78.0373),
#     "Rajahmundry": (17.0005, 81.8040),
#     "Kakinada": (16.9891, 82.2475),
#     "Tirupati": (13.6288, 79.4192),
#     "Chittoor": (13.2172, 79.1003),
#     "Anantapur": (14.6819, 77.6006),
#     "Kadapa": (14.4673, 78.8242),
#     "Eluru": (16.7107, 81.0952),
#     "Machilipatnam": (16.1875, 81.1389),
#     "Ongole": (15.5057, 80.0499),
#     "Vizianagaram": (18.1067, 83.3956),
#     "Srikakulam": (18.2969, 83.8977),
#     "Tenali": (16.2433, 80.6400),
#     "Nandyal": (15.4770, 78.4836),
#     "Proddatur": (14.7502, 78.5481),
#     "Bhimavaram": (16.5449, 81.5212),
# }

# DEFAULT_CITY = "Visakhapatnam"

# def fetch_real_aqi(location):
#     # ✅ sanitize input
#     if not location:
#         location = DEFAULT_CITY

#     location = location.strip()

#     # ✅ safe fallback
#     lat, lon = CITY_COORDS.get(location, CITY_COORDS[DEFAULT_CITY])

#     print(f"Fetching AQI for: {location} ({lat}, {lon})")

#     url = "https://api.openweathermap.org/data/2.5/air_pollution"
#     params = {
#         "lat": lat,
#         "lon": lon,
#         "appid": Config.OPENWEATHER_API_KEY
#     }

#     response = requests.get(url, params=params, timeout=10)
#     data = response.json()

#     print("OPENWEATHER RESPONSE:", data)

#     if "list" not in data or not data["list"]:
#         raise Exception("Invalid AQI response from OpenWeather")

#     # components = data["list"][0]["components"]
#     # aqi_index = data["list"][0]["main"]["aqi"]

#     # aqi_map = {1: 30, 2: 80, 3: 130, 4: 180, 5: 250}
#     components = data["list"][0]["components"]

#     pm25 = components.get("pm2_5", 0)

#     aqi = calculate_aqi_from_pm25(pm25)

#     return {
#         "location": location,
#         "aqi": aqi,
#         "pm25": components.get("pm2_5", 0),
#         "pm10": components.get("pm10", 0),
#         "co": components.get("co", 0),
#         "no2": components.get("no2", 0),
#         "so2": components.get("so2", 0),
#         "o3": components.get("o3", 0)
#     }


import requests
from config import Config
from utils.aqi_utils import calculate_aqi_from_pm25

GEOCODE_URL = "https://api.openweathermap.org/geo/1.0/direct"
AQI_URL = "https://api.openweathermap.org/data/2.5/air_pollution"

def get_coordinates(city):
    params = {
        "q": f"{city},IN",
        "limit": 1,
        "appid": Config.OPENWEATHER_API_KEY
    }

    res = requests.get(GEOCODE_URL, params=params, timeout=10)
    data = res.json()

    if not data:
        raise Exception(f"City not found: {city}")

    return data[0]["lat"], data[0]["lon"]

def fetch_real_aqi(location):
    if not location:
        raise Exception("Location is required")

    location = location.strip()

    # 1️⃣ Get lat & lon dynamically
    lat, lon = get_coordinates(location)

    # 2️⃣ Fetch AQI
    res = requests.get(
        AQI_URL,
        params={
            "lat": lat,
            "lon": lon,
            "appid": Config.OPENWEATHER_API_KEY
        },
        timeout=10
    )

    data = res.json()

    if "list" not in data or not data["list"]:
        raise Exception("Invalid AQI response")

    comp = data["list"][0]["components"]

    pm25 = comp.get("pm2_5", 0)
    aqi = calculate_aqi_from_pm25(pm25)

    return {
        "location": location,
        "aqi": aqi,
        "pm25": pm25,
        "pm10": comp.get("pm10", 0),
        "co": comp.get("co", 0),
        "no2": comp.get("no2", 0),
        "so2": comp.get("so2", 0),
        "o3": comp.get("o3", 0)
    }
