<template>
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <!-- Meta -->
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!-- Stylesheets -->
        <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.99.0/css/materialize.min.css" media="screen,projection">
        <link type="text/css" rel="stylesheet" href="/css/index.css">
        <!-- Scripts -->
        <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
        <script type="text/javascript" src="https://unpkg.com/vue/dist/vue.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.99.0/js/materialize.min.js"></script>
    </head>
    
    <body class="grey darken-3 white-text">
    
        <ul id="slide-out" class="side-nav">
            <li>
                <div class="user-view">
                    <div class="background grey darken-4">
                    </div>
                    <a href="#!user">
                        <img class="circle" src="/img/noud.png">
                    </a>
                    <a href="#!name">
                        <span class="white-text name">nya nya</span>
                    </a>
                    <a href="#!email">
                        <span class="white-text email">nya@nyanyanya.moe</span>
                    </a>
                </div>
            </li>
            <li>
                <a href="#!">
                    <i class="material-icons">cloud</i>First Link With Icon</a>
            </li>
            <li>
                <a href="#!">Second Link</a>
            </li>
            <li>
                <div class="divider"></div>
            </li>
            <li>
                <a class="subheader">Subheader</a>
            </li>
            <li>
                <a class="waves-effect" href="#!">Third Link With Waves</a>
            </li>
        </ul>
        <a href="#" data-activates="slide-out" class="button-collapse">
            <i class="material-icons">menu</i>
        </a>
        {{{app}}} {{{script}}}
        <div id="app"></div>
        <script>
        app.$mount('#app')
        </script>
        <script type="text/javascript" src="/js/index.js"></script>
    </body>
    
    </html>
</template>