
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Waves,Check, XCircle } from "lucide-react"
import './style.css'


const AlertSuccess = (prop) => {
  return (
    <Alert variant={"success"} className="alert">
      <Check color="#16a34a" size={26} className="h-4 w-4" />
      <AlertTitle>{prop.purpose}</AlertTitle>
    </Alert>
  );
};
const AlertError = (prop) => {
  return (
    <Alert variant={"destructive"} className="alert">
      <XCircle color="#ef4444" size={26} className="h-4 w-4" />
      <AlertTitle>{prop.purpose}</AlertTitle>
    </Alert>
  );
};
export {AlertSuccess, AlertError};