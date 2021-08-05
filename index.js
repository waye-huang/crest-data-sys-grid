
function btnToggle() {
	document.getElementById("Dropdown").classList.toggle("show");
}

// Prevents menu from closing when clicked inside
document.getElementById("add-box").addEventListener('click', function (event) {
	addBox2();
	event.stopPropagation();
});

document.getElementById("reset").addEventListener('click', function (event) {
	resetBoxGrid();
	event.stopPropagation();
});

// Closes the menu in the event of outside click
window.onclick = function(event) {
	if (!event.target.matches('.dropbutton')) {
		
			var dropdowns = 
			document.getElementsByClassName("dropdownmenu-content");
				
			var i;
			for (i = 0; i < dropdowns.length; i++) {
					var openDropdown = dropdowns[i];
					if (openDropdown.classList.contains('show')) {
							openDropdown.classList.remove('show');
					}
			}
	}
}

const boxGrid = document.getElementById('box-grid');

class Box {
	constructor(idx) {
		const boxId = `box-${idx}`;

		this.node = document.createElement('div');
		this.node.setAttribute('class', 'grid-box');
		this.node.setAttribute('id', boxId);
		this.node.innerText = idx;
		this.id = boxId;

		const delBtn = document.createElement('button');
		delBtn.setAttribute('class', 'del');
		delBtn.innerHTML = 'X';
		// delBtn.addEventListener('click', () => console.log(boxId));
		delBtn.addEventListener('click', () => this.removeBox(boxId));
	
		this.node.appendChild(delBtn);
		// this.addBox.bind(this);
		// this.removeBox.bind(this);
		// this.print.bind(this);
	}

	addBox() {
		const boxGrid = document.getElementById('box-grid');
		boxGrid.appendChild(this.node);
		console.log(`${this.id} added!`)
	}

  print() {
		console.log('printing!!!')
	}

	removeBox(boxId) {
		const boxToDelete = document.getElementById(boxId);
		console.log('boxToDelete', boxToDelete)
		const boxGrid = document.getElementById('box-grid');
		boxGrid.removeChild(boxToDelete);
	}
}

function addBox2() {
	const boxGrid = document.getElementById('box-grid');
	let currentIndex = boxGrid.children.length + 1;
	let box=new Box(currentIndex);
	box.addBox();
}


function resetBoxGrid() {
	// alert('reset BoxGrid button fired!');
	boxGrid.innerHTML = '';
}