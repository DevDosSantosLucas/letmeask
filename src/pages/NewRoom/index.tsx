import {Link, useHistory} from 'react-router-dom';
import {FormEvent, useState} from 'react';

import {SketchPicker} from 'react-color';

import ilustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import roomImg from '../../assets/images/room.png';

import { Button } from '../../components/Button';

import {useAuth} from '../../hooks/useAuth';

import '../../styles/auth.scss';
import { database } from '../../services/firebase';
import firebase from 'firebase/app';


// type UserRoomsType = {
//     key:string
//     id: string;
//     authorId: string;
//     author: {
//         name:string;
//         avatar: string;
//     }
//     title: string;
// }

type UserRoomsType = {
    key:{
    authorId: string;
    author: {
        name:string;
        avatar: string;
    }
    title: string;
    colorPage:string;
    }
}


export function NewRoom(){
    let test;
    const {user} = useAuth();
    const history = useHistory();
    const [newRoom,setNewRoom] = useState('');
    const [isSellectedButtonViewRoom,setIsSellectedButtonViewRoom] = useState(false);
    const [isSellectedButtonCreateRoom,setIsSellectedButtonCreateRoom] = useState(false);


    const [colorPage,setColorPage] = useState("#f5f5f5")
    const [userRooms,setUserRooms] = useState({}as UserRoomsType);
    
    function handleEditRoom(){
        setIsSellectedButtonCreateRoom(true)
    }
    function handleBackChooseButtons(){
        setIsSellectedButtonCreateRoom(false)
    }

    async function handleCreatedYourRoom(){
        console.log("TESTE -----------------TESTE")


  
            // const dbRef = database.ref('rooms')
            
            // dbRef.get()
            // .then((snapshot) => {
            //     if (snapshot.exists()) {
            //     console.log(snapshot.val());


            //     setUserRooms(snapshot.val())


            //     } else {
            //     console.log("No data available");
            //     }
            // }).catch((error) => {
            //     console.error(error);
            // });

        database.ref().child("rooms").on("value",(snap) => {
            if(snap.val() !== null) {
                // setUserRooms({
                //     ...snap.val(),
                // });
                setUserRooms(snap.val())
                console.log(snap.val())
            
            }else{
                console.log("Fail")
            }
        })
  
      


        setIsSellectedButtonViewRoom(true);


    }

    async function handleCreateRoom(event: FormEvent){
        if(newRoom ==='' || colorPage=== ''){
            
            alert("necess??rio preencher os Campos!")
            
        }else{

        event.preventDefault();

        if(newRoom.trim()==='') {
            return;
        }


        const roomRef =  database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title : newRoom,
            authorId: user?.id,
            colorPage: colorPage,
        });

        history.push(`/admin/rooms/${firebaseRoom.key}`)
    }

    }

    return(
        <div id ="page-auth">
            <aside>
                {!isSellectedButtonViewRoom? (
                <>
                    <img src={ilustrationImg} alt = "Ilustra????o simbolizando perguntas e respostas" />
                    <strong>Crie salas de Q&amp;A ao-vivo</strong>
                    <p>Tire as d??vidas da sua audi??ncia em tempo-real</p>
                </>
                ):(
                    <div>
                    <strong>Salas Criadas:</strong>

                    {Object.keys(userRooms).map((id,index) =>{
                        return(
                            <tr key ={id}>
                                <th scope ="row"> {index +1 }</th>
                                {/* <td>{userRooms[id].title}</td> */}
                                <td>{userRooms.key}</td>
                                <td>{userRooms.key.title}</td>

                           
                            </tr>
                        )
                    })}
                    

                    </div>
                )
                }
            </aside>
            <main>
                <div className = "main-content">
                    
                {!isSellectedButtonCreateRoom? (
                    <>

                        <img src = {logoImg} alt="Letmeask" />
                        <div>
                            
                    <h1>Ol?? {user?.name}</h1>
                        <button
                        type = "button"
                        onClick = {()=>handleCreatedYourRoom()}
                        >
                            <div>
                                <img src={roomImg} alt="icon room" />
                            </div>
                            <span>Ver salas criadas</span> 
                        </button>
                            <span> OU </span>
                        <button type = "button" 
                        onClick = {()=>handleEditRoom()}
                        >
                            <div>
                            <img src="https://img.icons8.com/ios/50/000000/plus-math.png"/>
                            </div>
                            <span> Criar uma nova sala </span>
                        </button>     
                        </div> 
                        </>
                    ):(

                    <>
                    <div>
                    <button
                        type ="button"
                        onClick = {()=>handleBackChooseButtons()}
                        >
                            <div>
                            <img src="https://img.icons8.com/ios/50/000000/undo.png"/>
                            </div>
                            <span>Voltar</span>
                        </button>
                        </div> 
                    <form onSubmit ={handleCreateRoom}>
                        <input
                          type="text" 
                         placeholder = "Nome da sala"
                         onChange ={ event =>setNewRoom(event.target.value)}
                         value = {newRoom}
                        />
                        <div>
                        <span>Escolha a cor de fundo da sua p??gina:</span>
                        </div>
                        
                        <SketchPicker 
                            color = {colorPage}
                            onChangeComplete= {(color)=>{setColorPage(color.hex)}}
                        />
   
                        <div style = {{
                            backgroundColor: colorPage}}>
                            {colorPage} 
                        </div>
                        <Button type = "submit" > 
                           Criar sala
                        </Button>
                    </form>
                    </>
                )}
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
                    </p>
                
                </div>
            </main>

        </div>
    );
}