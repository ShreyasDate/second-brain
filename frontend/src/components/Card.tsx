import { PlusIcon } from "../assets/icons/PlusIcon";
import { ShareIcon } from "../assets/icons/ShareIcon";

export function Card() {
    return (
        <div className="bg-white p-8 border border-gray-200 rounded-md max-w-96  ">
            <div className="flex justify-between">
                <div className="flex">
                    <ShareIcon />
                    Project Ideas
                </div>
                <div className="flex">
                    <div className="pr-2 text-gray-600">
                        <ShareIcon />
                    </div>
                    <div className="pr-2 text-gray-600">
                        <ShareIcon />
                    </div>
                    
                </div>
            </div>   
        </div>
    );
}