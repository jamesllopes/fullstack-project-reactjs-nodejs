import { createContext } from 'react'
import useProvider from "../hooks/useProvider";

const DindinContext = createContext()

export function DindinProvider(props) {
    const dindinProvider = useProvider()
    return (
        <DindinContext.Provider value={dindinProvider}>{props.children}</DindinContext.Provider>
    )
}

export default DindinContext;