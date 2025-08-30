const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");

// Configuration Firebase
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// On initialise Firebase seulement si ce n’est pas déjà fait
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Récupère le dernier message de chaque conversation pour un utilisateur donné
async function getLastMessagesForUser(userId) {
  const db = firebase.firestore(); // Accès à Firestore
  
  // Récupère les messages que l'utilisateur a ENVOYÉS
  const sentMessagesQuery = db.collection('messages')
    .where('senderId', '==', userId)
    .orderBy('timestamp', 'desc');
    
  // Récupère les messages que l'utilisateur a REÇUS
  const receivedMessagesQuery = db.collection('messages')
    .where('receiverId', '==', userId)
    .orderBy('timestamp', 'desc');
    
  const [sentSnapshots, receivedSnapshots] = await Promise.all([
    sentMessagesQuery.get(),
    receivedMessagesQuery.get()
  ]);
  
  // Map pour stocker la dernière version de chaque conversation
  const conversationsMap = new Map();
  
  // Parcours des messages envoyés
  sentSnapshots.forEach(doc => {
    const message = { id: doc.id, ...doc.data() };
    const conversationId = message.receiverId;
    
    // On garde le plus récent message
    if (!conversationsMap.has(conversationId) || 
        conversationsMap.get(conversationId).timestamp.toDate() < message.timestamp.toDate()) {
      conversationsMap.set(conversationId, message);
    }
  });
  
  // Parcours des messages reçus
  receivedSnapshots.forEach(doc => {
    const message = { id: doc.id, ...doc.data() };
    const conversationId = message.senderId;
    
    if (!conversationsMap.has(conversationId) || 
        conversationsMap.get(conversationId).timestamp.toDate() < message.timestamp.toDate()) {
      conversationsMap.set(conversationId, message);
    }
  });
  
  // On convertit la Map en tableau classique pour renvoyer la liste
  return Array.from(conversationsMap.values());
}

module.exports = { getLastMessagesForUser };
