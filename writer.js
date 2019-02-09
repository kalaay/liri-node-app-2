let fs = require('fs');

fs.readFile('best_things_ever.txt', 'utf8', function(err, txt){
    if (err){
        console.log(err);
    }else {
        let arr=txt.split(",");
        for(let i=0; i<arr.length; i++){
            console.log(arr[i]);

        } 
    }
});