import { useState } from "react";
import { Container, Form, InputGroup, Button } from "react-bootstrap";
import service from "../src/service"; // Assurez-vous que le service a une méthode ajoutUtilisateur
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AjoutUtilisateur = () => {
    const [utilisateur, setUtilisateur] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUtilisateur({ ...utilisateur, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await service.ajoutUtilisateur(utilisateur);
            console.log(utilisateur);
             
            toast.success("Utilisateur ajouté avec succès !");
            navigate("/"); 
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur :", error);
            toast.error("Erreur lors de l'ajout de l'utilisateur.");
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center">
            <h1>Ajout d'un utilisateur</h1>
            <Form className="col-10 mt-3" onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Nom</InputGroup.Text>
                    <Form.Control
                        placeholder="Nom"
                        name="nom"
                        onChange={handleChange}
                        required
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Prénom</InputGroup.Text>
                    <Form.Control
                        placeholder="Prénom"
                        name="prenom"
                        onChange={handleChange}
                        required
                    />
                </InputGroup>
                <Button type="submit" variant="primary">
                    Ajouter
                </Button>
            </Form>
        </Container>
    );
};

export default AjoutUtilisateur;