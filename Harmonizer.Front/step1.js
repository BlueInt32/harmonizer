

var car = {
    engineType: 'v6',
    move: function () {
        alert('Vroom !');
    }
}

var redCar = {
    color : 'red',
    __proto__:car
}

var ferrari = {
    engineType:'v12',
    move:function(){
        alert('VROAAAAA !');
    }
    __proto__:redCar
}



car.engineType ?