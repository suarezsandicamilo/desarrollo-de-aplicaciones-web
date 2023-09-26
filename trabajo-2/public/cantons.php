<?php
$province = $_GET['province'];

$cantons = array();

switch ($province) {
    case 1: // San José
        $cantons = array(
            array('id' => 1, 'name' => 'San José'),
            array('id' => 2, 'name' => 'Escazú'),
            array('id' => 3, 'name' => 'Desamparados'),
            array('id' => 4, 'name' => 'Puriscal')
        );
        break;
    case 2: // Alajuela
        $cantons = array(
            array('id' => 1, 'name' => 'Alajuela'),
            array('id' => 2, 'name' => 'San Ramón'),
            array('id' => 3, 'name' => 'Grecia'),
            array('id' => 4, 'name' => 'San Mateo')
        );
        break;
    case 3: // Cartago
        $cantons = array(
            array('id' => 1, 'name' => 'Cartago'),
            array('id' => 2, 'name' => 'Paraíso'),
            array('id' => 3, 'name' => 'La Unión'),
            array('id' => 4, 'name' => 'Jiménez')
        );
        break;
    case 4: // Heredia
        $cantons = array(
            array('id' => 1, 'name' => 'Heredia'),
            array('id' => 2, 'name' => 'Barva'),
            array('id' => 3, 'name' => 'Santo Domingo'),
            array('id' => 4, 'name' => 'Santa Bárbara')
        );
        break;
}

echo json_encode($cantons);
?>