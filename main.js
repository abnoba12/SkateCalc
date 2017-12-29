var stabilityMult = 100/18;
var agilityMult = 100/14;
var speedMult = 100/13;
var accelerationMult = 100/8;

var minor = 1;
var med = 2;
var major = 4

function skateVm() {
    var self = this;

    self.stability = ko.observable(0);
    self.stabilityValues = ko.observableArray(initializeValues());
    self.agility = ko.observable(0);
    self.agilityValues = ko.observableArray(initializeValues());
    self.speed = ko.observable(0);
    self.speedValues = ko.observableArray(initializeValues());
    self.acceleration = ko.observable(0);
    self.accelerationValues = ko.observableArray(initializeValues());

    self.stabilityValues.subscribe(function (newValue) {
        var sum = 0;
        self.stabilityValues().forEach(function(element) {
            if(element.value){
                sum += element.value;
            }
        });
        self.stability(Math.floor(sum));
        // console.log("stability: "+sum);
    });

    self.agilityValues.subscribe(function (newValue) {
        var sum = 0;
        self.agilityValues().forEach(function(element) {
            if(element.value){
                sum += element.value;
            }
        });
        self.agility(Math.floor(sum));
        // console.log("agility: "+sum);
    });

    self.speedValues.subscribe(function (newValue) {
        var sum = 0;
        self.speedValues().forEach(function(element) {
            if(element.value){
                sum += element.value;
            }
        });
        self.speed(Math.floor(sum));
        // console.log("speed: "+sum);
    });    

    self.accelerationValues.subscribe(function (newValue) {
        var sum = 0;
        self.accelerationValues().forEach(function(element) {
            if(element.value){
                sum += element.value;
            }
        });
        self.acceleration(Math.floor(sum));
        // console.log("acceleration: "+sum);
    });
};

