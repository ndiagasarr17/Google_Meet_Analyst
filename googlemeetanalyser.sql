
create database googlemeetanalyser;
use googlemeetanalyser;


CREATE  TABLE Matiere (
    IdMatiere INT PRIMARY KEY,
    NomMatiere VARCHAR(50),
    Coefficient INT
);


CREATE  TABLE Classe (
    CodeClasse VARCHAR(50) PRIMARY KEY,
    NombreEtudiant INT,
    IdMatiere INT,
    CONSTRAINT fk_Classe_Matiere FOREIGN KEY (IdMatiere)
    REFERENCES Matiere (IdMatiere)
);

CREATE TABLE Professeur(
    Matricule VARCHAR (50) PRIMARY KEY,
    NomProf VARCHAR(50),
    PrenomProf VARCHAR(50),
    Email VARCHAR(100),
    CodeClasse VARCHAR(50),
    CONSTRAINT fk_Prof_Classe FOREIGN KEY (CodeClasse)
    REFERENCES Classe (CodeClasse)
);

CREATE TABLE Etudiant (
    IdEtudiant INT PRIMARY KEY,
    NomEtudiant VARCHAR(50),
    PrenomEtudiant VARCHAR(50),
    Email VARCHAR(50)
);

CREATE  TABLE Evaluation (
    IdEtudiant INT primary key,
    IdSeance INT ,
    NombrEvaluation INT,
    CONSTRAINT fk_Eval_Etud FOREIGN KEY (IdEtudiant)
    REFERENCES Etudiant (IdEtudiant),
    CONSTRAINT fk_Eval_Seance FOREIGN KEY (IdSeance)
    REFERENCES Seance (IdSeance)
);


CREATE TABLE `meetseance` (
  `id` varchar(26) NOT NULL,
  `heureDebut` varchar(26) DEFAULT NULL,
  `heureFin` int DEFAULT NULL,
  `partageEcran` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

CREATE TABLE `meetseance` (
  `id` varchar(26) primary key ,
  `heureDebut` varchar(26),
  `heureFin` int,
  `partageEcran` int
)
CREATE TABLE `reponses` (
  `quest1` varchar(4) NOT NULL,
  `quest2` varchar(4) NOT NULL,
  `quest3` varchar(4) NOT NULL,
  `quest4` varchar(4) NOT NULL,
  `quest5` varchar(4) NOT NULL,
  `quest6` varchar(4) NOT NULL,
  `quest7` varchar(4) NOT NULL,
  `quest8` varchar(4) NOT NULL,
  `quest9` varchar(4) NOT NULL,
  `quest10` varchar(4) NOT NULL,
  `quest11` varchar(4) NOT NULL,
  `quest12` varchar(4) NOT NULL,
  `quest13` varchar(4) NOT NULL,
  `quest14` varchar(4) NOT NULL,
  `quest15` varchar(4) NOT NULL,
  `quest16` varchar(4) NOT NULL,
  `quest17` varchar(4) NOT NULL,
  `suggest` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
);

DROP TABLE IF EXISTS `meetusers`;

CREATE TABLE `meetusers` (
  `nbConnexion` int NOT NULL,
  `nbDeconnexion` int NOT NULL,
  `presenceM` varchar(26) DEFAULT NULL,
  `terminalType` varchar(10) DEFAULT NULL,
  `email` varchar(26) DEFAULT NULL,
  `region` varchar(26) DEFAULT NULL,
  PRIMARY KEY (`nbConnexion`,`nbDeconnexion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;



--donnons les privilèges à l'utilisateur Professeur

create user Professeur@'%' idenfied by "passer";
grant select on GoogleAnalyzer.Classe to Professeur@'localhost';
grant all privilèges on GoogleAnalyzer.Seance to Professeur@'localhost';

--donnons les privilèges à l'utilisateur Etudiant

create user Etudiant@'%' idenfied by "passer";
grant select on GoogleAnalyzer.* to Etudiant@'localhost';