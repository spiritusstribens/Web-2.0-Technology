function Base(ins_var) {
	this.instanceVariable = ins_var;
	this.instanceMethod = function() {
		console.log("This is from Base class instance-method, static-variable is: " + this.instanceVariable);
	}
}
Base.staticVariable = 'Base';
Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}


function Derived(ins_var) {
	this.instanceVariable = ins_var;
	this.instanceMethod = function() {
		this.__proto__.instanceMethod.call(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	}
}
Derived.staticVariable = 'Derived';
Derived.staticMethod = function() {
	this.prototype.constructor.staticMethod.call(this);
	console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
}

function extend(base, derived) {
	derived.prototype = new base();
}

extend(Base, Derived);

console.log("output 1:");
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

console.log("output 2:");
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();