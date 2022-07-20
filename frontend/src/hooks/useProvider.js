import { useState } from "react";

function useProvider() {
    const [users, setUsers] = useState('')
    const [userEdit, setUserEdit] = useState(false)
    const [transaction, setTransaction] = useState([])
    const [categories, setCategories] = useState([])
    const [newOrUpdateTransaction, setNewOrUpdateTransaction] = useState()
    const [idTransaction, setIdTransaction] = useState()
    const [transactionList, setTransactionList] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false)

    return {
        users,
        setUsers,
        userEdit,
        setUserEdit,
        transaction,
        setTransaction,
        categories,
        setCategories,
        newOrUpdateTransaction,
        setNewOrUpdateTransaction,
        idTransaction,
        setIdTransaction,
        transactionList,
        setTransactionList,
        errorMessage,
        setErrorMessage,
        success,
        setSuccess
    }
}
export default useProvider;