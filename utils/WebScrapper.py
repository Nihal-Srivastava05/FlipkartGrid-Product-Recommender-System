import bs4
import requests
import time
import re
import json

import aiohttp 
import asyncio
import ssl

########## flipkart ##########

def get_flipkart_urls(productName, HEADERS = ({'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36', 'Accept-Language': 'en-US, en;q=0.5'})):
    productName = productName.replace(' ', '%20')
    try:
        webpage = requests.get("https://www.flipkart.com/search?q="+productName, headers=HEADERS)
        soup = bs4.BeautifulSoup(webpage.content, "lxml")
    except:
        return []
    data = soup.find_all("div",class_="_13oc-S")
    links = set()
    for tag in data:
        aTags = tag.find_all("div")
        for a1 in aTags:
            aTags1 = a1.find_all("div")
            for a2 in aTags1:
                af=a2.find_all("a")
                if af != []:
                    links.add("https://www.flipkart.com"+af[0].attrs["href"])
            
    return list(links)

def get_reviews_flipkart(soup):
    data_str = []  
    for item in soup.find_all("p", class_="_2-N8zT"):
        data_str.append(item.get_text())
    result = list(filter(None, data_str))
    if(result == ['']):
        return []
    
    return (result)

async def get_details_flipkart(session, URL, HEADERS = ({'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36', 'Accept-Language': 'en-US, en;q=0.5'})):
    async with session.get(URL, headers=HEADERS) as webpage:
        content = await webpage.text()
        soup = bs4.BeautifulSoup(content, "lxml")

    data = {}
    title = "#####"
    try:
        title = soup.find("span", attrs={'class':'B_NuCI'}).text.strip()
        data['title'] = title
    except:
        pass

    try:
        price = soup.find('div', attrs={'class':'_30jeq3 _16Jk6d'}).text.strip()
        data['price'] = price
    except:
        pass
    
    try:
        description = soup.find('div', attrs={'class': '_1mXcCf RmoJUa'}).text.strip()
        data['description'] = description
    except:
        data['description'] = title
        pass
    
    try:
        reviews = get_reviews_flipkart(soup)
        if(reviews != []):
            data['reviews'] = reviews
    except:
        pass
    
    try:
        img = soup.find('div', attrs={'class': 'CXW8mj _3nMexc'})
        img1=img.find('img').attrs['src']
        data['image'] = img1
    except:
        data['image'] = "./images/logo192.png"
        pass

    try:
        category = soup.find_all("a", attrs={'class': "_2whKao"})[1].text.strip()
        data['category'] = category
    except:
        pass

    
    return data

async def main_flipkart(productName):
    start_time = time.time()
    connector = aiohttp.TCPConnector(limit=50, force_close=True)
    
    tasks = []  
    async with aiohttp.ClientSession(connector=connector) as session:
        for url in get_flipkart_urls(productName):
            tasks.append(asyncio.create_task(get_details_flipkart(session, url)))

        results = await asyncio.gather(*tasks)

    print(f"{(time.time() - start_time):.2f} seconds")
    results = list(filter(lambda a: a != {}, results))
    json_object = json.dumps(results, indent=4)
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
#             tasks.append(asyncio.create_task(get_details_flipkart(session, url)))

#         results = await asyncio.gather(*tasks)

#     print(f"{(time.time() - start_time):.2f} seconds")

#     json_object = json.dumps(results, indent=4)
#     with open("./Data/ScrappedData/"+productName+".json", "w") as outfile:
#         outfile.write(json_object)

if __name__ == "__main__":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    # asyncio.run(main_asklalia("car"))
    # asyncio.run(main_flipkart("Underwear")) 