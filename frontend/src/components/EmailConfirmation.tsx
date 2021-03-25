import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";

function EmailConfirmation() {
    const { id } = useParams<{ id: string }>();
    const [confirmed, setConfirmed] = useState(false)

    useEffect(() => {
        axios.put(`http://localhost:3000/users/${id}`, {confirmed: true}).then(res => {
            setConfirmed(res.data.confirmed);
            console.log(confirmed);
        })
    });

    return(
        <div>
            Congratulations, you have been successfully registered
        </div>
    )
}

export default EmailConfirmation