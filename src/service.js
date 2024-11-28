import axios from "axios";

// Récupérer tous les utilisateurs
function getAllUtilisateurs() {
  return axios.get("http://localhost:3000/api/utilisateurs/getAllUtilisateurs");
}

// Récupérer toutes les tâches
function getAllTaches() {
  return axios.get("http://localhost:3000/api/taches/taches");
}

// Ajouter une tâche
function ajoutTache(tache) {
  return axios.post("http://localhost:3000/api/taches/ajout", tache);
}

// Supprimer une tâche
function supprimerTache(tacheId) {
  return axios.delete("http://localhost:3000/api/taches/delete/" +tacheId);
}

// Mettre à jour une tâche
function miseajourTache(tacheId, tacheData) {
  return axios.patch("http://localhost:3000/api/taches/update/" +tacheId, tacheData);
}

// Ajout Utilisateur

function ajoutUtilisateur(data) {
  return axios.post("http://localhost:3000/api/utilisateurs/add", data)
}

// modifier tache

function modifierTache(id, updateData) {
  return axios.patch("http://localhost:3000/api/taches/update/" + id, updateData)
}





export default {
  getAllUtilisateurs,
  getAllTaches,
  ajoutTache,
  supprimerTache,
  miseajourTache,
  ajoutUtilisateur,
  modifierTache
};