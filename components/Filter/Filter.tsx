import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Filter = ({...props}) => {

    // State

    const [data,setData]= useState('updated')

    //useEffect

    useEffect(()=>{
        props.ondata2(data)
    },[data])

  return (
    <>
      <Select onValueChange={(e)=>setData(e)} defaultValue={data}>
        <SelectTrigger  className="w-[200px]">
          <SelectValue  placeholder={`Sort By: ${data}`} />
        </SelectTrigger>
        <SelectContent defaultValue={`Sort By: ${data}`} >
          <SelectItem value={`${props.select1}`}>{`Sort By: ${props.select1}`}</SelectItem>
          <SelectItem value={`${props.select2}`}>{`Sort By: ${props.select2}`}</SelectItem>
          <SelectItem value={`${props.select3}`}>{`Sort By: ${props.select3}`}</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default Filter;