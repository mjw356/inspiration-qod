#!/usr/bin/python3
import os
from pymongo import MongoClient
from dotenv import load_dotenv

# loads initial list of image names into MongoDB Atlas
# load env variables
load_dotenv()
mongo_con_str = os.getenv('MONGO_CON_STR')
path = os.getenv('IMAGE_PATH')

# create list of documents to be added to mongo
mongo_documents = []

# get filenames
for (dir, dnames, fnames) in os.walk(path):
    fnames.remove('.DS_Store')
    for filename in fnames:
        mongo_document = {'n': filename}
        mongo_documents.append(mongo_document)

# connect to mongo atlas
client = MongoClient(mongo_con_str)
db = client.inspiration
collection = db.images

# insert image names
print("inserting image names...")
collection.insert_many(mongo_documents)
print('done.')