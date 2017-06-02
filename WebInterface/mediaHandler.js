const queue = [];
let queueIndex = 0;

function enqueue(val) {
	queue[queue.length] = val;
	updateInterface();
}

function next() {
	const newIndex = queueIndex + 1;

	if (queue.length > newIndex) {
		queueIndex = newIndex;
	} else {
		if (document.getElementById('repeat').getAttribute('activated') != null) queueIndex = 0;
		else return;
	}

	updateInterface();
	playSong(queue[queueIndex], true);
}

function previus() {

}

function deleteQueue() {
	stopSong();
	queue.length = 0;
	updateInterface();
}

function playSong(songName, notAddToQueue) {
	audio.src = '/song/' + songName;
	if (!notAddToQueue) enqueue(songName);
	startSong();
}

function startSong() {
	document.getElementById('toggleBtn').querySelector('img').src = 'Assets/ic_play_arrow_white.svg';
	document.getElementById('songName').innerText = queue[queueIndex];
	audio.play();
}

function pauseSong() {
	document.getElementById('toggleBtn').querySelector('img').src = 'Assets/ic_play_arrow_white.svg';
	audio.pause();
}

function stopSong() {
	document.getElementById('toggleBtn').querySelector('img').src = 'Assets/ic_play_arrow_white.svg';
	document.getElementById('songName').innerText = '';
	document.getElementById('seekBar').value = 0;
	updateCSS('0s', '0s');
	audio.pause();
}

function updateInterface() {
	const elem = document.getElementById('queue');

	if (queue.length > 0) {
		elem.innerHTML = '';

		queue.forEach((object, key) => {
			if (key == queueIndex) elem.innerHTML += `<span style="background-color: green;">${key} - ${object}</span><hr>`;
			else elem.innerHTML += key + ' - ' + object + '<hr>';

			elem.innerHTML += '<br>';
		});
	} else elem.innerHTML = '<i>Queue is empty</i>';

	if (audio.src != '' && audio.src != undefined) {
		if (audio.paused == true) {
			document.getElementById('toggleBtn').querySelector('img').src = 'Assets/ic_play_arrow_white.svg';
		} else if (audio.paused == false) {
			document.getElementById('toggleBtn').querySelector('img').src = 'Assets/ic_pause_white.svg';
		} else {
			console.error('WUT?');
		}
	}
}


// let queueIndex = 0;

// function songEnd(evt) {
// 	if (queueIndex == queue.length - 1) {
// 		if (document.getElementById('repeat').getAttribute('activated')) {
// 			queueIndex = 0;
// 			updateQueue();
// 			playSong(queue[0], true);
// 		}
// 	} else playNextSong();
// }

// function playNextSong() {
// 	if (queue[queueIndex + 1]) playSong(queue[queueIndex + 1]);
// }

// function playSong(songName, notAddToQueue) {
// 	document.getElementById('songName').innerText = songName;
// 	audio.src = '/song/' + songName;
// 	audio.play();

// 	if (!notAddToQueue) {
// 		queue.push(songName);
// 		queueIndex++;
// 		updateQueue();
// 	}
// }

// function updatePlayState(evt) {
// 	if (audio.src != '' && audio.src != undefined) {
// 		if (audio.paused == true) {
// 			document.getElementById('toggleBtn').querySelector('img').src = 'Assets/ic_play_arrow_white.svg';
// 		} else if (audio.paused == false) {
// 			document.getElementById('toggleBtn').querySelector('img').src = 'Assets/ic_pause_white.svg';
// 		} else {
// 			console.error('WUT?');
// 		}
// 	}
// }

// function stopSong() {
// 	document.getElementById('toggleBtn').querySelector('img').src = 'Assets/ic_play_arrow_white.svg';
// 	document.getElementById('songName').innerText = '';
// 	audio.pause();
// }

// function deleteQueue() {
// 	queue.length = 0;
// 	updateQueue();
// 	stopSong();
// }

// function updateQueue() {
// 	const queueElem = document.getElementById('queue');

// 	queueElem.innerHTML = '';
// 	queue.forEach((object, key) => {
// 		queueElem.innerHTML += `<button class="song ${key}" onclick="playSong('${object}', true)">${object}</button><hr>`;
// 	});

// 	queueElem.querySelectorAll('button').forEach((object, key) => {
// 		let newIndex = queueIndex - 1;
// 		if (newIndex < 0) newIndex = 0;

// 		if (key == newIndex) object.style.backgroundColor = 'green';
// 		else object.style.backgroundColor = 'transparent';
// 	});
// }