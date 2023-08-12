from flask import Flask, jsonify, request
from flask_cors import CORS

import json
import asyncio

from utils.WebScrapper import main_amazon

app = Flask(__name__)
CORS(app)

@app.route('/scrapeData', methods=['POST'])
def scrapeData():
    data  = json.loads(request.data)
    print(data)
    topic = data['topic']

    #asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    #loop = asyncio.get_event_loop()
    #loop.run_until_complete(asyncio.run(main_amazon(topic)))

    asyncio.run(main_amazon(topic))

    return "./Data/ScrappedData/"+topic+".json"