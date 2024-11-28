import { Container, Card, Button } from "react-bootstrap";
import service from "../src/service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [taches, setTaches] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const navigate = useNavigate();

  // Récupérer toutes les tâches
  const fetchtaches = async () => {
    try {
      const response = await service.getAllTaches();      
      
      setTaches(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Récupérer tous les utilisateurs
  const fetchutilisateurs = async () => {
    try {
      const response = await service.getAllUtilisateurs();
      setUtilisateurs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Mettre à jour le statut d'une tâche (Terminer)
  const handleTerminer = async (id) => {
    try {
      // Mettre à jour dans la base de données
      await service.miseajourTache(id, { statut: "Terminée" });
  
      // Mettre à jour localement l'état des tâches
      const updatedTaches = taches.map((tache) =>
        tache.id === id ? { ...tache, statut: "Terminée" } : tache
      );
      setTaches(updatedTaches);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };
  
  
  
  // Supprimer une tâche
  const handleSupprimer = async (id) => {
    try {
      await service.supprimerTache(id);

      const updatedTaches = taches.filter((tache) => tache.id !== id);
      setTaches(updatedTaches);

      console.log(`Tâche ${id} supprimée`);
    } catch (error) {
      console.log("Erreur lors de la suppression de la tâche :", error);
    }
  };

  // Charger les tâches et les utilisateurs au démarrage du composant
  useEffect(() => {
    fetchtaches();
    fetchutilisateurs();
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">To-Do-List</h1>
      <div className="d-flex flex-wrap gap-3 justify-content-center mb-5">
      <Button
        variant="outline-primary"
        onClick={() => navigate("/ajout")}
      
      >
        Ajouter tâche
      </Button>

      <Button
                    variant="outline-secondary"
                    onClick={() => navigate("/add")} // Redirection pour ajouter un utilisateur
                >
                    Ajouter Utilisateur
                </Button>
              </div>  

      <div className="d-flex flex-wrap gap-4 justify-content-center">
        {taches.map((tache) => {
          // Trouver l'utilisateur correspondant
          const utilisateur = utilisateurs.find(
            (user) => user.id === tache.utilisateur_id
          );

          return (
            <Card style={{ width: "30rem" }} className="shadow-lg border-light rounded p-3 text-center" key={tache.id}>
              <Card.Body>
                <Card.Title  className={
                    tache.statut === "Terminée"
                      ? "text-decoration-line-through text-muted"
                      : "text-primary"
                  }>{tache.description}</Card.Title>
                <Card.Text>
                  <strong>Statut :</strong> {tache.statut}
                </Card.Text>
                <Card.Text>
                  <strong>Utilisateur :</strong>{" "}
                  {utilisateur ? utilisateur.prenom : "Utilisateur inconnu"}
                </Card.Text>

                <div className="d-flex justify-content-center flex-wrap gap-5">
                  <Button
                    variant="outline-success"
                    onClick={() => handleTerminer(tache.id)}
                    disabled={tache.statut === "Terminée"}
                  >
                    Terminer
                  </Button>

                  <Button
                    variant="outline-danger"
                    onClick={() => handleSupprimer(tache.id)}
                    disabled={tache.statut !== "Terminée"}  // Désactiver si le statut n'est pas "Terminée"
                  >
                    Supprimer
                  </Button>
                  <Button
        variant="outline-warning"
        onClick={function() { navigate('/modifier/' + tache.id); }}
      >
        Modifier
      </Button>




                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </Container>
  );
};

export default HomePage;