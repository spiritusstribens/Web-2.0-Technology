function Base(ins_var) {
	this.instanceVariable = ins_var;
}
Base.staticVariable = 'Base';
Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}
Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
}

function Derived(ins_var) {
	this.instanceVariable = ins_var;
}
Derived.staticVariable = 'Derived';
Derived.staticMethod = function() {
	console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
}
Derived.prototype.instanceMethod = function() {
	console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
}

function extend(base, derived) {
	var combine = function() {
		basePart = base.apply(this, arguments);
		derivedPart = derived.apply(this, arguments);
	}
	applyProperty(combine, base);
	applyProperty(combine, derived); 
	applyProperty(combine.prototype, base.prototype); 
	applyProperty(combine.prototype, derived.prototype);
	return combine;
}

function applyProperty(dst, src) {
	for (var s in src) {
		if (typeof src[s] === 'function') {
			if (typeof dst[s] === 'function')
				var temp = dst[s];
			dst[s] = function() {
				if (!!temp)
					temp.apply(this, arguments);
				src[s].apply(this, arguments);
			}
		} else {
			dst[s] = src[s];
		}
	}
}

Derived = extend(Base, Derived);

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