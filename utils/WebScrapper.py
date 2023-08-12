import bs4
import requests
import time
import re
import json

import aiohttp 
import asyncio
import ssl

########## AMAZON ##########

def get_amazon_urls(productName, HEADERS = ({'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36', 'Accept-Language': 'en-US, en;q=0.5'})):
    productName = productName.replace(' ', '+')
    try:
        webpage = requests.get("https://www.amazon.in/s?k="+productName, headers=HEADERS)
        soup = bs4.BeautifulSoup(webpage.content, "lxml")
    except:
        return []
    data = soup.find_all('a', attrs={'class': 'a-link-normal'})
    
    links = set()
    for d in data:
        l = d['href']
        regexp = re.compile(r'[a-zA-Z0-9-]*\/dp\/')
        if(regexp.search(l)):
            links.add("https://www.amazon.in/"+d['href'])
    
    return list(links)

def get_reviews_amazon(soup):
    data_str = ""  
    for item in soup.find_all("div", class_="reviewText"):
        data_str = data_str + item.get_text()
    result = data_str.split("\n")
    result = list(filter(None, result))
    if(result == ['']):
        return []
    
    return (result)

async def get_details_amazon(session, URL, HEADERS = ({'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36', 'Accept-Language': 'en-US, en;q=0.5'})):
    async with session.get(URL, headers=HEADERS) as webpage:
        content = await webpage.text()
        soup = bs4.BeautifulSoup(content, "lxml")

    data = {}
    try:
        title = soup.find("span", attrs={"id":'productTitle'}).text.strip()
        data['title'] = title
    except:
        pass

    try:
        price = soup.find("span", attrs={'class':'a-price-whole'}).text.strip()
        data['price'] = price
    except:
        pass
    
    try:
        description = soup.find('div', attrs={'id': 'feature-bullets'}).text.strip()
        data['description'] = description
    except:
        pass
    
    try:
        reviews = get_reviews_amazon(soup)
        if(reviews != []):
            data['reviews'] = reviews
    except:
        pass
    
    return data

async def main_amazon(productName):
    start_time = time.time()
    connector = aiohttp.TCPConnector(limit=50, force_close=True)
    
    tasks = []  
    async with aiohttp.ClientSession(connector=connector) as session:
        for url in get_amazon_urls(productName)[:25]:
            tasks.append(asyncio.create_task(get_details_amazon(session, url)))

        results = await asyncio.gather(*tasks)

    print(f"{(time.time() - start_time):.2f} seconds")
    results = list(filter(lambda a: a != {}, results))
    json_object = json.dumps(results, indent=4)
    if(results == []):
        print("Results: ", results)
    with open("./data/scrappedData/"+productName+".json", "w") as outfile:
    	outfile.write(json_object)

########## ASK LALIA ##########

# def get_asklalia_urls(productName, n_top=120, HEADERS = ({'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36', 'Accept-Language': 'en-US, en;q=0.5'})):
#     productName = productName.replace(' ', '-')
#     links = set()
#     for i in range(0, n_top+1, 20):
#         try:
#             webpage = requests.get("https://www.asklaila.com/search/Chennai/-/"+productName+"/"+str(i), headers=HEADERS)
#             soup = bs4.BeautifulSoup(webpage.content, "lxml")
#         except:
#             return []
            
#         data = soup.find_all('h2', attrs={'class', 'resultTitle'})
#         for d in data:
#             l = d.find('a')['href']
#             links.add(l)
            
#     return links

# async def get_details_asklalia(session, URL, HEADERS = ({'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36', 'Accept-Language': 'en-US, en;q=0.5'})):
#     async with session.get(URL, headers=HEADERS) as webpage:
#         content = await webpage.text()
#         soup = bs4.BeautifulSoup(content, "lxml")

#     data = {}
#     try:
#         title = soup.find('h1', attrs={'class', 'cardHeadTitle'}).text.strip()
#         data['title'] = title
#     except:
#         pass

#     try:
#         address = soup.find('span', attrs={'class', 'street-address'}).text.strip()
#         data['address'] = address
#     except:
#         pass
    
#     try:
#         pincode = soup.find('span', attrs={'class', 'postal-code'}).text.strip()
#         data['pincode'] = pincode
#     except:
#         pass
    
#     try:
#         rating = soup.find('span', attrs={'class', 'mobcHeadRating'}).text.strip()
#         data['rating'] = rating
#     except:
#         pass
    
#     try:
#         description = soup.find_all('span', attrs={'id', 'tableCell'})
#         content = {}
#         for idx in range(0, len(description), 2):
#             content[description[idx].text.strip()] = description[idx+1].text.strip()
#         data['description'] = content
#     except:
#         pass
#     print(data)
#     return data

# async def main_asklalia(productName):
#     start_time = time.time()
#     connector = aiohttp.TCPConnector(limit=50)
#     async with aiohttp.ClientSession(connector=connector) as session:
#         tasks = []

#         for url in get_asklalia_urls(productName):
#             tasks.append(asyncio.create_task(get_details_amazon(session, url)))

#         results = await asyncio.gather(*tasks)

#     print(f"{(time.time() - start_time):.2f} seconds")

#     json_object = json.dumps(results, indent=4)
#     with open("./Data/ScrappedData/"+productName+".json", "w") as outfile:
#         outfile.write(json_object)

if __name__ == "__main__":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    # asyncio.run(main_asklalia("car"))
    # asyncio.run(main_amazon("Underwear")) 