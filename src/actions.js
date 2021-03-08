import { firebaseapp } from "./firebase";
import * as firebase from 'firebase';
import "firebase/firestore";

const db = firebase.firestore(firebaseapp)

export const getCollection = async(collection)=>{
    const result = { statusRespose : false, data : null, error: null}
    try {
        const data = await db.collection(collection).get()
        const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
        result.statusRespose = true
        result.data = arrayData
        
    } catch (error) {
        result.error = error
    }
    return result
}

export const addDocument = async(collection, data) =>{
    const result = { statusRespose : false, data : null, error: null}
    try {
        const response = await db.collection(collection).add(data)
        result.data = { id: response.id}
        result.statusRespose = true
    } catch (error) {
        result.error = error
    }
    return result
}

export const getDocument = async(collection, id)=>{
    const result = { statusRespose : false, data : null, error: null}
    try {
        const response = await db.collection(collection).doc(id).get()
        result.data = {id: response.id, ...response.data()}
        result.statusRespose = true        
    } catch (error) {
        result.error = error
    }
    return result
}
export const updateDocument = async(collection, id, data)=>{
    const result = { statusRespose : false, error: null}
    try {
        await db.collection(collection).doc(id).update(data)     
        result.statusRespose = true        
    } catch (error) {
        result.error = error
    }
    return result
}
export const deleteDocument = async(collection, id)=>{
    const result = { statusRespose : false, error: null}
    try {
        await db.collection(collection).doc(id).delete()  
        result.statusRespose = true        
    } catch (error) {
        result.error = error
    }
    return result
}