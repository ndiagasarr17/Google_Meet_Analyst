

<?php
include "./connect.php";

//rappel /: ----revenir sur les requettes de recuperations 


//l’évolution de la note des séances de chaque matière

public function viewAllnotes($matiere)
{
    $db = new DBconnection();
    $dbConn = $db->getConnection();
    return $dbConn->query("SELECT Evaluation.note FROM Evaluation,Matiere where nomMatiere="$matiere" ORDER BY idSeance DESC");
}

//Le cumul des absences par semaines de chaque étudiant

public function viewAllabscences($matiere)
{
    $db = new DBconnection();
    $dbConn = $db->getConnection();
    return $dbConn->query("SELECT * FROM Evaluation,Matiere where nomMatiere="$matiere" ORDER BY idSeance DESC");
}

//L’évolution de la qualité des connexions de chaque étudiant


public function viewAllqualite($matiere)
{
    $db = new DBconnection();
    $dbConn = $db->getConnection();
    return $dbConn->query("SELECT * FROM Evaluation,Matiere where nomMatiere="$matiere" ORDER BY idSeance DESC");
}


?>