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

	$first = htmlspecialchars(strip_tags($_POST['firstName']));
	$last = htmlspecialchars(strip_tags($_POST['lastName']));
	$job = htmlspecialchars(strip_tags($_POST['jobTitle']));
	$dept = htmlspecialchars(strip_tags($_POST['deptID']));
    $email = htmlspecialchars(strip_tags($_POST['email']));
    $id = htmlspecialchars(strip_tags($_GET['id']));

    $query = 'UPDATE personnel SET firstName = "' . $first . '", lastName = "' . $last . '", jobTitle = "' . $job . '", departmentID = "' . $dept . '", email = "' . $email . '" WHERE id = "' .$id. '" ';

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

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = [];
	
	mysqli_close($conn);

    echo json_encode($output); 

?>