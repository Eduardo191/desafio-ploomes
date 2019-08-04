let app = angular.module('mainApp', ['ngRoute']);

app.config(($routeProvider) => {
    $routeProvider
        .when("/clients", {
            templateUrl: "./clientsPage.html"
        })
        .when("/", {
            templateUrl: "./loginPage.html"
        })
        .when("/list", {
            templateUrl: "./ClientsListPage.html"
        })
        .when("/newClient", {
            templateUrl: "./newClient.html"
        })
        .when("/delete", {
            templateUrl: "./deletePage.html"
        })
        .when("/edit", {
            templateUrl: "./editPage.html"
        })
});

app.controller('mainController', ($http, $scope, $location) => {
    $scope.back = () => {
        $location.path('/clients');
    };

    var key;
    $scope.login = () => {
        let email = document.getElementById('email').value.toString();
        let password = document.getElementById('password').value.toString();

        const data = {
            Email: email,
            Password: password
        };
        const datajson = angular.toJson(data);

        $http.post('https://app-api2.ploomes.com/Self/Login', datajson).then((response) => {
            console.log('autenticado');
            key = response.data.value[0].UserKey;
            $location.path('/clients');
        }, (err) => {
            console.log(err);
            alert('E-mail ou senha incorretos');
        });
    };

    $scope.logout = () => {
        $location.path('/');
    };

    $scope.ListClients = () => {
        let config = {
            headers: {
                'User-Key': key
            }
        };

        $http.get('https://app-api2.ploomes.com/Contacts', config).then((response) => {
            console.log(response);
            $scope.clients = response.data.value;
            $location.path('/list');
        });
    };

    $scope.delete = () => {
        $location.path('/delete');
    };

    $scope.deleteClient = () => {
        let id = document.getElementById('delete').value;
        let config = {
            headers: {
                'User-Key': key
            }
        };

        $http.delete(`https://app-api2.ploomes.com/Contacts(${id})`, config).then((response) => {
            alert('Cliente excluido');
        }, (err) => {
            alert('Problema ao excluir');
        });
    };

    $scope.edit = () => {
        $location.path('/edit');
    };

    $scope.editClient = () => {
        let id = document.getElementById('edit').value;
        let newName = document.getElementById('editName').value.toString();
        let config = {
            headers: {
                'User-Key': key
            }
        };

        $http.patch(`https://app-api2.ploomes.com/Contacts(${id})`, { Name: newName }, config).then((response) => {
            alert('Cliente editado');
        }, (err) => {
            alert('Problema ao editar');
        })
    };

    $scope.Add = () => {
        $location.path('/newClient');
    };

    $scope.AddNewClient = () => {
        let name = document.getElementById('newClientName').value.toString();
        let config = {
            headers: {
                'User-Key': key
            }
        };

        $http.post('https://app-api2.ploomes.com/Contacts', { Name: name }, config).then((response) => {
            alert('Cliente adicionado');
        }, (err) => {
            alert('Problema ao adicionar');
        });
    };

});