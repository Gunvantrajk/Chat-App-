import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/service";

export const useFetchRecipientUser = (chat,user) =>{
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);

    const recipientId = chat?.members.find((id) => id !==user?._id);
    
    console.log(recipientId);

    useEffect(()=>{
        const getUser = async () => {
            if (recipientId) {
                try {
                    const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);
                    if (response.error) {
                        setError(response.error);
                    } else {
                        setRecipientUser(response);
                    }
                } catch (error) {
                    setError(error);
                }
            }
        };      
        getUser();
    },[recipientId]);

    console.log("recipientUser", recipientUser)

    return {recipientUser};
};