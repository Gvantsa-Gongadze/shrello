import axios from "axios";
import { useParams } from "react-router-dom";

const EmailConfirmation = () => {
    const { id } = useParams<{ id: string }>();

    axios.put(`http://localhost:3000/users/${id}`, {confirmed: true})
    .catch(e => {
        console.log(e);
    })

    return(
        <div>
            congratulations you have been successfully registered
        </div>
    )
}

export default EmailConfirmation