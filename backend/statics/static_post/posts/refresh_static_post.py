from pathlib import Path
import json

jsons = Path('.').glob("*.json")
for j in jsons:
    with open(j, 'r') as f:
        data = json.load(f)

    data['content'] = '[{"insert":"\\n"}]'
    data['attachments'] = '[]'
    data['viewer'] = 0

    with open(j, 'w') as f:
        json.dump(data, f, indent=4)
