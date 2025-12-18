from pymongo import MongoClient
from config import Config

client = MongoClient(Config.MONGO_URI)
db = client[Config.DB_NAME]

aqi_collection = db["aqi_data"]
users_collection = db["users"]