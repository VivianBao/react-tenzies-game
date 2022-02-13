import React from "react"

export default function BestRecord(props){
  const bestRecord = props.bestRecord
  return(
    <p>
      {
        Object.keys(bestRecord).length === 0 ?
        "Create your best record!" :
          `Best Record:
          ${bestRecord["minutes"] === 0 ? "" : `${bestRecord["minutes"]} ${bestRecord["minutes"] === 1 ? "minute" : "minutes"}`}
          ${bestRecord["seconds"]} ${bestRecord["seconds"] === 1 ? "second" : "seconds"}`
      }
    </p>
  )
}
