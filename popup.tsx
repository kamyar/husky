import React, { useEffect, useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")
  useEffect(() => {
    chrome.runtime.openOptionsPage()
  })
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
      }}
    >
      <h2>
This is a popup
      </h2>
    </div>
  )
}

export default IndexPopup
