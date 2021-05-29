-- Trigger a revoir 
-- verifier les param
DELIMITER $$
CREATE TRIGGER "Evaluation" 
AFTER INSERT ON meetseance
 FOR EACH ROW 
 
SET @NoteEvaluation =-- resutat evaluation; 
SET @IdEtudiant
SET @IdSeance
SET @suggestion
INSERT INTO evaluation 
VALUES (@IdEtudiant, @IdSeance, @NoteEvaluation, @suggestion);
END
$$
DELIMITER ;

