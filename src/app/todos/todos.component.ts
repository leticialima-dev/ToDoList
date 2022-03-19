import { Component} from '@angular/core';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {

 
  tarefasRealizadas: string[] = [];
  taskToAdd!: string;
  todoList: string[] = [];


  constructor() { }

  
  dadoLocalStorage: string[] | null = []

    ngOnInit(): void{
    this.dadosDoLocalStorage()
    }

     salvarNoLocalStorage(valor: string){
      this.dadoLocalStorage?.push(valor)
      let arrStr = JSON.stringify(this.dadoLocalStorage)
      localStorage.setItem('dado', arrStr)
      this.dadosDoLocalStorage()
    }

      dadosDoLocalStorage(): void{
      let storage = localStorage.getItem('dado')
      let arr = JSON.parse(storage || '[]')
      this.dadoLocalStorage = arr

    }

      removeItem(id: string) {
      let storage = localStorage.getItem('dado')
      let arr = JSON.parse(storage || '[]')
      for (var i = 0; i < arr.length; i++) { 
      if (arr[i] === id) { 
      arr.splice(i, 1);
      break; 
    }
  }
    localStorage.setItem("dado", JSON.stringify(arr)); 
}
  /*----------------------------------------Adicionar tarefas---------------------------------*/
    addToList() {
    this.salvarNoLocalStorage(this.taskToAdd);
    this.todoList.push(this.taskToAdd);
  }

    doItem(index: number) {
    this.tarefasRealizadas.push(this.todoList[index]);

  }

    excluiTarefa(index: number){
    let valor = this.todoList[index];
    this.removeItem(valor)
    this.todoList.splice(index, 1);

  }

    excluirTodasTarefas(){
    let tipo = this.tarefasRealizadas.length;
    if (tipo > 0 ){
    let resultado = confirm("Deseja excluir os itens selecionados ? " + "Itens a serem excluídos: " + tipo);
    if (resultado == true) {
       while(this.tarefasRealizadas.length) {
           this.tarefasRealizadas.pop();
       }
     }
   }
  }


}
   
  
   
