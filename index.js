class Box {
	constructor(idx, parentNodeId) {
		
		this.parentNode = document.getElementById(parentNodeId);
		this.node = document.createElement('div');
		const newId = this.parentNode.lastChild?.idx ? this.parentNode.lastChild.idx + 1 : 0;
		this.node.idx = Math.max(idx, newId);
		
		const boxId = `box-${this.node.idx}`;
		this.node.setAttribute('class', 'grid-box');
		this.node.setAttribute('id', boxId);
		
		this.node.setAttribute('value', this.node.idx);
		this.node.innerText = this.node.idx;
		this.node.id = boxId;
		
		// this.removeBox = this.removeBox.bind(this);
		const delBtn = document.createElement('button');
		delBtn.setAttribute('class', 'del');
		delBtn.innerHTML = 'X';
		delBtn.addEventListener('click', () => this.removeBox(this.node.id));
		this.node.appendChild(delBtn);
	}

	addBox() {
		this.parentNode.appendChild(this.node);
		let lastChildID = this.parentNode.lastChild.idx; 
		localStorage.setItem('lastChildIndex', lastChildID);
		console.log(`${this.node.id} added.`)
	}

	removeBox(id) {
		const boxToDelete = document.getElementById(id);
		this.parentNode.removeChild(boxToDelete);
		const lastId = this.parentNode.lastChild.idx;
		console.log(`last box on the board is: ${lastId}`)
		localStorage.setItem('lastChildIndex', Number(lastId || 0));
		console.log(`${this.node.id} deleted. lastID: ${lastId}`)
	}
}

class BoxGrid {
	constructor(id) {
		this.node = document.getElementById(id);
		this.col = 4;
		this.id = id;
	}

	addBox() {
		let currentIndex = this.node.children.length + 1;
		let currentBox=new Box(currentIndex, this.id);
		currentBox.addBox();
	}

	addBoxes(num) {
		for (let step = 0; step < num; step++) {
			this.addBox();
		}
	}

	setColumns(val) {
		this.col = val;
	}
	
	updateCount() {
		const lastId = this.node.lastChild.idx;
		console.log(`this.node.lastChild`);
		console.dir(this.node.lastChild);
		localStorage.setItem('lastChildIndex', Number(lastId || 0));
	}

	addRow() {
		let missBoxes = this.col - this.node.children.length % this.col;
		let addCount = missBoxes ? missBoxes : this.col;
		for (let step = 0; step < addCount; step++){
			this.addBox();
		} 
	}

	resetGrid() {
		this.node.innerHTML = '';
		localStorage.setItem('lastChildIndex', 0);
		console.log(`grid is now reset!`)
	}
	
	removeRow() {
		const children = this.node.children;
		if (!children.length) console.log('Grid is empty, add a box!');
		
		else if (children.length >= this.col){
			// when a row is not full, will first remove the button row
			let extraBoxes = children.length % this.col;
			let delCount = extraBoxes ? extraBoxes : this.col;
			for (let step = 0; step < delCount; step++){
				this.node.removeChild(this.node.lastChild);
				console.log(`row is deleted.`)
			} 
		} else {
			this.node.removeChild(this.node.lastChild);
			console.log(`one of last row is deleted.`)
		}
		this.updateCount();
	}
}


window.addEventListener('DOMContentLoaded', () => {
  boxGrid = new BoxGrid('box-grid');
	// read where browser last left off with boxes;
	let browserIndex = localStorage.getItem('lastChildIndex');
	if (isNaN(browserIndex)) localStorage.setItem('lastChildIndex', 0);
	boxGrid.addBoxes(browserIndex || 0);

	document.getElementById("add-box").addEventListener('click', (event)=> {
		boxGrid.addBox(); event.stopPropagation();
		screenGrid = document.getElementById('box-grid');
		// console.log(`screenGrid.lastChildren.value ==>`, screenGrid);
	});

	//default columns count is set to 4 with the follow line
	document.getElementById('col').getElementsByTagName('option')[3].selected = 'selected';

	document.getElementById("col").addEventListener('change', (event)=> {
		event.stopPropagation(); 
		const colCount = document.getElementById('col').value; 
		const newFormat = '1fr '.repeat(colCount);
		document.getElementById('box-grid').style.gridTemplateColumns = newFormat;
		boxGrid.setColumns(colCount);
		console.log(`setColumns to ${colCount}`)
	});
	
	document.getElementById("add-row").addEventListener('click', (event)=> {
		boxGrid.addRow();	event.stopPropagation();
	});
	
	document.getElementById("del-row").addEventListener('click', (event)=> {
		boxGrid.removeRow(); event.stopPropagation();
	});
	
	document.getElementById("reset").addEventListener('click', (event)=> {
		boxGrid.resetGrid(); event.stopPropagation();
	});
	
	window.onclick = function(event) {
		if (!event.target.matches('.dropbutton')) {
				let dropdowns = 
				document.getElementsByClassName("dropdownmenu-content");
				for (let i = 0; i < dropdowns.length; i++) {
						let openDropdown = dropdowns[i];
						if (openDropdown.classList.contains('show')) {
								openDropdown.classList.remove('show');
						}
				}
		}
	}
});