import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export default function DeleteButton() {
    return (
        <div>
            <Button variant={"ghost"} size={"icon"} className="absolute top-2 right-2  text-gray-500 hover:text-rose-800 bg-rose-50 hover:bg-rose-100">
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
    )
}