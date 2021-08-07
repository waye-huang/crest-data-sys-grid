class Box {
	constructor(idx, boxName, parentNodeId) {
		
		this.parentNode = document.getElementById(parentNodeId);
		this.node = document.createElement('div');
		let newIdx = this.parentNode.lastChild ? this.parentNode.lastChild.idx + 1 : 1;
		this.lastChildIdx = Number(localStorage.getItem('lastChildIndex'));
		this.node.idx = boxName ? (boxName ? Number(boxName.slice(4)) : 0) : newIdx;
		
		const boxId = this.idFormat(`box`, this.node.idx, 4);
		this.node.setAttribute('class', 'grid-box');
		this.node.setAttribute('id', boxId);
		this.node.setAttribute('value', this.node.idx);
		this.node.innerText = boxName ? Number(boxName.split('-')[1]) : this.node.idx;
		this.node.id = boxName ? boxName : boxId;
		
		const delBtn = document.createElement('button');
		delBtn.setAttribute('class', 'del');
		delBtn.innerHTML = 'X';
		delBtn.addEventListener('click', () => this.removeBox(this.node.id));
		this.node.appendChild(delBtn);
	}

	idFormat (name, num, size) {
		num = num.toString();
		while (num.length < size) num = '0' + num;
		return `${name}-${num}`;
	}

	addBox(boxName) {
		this.parentNode.appendChild(this.node);
		let lastChildID = this.parentNode.lastChild.idx; 
		localStorage.setItem('lastChildIndex', lastChildID);
		localStorage.setItem(this.node.id, this.node.idx);
		if (boxName === undefined) {
			console.log(`${this.node.id} added.`)
		} else {
			console.log(`${this.node.id} added.`)
		}
	}

	removeBox(id) {
		const boxToDelete = document.getElementById(id);
		this.parentNode.removeChild(boxToDelete);
		localStorage.removeItem(id);
		const lastId = this.parentNode.lastChild.idx;
		localStorage.setItem('lastChildIndex', Number(lastId || 0));
		console.log(`last box on the board is: ${lastId}`)
		console.log(`${this.node.id} deleted. lastID: ${lastId}`)
	}
}

class BoxGrid {
	constructor(id) {
		this.node = document.getElementById(id);
		this.col = 4;
		this.id = id;
	}

	addBox(boxName) {
		let currentIndex = this.node.children.length + 1;
		let currentBox = new Box(currentIndex, boxName, this.id);
		currentBox.addBox(boxName);
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
		localStorage.setItem('lastChildIndex', this.node.lastChild ? this.node.lastChild.idx : 0);
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
		Object.keys(localStorage).filter(each => each.slice(0, 3) === 'box').forEach(each => localStorage.removeItem(each));
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
				localStorage.removeItem(this.node.lastChild.id);
				this.node.removeChild(this.node.lastChild);
				console.log(`row is deleted.`)
			} 
		} else {
			localStorage.removeItem(this.node.lastChild.id);
			this.node.removeChild(this.node.lastChild);
			console.log(`one of last row is deleted.`)
		}
		this.updateCount();
	}

	setColumns(value) {
		localStorage.setItem('col-count', value);
		this.col = value;
		// update style
		const newFormat = '1fr '.repeat(value);
		document.getElementById('box-grid').style.gridTemplateColumns = newFormat;
		console.log(`setColumns to ${value}`)
	}
}

window.addEventListener('DOMContentLoaded', () => {
  boxGrid = new BoxGrid('box-grid');
	if (localStorage.lastChildIndex === undefined) localStorage.setItem('lastChildIndex', 0);

	//set default column count to 4, this is for browser opening up app for 1st time
	let localColCount = localStorage.getItem('col-count') || 4;
	boxGrid.setColumns(localColCount);
	document.getElementById('')
	document.getElementById('col').getElementsByTagName('option')[localColCount - 1].selected = 'selected';

	let localStorageKeys = Object.keys(localStorage).filter(each => each.slice(0, 3) === 'box');
	localStorageKeys.sort();
	const childrenNameList = boxGrid.children?.map(child => child.id) || [];
	let missingKeys = localStorageKeys.filter(each => !childrenNameList.includes(each)); 

		if (missingKeys.length){
			for (let step = 0; step < Math.min(missingKeys.length, 300); step++) {
					let boxId = missingKeys[step];
					console.log(`@129 boxId: ${boxId}`);
					boxGrid.addBox(boxId);
			}
		}

	document.getElementById("add-box").addEventListener('click', (event)=> {
		boxGrid.addBox(); event.stopPropagation();
	});

	document.getElementById("col").addEventListener('change', (event)=> {
		event.stopPropagation(); 
		const colCount = document.getElementById('col').value; 
		boxGrid.setColumns(colCount);
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