import { useEffect, useState, useReducer } from "react"
import { projectFirestore, timestamp } from "../firebase/config"

const initialState = {
	document: null,
	isPending: false,
	error: null,
	success: false,
}

function firestoreReducer(state, action) {
	switch (action.type) {
		case "IS_PENDING":
			return { isPending: true, document: null, error: null, success: false }
		case "ADDED_DOCUMENT":
			return { isPending: false, document: action.payload, error: null, success: true }
		case "DELETED_DOCUMENT":
			return { isPending: false, document: null, error: null, success: true }
		case "ERROR":
			return { success: false, isPending: false, document: null, error: action.payload }
		default:
			return state
	}
}

export function useFirestore(collection) {
	const [response, dispatch] = useReducer(firestoreReducer, initialState)
	const [isCancelled, setIsCancelled] = useState(false)

	const ref = projectFirestore.collection(collection)

	function dispatchIfNotCancelled(action) {
		if (!isCancelled) {
			dispatch(action)
		}
	}

	async function addDocument(doc) {
		dispatch({ action: "IS_PENDING" })

		try {
			const createdAt = timestamp.fromDate(new Date())
			const addedDocument = await ref.add({ ...doc, createdAt })
			dispatchIfNotCancelled({ action: "ADDED_DOCUMENT", payload: addedDocument })
		} catch (err) {
			dispatchIfNotCancelled({ action: "ERROR", payload: err.message })
		}
	}
	async function deleteDocument(id) {
		dispatch({ action: "IS_PENDING" })

		try {
			await ref.doc(id).delete()
			dispatchIfNotCancelled({ action: "DELETED_DOCUMENT" })
		} catch (err) {
			dispatchIfNotCancelled({ action: "ERROR", payload: "Could not delete" })
		}
	}

	useEffect(() => {
		return () => setIsCancelled(true)
	}, [])

	return { addDocument, deleteDocument, response }
}
