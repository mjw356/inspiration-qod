#!/usr/bin/python3
import os
import requests
from pymongo import MongoClient
from dotenv import load_dotenv

# load environment variables
load_dotenv()
mongo_con_str = os.getenv('MONGO_CON_STR')

api_url = 'https://zenquotes.io/api/quotes'

# get quotes from zenquotes api
response = requests.get(api_url)
json_response = response.json()

# connect to mongo atlas
client = MongoClient(mongo_con_str)
db = client.inspiration
collection = db.quotes

# set up variable to hold quotes
quotes_to_add = []

# iterate over returned quotes
for quote in json_response:
    refactoredQuote = {'q': quote['q'], 'a': quote['a']}
    quotes_to_add.append(refactoredQuote)

# add refactored quotes as documents to the database
print("adding documents...")
collection.insert_many(quotes_to_add)
print("done.")