import { useContext } from "react";
import DindinContext from "../context/dindinContext";

function useDindin() {
    return useContext(DindinContext)
}

export default useDindin;