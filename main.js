//Save and manage each attribute
function skateAttributesVm() {
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
        self.stabilityValues().forEach(function (element) {
            if (element.value) {
                sum += element.value;
            }
        });
        self.stability(Math.floor(sum));
        console.debug("stability: " + sum);
    });

    self.agilityValues.subscribe(function (newValue) {
        var sum = 0;
        self.agilityValues().forEach(function (element) {
            if (element.value) {
                sum += element.value;
            }
        });
        self.agility(Math.floor(sum));
        console.debug("agility: " + sum);
    });

    self.speedValues.subscribe(function (newValue) {
        var sum = 0;
        self.speedValues().forEach(function (element) {
            if (element.value) {
                sum += element.value;
            }
        });
        self.speed(Math.floor(sum));
        console.debug("speed: " + sum);
    });

    self.accelerationValues.subscribe(function (newValue) {
        var sum = 0;
        self.accelerationValues().forEach(function (element) {
            if (element.value) {
                sum += element.value;
            }
        });
        self.acceleration(Math.floor(sum));
        console.debug("acceleration: " + sum);
    });
};

//Save and manage each skate component
function skateBuilderVm() {
    var self = this;

    //Impact
    self.minor = ko.observable(1);
    self.med = ko.observable(2);
    self.major = ko.observable(4);

    //TODO: Make this dynamic
    //Multpliers
    self.stabilityMult = ko.observable(100 / 18);
    self.agilityMult = ko.observable(100 / 14);
    self.speedMult = ko.observable(100 / 13);
    self.accelerationMult = ko.observable(100 / 8);    

    //Setup components
    self.bootTop = ko.observable();
    self.bootHeel = ko.observable();
    self.skaterWeightVal = ko.observable(0).extend({ rateLimit: 500 });
    self.skaterWeight = ko.pureComputed(function(){return weightEnum[self.skaterWeightVal()];}); //Converts number into text
    self.plateKingPinAngle = ko.observable(10).extend({ rateLimit: 500 });
    self.plateMounting = ko.observable();
    self.plateCushionHardness = ko.observable(78).extend({ rateLimit: 500 });
    self.wheelDiameter = ko.observable(35).extend({ rateLimit: 500 });
    self.wheelWidth = ko.observable(31).extend({ rateLimit: 500 });
    self.wheelDurometer = ko.observable(78).extend({ rateLimit: 500 });
    self.wheelBearings = ko.observable();

    self.bootTop.subscribe(function (newValue) {
        updateEvaluation('bootTop', Vm.skateAttributesVm.stabilityValues, self.stabilityMult() * self.minor(), newValue, 'High Top'); 	//Stability
        updateEvaluation('bootTop', Vm.skateAttributesVm.agilityValues, self.agilityMult() * self.minor(), newValue, 'Low Top'); 		    //Agility
    });

    self.bootHeel.subscribe(function (newValue) {
        updateEvaluation('bootHeel', Vm.skateAttributesVm.agilityValues, self.agilityMult() * self.med(), newValue, 'Raised Heel'); 			//Agility
        updateEvaluation('bootHeel', Vm.skateAttributesVm.speedValues, self.speedMult() * self.med(), newValue, 'Flat Heel'); 				//Speed
        updateEvaluation('bootHeel', Vm.skateAttributesVm.accelerationValues, self.accelerationMult() * self.med(), newValue, 'Flat Heel'); 	//Acceleration
    });

    self.skaterWeightVal.subscribe(function (newValue) {

    });

    self.plateKingPinAngle.subscribe(function (newValue) {
        updateEvaluation('plateKingPinAngle', Vm.skateAttributesVm.stabilityValues, convertToPoints(newValue, 45, 10, self.stabilityMult() * self.major()), newValue); 	//Stability        	
        updateEvaluation('plateKingPinAngle', Vm.skateAttributesVm.agilityValues, convertToPoints(newValue, 10, 45, self.agilityMult() * self.major()), newValue); 		//Agility
        updateEvaluation('plateKingPinAngle', Vm.skateAttributesVm.speedValues, convertToPoints(newValue, 45, 10, self.speedMult() * self.major()), newValue); 			//Speed
    });

    self.plateMounting.subscribe(function (newValue) {
        updateEvaluation('plateMounting', Vm.skateAttributesVm.stabilityValues, self.stabilityMult() * self.major(), newValue, 'Standard'); 		//Stability
        updateEvaluation('plateMounting', Vm.skateAttributesVm.accelerationValues, self.accelerationMult() * self.major(), newValue, 'Standard'); //Acceleration
        updateEvaluation('plateMounting', Vm.skateAttributesVm.agilityValues, self.agilityMult() * self.major(), newValue, 'Short Forward'); 		//Agility
    });

    self.plateCushionHardness.subscribe(function (newValue) {
        updateEvaluation('plateCushionHardness', Vm.skateAttributesVm.stabilityValues, convertToPoints(newValue, 78, 103, self.stabilityMult() * self.med()), newValue); 	//Stability
        updateEvaluation('plateCushionHardness', Vm.skateAttributesVm.agilityValues, convertToPoints(newValue, 103, 78, self.agilityMult() * self.med()), newValue); 		//Agility
    });

    self.wheelDiameter.subscribe(function (newValue) {
        updateEvaluation('wheelDiameter', Vm.skateAttributesVm.stabilityValues, convertToPoints(newValue, 70, 35, self.stabilityMult() * self.med()), newValue); 		    //Stability
        updateEvaluation('wheelDiameter', Vm.skateAttributesVm.speedValues, convertToPoints(newValue, 35, 70, self.speedMult() * self.med()), newValue); 				    //Speed
        updateEvaluation('wheelDiameter', Vm.skateAttributesVm.accelerationValues, convertToPoints(newValue, 70, 35, self.accelerationMult() * self.med()), newValue);    //Acceleration
    });

    self.wheelWidth.subscribe(function (newValue) {
        updateEvaluation('wheelWidth', Vm.skateAttributesVm.agilityValues, convertToPoints(newValue, 44, 31, self.agilityMult() * self.minor()), newValue); 		//Agility
        updateEvaluation('wheelWidth', Vm.skateAttributesVm.stabilityValues, convertToPoints(newValue, 31, 44, self.stabilityMult() * self.minor()), newValue); 	//Stability
        updateEvaluation('wheelWidth', Vm.skateAttributesVm.speedValues, convertToPoints(newValue, 44, 31, self.speedMult() * self.minor()), newValue); 			//Speed
    });

    self.wheelDurometer.subscribe(function (newValue) {
        updateEvaluation('wheelDurometer', Vm.skateAttributesVm.stabilityValues, convertToPoints(newValue, 103, 78, self.stabilityMult() * self.major()), newValue); 	//Stability
        updateEvaluation('wheelDurometer', Vm.skateAttributesVm.speedValues, convertToPoints(newValue, 78, 103, self.speedMult() * self.major()), newValue); 			//Speed
    });
}

