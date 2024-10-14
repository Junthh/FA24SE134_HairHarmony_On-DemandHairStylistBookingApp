import React, { useEffect, useRef, useState } from "react";
import CustomTooltip from "../Tooltip/CustomTooltip";

const TextOverflow = ({
  value,
  style,
  numberLength,
}: {
  value: string;
  style?: any;
  numberLength?: number;
}) => {
  const devRef: any = useRef();
  const [title, setTitle] = useState("");
  const getTitle = () => {
    let result = "";

    if (value?.length) {
      if (numberLength) {
        result =
          //devRef.current?.scrollWidth > devRef.current?.offsetWidth
          value?.length > numberLength ? value : "";
      } else {
        result =
          //devRef.current?.scrollWidth > devRef.current?.offsetWidth
          value?.length > 43 ? value : "";
      }
    }
    return result;
  };
  useEffect(() => {
    setTitle(getTitle());
  }, [value]);

  return (
    <CustomTooltip title={title}>
      <div style={style} className="text-overflow" ref={devRef}>
        {value}
      </div>
    </CustomTooltip>
  );
};

export default TextOverflow;
