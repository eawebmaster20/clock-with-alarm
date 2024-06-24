/******************************************
 * TASK 1
 *****************************************/
let today =new Date()
let timeZoneVar = '24Hr';
console.log(today.getHours(), today.getMinutes(), today.getMinutes());

/******************************************
 * TASK 2
 *****************************************/
let clock = {
    hours:'',
    minutes: '',
    seconds:''
}
const myInterval = ()=>{
    const secInterval = setInterval(() => {
        console.log(timeZoneVar);
        document.getElementById('time').innerText = timeZoneVar === '24Hr' ? getFormattedTime(): get12HourTime();
    }, 1000)
};

const updateClock = ()=>{
    clearInterval(myInterval);
    myInterval();

}

updateClock()

/******************************************
 * TASK 3 & 4
 *****************************************/
const getFormattedTime = ()=>{
    let now = new Date().toTimeString()
    let [time, zone] = now.split(' ');
    time = time.split(':');
    clock.hours = time[0]
    clock.minutes = time[1]
    clock.seconds = time[2]
    return `${clock.hours}:${clock.minutes}:${clock.seconds}`;
}

const get12HourTime = ()=>{
    let now = new Date().toLocaleTimeString()
    now = now.split(':');
    clock.hours = now[0]
    clock.minutes = now[1]
    clock.seconds = now[2]
    return `${clock.hours}:${clock.minutes}:${clock.seconds}`;
}

document.getElementById('timeZoneSelect').addEventListener('change',el=>{
    timeZoneVar = el.target.value;
})
document.getElementById('setAlarm').addEventListener("click", () => {
    document.querySelector("dialog").showModal();
  });


/******************************************
 * TASK 6
 *****************************************/
let alarm = {
    dueTime:'',
    dueDate:'',
    playAudio: false
}

document.getElementById('alarmDialogAction').addEventListener('click',()=>{
    alarm.dueTime = document.getElementById('alarmDueTime').value;
    alarm.dueDate = document.getElementById('alarmDueDate').value;
    alarm.playAudio= document.getElementById('playAudio').checked;
    console.log(alarm);
})


////////////////////////////////////////////////////////////////////////////////////////////////
function setAlarm() {
    const alarmInput = document.getElementById('alarmDueTime');
    const alarmTime = alarmInput.value;
    
    if (!alarmTime) {
        alert('Please select a valid time.');
        return;
    }

    const [alarmHour, alarmMinute] = alarmTime.split(':').map(Number);
    const now = new Date();
    const alarmDate = new Date();
    
    alarmDate.setHours(alarmHour);
    alarmDate.setMinutes(alarmMinute);
    alarmDate.setSeconds(0);

    if (alarmDate <= now) {
        alarmDate.setDate(alarmDate.getDate() + 1);
    }

    const timeUntilAlarm = alarmDate - now;

    document.getElementById('settedAlarm').textContent = `Alarm set for ${alarmDate.toLocaleTimeString()}`;

    setTimeout(() => {
        alert('Time to wake up!');
        document.getElementById('settedAlarm').textContent = '';
        document.getElementById('alarmAudio').play()
    }, timeUntilAlarm);
}