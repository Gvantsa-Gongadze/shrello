import { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function EmailConfirmation() {
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        axios.put(`http://localhost:3000/users/${id}`, {confirmed: true})
        .then(res => {
            console.log(res.data.confirmed);
        })
        .catch((err) => {
            console.error(err);
        });
    });

    return(
        <div>
            Congratulations, you have been successfully registered
        </div>
    )
}

export default EmailConfirmation