//root VM
function Vm() {
    var self = this;

    self.skateAttributesVm = new skateAttributesVm();
    self.skateBuilderVm = new skateBuilderVm();
};

var Vm;
$('document').ready(function () {
    Vm = new Vm();

    //Attach the sliders
    $('#skaterWeight').slider({formatter: function (value) { return weightEnum[value];}});
    $('#kingpin').slider({ formatter: function (value) { return value + '°'; } });
    $('#cushion-hardness').slider({ formatter: function (value) { return value + 'A'; } });
    $('#wheelDiameter').slider({ formatter: function (value) { return value + 'mm'; } });
    $('#wheelWidth').slider({ formatter: function (value) { return value + 'mm'; } });
    $('#wheelDurometer').slider({ formatter: function (value) { return value + 'A'; } });

    //Set the initial vales for the sliders
    Vm.skateBuilderVm.plateKingPinAngle.valueHasMutated();
    Vm.skateBuilderVm.plateCushionHardness.valueHasMutated();
    Vm.skateBuilderVm.wheelDiameter.valueHasMutated();
    Vm.skateBuilderVm.wheelWidth.valueHasMutated();
    Vm.skateBuilderVm.wheelDurometer.valueHasMutated();

    // Activates knockout.js
    ko.applyBindings(Vm);
});

var weightEnum = ['Light', 'Light/self.med()ium', 'self.med()ium', 'self.med()ium/Heavy', 'Heavy']

//Helper functions
function convertToPoints(Input, min, max, outputMax) {
    var pointsPerIncrement = 100 / (max - min);
    var percent = (Input - min) * pointsPerIncrement;
    var outputPerIncrement = 100 / outputMax;
    return percent / outputPerIncrement;
}

function updateEvaluation(component, attribute, impact, newValue, applyOn) {
    //Find the skate component in the array of attributes
    var index = attribute().findIndex(i => i.type === component);

    //If we found the component in the attribute array
    if (index >= 0) {
        attribute.splice(index, 1); //Remove this attribute from the array

        if (!applyOn || newValue === applyOn) { //Update this attribute with it's updated value
            attribute.push({ type: component, value: impact });
        } else { //This option was unset so unset it's value
            attribute.push({ type: component });
        }
    }
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
