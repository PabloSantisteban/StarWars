"use strict";

$(document).ready(() => {
    //Crear el contenedor principal
    var contenedor = $('<div>').toggleClass('contenedor');

    //Crear el div con clase 'menu'
    var menu = $('<div>').toggleClass('menu');

    //Crear las tarjetas izquierdas
    var tarjetaIzquierda1 = crearTarjeta('Chewbacca', '../img/1.jpeg');
    var tarjetaIzquierda2 = crearTarjeta('Darth Vader', '../img/2.jpeg');

    //Crear la tarjeta centro
    var tarjetaCentro = crearTarjeta('R2-D2', '../img/3.jpeg');

    //Crear las tarjetas derechas
    var tarjetaDerecha1 = crearTarjeta('C-3PO', '../img/4.jpeg');
    var tarjetaDerecha2 = crearTarjeta('YODA', '../img/5.jpeg');

    //Agregar las tarjetas al menú
    menu.append(tarjetaIzquierda1, tarjetaIzquierda2, tarjetaCentro, tarjetaDerecha1, tarjetaDerecha2);

    //Agregar el menú al contenedor principal
    contenedor.append(menu);

    //Agregar el contenedor al body (o al elemento que desees)
    $('body').append(contenedor);

    //Función para crear una tarjeta con título e imagen
    function crearTarjeta(titulo, imagenSrc) {
        var tarjeta = $('<div>').toggleClass('tarjeta');
        var contenido = $('<div>').toggleClass('contenido').append($('<h3>').text(titulo));
        var imagen = $('<img>').attr('src', imagenSrc);

        tarjeta.append(contenido, imagen);

        return tarjeta;
    }

    var persons = $('.tarjeta');

    function personajesInfo(perso) {
        let planeta;

        var url = `${perso.homeworld}`;

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: (JSON) => {
                planeta = JSON.name;

                //Crear un nuevo div con la clase 'info'
                var divInf = $("<div class='info'></div>");

                //Limpiar todos los elementos con la clase 'info' existentes
                $('.info').remove();

                //Agregar párrafos al div con la información del personaje
                $(divInf).append(`<h3>Estadísticas de ${perso.name}</h3>\n<hr>`);
                $(divInf).append(`<p>Altura: ${perso.height} CM</p>`);
                $(divInf).append(`<p>Peso: ${perso.mass} KG</p>`);
                $(divInf).append(`<p>Género: ${perso.gender}</p>`);
                $(divInf).append(`<p>Color de pelo: ${perso.hair_color}</p>`);
                $(divInf).append(`<p>Color de piel: ${perso.skin_color}</p>`);
                $(divInf).append(`<p>Color de ojos: ${perso.eye_color}</p>`);
                $(divInf).append(`<p>Año de nacimiento: ${perso.birth_year}</p>`);
                $(divInf).append(`<p>Planeta: ${planeta}</p>`);

                //Agregar el div al contenedor existente con la clase 'contenedor'
                $('.contenedor').append(divInf);
            },
            error: function (e) {
                console.error("Error al conectar con el JSON: " + e);
            }
        });
    }

    persons.each(function () {
        $(this).click(function () {
            
            var perso = $(this).text();

            var url = `https://swapi.dev/api/people/?search=${perso}&format=json`;

            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: (JSON) => personajesInfo(JSON.results[0]),
                error: function (e) {
                    console.error("Error al conectar con el JSON: " + e);
                }
            });
        });
    });

    $('.tarjeta').each(function (index) {
        var translateX, translateY, rotateZ;

        switch (index) {
            case 0:
                translateX = -300;
                translateY = 30;
                rotateZ = -20;
                break;
            case 1:
                translateX = -150;
                translateY = 0;
                rotateZ = -10;
                break;
            case 2:
                translateX = 0;
                translateY = 0;
                rotateZ = 0;
                break;
            case 3:
                translateX = 150;
                translateY = 0;
                rotateZ = 10;
                break;
            case 4:
                translateX = 300;
                translateY = 30;
                rotateZ = 20;
                break;
            default:
                translateX = 0;
                translateY = 0;
                rotateZ = 0;
                break;
        }
        $(this).css({
            'transform': `translateX(${translateX}px) translateY(${translateY}px) rotateZ(${rotateZ}deg)`
        });
    });

    function crearEstrellaFugaz() {
        const tamañoEstrella = Math.random() * (5 - 1) + 1; //Ajusta el tamaño de las estrellas
        const opacidadEstrella = Math.random();
        const estrella = $('<div>').addClass('estrella-fugaz');

        estrella.css({
            width: tamañoEstrella + 'px',
            height: tamañoEstrella + 'px',
            opacity: opacidadEstrella,
            left: Math.random() * window.innerWidth,
            top: -20
        });

        $('body').append(estrella);

        estrella.animate(
            {
                top: window.innerHeight + 20,
                left: Math.random() * window.innerWidth
            },
            {
                duration: Math.random() * 3000 + 2000,
                easing: 'linear',
                complete: function () {
                    $(this).remove();
                }
            }
        );
    }

    setInterval(crearEstrellaFugaz, 1000);
});