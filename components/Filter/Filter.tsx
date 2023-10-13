import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Filter = (props: { ondata: (arg0: string) => void; type: any; select1: any; select2: any; select3: any; }) => {
    const [data,setData]= useState('updated')
    props.ondata(data)
  return (
    <>
      <Select onValueChange={(e)=>setData(e)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={`${props.type}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={`${props.select1} `}>{`${props.select1} `}</SelectItem>
          <SelectItem value={`${props.select2} `}>{`${props.select2} `}</SelectItem>
          <SelectItem value={`${props.select3} `}>{`${props.select3} `}</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default Filter;
