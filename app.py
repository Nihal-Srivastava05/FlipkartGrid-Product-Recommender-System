from flask import Flask, jsonify, request
from flask_cors import CORS
import pymongo
from tqdm import tqdm
import numpy as np
import pandas as pd
import json
import asyncio

from utils.WebScrapper import main_amazon

from utils.recommendation import get_similarity

dataset= pd.read_csv("/Users/jaisurajbantupalli/Desktop/FlipKartGrid/FlipkartGrid-Product-Recommender-System/data/flipkart_com-ecommerce_sample.csv")




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

@app.route('/getRec', methods=['POST'])
def GetRec():
    data  = json.loads(request.data)
    p_name = data['p_name']
    description = data['description']
    category = data['category']

    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["Flipkart_Grid"]
    mycol = mydb["Products"]
    products=list(mycol.find({"category":"Clothing"}))
    
    product_cosine={}
    for product in products:
        encoding=np.array(product['encoding'])
        pid = product["pid"]
        #print(encoding.shape)
        sim = get_similarity((p_name, category, description), encoding)
        if sim > 0.5:
            product_cosine[pid] = sim[0]
            print(product_cosine[pid])

        if len(product_cosine) >= 10:
            break

        
    
    product_cosine = sorted(product_cosine.items(), key=lambda x:x[1], reverse=True)
    res = []
    for product in product_cosine:
        item = dataset[dataset['uniq_id'] == product[0]]
        #print(item)
        p_name = item.product_name.iloc[0]
        retail_price = item.retail_price.iloc[0]
        discounted_price = item.discounted_price.iloc[0]
        img =item.image.iloc[0]
        url=item.product_url.iloc[0]
        specs=item.product_specifications.iloc[0]

        #print(p_name, retail_price, discounted_price)
        res.append([p_name, retail_price, discounted_price,img,url,specs])

    print(res)

    return res

    #asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    #loop = asyncio.get_event_loop()
    #loop.run_until_complete(asyncio.run(main_amazon(topic)))

    asyncio.run(main_amazon(topic))

    return "./Data/ScrappedData/"+topic+".json"