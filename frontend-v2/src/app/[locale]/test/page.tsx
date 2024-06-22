"use client";

export default function TestPage() {
  return (
    <div className="flex flex-col h-[200px] cursor-pointer" onMouseDown={() => console.log("mouse down")} onMouseUp={() => console.log("mouse up")}>
      <p>1</p>
      <div className="flex flex-col flex-1 overflow-y-auto">
        {
          Array.from({ length: 100 }).map((_, index) => (
            <p key={index}>in{index}</p>
          ))
        }
      </div>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p>5</p>
      <p>6</p>
    </div>
  )
}