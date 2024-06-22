"use client";

export default function TestPage() {
  return (
    // <div className="flex flex-row gap-2">
    //   <Circle isSelected={false} />
    //   <Circle isSelected={true} />
    //   <Circle isSelected={false} />
    //   <Circle isSelected={false} />
    // </div>
    <Circle isSelected={false} />
  )
}

function Circle({
  isSelected
}: {
  isSelected: boolean
}) {
  return (
    <div className={`size-10 drop ${isSelected ? "bg-opacity-80" : "bg-opacity-50"} bg-black`}>
      {/* <div className={`absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isSelected ? "size-1.5" : ""} rounded-full bg-white bg-opacity-80`}></div> */}
    </div>
  )
}