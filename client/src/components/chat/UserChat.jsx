import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import {Stack} from "react-bootstrap";
import profile from "../../assets/profile.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const UserChat = ({chat,user}) =>{

    const {recipientUser} = useFetchRecipientUser(chat, user);
    const {onlineUsers} = useContext( ChatContext);

    const isOnline = onlineUsers?.some((user)=> user?.userId === recipientUser?._id)

    return <><Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between" role="button">
        <div className="d-flex">
            <div className="me-2">
                   <img src={profile} height={"35px"}/>
            </div>
            <div className="text-content">
                <div className="name">{recipientUser?.name}</div>
                <div className="text"></div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date"></div>
                <div className="this-user-notifications"></div>
                <span className={isOnline? "user-online":""}></span>
            </div>
            </div></Stack></>
};

export default UserChat;