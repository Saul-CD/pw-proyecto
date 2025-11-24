import { db } from "./firebase-config.js";
import {
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    startAfter,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export const Store = {
    productos: [],

    // C
    agregar: async (data) => await addDoc(collection(db, "productos"), data),
    // R
    cargar: async (reset = false) => {
        if (reset) Store.productos = [];

        let q = query(collection(db, "productos"));

        const snap = await getDocs(q);
        if (snap.empty) return [];

        const newProds = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        Store.productos = [...Store.productos, ...newProds];
        return newProds;
    },
    // U
    actualizar: async (id, data) => await updateDoc(doc(db, "productos", id), data),
    // D
    eliminar: async (id) => await deleteDoc(doc(db, "productos", id)),
};
