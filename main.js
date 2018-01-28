//root VM
function Vm() {
    var self = this;

    var self = this;

    //Impact
    self.minor = ko.observable(1);
    self.med = ko.observable(2);
    self.major = ko.observable(4);

    //Percentage
    self.stability = ko.observable(0);
    self.agility = ko.observable(0);
    self.speed = ko.observable(0);
    self.acceleration = ko.observable(0);

    //Configuration
    self.stabilityValues = ko.observableArray([
        { type: 'bootTop', impact: self.minor() },
        { type: 'plateKingPinAngle', impact: self.major() },
        { type: 'plateMounting', impact: self.major() },
        { type: 'plateCushionHardness', impact: self.med() },
        { type: 'wheelDiameter', impact: self.med() },
        { type: 'wheelWidth', impact: self.major() },
        { type: 'wheelDurometer', impact: self.major() }
    ]);
    self.agilityValues = ko.observableArray([
        { type: 'bootTop', impact: self.minor() },
        { type: 'bootHeel', impact: self.med() },
        { type: 'plateKingPinAngle', impact: self.major() },
        { type: 'plateMounting', impact: self.major() },
        { type: 'plateCushionHardness', impact: self.med() },
        { type: 'wheelWidth', impact: self.minor() }
    ]);
    self.speedValues = ko.observableArray([
        { type: 'bootHeel', impact: self.med() },
        { type: 'plateKingPinAngle', impact: self.major() },
        { type: 'wheelDiameter', impact: self.med() },
        { type: 'wheelWidth', impact: self.minor() },
        { type: 'wheelDurometer', impact: self.major() },
    ]);
    self.accelerationValues = ko.observableArray([
        { type: 'bootHeel', impact: self.med() },
        { type: 'plateMounting', impact: self.major() },
        { type: 'wheelDiameter', impact: self.med() },
    ]);

    //Calculates percentages
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

    //Multpliers
    self.stabilityMult = ko.observable();
    self.agilityMult = ko.observable();
    self.speedMult = ko.observable();
    self.accelerationMult = ko.observable();

    //Setup components
    self.bootTop = ko.observable();
    self.bootHeel = ko.observable();
    self.skaterWeightVal = ko.observable(0);
    self.skaterWeight = ko.pureComputed(function () { return weightEnum[self.skaterWeightVal()]; }); //Converts number into text
    self.plateKingPinAngle = ko.observable(10);
    self.plateMounting = ko.observable();
    self.plateCushionHardness = ko.observable(78);
    self.wheelDiameter = ko.observable(35);
    self.wheelWidth = ko.observable(31);
    self.wheelDurometer = ko.observable(78);
    self.wheelBearings = ko.observable();

    //Observers that update everything when it's value changes
    self.bootTop.subscribe(function () {
        updateEvaluation('bootTop', self.stabilityValues, self.stabilityMult(), self.bootTop(), 'High Top'); 	//Stability
        updateEvaluation('bootTop', self.agilityValues, self.agilityMult(), self.bootTop(), 'Low Top'); 		    //Agility
    });

    self.bootHeel.subscribe(function () {
        updateEvaluation('bootHeel', self.agilityValues, self.agilityMult(), self.bootHeel(), 'Raised Heel'); 			//Agility
        updateEvaluation('bootHeel', self.speedValues, self.speedMult(), self.bootHeel(), 'Flat Heel'); 				//Speed
        updateEvaluation('bootHeel', self.accelerationValues, self.accelerationMult(), self.bootHeel(), 'Flat Heel'); 	//Acceleration
    });

    self.skaterWeightVal.subscribe(function () {
        var agilityCushion = self.agilityValues().find(i => i.type === 'plateCushionHardness');
        var stabilityCushion = self.stabilityValues().find(i => i.type === 'plateCushionHardness');
        var speedWheelDur = self.speedValues().find(i => i.type === 'wheelDurometer');
        var stabilityWheelDur = self.stabilityValues().find(i => i.type === 'wheelDurometer');

        //Everything is based on the origional impact values
        agilityCushion.origImpact = agilityCushion.origImpact ? agilityCushion.origImpact : agilityCushion.impact;
        stabilityCushion.origImpact = stabilityCushion.origImpact ? stabilityCushion.origImpact : stabilityCushion.impact;
        speedWheelDur.origImpact = speedWheelDur.origImpact ? speedWheelDur.origImpact : speedWheelDur.impact;
        stabilityWheelDur.origImpact = stabilityWheelDur.origImpact ? stabilityWheelDur.origImpact : stabilityWheelDur.impact;

        switch (self.skaterWeightVal()) {
            case '0':
                agilityCushion.impact = agilityCushion.origImpact;
                stabilityCushion.impact = stabilityCushion.origImpact + 4;
                speedWheelDur.impact = speedWheelDur.origImpact + 4;
                break;
            case '1':
                agilityCushion.impact = agilityCushion.origImpact + 1;
                stabilityCushion.impact = stabilityCushion.origImpact + 3;                
                speedWheelDur.impact = speedWheelDur.origImpact + 3;
                break;
            case '2':
                agilityCushion.impact = agilityCushion.origImpact + 2;
                stabilityCushion.impact = stabilityCushion.origImpact + 2;
                speedWheelDur.impact = speedWheelDur.origImpact + 2;
                break;
            case '3':
                agilityCushion.impact = agilityCushion.origImpact + 3;
                stabilityCushion.impact = stabilityCushion.origImpact + 1;
                speedWheelDur.impact = speedWheelDur.origImpact + 1;
                break;
            case '4':
                agilityCushion.impact = agilityCushion.origImpact + 4;
                stabilityCushion.impact = stabilityCushion.origImpact;
                speedWheelDur.impact = speedWheelDur.origImpact;
                break;
        }

        updateAllMultpliers(self);
        updateAllValues(self);
    });

    self.plateKingPinAngle.subscribe(function () {
        var max = 45;
        var min = 10;
        updateEvaluation('plateKingPinAngle', self.stabilityValues, convertToPoints(self.plateKingPinAngle(), max, min, self.stabilityMult()), self.plateKingPinAngle()); 	//Stability        	
        updateEvaluation('plateKingPinAngle', self.agilityValues, convertToPoints(self.plateKingPinAngle(), min, max, self.agilityMult()), self.plateKingPinAngle()); 		//Agility
        updateEvaluation('plateKingPinAngle', self.speedValues, convertToPoints(self.plateKingPinAngle(), max, min, self.speedMult()), self.plateKingPinAngle()); 			//Speed
    });

    self.plateMounting.subscribe(function () {
        updateEvaluation('plateMounting', self.stabilityValues, self.stabilityMult(), self.plateMounting(), 'Standard'); 		//Stability
        updateEvaluation('plateMounting', self.accelerationValues, self.accelerationMult(), self.plateMounting(), 'Standard'); //Acceleration
        updateEvaluation('plateMounting', self.agilityValues, self.agilityMult(), self.plateMounting(), 'Short Forward'); 		//Agility
    });

    self.plateCushionHardness.subscribe(function () {
        var max = 103;
        var min = 78;
        updateEvaluation('plateCushionHardness', self.stabilityValues, convertToPoints(self.plateCushionHardness(), min, max, self.stabilityMult()), self.plateCushionHardness()); 	//Stability
        updateEvaluation('plateCushionHardness', self.agilityValues, convertToPoints(self.plateCushionHardness(), max, min, self.agilityMult()), self.plateCushionHardness()); 		//Agility
    });

    self.wheelDiameter.subscribe(function () {
        var max = 70;
        var min = 35;
        updateEvaluation('wheelDiameter', self.stabilityValues, convertToPoints(self.wheelDiameter(), max, min, self.stabilityMult()), self.wheelDiameter()); 		    //Stability
        updateEvaluation('wheelDiameter', self.speedValues, convertToPoints(self.wheelDiameter(), min, max, self.speedMult()), self.wheelDiameter()); 				    //Speed
        updateEvaluation('wheelDiameter', self.accelerationValues, convertToPoints(self.wheelDiameter(), max, min, self.accelerationMult()), self.wheelDiameter());    //Acceleration
    });

    self.wheelWidth.subscribe(function () {
        var max = 44;
        var min = 31;
        updateEvaluation('wheelWidth', self.agilityValues, convertToPoints(self.wheelWidth(), max, min, self.agilityMult()), self.wheelWidth()); 		//Agility
        updateEvaluation('wheelWidth', self.stabilityValues, convertToPoints(self.wheelWidth(), min, max, self.stabilityMult()), self.wheelWidth()); 	//Stability
        updateEvaluation('wheelWidth', self.speedValues, convertToPoints(self.wheelWidth(), max, min, self.speedMult()), self.wheelWidth()); 			//Speed
    });

    self.wheelDurometer.subscribe(function () {
        var max = 103;
        var min = 78;
        updateEvaluation('wheelDurometer', self.stabilityValues, convertToPoints(self.wheelDurometer(), max, min, self.stabilityMult()), self.wheelDurometer()); 	//Stability
        updateEvaluation('wheelDurometer', self.speedValues, convertToPoints(self.wheelDurometer(), min, max, self.speedMult()), self.wheelDurometer()); 			//Speed
    });
};

