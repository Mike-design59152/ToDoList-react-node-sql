import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import service from "../src/service";
import { useNavigate, useParams } from "react-router-dom";

const ModifierTache = () => {
  const [tache, setTache] = useState(null);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [utilisateurId, setUtilisateurId] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Charger la tâche spécifique
    const fetchTache = async () => {
      try {
        const response = await service.getAllTaches();
        const tacheData = response.data.find((tache) => tache.id === parseInt(id));
        if (tacheData) {
          setTache(tacheData);
          setDescription(tacheData.description);
          setUtilisateurId(tacheData.utilisateur_id); // Pré-sélectionner l'utilisateur
        }
      } catch (error) {
        console.log("Erreur lors du chargement de la tâche", error);
      }
    };

    // Charger tous les utilisateurs
    const fetchUtilisateurs = async () => {
      try {
        const response = await service.getAllUtilisateurs();
        setUtilisateurs(response.data);
      } catch (error) {
        console.log("Erreur lors du chargement des utilisateurs", error);
      }
    };

    fetchTache();
    fetchUtilisateurs();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mettre à jour la tâche avec la nouvelle description et utilisateur
      await service.modifierTache(id, { description, utilisateur_id: utilisateurId });
      navigate("/"); // Rediriger vers la page d'accueil après la mise à jour
    } catch (error) {
      console.log("Erreur lors de la mise à jour de la tâche", error);
    }
  };

  if (!tache) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Modifier la tâche</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="utilisateur_id">
          <Form.Label>Utilisateur</Form.Label>
          <Form.Control
            as="select"
            value={utilisateurId}
            onChange={(e) => setUtilisateurId(e.target.value)}
            required
          >
            <option value="">Sélectionner un utilisateur</option>
            {utilisateurs.map((utilisateur) => (
              <option key={utilisateur.id} value={utilisateur.id}>
                {utilisateur.prenom} {utilisateur.nom}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Sauvegarder
        </Button>
      </Form>
    </div>
  );
};

export default ModifierTache;