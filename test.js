async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

const start = async () => {
    await asyncForEach([1, 2, 3], async (num) => {
        console.log(num);
        await sleep(1000);
    });
    console.log('Done');
}

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

start();