function skateBuilderVm() {
    var self = this;

    self.bootTop = ko.observable();
    self.bootHeel = ko.observable();
    self.plateKingPinAngle = ko.observable(10).extend({ rateLimit: 500 });
    self.plateMounting = ko.observable();
    self.plateCushionHardness = ko.observable(78).extend({ rateLimit: 500 });
    self.wheelDiameter = ko.observable(45).extend({ rateLimit: 500 });
    self.wheelWidth = ko.observable(31).extend({ rateLimit: 500 });
    self.wheelDurometer = ko.observable(78).extend({ rateLimit: 500 });
    self.wheelBearings = ko.observable();

    self.bootTop.subscribe(function (newValue) {
        //Stability
        var index = Vm.skateVm.stabilityValues().findIndex(i => i.type === "bootTop");
        if (index >= 0) {
            Vm.skateVm.stabilityValues.splice(index, 1);

            if (newValue === 'High Top') {
                Vm.skateVm.stabilityValues.push({ type:'bootTop', value: stabilityMult * minor});
            } else if (newValue === 'Low Top') {
                Vm.skateVm.stabilityValues.push({ type: 'bootTop' });
            }
        }

        //Agility
        var index = Vm.skateVm.agilityValues().findIndex(i => i.type === "bootTop");
        if (index >= 0) {
            Vm.skateVm.agilityValues.splice(index, 1);

            if (newValue === 'High Top') {
                Vm.skateVm.agilityValues.push({ type:'bootTop'});
            } else if (newValue === 'Low Top') {
                Vm.skateVm.agilityValues.push({ type: 'bootTop', value: agilityMult * minor});
            }
        }
    });

    self.bootHeel.subscribe(function (newValue) {
        //Agility
        var index = Vm.skateVm.agilityValues().findIndex(i => i.type === "bootHeel");
        if (index >= 0) {
            Vm.skateVm.agilityValues.splice(index, 1);

            if (newValue === 'Raised Heel') {
                Vm.skateVm.agilityValues.push({ type:'bootHeel', value: agilityMult * med});
            } else if (newValue === 'Flat Heel') {
                Vm.skateVm.agilityValues.push({ type: 'bootHeel' });
            }
        }

        //Speed
        var index = Vm.skateVm.speedValues().findIndex(i => i.type === "bootHeel");
        if (index >= 0) {
            Vm.skateVm.speedValues.splice(index, 1);

            if (newValue === 'Raised Heel') {
                Vm.skateVm.speedValues.push({ type:'bootHeel'});
            } else if (newValue === 'Flat Heel') {
                Vm.skateVm.speedValues.push({ type: 'bootHeel', value: speedMult * med });
            }
        }

        //Acceleration
        var index = Vm.skateVm.accelerationValues().findIndex(i => i.type === "bootHeel");
        if (index >= 0) {
            Vm.skateVm.accelerationValues.splice(index, 1);

            if (newValue === 'Raised Heel') {
                Vm.skateVm.accelerationValues.push({ type:'bootHeel'});
            } else if (newValue === 'Flat Heel') {
                Vm.skateVm.accelerationValues.push({ type: 'bootHeel', value: accelerationMult * med });
            }
        }
    });

    self.plateKingPinAngle.subscribe(function (newValue) {
        //Stability
        var index = Vm.skateVm.stabilityValues().findIndex(i => i.type === "plateKingPinAngle");
        if (index >= 0) {
            Vm.skateVm.stabilityValues.splice(index, 1);
            Vm.skateVm.stabilityValues.push({ type:'plateKingPinAngle', value: convertToPoints(newValue, 45, 10, stabilityMult * major)});
        }

        //Agility
        var index = Vm.skateVm.agilityValues().findIndex(i => i.type === "plateKingPinAngle");
        if (index >= 0) {
            Vm.skateVm.agilityValues.splice(index, 1);
            Vm.skateVm.agilityValues.push({ type:'plateKingPinAngle', value: convertToPoints(newValue, 10, 45, agilityMult * major)});
        }

        //Speed
        var index = Vm.skateVm.speedValues().findIndex(i => i.type === "plateKingPinAngle");
        if (index >= 0) {
            Vm.skateVm.speedValues.splice(index, 1);
            Vm.skateVm.speedValues.push({ type:'plateKingPinAngle', value: convertToPoints(newValue, 45, 10, speedMult * major)});
        }
    });

    self.plateMounting.subscribe(function (newValue) {
        //Stability
        var index = Vm.skateVm.stabilityValues().findIndex(i => i.type === "plateMounting");
        if (index >= 0) {
            Vm.skateVm.stabilityValues.splice(index, 1);

            if (newValue === 'Standard') {
                Vm.skateVm.stabilityValues.push({ type:'plateMounting', value: stabilityMult * major});
            } else if (newValue === 'Short Forward') {
                Vm.skateVm.stabilityValues.push({ type: 'plateMounting' });
            }
        }

        //Acceleration
        var index = Vm.skateVm.accelerationValues().findIndex(i => i.type === "plateMounting");
        if (index >= 0) {
            Vm.skateVm.accelerationValues.splice(index, 1);

            if (newValue === 'Standard') {
                Vm.skateVm.accelerationValues.push({ type:'plateMounting', value: accelerationMult * major});
            } else if (newValue === 'Short Forward') {
                Vm.skateVm.accelerationValues.push({ type: 'plateMounting' });
            }
        }

        //Agility
        var index = Vm.skateVm.agilityValues().findIndex(i => i.type === "plateMounting");
        if (index >= 0) {
            Vm.skateVm.agilityValues.splice(index, 1);

            if (newValue === 'Standard') {
                Vm.skateVm.agilityValues.push({ type:'plateMounting'});
            } else if (newValue === 'Short Forward') {
                Vm.skateVm.agilityValues.push({ type: 'plateMounting', value: agilityMult * major});
            }
        }
    });

    self.plateCushionHardness.subscribe(function (newValue) {
        //Stability
        var index = Vm.skateVm.stabilityValues().findIndex(i => i.type === "plateCushionHardness");
        if (index >= 0) {
            Vm.skateVm.stabilityValues.splice(index, 1);
            Vm.skateVm.stabilityValues.push({ type:'plateCushionHardness', value: convertToPoints(newValue, 78, 100, stabilityMult * med)});
        }

        //Agility
        var index = Vm.skateVm.agilityValues().findIndex(i => i.type === "plateCushionHardness");
        if (index >= 0) {
            Vm.skateVm.agilityValues.splice(index, 1);
            Vm.skateVm.agilityValues.push({ type:'plateCushionHardness', value: convertToPoints(newValue, 100, 78, agilityMult * med)});
        }
    });

    self.wheelDiameter.subscribe(function (newValue) {
        //Stability
        var index = Vm.skateVm.stabilityValues().findIndex(i => i.type === "wheelDiameter");
        if (index >= 0) {
            Vm.skateVm.stabilityValues.splice(index, 1);
            Vm.skateVm.stabilityValues.push({ type:'wheelDiameter', value: convertToPoints(newValue, 70, 45, stabilityMult * med)});
        }

        //Speed
        var index = Vm.skateVm.speedValues().findIndex(i => i.type === "wheelDiameter");
        if (index >= 0) {
            Vm.skateVm.speedValues.splice(index, 1);
            Vm.skateVm.speedValues.push({ type:'wheelDiameter', value: convertToPoints(newValue, 45, 70, speedMult * med)});
        }

        //Acceleration
        var index = Vm.skateVm.accelerationValues().findIndex(i => i.type === "wheelDiameter");
        if (index >= 0) {
            Vm.skateVm.accelerationValues.splice(index, 1);
            Vm.skateVm.accelerationValues.push({ type:'wheelDiameter', value: convertToPoints(newValue, 70, 45, accelerationMult * med)});
        }
    });

    self.wheelWidth.subscribe(function (newValue) {
        //Agility
        var index = Vm.skateVm.agilityValues().findIndex(i => i.type === "wheelWidth");
        if (index >= 0) {
            Vm.skateVm.agilityValues.splice(index, 1);
            Vm.skateVm.agilityValues.push({ type:'wheelWidth', value: convertToPoints(newValue, 44, 31, agilityMult * minor)});
        }
        
        //Stability
        var index = Vm.skateVm.stabilityValues().findIndex(i => i.type === "wheelWidth");
        if (index >= 0) {
            Vm.skateVm.stabilityValues.splice(index, 1);
            Vm.skateVm.stabilityValues.push({ type:'wheelWidth', value: convertToPoints(newValue, 31, 44, stabilityMult * minor)});
        }

        //Speed
        var index = Vm.skateVm.speedValues().findIndex(i => i.type === "wheelWidth");
        if (index >= 0) {
            Vm.skateVm.speedValues.splice(index, 1);
            Vm.skateVm.speedValues.push({ type:'wheelWidth', value: convertToPoints(newValue, 44, 31, speedMult * minor)});
        }
    });    

    self.wheelDurometer.subscribe(function (newValue) {
        //Stability
        var index = Vm.skateVm.stabilityValues().findIndex(i => i.type === "wheelDurometer");
        if (index >= 0) {
            Vm.skateVm.stabilityValues.splice(index, 1);
            Vm.skateVm.stabilityValues.push({ type:'wheelDurometer', value: convertToPoints(newValue, 103, 78, stabilityMult * major)});
        }

        //Speed
        var index = Vm.skateVm.speedValues().findIndex(i => i.type === "wheelDurometer");
        if (index >= 0) {
            Vm.skateVm.speedValues.splice(index, 1);
            Vm.skateVm.speedValues.push({ type:'wheelDurometer', value: convertToPoints(newValue, 78, 103, speedMult * major)});
        }
    });
}

