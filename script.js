document.addEventListener('DOMContentLoaded', () => {
    // Récupération des éléments HTML
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
  
    // Fonction pour ajouter une tâche
    function addTask() {
      const taskValue = taskInput.value.trim();
  
      if (taskValue === '') {
        alert('Veuillez entrer une tâche.');
        return;
      }
  
      // Créer un nouvel élément <li>
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
  
      // Créer une div pour contenir la checkbox et le texte
      const taskContainer = document.createElement('div');
      taskContainer.className = 'd-flex align-items-center';
  
      // Ajouter une checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'form-check-input me-2';
  
      // Ajouter un événement pour barrer le texte lorsqu'il est coché
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          li.classList.add('text-decoration-line-through');
        } else {
          li.classList.remove('text-decoration-line-through');
        }
      });
  
      // Ajouter le texte de la tâche
      const taskText = document.createElement('span');
      taskText.textContent = taskValue;
  
      // Ajouter le texte et la checkbox dans la div
      taskContainer.appendChild(checkbox);
      taskContainer.appendChild(taskText);
  
      // Ajouter le bouton "Supprimer"
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-danger btn-sm';
      deleteBtn.textContent = 'Supprimer';
      deleteBtn.addEventListener('click', () => {
        li.remove();
      });
  
      // Ajouter la div et le bouton "Supprimer" au <li>
      li.appendChild(taskContainer);
      li.appendChild(deleteBtn);
  
      // Ajouter le <li> à la liste des tâches
      taskList.appendChild(li);
  
      // Effacer le champ de saisie
      taskInput.value = '';
    }
  
    // Ajouter un événement au bouton "Ajouter"
    addTaskBtn.addEventListener('click', addTask);
  
    // Permettre l'ajout avec la touche "Entrée"
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTask();
      }
    });
  });
  