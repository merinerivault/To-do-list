//Debut Frontend

// URL de l'API
const apiUrl = 'http://localhost:3000/api/tasks';

// Fonction pour récupérer et afficher les tâches
function fetchTasks() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(tasks => {
      const taskList = document.getElementById('task-list');
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        taskList.appendChild(li);
      });
    })
    .catch(error => console.error('Erreur lors de la récupération des tâches:', error));
}

// Appel de la fonction pour récupérer les tâches au chargement de la page
document.addEventListener('DOMContentLoaded', fetchTasks);

document.addEventListener('DOMContentLoaded', () => {
  // Récupération des éléments HTML
  const taskInput = document.getElementById('taskInput'); // Champ de saisie pour la tâche
  const addTaskBtn = document.getElementById('addTaskBtn'); // Bouton "Ajouter"
  const taskList = document.getElementById('taskList'); // Liste des tâches

  // Charger les tâches depuis le backend au démarrage
  loadTasks();

  // Fonction pour charger les tâches depuis le backend
  async function loadTasks() {
      try {
          const response = await fetch('http://localhost:3000/api/tasks'); // Appel à l'API backend
          const tasks = await response.json();

          if (!response.ok) {
              throw new Error(tasks.error || 'Erreur lors du chargement des tâches');
          }

          // Vider la liste des tâches avant d'en ajouter de nouvelles
          taskList.innerHTML = '';

          // Afficher chaque tâche dans la liste
          tasks.forEach(task => {
              const li = createTaskElement(task.id, task.text, task.completed);
              taskList.appendChild(li);
          });
      } catch (err) {
          console.error('Erreur lors du chargement des tâches :', err.message);
      }
  }

  // Fonction pour ajouter une tâche
  async function addTask() {
      const taskValue = taskInput.value.trim();

      if (taskValue === '') {
          alert('Veuillez entrer une tâche.');
          return;
      }

      try {
          const response = await fetch('http://localhost:3000/api/tasks', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text: taskValue, completed: false }),
          });

          const result = await response.json();

          if (!response.ok) {
              throw new Error(result.error || 'Erreur lors de l\'ajout de la tâche');
          }

          // Ajouter la nouvelle tâche au DOM
          const li = createTaskElement(result.id, taskValue, false);
          taskList.appendChild(li);
          taskInput.value = ''; // Réinitialiser le champ de saisie
      } catch (err) {
          console.error('Erreur lors de l\'ajout de la tâche :', err.message);
      }
  }

  // Fonction pour créer un élément de tâche
  function createTaskElement(id, text, completed) {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.dataset.id = id;

      // Ajouter la checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'form-check-input me-2';
      checkbox.checked = completed;
      checkbox.addEventListener('change', () => updateTask(id, text, checkbox.checked));

      // Ajouter le texte de la tâche
      const taskText = document.createElement('span');
      taskText.textContent = text;

      // Ajouter le bouton "Supprimer"
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-danger btn-sm';
      deleteBtn.textContent = 'Supprimer';
      deleteBtn.addEventListener('click', () => deleteTask(id));

      // Ajouter les éléments à la tâche
      li.appendChild(checkbox);
      li.appendChild(taskText);
      li.appendChild(deleteBtn);

      return li;
  }

  // Fonction pour mettre à jour une tâche
  async function updateTask(id, text, completed) {
      try {
          const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text, completed }),
          });

          if (!response.ok) {
              const result = await response.json();
              throw new Error(result.error || 'Erreur lors de la mise à jour de la tâche');
          }

          console.log(`Tâche avec l'ID ${id} mise à jour.`);
      } catch (err) {
          console.error('Erreur lors de la mise à jour de la tâche :', err.message);
      }
  }

  // Fonction pour supprimer une tâche
  async function deleteTask(id) {
      try {
          const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
              method: 'DELETE',
          });

          if (!response.ok) {
              const result = await response.json();
              throw new Error(result.error || 'Erreur lors de la suppression de la tâche');
          }

          // Supprimer la tâche du DOM
          const taskElement = taskList.querySelector(`li[data-id="${id}"]`);
          if (taskElement) taskElement.remove();

          console.log(`Tâche avec l'ID ${id} supprimée.`);
      } catch (err) {
          console.error('Erreur lors de la suppression de la tâche :', err.message);
      }
  }

  // Écouter les événements sur le bouton "Ajouter"
  addTaskBtn.addEventListener('click', addTask);

  // Permettre l'ajout avec la touche "Entrée"
  taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          addTask();
      }
  });
});

// Fin frontend

  