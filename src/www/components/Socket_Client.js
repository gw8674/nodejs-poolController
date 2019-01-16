import io from 'socket.io-client'
const socket = io({})
let lastUpdateTime = 0;


function getAll(cb){
    socket.emit('all');

    socket.on('all', (data) => {
        let milli = Date.now() - lastUpdateTime;
        lastUpdateTime = Date.now()
        console.log(`milli: ${milli}`)
/*         if (milli < 500){
            // throw out results.  find better server side solution to this
            console.log('throwing out results')
            
        }
        else {
            console.log(`Retrieved data: ${data.config.systemReady}`)
            cb(null, data);
    
        } */
        cb(null, data, 'all');
    })
    
    socket.on('circuit', data => {
        console.log('circuit socket received')
        cb(null, data, 'circuit')
    })

    socket.on('pump', data => {
        console.log('pump socket')
        cb(null, data, 'pump')
    })
}



function setDateTime(newDT){
//socket.on('setDateTime', function (hh, mm, dow, dd, mon, yy, dst)
//socket.emit('setDateTime', newDT.getHours(), newDT.getMinutes(), Math.pow(2, newDT.getDay()), newDT.getDate(), newDT.getMonth() + 1, newDT.getFullYear().toString().slice(-2), autoDST)
let autoDST = 1 // implement later in UI
socket.emit('setDateTime', newDT.getHours(), newDT.getMinutes(), Math.pow(2, newDT.getDay()), newDT.getDate(), newDT.getMonth() + 1, newDT.getFullYear().toString().slice(-2), autoDST )
}

function toggleCircuit(circuit){
    console.log(`emitting toggle circuit ${circuit}`)
    socket.emit('toggleCircuit',circuit)
}


export { getAll, setDateTime, toggleCircuit, onSocketCircuit };