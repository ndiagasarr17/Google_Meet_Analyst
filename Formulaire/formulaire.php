<?php
  // Vérifie qu'il provient d'un formulaire
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    if (!isset($rep)){
      die("remplisser le formulaire");
    }
    
  // Vérifie qu'il provient d'un formulaire
 
    //identifiants mysql
    $host = "localhost";
    $username = "root";
    $password = "";
    $database = "googlemeetanalyser";

    $rep = $_POST["rep"];
    $rep1 = $_POST["rep1"];
    $rep2 = $_POST["rep2"];
    $rep3 = $_POST["rep3"];
    $rep4 = $_POST["rep4"];
    $rep5 = $_POST["rep5"];
    $rep6 = $_POST["rep6"];
    $rep7 = $_POST["rep7"];
    $rep8 = $_POST["rep8"];
    $rep9 = $_POST["rep9"];
    $suggest = $_POST["suggest"];
    $rep10 = $_POST["rep10"];
    $rep11 = $_POST["rep11"];
    $rep12 = $_POST["rep12"];
    $rep13 = $_POST["rep13"];
    $rep14 = $_POST["rep14"];
    $rep15 = $_POST["rep15"];
    $rep16 = $_POST["rep16"];
    $rep17 = $_POST["rep17"];

    //Ouvrir une nouvelle connexion au serveur MySQL
    $conn = mysqli_connect($host, $username, $password, $database);
    // Check connection
    if (!$conn) {
        die("Échec de la connexion : " . mysqli_connect_error());
    }
    echo "Connexion réussie";

    $sql = "INSERT INTO `reponses` (`quest1`, `quest2`, `quest3`, `quest4`, `quest5`, `quest6`, `quest7`, `quest8`, `quest9`, `quest10`, `quest11`, `quest12`, `quest13`, `quest14`, `quest15`, `quest16`, `quest17`, `suggest`) VALUES ('$rep', '$rep1', '$rep2', '$rep3', '$rep4', '$rep5', '$rep6', '$rep7', '$rep8', '$rep9', '$rep10', '$rep11', '$rep12', '$rep13', '$rep14', '$rep15', '$rep16', '$suggest')";
    if (mysqli_query($conn,$sql)) {
        echo "Nouveau enregistrement créé avec succès";
    } else {
        echo "Erreur : " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
  }
?>