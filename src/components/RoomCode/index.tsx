import toast, { Toaster } from 'react-hot-toast';
import copyImg from '../../assets/images/copy.svg';

import './styles.scss';
 
type RoomCodeProps = {
    code: string;
}


export function RoomCode(props: RoomCodeProps){

    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code)
       
            
            toast.success('Copiado!')
            
        
     
    }

    return(
        <>
        <button
        className = "room-code"
        onClick ={copyRoomCodeToClipboard}
        >       
            <div title ="COPIE O CÓDIGO DA SALA">
                <img src={copyImg} alt="Copy room code" />
                
            </div>
            <span>Sala #{props.code}</span>

        </button>
        <Toaster/>
        </>

    );
}