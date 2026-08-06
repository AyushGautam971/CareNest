import { createContext, useState,useEffect } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext();
const AppContextProvider = (props) =>{

   const currencySymbol = '$'
   const backendUrl =
  import.meta.env.VITE_BACKEND_URL ;
     const [doctors,setDoctors]  = useState([]) 
     const [token,setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'):false)

     const [userData,setUserData] = useState(false)



    const getDoctorsdata = async () =>{
        try{
            const {data} = await axios.get( `${backendUrl}/api/doctor/list`)
           
        //  console.log(data)
            if(data.success){
                setDoctors(data.doctors)
            }
           
        }
        catch(err){
              console.log(err)
            //  toast.error(err.message)
        }
    }

      const loadUserProfileData = async() => {
          try{
           console.log(`${backendUrl}/api/user/get-profile`)
              const {data } = await axios.get( `${backendUrl}/api/user/get-profile`,{headers:{token}})
                //  console.log(data)
              if(data.success){

                setUserData(data.userData)
              }
             
          }
          catch(err){
           console.log(err)
            //  toast.error(err.message)
          }
      }

      
     const value = {
      doctors, getDoctorsdata,
      currencySymbol,
      token,setToken,
      backendUrl,
      userData,setUserData,
      loadUserProfileData
    }
    useEffect(()=>{
       getDoctorsdata()
    },[])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }
        else{
              setUserData(false)
        }
    },[token])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
 export default AppContextProvider;