var Vm;
$('document').ready(function () {
    Vm = new Vm();

    //Attach the sliders
    $('#skaterWeight').slider({ formatter: function (value) { return weightEnum[value]; } });
    $('#kingpin').slider({ formatter: function (value) { return value + '°'; } });
    $('#cushion-hardness').slider({ formatter: function (value) { return value + 'A'; } });
    $('#wheelDiameter').slider({ formatter: function (value) { return value + 'mm'; } });
    $('#wheelWidth').slider({ formatter: function (value) { return value + 'mm'; } });
    $('#wheelDurometer').slider({ formatter: function (value) { return value + 'A'; } });

    //Set the initial vales for the sliders  
    Vm.skaterWeightVal.valueHasMutated();

    // Activates knockout.js
    ko.applyBindings(Vm);
});

//Helper functions
var weightEnum = ['Light', 'Light/medium', 'medium', 'medium/Heavy', 'Heavy']

//Loops through every skate component and notifys it's subscribers that it has changed 
function updateAllValues(Vm) {
    var allValues = [...Vm.stabilityValues(), ...Vm.agilityValues(), ...Vm.speedValues(), ...Vm.accelerationValues()];
    allValues = allValues.map(x => x.type);
    allValues = allValues.filter((elem, pos, arr) => { return arr.indexOf(elem) == pos; });
    allValues.map(item => {
        if (Vm.hasOwnProperty(item) && ko.isObservable(Vm[item])) {
            Vm[item].valueHasMutated();
        }
    });
}

