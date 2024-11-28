import { useEffect, useState } from "react";
import { Container, Form, InputGroup } from "react-bootstrap";
import service from "../src/service/";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AjoutTache = () => {
  const [tache, setTache] = useState({});
  const [utilisateurs, setUtilisateurs] = useState([]); // Stocker les utilisateurs
  const navigate = useNavigate();

  // Charger les utilisateurs disponibles
  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const response = await service.getAllUtilisateurs();
        setUtilisateurs(response.data); // Stocker les utilisateurs récupérés
      } catch (error) {
        console.log("Erreur lors de la récupération des utilisateurs :", error);
      }
    };

    fetchUtilisateurs();
  }, []);

  const handleChange = (e) => {
    setTache({ ...tache, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.ajoutTache(tache); // Envoyer la tâche avec utilisateur_id
      toast.success("Tâche ajoutée avec succès");
      navigate("/");
    } catch (error) {
      console.log("Erreur lors de l'ajout de la tâche :", error);
      toast.error("Erreur lors de l'ajout de la tâche");
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <h1>Ajout d'une tâche</h1>
      <Form className="col-10 mt-3" onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
          <Form.Control
            placeholder="Description"
            aria-label="Description"
            aria-describedby="basic-addon1"
            onChange={handleChange}
            name="description"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Utilisateur</InputGroup.Text>
          <Form.Select
            name="utilisateur_id"
            onChange={handleChange}
            defaultValue="" // Valeur par défaut vide
          >
            <option value="" disabled>
              Sélectionnez un utilisateur
            </option>
            {utilisateurs.map((utilisateur) => (
              <option key={utilisateur.id} value={utilisateur.id}>
                {utilisateur.prenom} {utilisateur.nom}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
        <Form.Control
          type="submit"
          value="Ajouter"
          className="btn btn-primary"
        ></Form.Control>
      </Form>
    </Container>
  );
};

export default AjoutTache;