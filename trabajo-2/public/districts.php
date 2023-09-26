<?php
if (isset($_GET['province']) && isset($_GET['canton'])) {
    $province = $_GET['province'];

    $canton = $_GET['canton'];

    $districts = array();

    switch ($province) {
        case 1: // San José
            switch ($canton) {
                case 1: // San José
                    $districts = array(
                        array('id' => 1, 'name' => 'Carmen'),
                        array('id' => 2, 'name' => 'Merced'),
                        array('id' => 3, 'name' => 'Hospital'),
                        array('id' => 4, 'name' => 'Catedral')
                    );
                    break;
                case 2: // Escazú
                    $districts = array(
                        array('id' => 1, 'name' => 'Escazú'),
                        array('id' => 2, 'name' => 'San Antonio'),
                        array('id' => 3, 'name' => 'San Rafael'),
                    );
                    break;
                case 3: // Desamparados
                    $districts = array(
                        array('id' => 1, 'name' => 'Desamparados'),
                        array('id' => 2, 'name' => 'San Miguel'),
                        array('id' => 3, 'name' => 'San Juan de Dios'),
                        array('id' => 4, 'name' => 'San Rafael Arriba')
                    );
                    break;
                case 4: // Puriscal
                    $districts = array(
                        array('id' => 1, 'name' => 'Santiago'),
                        array('id' => 2, 'name' => 'Mercedes Sur'),
                        array('id' => 3, 'name' => 'Barbacoas'),
                        array('id' => 4, 'name' => 'Grifo Alto')
                    );
                    break;
            }
            break;

        case 2: // Alajuela
            switch ($canton) {
                case 1: // Alajuela
                    $districts = array(
                        array('id' => 1, 'name' => 'Alajuela'),
                        array('id' => 2, 'name' => 'San José'),
                        array('id' => 3, 'name' => 'Carrizal'),
                        array('id' => 4, 'name' => 'San Antonio')
                    );
                    break;
                case 2: // San Ramón
                    $districts = array(
                        array('id' => 1, 'name' => 'San Ramón'),
                        array('id' => 2, 'name' => 'Santiago'),
                        array('id' => 3, 'name' => 'San Juan'),
                        array('id' => 4, 'name' => 'Piedades Norte')
                    );
                    break;
                case 3: // Grecia
                    $districts = array(
                        array('id' => 1, 'name' => 'Grecia'),
                        array('id' => 2, 'name' => 'San Isidro'),
                        array('id' => 3, 'name' => 'San José'),
                        array('id' => 4, 'name' => 'San Roque')
                    );
                    break;
                case 4: // San Mateo
                    $districts = array(
                        array('id' => 1, 'name' => 'San Mateo'),
                        array('id' => 2, 'name' => 'Desmonte'),
                        array('id' => 3, 'name' => 'Jesús María'),
                        array('id' => 4, 'name' => 'Labrador')
                    );
                    break;
            }
            break;

        case 3: // Cartago
            switch ($canton) {
                case 1: // Cartago
                    $districts = array(
                        array('id' => 1, 'name' => 'Oriental'),
                        array('id' => 2, 'name' => 'Occidental'),
                        array('id' => 3, 'name' => 'Carmen'),
                        array('id' => 4, 'name' => 'San Nicolás')
                    );
                    break;
                case 2: // Paraíso
                    $districts = array(
                        array('id' => 1, 'name' => 'Paraíso'),
                        array('id' => 2, 'name' => 'Santiago'),
                        array('id' => 3, 'name' => 'Orosi'),
                        array('id' => 4, 'name' => 'Cachí')
                    );
                    break;
                case 3: // La Unión
                    $districts = array(
                        array('id' => 1, 'name' => 'Tres Ríos'),
                        array('id' => 2, 'name' => 'San Diego'),
                        array('id' => 3, 'name' => 'San Juan'),
                        array('id' => 4, 'name' => 'San Rafael')
                    );
                    break;
                case 4: // Jiménez
                    $districts = array(
                        array('id' => 1, 'name' => 'Juan Viñas'),
                        array('id' => 2, 'name' => 'Tucurrique'),
                        array('id' => 3, 'name' => 'Pejibaye'),
                        array('id' => 4, 'name' => 'La Victoria')
                    );
                    break;
            }
            break;

        case 4: // Heredia
            switch ($canton) {
                case 1: // Heredia
                    $districts = array(
                        array('id' => 1, 'name' => 'Heredia'),
                        array('id' => 2, 'name' => 'Mercedes'),
                        array('id' => 3, 'name' => 'San Francisco'),
                        array('id' => 4, 'name' => 'Ulloa')
                    );
                    break;
                case 2: // Barva
                    $districts = array(
                        array('id' => 1, 'name' => 'Barva'),
                        array('id' => 2, 'name' => 'San Pedro'),
                        array('id' => 3, 'name' => 'San Pablo'),
                        array('id' => 4, 'name' => 'San Roque')
                    );
                    break;
                case 3: // Santo Domingo
                    $districts = array(
                        array('id' => 1, 'name' => 'Santo Domingo'),
                        array('id' => 2, 'name' => 'San Vicente'),
                        array('id' => 3, 'name' => 'San Miguel'),
                        array('id' => 4, 'name' => 'Paracito')
                    );
                    break;
                case 4: // Santa Bárbara
                    $districts = array(
                        array('id' => 1, 'name' => 'Santa Bárbara'),
                        array('id' => 2, 'name' => 'San Pedro'),
                        array('id' => 3, 'name' => 'San Juan'),
                        array('id' => 4, 'name' => 'Jesús')
                    );
                    break;
            }
            break;
    }

    echo json_encode($districts);
}
?>