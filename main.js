var stabilityMult = 100/18;
var agilityMult = 100/14;
var speedMult = 100/13;
var accelerationMult = 100/8;

var minor = 1;
var med = 2;
var major = 4

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
        self.stabilityValues().forEach(function(element) {
            if(element.value){
                sum += element.value;
            }
        });
        self.stability(Math.floor(sum));
        console.debug("stability: "+sum);
    });

    self.agilityValues.subscribe(function (newValue) {
        var sum = 0;
        self.agilityValues().forEach(function(element) {
            if(element.value){
                sum += element.value;
            }
        });
        self.agility(Math.floor(sum));
        console.debug("agility: "+sum);
    });

    self.speedValues.subscribe(function (newValue) {
        var sum = 0;
        self.speedValues().forEach(function(element) {
            if(element.value){
                sum += element.value;
            }
        });
        self.speed(Math.floor(sum));
        console.debug("speed: "+sum);
    });    

    self.accelerationValues.subscribe(function (newValue) {
        var sum = 0;
        self.accelerationValues().forEach(function(element) {
            if(element.value){
                sum += element.value;
            }
        });
        self.acceleration(Math.floor(sum));
        console.debug("acceleration: "+sum);
    });
};

//Save and manage each skate component
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
		updateEvaluation('bootTop', Vm.skateAttributesVm.stabilityValues, stabilityMult * minor, newValue, 'High Top'); 	//Stability
		updateEvaluation('bootTop', Vm.skateAttributesVm.agilityValues, agilityMult * minor, newValue, 'Low Top'); 		//Agility
    });

    self.bootHeel.subscribe(function (newValue) {        
		updateEvaluation('bootHeel', Vm.skateAttributesVm.agilityValues, agilityMult * med, newValue, 'Raised Heel'); 			//Agility
		updateEvaluation('bootHeel', Vm.skateAttributesVm.speedValues, speedMult * med, newValue, 'Flat Heel'); 					//Speed
		updateEvaluation('bootHeel', Vm.skateAttributesVm.accelerationValues, accelerationMult * med, newValue, 'Flat Heel'); 	//Acceleration
    });

    self.plateKingPinAngle.subscribe(function (newValue) {        		
		updateEvaluation('plateKingPinAngle', Vm.skateAttributesVm.stabilityValues, convertToPoints(newValue, 45, 10, stabilityMult * major), newValue); 	//Stability        	
		updateEvaluation('plateKingPinAngle', Vm.skateAttributesVm.agilityValues, convertToPoints(newValue, 10, 45, agilityMult * major), newValue); 		//Agility
		updateEvaluation('plateKingPinAngle', Vm.skateAttributesVm.speedValues, convertToPoints(newValue, 45, 10, speedMult * major), newValue); 			//Speed
    });

    self.plateMounting.subscribe(function (newValue) {        
		updateEvaluation('plateMounting', Vm.skateAttributesVm.stabilityValues, stabilityMult * major, newValue, 'Standard'); 		//Stability
		updateEvaluation('plateMounting', Vm.skateAttributesVm.accelerationValues, accelerationMult * major, newValue, 'Standard'); 	//Acceleration
		updateEvaluation('plateMounting', Vm.skateAttributesVm.agilityValues, agilityMult * major, newValue, 'Short Forward'); 		//Agility
    });

    self.plateCushionHardness.subscribe(function (newValue) {        
		updateEvaluation('plateCushionHardness', Vm.skateAttributesVm.stabilityValues, convertToPoints(newValue, 78, 100, stabilityMult * med), newValue); 	//Stability
		updateEvaluation('plateCushionHardness', Vm.skateAttributesVm.agilityValues, convertToPoints(newValue, 100, 78, agilityMult * med), newValue); 		//Agility
    });

    self.wheelDiameter.subscribe(function (newValue) {       
		updateEvaluation('wheelDiameter', Vm.skateAttributesVm.stabilityValues, convertToPoints(newValue, 70, 45, stabilityMult * med), newValue); 		//Stability
		updateEvaluation('wheelDiameter', Vm.skateAttributesVm.speedValues, convertToPoints(newValue, 45, 70, speedMult * med), newValue); 				//Speed
		updateEvaluation('wheelDiameter', Vm.skateAttributesVm.accelerationValues, convertToPoints(newValue, 70, 45, accelerationMult * med), newValue); 	//Acceleration
    });

    self.wheelWidth.subscribe(function (newValue) {
		updateEvaluation('wheelWidth', Vm.skateAttributesVm.agilityValues, convertToPoints(newValue, 44, 31, agilityMult * minor), newValue); 		//Agility
		updateEvaluation('wheelWidth', Vm.skateAttributesVm.stabilityValues, convertToPoints(newValue, 31, 44, stabilityMult * minor), newValue); 	//Stability
		updateEvaluation('wheelWidth', Vm.skateAttributesVm.speedValues, convertToPoints(newValue, 44, 31, speedMult * minor), newValue); 			//Speed
    });    

    self.wheelDurometer.subscribe(function (newValue) {
		updateEvaluation('wheelDurometer', Vm.skateAttributesVm.stabilityValues, convertToPoints(newValue, 103, 78, stabilityMult * major), newValue); 	//Stability
		updateEvaluation('wheelDurometer', Vm.skateAttributesVm.speedValues, convertToPoints(newValue, 78, 103, speedMult * major), newValue); 			//Speed
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
    $('#kingpin').slider({formatter: function(value) { return value+'°'; }});
    $('#cushion-hardness').slider({formatter: function(value) { return value+'A'; }});
    $('#wheelDiameter').slider({formatter: function(value) { return value+'mm'; }});
    $('#wheelWidth').slider({formatter: function(value) { return value+'mm'; }});
    $('#wheelDurometer').slider({formatter: function(value) { return value+'A'; }});

	//Set the initial vales for the sliders
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

function updateEvaluation(component, attribute, impact, newValue, applyOn){
	//Find the skate component in the array of attributes
	var index = attribute().findIndex(i => i.type === component);
	
	//If we found the component in the attribute array
	if (index >= 0) {
		attribute.splice(index, 1); //Remove this attribute from the array

		if (!applyOn || newValue === applyOn) { //Update this attribute with it's updated value
			attribute.push({ type:component, value: impact});
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
