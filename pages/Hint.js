import React from "react";

export function Hint(p) {
  let cr;
  if (
    //  typeof p.val === "undefined" ||
    p.val === ""
    //   ||
    // typeof p.Correctness === "undefined"
  )
    return <></>;

  if (String(p.Correctness).includes("TRUE")) cr = "#CBECEE";
  else if (p.Correctness !== "") cr = "#E63D3D";
  return (
    <div
      style={{
        backgroundColor: cr,
        borderRadius: "15px",
        padding: "10px",
        margin: "10px",
        width: "100%"
      }}
    >
      {p.val}
    </div>
  );
}
