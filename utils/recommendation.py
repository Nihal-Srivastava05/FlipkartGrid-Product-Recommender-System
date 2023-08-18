import tensorflow as tf
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("distilbert-base-nli-mean-tokens")
encoder_model = tf.keras.models.load_model('./utils/models/encoder_64_512_50_flipkart')

def get_similarity(product_1, encoded_vectors_2):
    name_embedding_1 = np.expand_dims(model.encode(product_1[0]), axis=0).reshape(1, 1, -1)
    category_embedding_1 = np.expand_dims(model.encode(product_1[1]), axis=0).reshape(1, 1, -1)
    description_embedding_1 = np.expand_dims(model.encode(product_1[2]), axis=0).reshape(1, 1, -1)

    # name_embedding_2 = np.expand_dims(model.encode(product_2[0]), axis=0).reshape(1, 1, -1)
    # category_embedding_2 = np.expand_dims(model.encode(product_2[1]), axis=0).reshape(1, 1, -1)
    # description_embedding_2 = np.expand_dims(model.encode(product_2[2]), axis=0).reshape(1, 1, -1)

    encoded_vectors_1 = encoder_model.predict([name_embedding_1, category_embedding_1, description_embedding_1], verbose=0)
    #encoded_vectors_2 = encoder_model.predict([name_embedding_2, category_embedding_2, description_embedding_2])

    return cosine_similarity(encoded_vectors_1.reshape(1, -1), encoded_vectors_2.reshape(1, -1))[0]

if __name__ == "__main__":
    p1 = ["Wayona Nylon Braided USB", "Computers&Accessories", "High Compatibility : Compatible With iPhone 12, 11, X/XsMax/Xr ,iPhone 8/8 Plus,iPhone 7/7 Plus,iPhone 6s/6s Plus,iPhone 6/6 Plus,iPhone 5/5s/5c/se,iPad Pro,iPad Air 1/2,iPad mini 1/2/3,iPod nano7,iPod touch and more apple devices.|Fast Charge&Data Sync : It can charge and sync simultaneously at a rapid speed, Compatible with any charging adaptor, multi-port charging station or power bank.|Durability : Durable nylon braided design with premium aluminum housing and toughened nylon fiber wound tightly around the cord lending it superior durability and adding a bit to its flexibility."]
    p2 = ["AmazonBasics Flexible Premium HDMI Cable", "Electronics", "Flexible, lightweight HDMI cable for connecting media devices to playback display such as HDTVs, projectors, and more|Compatible with Blu-Ray players, computers, Apple TV, Roku, cable, PS4, Xbox One, and other HDMI-compatible devices|Solid copper conductors and full metal jacket shielding for durability and high-performance connectivity|Supports Ethernet, 3D, 4K video and Audio Return Channel (ARC)"]

    sim = get_similarity(p1, p2)
    print(sim)