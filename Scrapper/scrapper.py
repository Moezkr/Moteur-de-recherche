import requests
import time
import json

TOPICS = [
    "artificial intelligence",
    "cybersecurity",
    "cloud computing",
    "blockchain",
    "data science",
]

MAX_TOTAL_ITEMS = 100
ROWS_PER_REQUEST = 10
OUTPUT_FILE = "archive_org_metadata_100.json"
BASE_URL = "https://archive.org/advancedsearch.php"

all_items = []
print("Démarrage du scrapper Archive.org")

for topic in TOPICS:
    if len(all_items) >= MAX_TOTAL_ITEMS:
        break

    print(f"--- Thème {topic} ---")
    page = 1

    items_to_collect_for_topic = min(20, MAX_TOTAL_ITEMS - len(all_items))
    collected_in_topic = 0

    while collected_in_topic < items_to_collect_for_topic:
        params = {
            "q": topic,
            "fl[]": ["identifier", "title", "description", "mediatype", "creator"],
            "rows": ROWS_PER_REQUEST,
            "page": page,
            "output": "json"
        }

        response = requests.get(BASE_URL, params=params)
        if response.status_code != 200:
            print("Erreur statut", response.status_code, response.text)
            break

        data = response.json()
        docs = data.get("response", {}).get("docs", [])

        if not docs:
            print("Plus d'items pour ce thème")
            break

        for item in docs:
            if len(all_items) >= MAX_TOTAL_ITEMS:
                break
            
            if collected_in_topic >= items_to_collect_for_topic:
                 break

            title = item.get("title", "")
            identifier = item.get("identifier", "")
            url = f"https://archive.org/details/{identifier}"

            description = item.get("description", "")
            if isinstance(description, list):
                description = " ".join(description)
            description = description.strip()

            if not description:
                continue

            description_lines = description.split(". ")
            description = ". ".join(description_lines[:3])
            if not description.endswith("."):
                description += "..."

            item_data = {
                "topic": topic,
                "title": title,
                "description": description,
                "url": url,
            }

            all_items.append(item_data)
            collected_in_topic += 1
            print(f"[{len(all_items)}] {title[:60]}...")

        page += 1
        time.sleep(0.5)

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(all_items, f, ensure_ascii=False, indent=2)

print("\nFINI")
print("Total items sauvegardés", len(all_items))
print("Fichier sauvegardé sous", OUTPUT_FILE)