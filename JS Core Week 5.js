//Task 1
//Create polyfill for bind method. Use ES5 syntax only.

function bind(fun, context, arg) {
  var argum = [];
  for (var i = 2; i < arguments.length; i++) {
    argum.push(arguments[i])
  }
  return function(arg) {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i])
    }
    fun.apply(context, argum.concat(args))
  }
}

function hi(arg) {
  console.log(this.name + ' ' + arg)
}

user = {
  name: 'vasul'
}

var bindUser = bind(hi, user, 25);
bindUser(20);

  //Task 2
  //Create function counterFactory which returns independent counter.
  //Code example:

  function counterFactory(){
    var count = 1;
    return function(){
      return count++;
    }
  }
  
  var counter1 = counterFactory();
  var counter2 = counterFactory();
  
  console.log(counter1()); // 1
  console.log(counter1()); // 2
  console.log(counter1()); // 3
  
  console.log(counter2()); // 1
  console.log(counter2()); // 2
  
//iterator

function iterator(arr) {
  var index = 0;

  return {
    next: function() {
      var value = arr[index];
      var done = !this.hasNext();
      if (this.hasNext()) {
        index++;
        value = arr[index - 1];
      }
      return {
        value,
        done
      }
    },

    first: function() {
      this.reset();
      return arr[index];
    },

    reset: function() {
      index = 0;
    },

    hasNext: function() {
      return arr.length - 1 > index;
    },

    each: function(f) {
      this.reset();
      var result; 

      do {
        result = this.next();
        f(result.value);
      } while (!result.done);
    }
  }
}

var arr = ['one', 'two', 'three'];

var it = iterator(arr);
console.log(it.hasNext());
console.log(it.next());
console.log(it.hasNext());
console.log(it.next());
console.log(it.hasNext());
console.log(it.next());
console.log(it.hasNext());
console.log(it.next());
console.log(it.next());
console.log(it.hasNext()); 
console.log('reset');
console.log(it.first());
console.log(it.next());
console.log(it.reset());
console.log(it.hasNext());
console.log(it.next());
console.log(it.next());
console.log(it.hasNext());
it.each((el) => console.log(el + 1));

  //Bonus task

  function sum(){
    var buffer = arguments[0];
    return function(){
      if(arguments.length===1) {
        return sum(buffer + arguments[0] );
      } else {
        return buffer;
      }
    }
  }
  
  console.log(sum(4)(1)(5)(41)(75)()); 
  console.log(sum(2)(8)(8)(1)());// 19
  console.log(sum(4)(8)(9)());// 21
