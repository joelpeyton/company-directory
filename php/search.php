<?php
	// remove next two lines for production
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($host, $username, $password, $dbName);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}	
	
	$query = 'SELECT p.id, p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, l.name as location FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID)'; 

	if (isset($_GET['lastName'])) {
		$lastName = htmlspecialchars(strip_tags($_GET['lastName']));
		$query.= ' WHERE p.lastName REGEXP \'^' . $lastName . '\'';
		$query.= 'ORDER BY p.lastName, p.firstName, d.name, l.name';
	}
	
	if (isset($_GET['deptID'])) {
		$deptID = htmlspecialchars(strip_tags($_GET['deptID']));
		$query.= ' WHERE d.id = "' . $deptID . '"';
		$query.= 'ORDER BY p.lastName, p.firstName, d.name, l.name';
	}

	if (isset($_GET['location'])) {
		$location = htmlspecialchars(strip_tags($_GET['location']));
		$query.= ' WHERE l.id = "' . $location . '"';
		$query.= 'ORDER BY p.lastName, p.firstName, d.name, l.name';
	}

	$result = $conn->query($query);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

    }
    
    $data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $data;
	
	mysqli_close($conn);

    echo json_encode($output);/*

?>