import { useContext } from "react"
import {Container , Stack} from "react-bootstrap";
import { ChatContext } from "../context/ChatContext";
import UserChat from "../components/chat/UserChat";
import {AuthContext} from "../context/AuthContext"
import PotentialChats from "../components/chat/PotentialChats";
import Chatbox from "../components/chat/Chatbox";


function Chat(){
  const {user} = useContext(AuthContext);
  const{ userChats,
    isUserChatsLoading,
    updateCurrentChat ,showChat} = useContext(ChatContext);


    const SmallScreen = window.innerWidth <= 768 ;


     
    return(

      <Container>
        <PotentialChats/>{userChats?.length < 1 ? null : <Stack direction="horizontal" gap={4} className="align-items-start">
        <Stack className=" messages-box flex-grow-0 pe-3" gap={3}>
         {isUserChatsLoading && <p>Loading chats...</p>}
         {userChats?.map((chat,index)=>{
          return(
          <div key={index} onClick={() =>updateCurrentChat(chat)}>
            <UserChat chat={chat} user={user} />
          </div>)
         })}</Stack>
         { showChat && <Chatbox/>}
      </Stack> 
        }</Container>
    )
};

export default Chat;