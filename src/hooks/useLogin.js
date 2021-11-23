import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export function useLogin() {
	const [isCancelled, setIsCancelled] = useState(false)
	const [error, setError] = useState(null)
	const [isPending, setIsPending] = useState(false)
	const { dispatch } = useAuthContext()

	async function login(email, password) {
		setError(null)
		setIsPending(true)

		try {
			const res = await projectAuth.signInWithEmailAndPassword(email, password)

			dispatch({ type: "LOGIN", payload: res.user })

			if (!isCancelled) {
				setIsPending(false)
				setError(false)
			}
		} catch (err) {
			if (!isCancelled) {
				console.log(err.message)
				setError(err.message)
				setIsPending(false)
			}
		}
	}

	useEffect(() => {
		return () => setIsCancelled(true)
	}, [])

	return { login, error, isPending }
}
