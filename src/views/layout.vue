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
        <header>
            <ul id="dropdown1" class="dropdown-content">
                <li>
                    <a href="#!">one</a>
                </li>
                <li>
                    <a href="#!">two</a>
                </li>
                <li class="divider"></li>
                <li>
                    <a href="#!">three</a>
                </li>
            </ul>
            <nav>
                <div class="nav-wrapper brown darken-4">
                    <a href="#!" class="brand-logo">Title</a>
                    <ul class="right hide-on-med-and-down">
                        <li>
                            <a href="#!">Link</a>
                        </li>
                        <li>
                            <a href="#!">Link</a>
                        </li>
                        <li>
                            <a class="dropdown-button" href="#!" data-activates="dropdown1">Dropdown
                                <i class="material-icons right">arrow_drop_down</i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        {{{app}}} 
        {{{script}}}
        <div id="app"></div>
        <script>
        app.$mount('#app')
        </script>
    </body>
    
    </html>
</template>