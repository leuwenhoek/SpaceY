import os
import json
import pickle
import requests
import numpy as np
from dotenv import load_dotenv
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

import sys
import re
import html as html_lib

load_dotenv()

model = SentenceTransformer('all-MiniLM-L6-v2')

def ddg_lite_search(query_text):
    restricted_query = f"(site:nasa.gov OR site:spacex.com OR site:wikipedia.org) {query_text}"
    url = "https://lite.duckduckgo.com/lite/"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    
    data = {
        "q": restricted_query
    }
    
    try:
        response = requests.post(url, headers=headers, data=data, timeout=10)
        if response.status_code != 200:
            return []
        
        html_content = response.text
        
        link_matches = re.findall(
            r'<a[^>]*href=["\']([^"\']+)["\'][^>]*class=[\'"]result-link[\'"][^>]*>(.*?)</a>',
            html_content,
            re.DOTALL
        )
        
        snippet_matches = re.findall(
            r'class=[\'"]result-snippet[\'"][^>]*>(.*?)</td>',
            html_content,
            re.DOTALL
        )
        
        results = []
        allowed_domains = ["nasa.gov", "spacex.com", "wikipedia.org"]
        
        for idx in range(min(len(link_matches), len(snippet_matches))):
            link = link_matches[idx][0]
            title = re.sub('<[^<]+?>', '', link_matches[idx][1]).strip()
            snippet = re.sub('<[^<]+?>', '', snippet_matches[idx]).strip()
            
            title = html_lib.unescape(title)
            snippet = html_lib.unescape(snippet)
            
            if any(domain in link for domain in allowed_domains):
                results.append({
                    "title": title,
                    "link": link,
                    "snippet": snippet
                })
        return results
    except Exception as e:
        print(f"Search error: {e}", file=sys.stderr)
        return []

def query(question, mode="archives"):
    sources_used = []
    context = ""

    if mode == "archives" or mode == "hybrid":
        try:
            with open(os.path.join("model", "RAG_model.pkl"), "rb") as f:
                data = pickle.load(f)

            all_docs = data["docs"]
            all_embeddings = data["embeddings"]

            query_embedding = model.encode(question)

            scores = cosine_similarity(
                [query_embedding],
                all_embeddings
            )[0]

            top_k = np.argsort(scores)[-3:][::-1]

            for idx in top_k:
                doc = all_docs[idx]
                context += f"Source: SpaceY Archives\nContent: {doc['text']}\n\n"
                sources_used.append("SpaceY Archives")
        except Exception as e:
            print(f"Archives read error: {e}", file=sys.stderr)

    if mode == "live" or mode == "hybrid":
        web_results = ddg_lite_search(question)
        for r in web_results:
            domain_src = "Unknown"
            if "nasa.gov" in r["link"]:
                domain_src = "NASA"
            elif "spacex.com" in r["link"]:
                domain_src = "SpaceX"
            elif "wikipedia.org" in r["link"]:
                domain_src = "Wikipedia"
            context += f"Source: {domain_src}\nContent: {r['snippet']}\n\n"
            sources_used.append(domain_src)

    # Ensure unique sources
    sources_used = list(set(sources_used))
    if not sources_used:
        sources_used = ["SpaceY Archives"] if mode == "archives" else ["Live Research"]

    prompt = f"""
        You are operating in STRICT RAG MODE.

        Strict Rules:
        1. Answer ONLY using the provided context.
        2. Do NOT use outside knowledge.
        3. Keep answers concise and directly relevant to the question.
        4. Do not include unrelated facts.
        5. If information is unavailable in the context, reply exactly:
           "I could not find enough information in the provided documents."
        6. Use bullet points only when necessary.
        7. Maximum response length: 150 words.
        8. At the end include sources used.

        Context:
        {context}

        Question:
        {question}

        Answer:
    """

    api_key = os.getenv('OPENROUTER_API_KEY')
    if not api_key:
        val = os.getenv('OPENROUTER_API')
        if val and not val.startswith('http'):
            api_key = val
    api_key = api_key or ""

    url = os.getenv('OPENROUTER_API')
    if not url or not url.startswith('http'):
        url = "https://openrouter.ai/api/v1/chat/completions"

    messages = [
        {
            "role": "user",
            "content": prompt
        }
    ]

    try:
        response = requests.post(
            url=url,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            data=json.dumps({
                "model": "poolside/laguna-xs.2:free",
                "messages": messages,
                "reasoning": {"enabled": True}
            })
        )

        if response.status_code == 200:
            response_data = response.json()
            if 'choices' in response_data and len(response_data['choices']) > 0:
                assistant_message = response_data['choices'][0]['message']
                final_answer = assistant_message.get('content')
                return {
                    "answer": final_answer,
                    "sources": sources_used
                }
            else:
                return {
                    "answer": "Error: No choices found in the response.",
                    "sources": []
                }
        else:
            return {
                "answer": f"Error: OpenRouter API call failed with status code {response.status_code}\n{response.text}",
                "sources": []
            }
    except Exception as e:
        return {
            "answer": f"Error: Request failed. {e}",
            "sources": []
        }

def get_answer(question):
    return query(question)

def main():
    if len(sys.argv) > 1:
        question = sys.argv[1]
        mode = sys.argv[2] if len(sys.argv) > 2 else "archives"
        result = query(question, mode)
        print(json.dumps(result))
    else:
        print(json.dumps(query('When was Voyager 1 launched?', 'archives')))

if __name__ == "__main__":
    main()