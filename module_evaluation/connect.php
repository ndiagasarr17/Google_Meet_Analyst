<?php

	$dsn = 'mysql:host = localhost; dbname = googlemeetanalyser';
	$username = 'username';
	$password = 'password';
	$port = 3337;


	try{

		$connection = new PDO($dsn,$username,$password,$port);
		echo 'connection reussie!';

	}catch(PDOException $e)


?>
