import { ReactElement } from "react";

interface ButtonProps{
    varient : "primary" | "secondary",
    text : string,
    startIcon ? : ReactElement,
    endIcon ? : ReactElement
}

const varientClasses = {
    "primary" : "bg-purple-500 text-white",
    "secondary" : "bg-purple-100 text-purple-300" 

};

const defaultStyles = "px-4 py-2 rounded-md m-1 flex items-center gap-2";
export function Button({varient , text , startIcon , endIcon }: ButtonProps) {
    return <button className={varientClasses[varient] + " "+ defaultStyles} >
        {startIcon}
        { text}
        {endIcon}
    </button>
}