//root VM
function Vm() {
    var self = this;

    self.skateVm = new skateVm();
    self.skateBuilderVm = new skateBuilderVm();
};

var Vm;
$('document').ready(function () {
    Vm = new Vm();

    $('#kingpin').slider({});
    $('#cushion-hardness').slider({});
    $('#wheelDiameter').slider({});
    $('#wheelWidth').slider({});
    $('#wheelDurometer').slider({});

    Vm.skateBuilderVm.plateKingPinAngle.valueHasMutated();
    Vm.skateBuilderVm.plateCushionHardness.valueHasMutated();
    Vm.skateBuilderVm.wheelDiameter.valueHasMutated();
    Vm.skateBuilderVm.wheelWidth.valueHasMutated();
    Vm.skateBuilderVm.wheelDurometer.valueHasMutated();    

    // Activates knockout.js
    ko.applyBindings(Vm);
});

//Helper functions
function convertToPoints(Input, min, max, outputMax) {
    var pointsPerIncrement = 100 / (max - min);
    var percent = (Input - min) * pointsPerIncrement;
    var outputPerIncrement = 100 / outputMax;
    return percent / outputPerIncrement;
}

function initializeValues() {
    return [
        { type: 'bootTop' },
        { type: 'bootHeel' },
        { type: 'plateKingPinAngle' },
        { type: 'plateMounting' },
        { type: 'plateCushionHardness' },
        { type: 'wheelDiameter' },
        { type: 'wheelWidth' },
        { type: 'wheelDurometer' },
        { type: 'wheelBearings' }
    ];
}
