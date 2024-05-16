import json
import pandas as pd


class DengueDataClass:
    def __init__(self, dengue):
        self.dengue = dengue
        self.dengue_data = json.loads(dengue.json_data)
        self.dengue_df = None
        self.finish = True

        self.parse_dengue_data()

    def parse_dengue_data(self):
        dataframe_data = {
            "question": [],
            "answer": [],
            "sub_question": [],
            "sub_answer": [],
        }

        question_keys = {key.split('_')[0]: key.split('_')[1] for key in self.dengue_data.keys() if
                         not key.startswith('sub')}
        sub_question_keys = {key.split('_')[1]: key.split('_')[2] for key in self.dengue_data.keys() if
                             key.startswith('sub')}

        for idx, question in question_keys.items():
            dataframe_data["question"].append(question)
            dataframe_data["answer"].append(self.dengue_data[f"{idx}_{question_keys[idx]}"])
            dataframe_data["sub_question"].append(sub_question_keys[idx] if idx in sub_question_keys else None)
            dataframe_data["sub_answer"].append(
                self.dengue_data[f"sub_{idx}_{sub_question_keys[idx]}"] if idx in sub_question_keys else None
            )

            if isinstance(dataframe_data["answer"][-1], str) and dataframe_data["answer"][-1].lower() != "":
                self.finish = False
            elif isinstance(dataframe_data["answer"][-1], bool) and \
                    dataframe_data["answer"][-1] and \
                    not dataframe_data["sub_answer"][-1]:
                self.finish = False

        self.dengue_df = pd.DataFrame(dataframe_data)
