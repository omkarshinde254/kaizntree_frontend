import React, { useState, useEffect } from "react";

const Alert = ({ message, type }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, [show]); // Include 'show' as a dependency

    if (!show) {
        return null;
    }

    let bgColor = "bg-blue-500";

    if (type === "success") bgColor = "bg-green-500";
    if (type === "error") bgColor = "bg-red-500";

    return <div className={`absolute top-0 right-0 m-6 p-4 rounded shadow-lg text-white ${bgColor}`}>{message}</div>;
};

export default Alert;
