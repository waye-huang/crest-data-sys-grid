class Box {
	constructor(idx) {
		
		this.node = document.createElement('div');
		this.node.setAttribute('class', 'grid-box');
		const boxId = `box-${idx}`;
		this.node.setAttribute('id', boxId);
		this.node.innerText = idx;
		this.id = boxId;
		
		this.removeBox = this.removeBox.bind(this);
		const delBtn = document.createElement('button');
		delBtn.setAttribute('class', 'del');
		delBtn.innerHTML = 'X';
		delBtn.addEventListener('click', () => this.removeBox(this.id));

		this.node.appendChild(delBtn);
	}

	addBox() {
		const bxGrid = document.getElementById('box-grid');
		bxGrid.appendChild(this.node);
		console.log(`${this.id} added.`)
	}

	removeBox(id) {
		const boxToDelete = document.getElementById(id);
		const bxGrid = document.getElementById('box-grid');
		bxGrid.removeChild(boxToDelete);
		console.log(`${this.id} deleted.`)
	}
}

class BoxGrid {
	constructor(id) {
		this.node = document.getElementById(id);
		this.col = 4;
	}

	addBox() {
		let currentIndex = this.node.children.length + 1;
		let currentBox=new Box(currentIndex);
		currentBox.addBox();
	}

	setColumns(val) {
		this.col = val;
	}
	
	addRow() {
		for (let step = 0; step < this.col; step++){
			this.addBox();
		} 
	}

	resetGrid() {
		this.node.innerHTML = '';
		console.log(`grid is now reset!`)
	}
	
	removeRow() {
		const children = this.node.children;
		if (!children.length) console.log('Grid is empty, add a box!');
		else if (children.length >= this.col){
			for (let step = 0; step < this.col; step++){
				this.node.removeChild(this.node.lastChild);
				console.log(`row is deleted.`)
			} 
		} else {
			this.node.removeChild(this.node.lastChild);
			console.log(`one of last row is deleted.`)
		}
	}
}


window.addEventListener('DOMContentLoaded', () => {
  boxGrid = new BoxGrid('box-grid');

	document.getElementById("add-box").addEventListener('click', (event)=> {
		boxGrid.addBox(); event.stopPropagation();

	});

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