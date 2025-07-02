import { PlusIcon } from "../assets/icons/PlusIcon";
import { ShareIcon } from "../assets/icons/ShareIcon";

export function Card() {
    return (
        <div className="flex border max-w-60 justify-between">
            <div className="flex items-center gap-2">
                <div className="text-gray-400">
                    <ShareIcon />
                </div>

                <div>
                    Heyy There
                </div>
                    

            </div>

            <div className="flex items-center gap-2 text-gray-400">
                
                < PlusIcon />
                
                
                <ShareIcon />
            </div>
        </div>
    );
}