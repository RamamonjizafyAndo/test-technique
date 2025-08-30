## Exercice 1 - Node.js

### Pour l'exécuter
node index.js

---

## Exercice 2 - React

### Pour l'exécuter
npm install
npm run dev

---

## Exercice 3 - Firebase

### Approche utilisée
1. Exécution de deux requêtes en parallèle :  
   - Messages envoyés (\`senderId == userId\`).  
   - Messages reçus (\`receiverId == userId\`).  
2. Tri par \`timestamp DESC\`.  
3. Fusion des résultats en mémoire via une \`Map\`, en gardant uniquement le dernier message par conversation.  

### Indexation requise
Pour optimiser les requêtes Firestore, il faut deux index composites :
- \`(senderId, timestamp DESC)\`  
- \`(receiverId, timestamp DESC)\`  

### Pourquoi c’est efficace
- Les requêtes s’appuient sur des index Firestore.  
- Les deux requêtes tournent en parallèle, réduisant la latence.  
- Le traitement est minimal en mémoire (Map pour filtrer).  
- Scalable même avec un grand volume de données.  
- Coût Firestore optimisé (moins de lectures inutiles).  

### Pour l'exécuter
npm install
npm run dev

---