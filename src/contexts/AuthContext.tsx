
import { createContext ,ReactNode, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { auth,firebase } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
  type AuthContextType = {
    user: User |undefined;
    signWithGoogle: () => Promise<void>;
    signOutGoogleAccount: () =>Promise<void>;
  }

  type AuthContextProviderProps ={
      children:ReactNode;
  }
export const AuthContext  = createContext({}as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps){

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user =>{
          if(user){
    
              const {displayName,photoURL,uid} = user
    
              if(!displayName || !photoURL){
                throw new Error('Missing information from GoogleAccount.');
            }
            
            setUser({
              id:uid,
              name:displayName,
              avatar: photoURL
            })
          }
        })
        return()=>{
          unsubscribe();
        }
      },[]);
      const history = useHistory();
    
      const [user,setUser] = useState<User>();
    
      async function signWithGoogle(){
        
    
        const provider = new firebase.auth.GoogleAuthProvider();
    
        const result = await auth.signInWithPopup(provider);
    
            if(result.user){
              const {displayName,photoURL,uid} = result.user
    
              if(!displayName || !photoURL){
                throw new Error('Missing information from GoogleAccount.');
            }
            
            setUser({
              id:uid,
              name:displayName,
              avatar: photoURL
            })
        }
      }

      async function signOutGoogleAccount(){

        
        await firebase.auth().signOut()
        .then(function() {
          console.log('Logout');
        }, function(error) {
          console.error( error );
        });

        history.push('/');
        // window.location.reload();
        
      }

    return(
        <AuthContext.Provider value={{user,signWithGoogle,signOutGoogleAccount}}>
            {props.children}
        </AuthContext.Provider>

    )
}