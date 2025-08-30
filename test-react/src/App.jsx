import React, { useState } from 'react';

const TodoList = () => {
  // State pour stocker les tâches
  const [tasks, setTasks] = useState([

  ]);

  // State pour le champ de saisie
  const [inputValue, setInputValue] = useState('');

  // State pour stocker l'erreur
  const [error, setError] = useState('');

  // Fonction pour le changement de l'input
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError('');
  };

  // Fonction pour ajout nouvelle tâche
  const addTask = () => {
    // Vérifier si la tâche est vide ou ne contient que des espaces
    if (!inputValue.trim()) {
      setError('La tâche ne peut pas être vide');
      return;
    }

    // Vérifier la longueur maximale
    if (inputValue.length > 50) {
      setError('La tâche ne peut pas dépasser 50 caractères');
      return;
    }

    // Vérifier les doublons (insensible à la casse)
    const taskExists = tasks.some(
      task => task.text.toLowerCase() === inputValue.trim().toLowerCase()
    );

    if (taskExists) {
      setError('Cette tâche existe déjà');
      return;
    }

    setTasks([...tasks, {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false
    }]);
    setInputValue('');
  };

  // Basculer l'état terminé/non terminé d'une tâche
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Vérifier si toutes les tâches sont terminées
  const allTasksCompleted = tasks.length > 0 && tasks.every(task => task.completed);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}
    >
      <div className="todo-list" style={{ margin: "auto", width: "400px", textAlign: "center" }}>
        <h2>Ma Liste de Tâches</h2>

        {/* Formulaire d'ajout de tâche */}
        <div className="add-task-form">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ajouter une nouvelle tâche"
          />
          <button onClick={addTask}>Ajouter</button>
        </div>

        {/* Affichage des erreurs */}
        {error && <p className="error-message">{error}</p>}

        {/* Affichage des tâches ou affichage du message lorsqua les tâches sont terminés */}
        {allTasksCompleted ? (
          <p className="all-completed-message">Toutes les tâches sont terminées</p>
        ) : (
          <ul className="tasks-list">
            {tasks.map(task => (
              <li key={task.id} className={task.completed ? 'completed' : ''}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <span>{task.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default TodoList;