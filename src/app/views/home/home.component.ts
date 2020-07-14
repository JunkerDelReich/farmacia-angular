import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RemedioService } from '../../shared/service/remedio.service';
import { Remedio } from 'src/app/shared/model/remedio.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  preco = new FormControl('', [Validators.required]);
  descricao = new FormControl('', [Validators.required]);
  foto = new FormControl('', [Validators.required]);


  listaRemedios: Remedio[];

  

  id = 0;

  constructor(private remedioService: RemedioService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {


    this.getRemedios();
  }

  displayedColumns: string[] = ['id', 'preco', 'descricao', 'foto', 'acoes'];
  dataSource: Remedio[];

  isEditing() {
    return this.id > 0;
  }

  getRemedios() {
    this.dataSource = [];
    this.remedioService.getRemedio().subscribe(data => {
      this.dataSource = data;
      console.log(this.dataSource);
    });
  }

  save() {
    let param = { "preco": this.preco.value, "descricao": this.descricao.value, "foto": this.foto.value };
    if (!this.isEditing()) {
      this.remedioService.postRemedio(param).toPromise().then((response) => { this.getRemedios(); this.changeDetectorRefs.detectChanges(); this.clear(); });
    } else {
      this.remedioService.putRemedio(param, this.id).toPromise().then((response) => { this.getRemedios(); this.changeDetectorRefs.detectChanges(); this.clear(); })
    }
  }

  clear() {
    this.preco.setValue("");
    this.descricao.setValue("");
    this.foto.setValue("");
    this.id = 0;
  }

  onEdit(obj: any) {
    this.preco.setValue(obj.preco);
    this.descricao.setValue(obj.descricao);
    this.foto.setValue(obj.foto);
    this.id = obj.id;
  }

  delete(obj: any) {
    this.remedioService.deleteRemedio(obj.id).toPromise().then((response) => { this.getRemedios(); this.changeDetectorRefs.detectChanges(); this.clear(); });
  }

}
