<script>
  // Récupération des éléments HTML
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  // Fonction pour ajouter une tâche
  function addTask() {
    // Récupérer la valeur du champ de saisie
    const taskValue = taskInput.value.trim();

    // Vérifier que la tâche n'est pas vide
    if (taskValue === '') {
      alert('Veuillez entrer une tâche.');
      return;
    }

    // Créer un nouvel élément <li>
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.textContent = taskValue;

    // Ajouter un bouton de suppression
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.textContent = 'Supprimer';

    // Événement pour supprimer la tâche
    deleteBtn.addEventListener('click', () => {
      li.remove();
    });

    // Ajouter le bouton au <li> et <li> à la liste
    li.appendChild(deleteBtn);
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
</script>