function updateAllMultpliers(Vm) {
    Vm.stabilityMult(calculateMultpliers(Vm.stabilityValues()));
    Vm.agilityMult(calculateMultpliers(Vm.agilityValues()));
    Vm.speedMult(calculateMultpliers(Vm.speedValues()));
    Vm.accelerationMult(calculateMultpliers(Vm.accelerationValues()));
};

function calculateMultpliers(configValues) {
    if (configValues && Array.isArray(configValues)) {
        var hasImpact = configValues.filter(x => x.impact);
        var sum = 0;
        hasImpact.map(config => sum += config.impact);
        return 100 / sum;
    }
    return 0;
}

function convertToPoints(Input, min, max, outputMax) {
    var pointsPerIncrement = 100 / (max - min);
    var percent = (Input - min) * pointsPerIncrement;
    var outputPerIncrement = 100 / outputMax;
    return percent / outputPerIncrement;
}

function updateEvaluation(component, attribute, mult, newValue, applyOn) {
    //Find the skate component in the array of attributes
    var item = attribute().find(i => i.type === component);

    //If we found the component in the attribute array
    if (item) {
        if (!applyOn || newValue === applyOn) { //Update this attribute with it's updated value
            item.value = mult * item.impact;
        } else {
            item.value = 0;
        }
        attribute.valueHasMutated();
    }
}
