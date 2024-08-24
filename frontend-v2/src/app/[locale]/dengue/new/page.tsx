// TODO: make lables and messages translatable

"use client";

import Button from "@/components/button";
import RadioField from "@/components/radio-field";
import TextField from "@/components/text-field";
import { faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function NewDenguePage() {
  const [answerSet, setAnswerSet] = useState<Array<[number, number]>>(Array(questionSet.length).fill([-1, -1]));
  const [main25, setMain25] = useState<string>("");
  const [main30, setMain30] = useState<string>("");

  function mainSelection(index: number): number {
    return answerSet[index][0];
  }

  function subSelection(index: number): number {
    return answerSet[index][1];
  }

  function setMainSelection(index: number, value: number) {
    setAnswerSet((prev) => [
      ...prev.slice(0, index),
      [value, prev[index][1]],
      ...prev.slice(index + 1)
    ]);
  }

  function setSubSelection(index: number, value: number) {
    setAnswerSet((prev) => [
      ...prev.slice(0, index),
      [prev[index][0], value],
      ...prev.slice(index + 1)
    ]);
  }

  function handleSave() {
    console.log("main25", main25);
    console.log("main30", main30);
    console.log("answerSet", answerSet);
  }

  return (
    <>
      <h1>登革熱填報</h1>
      <form className="mt-6 flex flex-col gap-4">
        <h2>您的住家屋外或周圍環境是否有下列容器？</h2>
        <Question start={0} end={24} diff={0} skipped={0} />
        <TextField
          label="main_25"
          labelText="25. 其他（任何容器或雜物）"
          value={main25}
          onChange={setMain25}
        />
        <h2>您的住宅內是否有下列容器？</h2>
        <Question start={24} end={28} diff={24} skipped={1} />
        <TextField
          label="main_30"
          labelText="30. 其他（任何容器或雜物）"
          value={main30}
          onChange={setMain30}
        />
        <div className="flex flex-row justify-center gap-2 mt-6">
          <Button className="border" onClick={handleSave}>
            <FontAwesomeIcon icon={faPaperPlane} className="me-2 size-4" />
            <span className="py-1">送出</span>
          </Button>
        </div>
      </form>
    </>
  );

  function Question({
    start, end, diff, skipped,
  }: {
    start: number,
    end: number,
    diff: number,
    skipped: number
  }) {
    return questionSet.slice(start, end).map(([main, sub], questionIndex) => (
      <div key={questionIndex}>
        <RadioField
          label={`main_${questionIndex + diff + skipped}`}
          labelText={`${questionIndex + diff + skipped + 1}. ${main}`}
          options={["有", "沒有"]}
          index={mainSelection(questionIndex + diff)}
          onChange={(value) => setMainSelection(questionIndex + diff, value)} />
        <RadioField
          hidden={mainSelection(questionIndex + diff) !== 0}
          className="mt-1 ps-3 border-l-4"
          label={`sub_${questionIndex + diff + skipped}`}
          labelText={sub}
          options={["是", "否"]}
          index={subSelection(questionIndex + diff)}
          onChange={(value) => setSubSelection(questionIndex + diff, value)} />
      </div>
    ))
  }
}

const questionSet = [
  [
    "空瓶、空罐",
    "這些是否已清除（若未清除請馬上動手清除）"
  ],
  [
    "陶甕、水缸",
    "這些是否已清除（若未清除請馬上動手清除）"
  ],
  [
    "杯子、碟子、盤子、碗",
    "這些是否已清除（若未清除請馬上動手清除）"
  ],
  [
    "鍋、壺",
    "這些是否已清除（若未清除請馬上動手清除）"
  ],
  [
    "保麗龍製品或塑膠製品、免洗餐具",
    "這些是否已清除（若未清除請馬上動手清除）"
  ],
  [
    "桶子（木桶、鐵桶、塑膠桶等）",
    "這些是否已清除（若未清除請馬上動手清除）"
  ],
  [
    "椰子殼",
    "這些是否已清除（若未清除請馬上動手清除）"
  ],
  [
    "廢輪胎、廢安全帽",
    "請移除或以土填滿並種小花等植物"
  ],
  [
    "屋簷旁排水管、帆布、遮雨棚",
    "裡面是否阻塞積水（若有請立即疏通）"
  ],
  [
    "廢棄冰箱、洗衣機、馬桶或水族箱",
    "是否有開口？內部是否有積水？是否倒置或密封保持乾燥？"
  ],
  [
    "不使用或未加蓋的水塔（蓄水塔）",
    "是否有開口？內部是否有積水？是否倒置或密封保持乾燥？"
  ],
  [
    "未使用中的冷氣、冷卻水塔、冷飲櫃",
    "是否有開口？內部是否有積水？是否倒置或密封保持乾燥？"
  ],
  [
    "大型儲水桶有無加蓋或蓋細紗網",
    "儲水容器請記得加蓋或蓋細紗網，不用時倒置。"
  ],
  [
    "寵物水盤、雞、鴨、家禽、鳥籠或鴿舍內飲水槽、馬槽水",
    "是否一週換水一次並刷洗乾淨？"
  ],
  [
    "積水地下室",
    "水是否已清除？"
  ],
  [
    "地下室內的集水井",
    "是否有孑孓孳生？"
  ],
  [
    "自來水表或瓦斯表",
    "內部是否漏水或積水？是否倒置保持乾燥？"
  ],
  [
    "門外信箱",
    "內部是否漏水或積水？是否倒置保持乾燥？"
  ],
  [
    "燒金紙的桶子",
    "內部是否漏水或積水？是否倒置保持乾燥？"
  ],
  [
    "雨鞋、雨衣",
    "內部是否漏水或積水？是否倒置保持乾燥？"
  ],
  [
    "天然積水容器（竹籬笆竹節頂端、竹筒、樹幹上的樹洞、大型樹葉）",
    "是否以土填滿並種小花等植物？"
  ],
  [
    "旗座水泥樁上及其他可積水之水管",
    "把水倒掉，若暫不使用則封住開口"
  ],
  [
    "假山造型水池（凹槽處）、冷氣機滴水",
    "是否有孑孓孳生？"
  ],
  [
    "水溝積水有孑孓孳生",
    "裡面是否阻塞？（若有請立即疏通）"
  ],
  [
    "花盤、花瓶、插水生植物容器（如：萬年青、黃金葛等）",
    "是否一週換水一次，並洗刷乾淨？"
  ],
  [
    "澆花灑水桶、花盆盆栽底盤",
    "是否洗刷乾淨？不用時是否倒置？"
  ],
  [
    "貯水容器（水缸、水泥槽、水桶、陶甕等或盛裝寵物飲水容器）",
    "一週換水一次，並洗刷乾淨？貯水容器是否有加蓋密封？"
  ],
  [
    "冰箱底盤、烘碗機底盤、開飲機底盤、泡茶用水盤",
    "是否一週換水一次，並洗刷乾淨？"
  ]
];
