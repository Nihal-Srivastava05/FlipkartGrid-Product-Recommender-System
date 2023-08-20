from flask import Flask, jsonify, request
from flask_cors import CORS
import pymongo
import numpy as np
import pandas as pd
import json
import asyncio

from utils.WebScrapper import main_flipkart

from utils.recommendation import get_similarity, get_category

dataset= pd.read_csv("./data/flipkart_com-ecommerce_sample.csv")

app = Flask(__name__)
CORS(app)

@app.route('/scrapeData', methods=['POST'])
def scrapeData():
    data  = request.json
    topic = data['product']
   
    #asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    #loop = asyncio.get_event_loop()
    #loop.run_until_complete(asyncio.run(main_amazon(topic)))

    asyncio.run(main_flipkart(topic))
    
    res = json.load(open("./data/scrappedData/"+topic+".json", 'rb'))
    return res

@app.route('/getRec', methods=['POST'])
def GetRec():
    data  = request.json
    p_name = data['p_name']
    description = data['description']
    scrapped_category = data['category']

    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["mydb"] #mydb Flipkart_Grid
    mycol = mydb["Flipkart_Grid"] #Flipkart_Grid Products

    categories = mycol.distinct("category")
    category = get_category(scrapped_category, categories)
    products=list(mycol.find({"category": category}))

    print(scrapped_category, category, len(products))

    product_cosine={}
    count = 0
    for product in products:
        encoding=np.array(product['encoding'])
        pid = product["pid"]
        sim = get_similarity((p_name, category, description), encoding)
        if sim > 0.5:
            count += 1

        product_cosine[pid] = sim[0]

        if count >= 5:
            break

    product_cosine = sorted(product_cosine.items(), key=lambda x:x[1], reverse=True)
    res = []
    for product in product_cosine[:5]:
        item = dataset[dataset['uniq_id'] == product[0]]
        p_name = item.product_name.iloc[0]
        retail_price = item.retail_price.iloc[0]
        discounted_price = item.discounted_price.iloc[0]
        img =item.image.iloc[0]
        url=item.product_url.iloc[0]
        specs=item.product_specifications.iloc[0]

        res.append([p_name, retail_price, discounted_price, img, url, specs])

    return res