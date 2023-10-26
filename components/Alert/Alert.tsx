
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Waves,Check, XCircle } from "lucide-react"
import './style.css'
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";


const AlertSuccess = (prop: { purpose: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => {
  return (
    <div className="alert-dialog">
    <Alert variant={"success"} className="alert">
      <Check color="#16a34a" size={26} className="h-4 w-4"/>
      <AlertTitle>{prop.purpose}</AlertTitle>
    </Alert>
    </div>
  );
};
const AlertError = (prop: { purpose: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => {
  return (
    <div className="alert-dialog">
    <Alert variant={"destructive"} className="alert">
      <XCircle color="#ef4444" size={26} className="h-4 w-4"/>
      <AlertTitle>{prop.purpose}</AlertTitle>
    </Alert>
    </div>
  );
};
export {AlertSuccess, AlertError};