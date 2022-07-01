import { PhoneMissedCallIcon, XCircleIcon, XIcon } from '@heroicons/react/outline';
import { CheckCircleIcon, MinusCircleIcon } from '@heroicons/react/solid';
import { formatDate, formatDateTime } from 'helpers/formatDate';

const STATES_CARD = {
    "Sin contactar": {
        style: "bg-yellow-200",
        icon: <MinusCircleIcon />,
    },
    "Contactado": {
        style: "bg-green-200",
        icon: <CheckCircleIcon />,
    },
    "No responde": {
        style: "bg-red-200",
        icon: <PhoneMissedCallIcon />,
    },
    "Descartado": {
        style: "bg-gray-200",
        icon: <XCircleIcon />,

    }
};
        

const CardManagement = ({ management }) => {
    console.log(management);
    return (
        <div
            className={`bg-green-100 rounded shadow py-2 px-3 min-h-[40px] flex gap-2 items-center ${
                STATES_CARD[management.state].style
            }`}
        >
            <div className="h-6 w-6 dark:text-gray-800">
                {STATES_CARD[management.state].icon}
            </div>
            <div>
                <p className="dark:text-gray-800 text-sm font-bold">
                    {management.state}
                </p>
                <p className="dark:text-gray-800 text-sm">
                    {management.observations}
                </p>
                <p className="dark:text-gray-800 text-xs">
                    {formatDateTime(management.updatedAt)}
                </p>
            </div>
        </div>
    );
};

export default CardManagement