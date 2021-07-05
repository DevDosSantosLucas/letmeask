
import { useAuth } from "../../hooks/useAuth";
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';
import { RoomCode } from '../../components/RoomCode';
import './styles.scss'
import { useHistory, useParams } from "react-router-dom";
import { database } from "../../services/firebase";
import { Button } from "../Button";

type RoomParams = {
    id: string;
}



export function Header(){
    const {user,signOutGoogleAccount,signWithGoogle} = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const history = useHistory();

    async function handleSignWithGoogle(){
        
          await  signWithGoogle();
    }
    async function handleDashboard(){
        history.push('/dashboard');
    }
    
    return(
        
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    {roomId?<RoomCode code = {roomId}/> : <div /> }
                    {/* <RoomCode code = {roomId}/> */}     

                    {user?(
                    <>
                        <div className="user-info">
                            <img src={user.avatar} alt= {user.name} />
                            <div>
                            <span>{user.name}</span> 
                            <div>
                                <button
                                    type= "button"
                                    onClick = {()=>handleDashboard()}
                                    >
                                Salas criadas
                                </button>          
                                <button
                                    type= "button"
                                    onClick = {()=>signOutGoogleAccount()}
                                    >
                                Sair
                                </button>
                            </div>
                            </div>
                        </div>
                    </>
                    ):(
                        <div>
                            <button 
                            onClick = {()=>handleSignWithGoogle()}
                             className= "create-room">
                            <img src= { googleIconImg } alt = "Logo do Google" />
                            Faça o Login com Google
                        </button>
                        </div>
                    )
                    }
                
                </div>
            </header>
        
    );
}