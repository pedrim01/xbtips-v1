import {useContext} from 'react'
import AuthFirebaseContext from '../context/AuthFirebaseContext'

const useAuthFirebase = () => useContext(AuthFirebaseContext)

export default useAuthFirebase